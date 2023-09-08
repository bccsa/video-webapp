class appFrame extends ui {
    constructor() {
        super();

        this.title = "Title comes here"
        this.sectionName = "";
        this.hlsTitle = "";
        this.hlsDescription = "";
        this.imgUrl = "";
        this.hlsUrl = "";
        this._player = undefined;   // Used for videoJS player object reference
        this.isAuthenticated = false;
    }

    get html() {
        return `
        <div class="flex flex-col h-screen bg-slate-800 overflow-hidden scrollbar-hide select-none">
            <!-- title -->
            <div class="fixed top-0 left-0 right-0 px-4 h-12  bg-slate-900 flex ">
                <h1 class="text-slate-300 font-sans text-lg flex items-center">
                    <span class="font-semibold">@{title}</span>
                    <span id="@{_titleDivider}" class="ml-2 mr-2 font-light" hidden>|</span>
                    <span class="font-light float-right">@{sectionName}</span>
                </h1>
            </div>

            <!-- contents -->
            <div class="fixed flex top-12 left-0 right-0 bottom-16 landscape:flex-row portrait:flex-col">

                <!-- video div -->
                <div id="@{_videoDiv}" style="display: none;" class=" landscape:w-6/12 portrait:w-full aspect-[3/2] bg-slate-700 landscape:border-r-2 landscape:border-r-slate-900 portrait:border-b-2 portrait:border-b-slate-900">
                    <!-- video player -->
                    <div class="aspect-video w-full">
                        <video
                            id="@{_playerElement}"
                            class="video-js h-full w-full"
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
                    <!-- video data -->
                    <div class="flex items-start justify-between gap-4 px-4 pb-2 pt-2">
                        <div>
                            <p class="text-slate-100 font-sans text-md">@{hlsTitle}</p>
                            <p class="font-sans text-slate-400 text-xs text-justify">@{hlsDescription}</p>
                        </div>
                        <button id="@{_closePlayerButton}" class="flex items-center gap-1 cursor-pointer text-slate-400 text-sm hover:text-slate-300">
                            <span class="icon-[material-symbols--close-rounded] h-5 w-5"></span>
                            Close player
                        </button>
                    </div>
                </div>
                
                <!-- child controls -->
                <div id="@{_controlsDiv}" class="overflow-y-scroll w-full flex-1 block p-4"></div>
            </div>

            <!-- menu -->
            <div class="fixed bottom-0 left-0 right-0 h-16 bg-slate-900 px-6 flex justify-center">
                <div class="flex justify-between items-center h-full w-96">
                    <div id=@{_btnHome} class="icon-[material-symbols--home-outline-rounded] text-slate-400 hover:text-indigo-300 h-10 w-10"></div>
                    <div id=@{_btnLive} class="icon-[material-symbols--live-tv-outline-rounded] text-slate-400 hover:text-indigo-300 h-10 w-10"></div>
                    <div id=@{_btnUser} class="icon-[material-symbols--person-outline-rounded] text-slate-400 hover:text-indigo-300 h-10 w-10"></div>
                </div>
            </div>
        </div>
        `;
    }

    Init() {
        // Title divider
        this.on('sectionName', data => {
            if (data) {
                this._titleDivider.hidden = false;
            } else {
                this._titleDivider.hidden = true;
            }
        });

        // Buttons event handlers
        this._btnHome.addEventListener('click', e => {
            this.ShowHome();
        });
        this._btnLive.addEventListener('click', e => {
            this.ShowLive();
        });

        this._initPlayer();
        
        this._btnUser.addEventListener('click', e => {
            this.ShowUser();
        });

        this._closePlayerButton.addEventListener('click', e => {
            this._player.pause();
            this.HidePlayer();
        });

        // Select initial content based on stored / current path
        this.on('isAuthenticated', auth => {
            if (auth && window.localStorage.getItem('pathname')) {
                this.ShowLocation(window.localStorage.getItem('pathname'));
            } else {
                this.ShowLocation(window.location.pathname);
            }

            // clear stored path
            if (auth) {
                localStorage.removeItem("pathname");
            }
        });
    }

    resetBtn(ref) {
        ref.classList.add('text-slate-400');
        ref.classList.add('hover:text-indigo-300');
        ref.classList.remove('text-indigo-400');
    }

    setBtn(ref) {
        ref.classList.remove('text-slate-400');
        ref.classList.remove('hover:text-indigo-300');
        ref.classList.add('text-indigo-400');
    }

    ShowLocation(location) {
        // Redirect to previous section after authentication
        switch (location) {
            case '/vod':
                if (!this._controls.VOD) {
                    this.once('VOD', section => {
                        this.ShowHome();
                    });
                } else {
                    this.ShowHome();
                }
                break;
            case '/live':
                if (!this._controls.Live) {
                    this.once('Live', section => {
                        this.ShowLive();
                    });
                } else {
                    this.ShowLive();
                }
                break;
            case '/user':
                if (!this._controls.User) {
                    this.once('User', section => {
                        this.ShowUser();
                    });
                } else {
                    this.ShowUser();
                }
                break;
            default:
                if (!this._controls.VOD) {
                    this.once('VOD', section => {
                        this.ShowHome();
                    });
                } else {
                    this.ShowHome();
                }
                break;
        }
    }

    ShowHome() {
        if (this.VOD) {
            this.VOD.Show();
            this.setBtn(this._btnHome);
            this.resetBtn(this._btnLive);
            this.resetBtn(this._btnUser);
        }
    }

    ShowLive() {
        if (this.Live) {
            this.Live.Show();
            this.setBtn(this._btnLive);
            this.resetBtn(this._btnHome);
            this.resetBtn(this._btnUser);
        }
    }

    ShowUser() {
        if (this.User) {
            this.User.Show();
            this.setBtn(this._btnUser);
            this.resetBtn(this._btnHome);
            this.resetBtn(this._btnLive);
        }
    }

    ShowPlayer() {
        this._videoDiv.style.display = "block";
    }

    HidePlayer() {
        this._videoDiv.style.display = "none";
    }

    _initPlayer() {
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
            preload: "auto",
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