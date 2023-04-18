class videoPlayer extends ui {
    constructor() {
        super();
        this.imgUrl = "";
        this.hlsUrl = "";
        this.title = "";
        this.description = "";
        this._player = undefined;   // Used for videoJS player object reference
    }

    get html() {
        return `
        <div class="mb-2">
            <span class="text-slate-100 font-sans font-bold text-md">@{title}</span>
        </div>
        <!-- video div -->
        <div class="aspect-video max-w-[600pt] rounded-lg m-auto mb-1 overflow-hidden">
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
        </div>
        <div class="border border-b-slate-700 border-l-0 border-r-0 border-t-0 mb-4">
            <p class="font-sans text-slate-500 text-xs text-justify mb-2">@{description}</p>
        </div>
        `;
    }

    Init() {
        // Initialize player
        let options = {
            fluid: false,
            html5: {
                vhs: {
                    overrideNative: true,
                    bandwidth: 100000,
                },
                nativeAudioTracks: videojs.browser.IS_SAFARI,
                nativeVideoTracks: videojs.browser.IS_SAFARI,
            },
            // controls: true,
            autoplay: false,
            // preload: "auto",
            // preferFullWindow: true,
            // fullscreen: {
            //     options: {
            //         navigationUi: 'hide'
            //     }
            // }
            
            // "webkit-playinline": true // does not seem to work to make it play in safari-ios
        }

        if (videojs.browser.IS_SAFARI) {
            delete options.html5.vhs.bandwidth;
        }

        this._player = videojs(this._playerElement.id, options);

        this._player.playsinline(true); // allow player to play in-place on page.

        // if (!videojs.browser.IS_SAFARI) {
            this._player.landscapeFullscreen({  // player full-screen settings (see https://www.npmjs.com/package/videojs-landscape-fullscreen)
                fullscreen: {
                    enterOnRotate: true,
                    exitOnRotate: true,
                    alwaysInLandscapeMode: true,
                    iOS: videojs.browser.IS_SAFARI,
                }
            });
        // }
        

        if (this.hlsUrl) {
            this._player.src({ type: 'application/x-mpegURL', src: this.hlsUrl});
        }
        if (this.imgUrl) {
            this._player.poster(this.imgUrl);
        }

        // Update player source on hlsUrl change
        this.on('hlsUrl', url => {
            this._player.src({ type: 'application/x-mpegURL', src: url});
        });

        // Update player posert on imgUrl change
        this.on('imgUrl', url => {
            this._player.poster(url);
        });
    }
}