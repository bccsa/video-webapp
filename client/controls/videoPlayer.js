class videoPlayer extends ui {
    constructor() {
        super();
        this.imageUrl = "";
        this.hlsUrl = "";
        this.title = "";
        this._player = undefined;   // Used for videoJS player object reference
    }

    get html() {
        return `
        <div class="mb-2">
            <span class="text-slate-100 font-sans font-bold text-md">@{title}</span>
        </div>
        <!-- video div -->
        <div class="aspect-video max-w-[600pt] rounded-lg m-auto mb-4 overflow-hidden">
            <video
                id="@{_playerElement}"
                class="video-js w-full h-full rounded-lg"
                controls
                preload="auto"
                data-setup="{}"
            >
                <p class="vjs-no-js">
                    To view this video please enable JavaScript, and consider upgrading to a
                    web browser that
                    <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
                </p>
            </video>
        </div>`;
    }

    Init() {
        // Initialize player
        this._player = videojs(this._playerElement.id);
        if (this.hlsUrl) {
            this._player.src({ type: 'application/x-mpegURL', src: this.hlsUrl});
        }
        if (this.imageUrl) {
            this._player.poster(this.imageUrl);
        }

        // Update player source on hlsUrl change
        this.on('hlsUrl', url => {
            this._player.src({ type: 'application/x-mpegURL', src: url});
        });

        // Update player posert on imageUrl change
        this.on('imageUrl', url => {
            this._player.poster(url);
        });
    }
}