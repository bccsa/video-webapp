class analytics extends ui {
    constructor() {
        super();

        this.player = controls.appFrame._player;
        this.type = "type";
        this.title = "title";
        this.analyticsUrl = 'analyticsUrl';   // url to analytics server
        this._pushInterval = 1 * 60 * 1000      // time in ms to post analytics
		this._playing = false;
		this._last_playing = false;             // last playing status used to determine to save data when paused
		this._lastTimestamp;
		this._lang;                             // current player language 
		this._lastLang = 0;                     // last active language index

        // post analytics squencial
		setInterval(() => {
			this.post_anal()
		}, this._pushInterval);
    }

    Init() {
        
        this._browserName = (function (agent) {        
			switch (true) {
				case agent.indexOf("edge") > -1: return "MS Edge";
				case agent.indexOf("edg/") > -1: return "Edge ( chromium based)";
				case agent.indexOf("opr") > -1 && !!window.opr: return "Opera";
				case agent.indexOf("chrome") > -1 && !!window.chrome: return "Chrome";
				case agent.indexOf("trident") > -1: return "MS IE";
				case agent.indexOf("firefox") > -1: return "Mozilla Firefox";
				case agent.indexOf("safari") > -1: return "Safari";
				default: return "other";
			}
		})(window.navigator.userAgent.toLowerCase());
		// device unique id (saved to local storage for future use)
		if (!window.localStorage.getItem("deviceGuid")) {
			window.localStorage.setItem("deviceGuid", crypto.randomUUID())
		}
		// analytics data structure
		this._anal = {
			hwID            : window.localStorage.getItem("deviceGuid"),
			type            : this.type,
			url             : window.location.href,
			title           : this.title,
			browser         : this._browserName,
			platform        : window.navigator.platform,
			language        : "",
			timestamp       : Date.now(),
			milliseconds    : 0
		};

		// =========================
		// Player Actions
		// =========================
		this.player.on('pause',  () => { this._saveAnal(); this._playing = false; });                                       // player pause
		this.player.on('waiting',  () => { this._saveAnal(); this._playing = false; });                                     // player buffering
		this.player.on('playing',  () => { this._lastTimestamp = Date.now(); this._saveAnal(); this._playing = true; });    // player continues    
		this.player.on('timeupdate', () => { this._saveAnal(); this._playing = true });                                     // player update timestamp

        // listen to title & type on change event to update the title 
        this.on("type", res => { this._anal.type = res });
        this.on("title", res => { this._anal.title = res });


    }
		
    // =========================
    // Functions
    // =========================
    // save analytics
    _saveAnal () {
        // update lang if undefiend or the language has changed 
        if (('@audio_only' == 1 || '@audio_only' == '1') && !this._lang) {
            this._lang = '@audio_only_lang'
        } 
        else if (!this._lang || !this.player.audioTracks()[this._lastLang].enabled)
            // find active audio track
            for (let i = 0; i < this.player.audioTracks().length; i++) {
                if (this.player.audioTracks()[i].enabled) {
                    this._lang = this.player.audioTracks()[i].label;
                    this._anal.language = this._lang;
                    this._lastLang = i;
                    break;
                }
            }

        if (this._anal.milliseconds == 0) {              
            // set analytics properties
            this._anal.language        = this._lang;
            this._anal.timestamp       = Date.now();
            this._anal.milliseconds    = 0;
        }


        if (!this._lastTimestamp) {
            this._lastTimestamp = Date.now();
        }
        // update timestamp & ms while playing 
        else if (this._playing || this._last_playing) {
            this._anal.milliseconds += Date.now() - this._lastTimestamp;
            this._lastTimestamp = Date.now();
        }
        // upadte last timestamp while paused
        else {
            this._lastTimestamp = Date.now();
        }

        // upadte last playing status
        this._last_playing = this._playing;
    }

    // post analytics
    post_anal ()  {
        // avoid posting empty data
        if (this._anal.milliseconds > 0) {
            this.temp = this._anal;

            // post analytics
            fetch(this.analyticsUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: JSON.stringify(this.temp) // body data type must match "Content-Type" header
            });

            // reset miliseconds 
            this._anal.milliseconds = 0;
        }
    }
}