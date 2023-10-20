class appFrame extends ui {
    constructor() {
        super();

        this.title = "Title comes here"
        this.sectionName = "";
        this.isAuthenticated = false;
        this.language = "eng";

        // Current episode
        this.currentEpisodeId = "";
        this.hlsTitle = "";
        this.hlsDescription = "";
        this.imgUrl = "";
        this.hlsUrl = "";
        this.hlsEventDate = "";

        // Player
        this._player = undefined;   // Used for videoJS player object reference
        this.playerMode = "video"; // options: 'video', 'audio'
        this.playerOpen = false;
        this.audioLoading = false;

        // Helpers
        this._parser = new m3u8Parser.Parser();
        this._dateFormatter = new Intl.DateTimeFormat('en-KE', { dateStyle: 'long', timeStyle: 'short' });
    }

    get html() {
        return /*html*/`
        <div class="flex flex-col h-screen bg-slate-800 select-none">
            <!-- title -->
            <div class="fixed flex items-center justify-between top-0 left-0 right-0 px-4 h-12 bg-slate-900">
                <h1 class="text-slate-300 font-sans text-lg flex items-center">
                    <span class="font-semibold hidden sm:inline">@{title}</span>
                    <span class="icon-[material-symbols--smart-display-outline-rounded] cursor-pointer h-5 w-5 sm:hidden"></span>

                    <span id="@{_titleDivider}" class="ml-2 mr-2 font-light" hidden>|</span>

                    <span class="font-light float-right">@{sectionName}</span>
                </h1>

                <div class="flex gap-x-1">
                    
                    <button id="@{_btnEnableVideoPlayer}" class="flex items-center cursor-pointer rounded gap-1 px-2 py-1 text-sm text-slate-200 bg-slate-500 shadow">
                        <div title="Play audio" class="icon-[material-symbols--smart-display-rounded] cursor-pointer h-5 w-5"></div>
                        Video
                    </button>
                    <button id="@{_btnEnableAudioPlayer}" class="flex items-center cursor-pointer rounded gap-1 px-2 py-1 text-sm text-slate-300 hover:text-slate-200">
                        <div class="icon-[material-symbols--brand-awareness-rounded] cursor-pointer h-5 w-5"></div>
                        Audio
                    </button>
                </div>
            </div>

            <!-- contents -->
            <div class="fixed flex flex-col top-12 left-0 right-0 bottom-16">
                <!-- audio player -->
                <div id="@{_miniPlayer}" class="w-full bg-slate-700 p-2 border-b-2 border-b-slate-900 flex flex-row items-center hidden">
                    <img id="@{_miniPlayerImg}" src="@{imgUrl}" class="aspect-video rounded bg-cover h-10" />
                    <div id="@{_miniPlayerVideo}" class="aspect-video rounded h-16 md:h-24 cursor-pointer hover:opacity-75"></div>
                    <div class="ml-2 flex-1">
                        <p class="text-slate-100 font-sans text-sm">@{hlsTitle}</p>
                        <p class="font-sans text-slate-400 text-xs">
                            <span>@{hlsEventDate}</span>
                            <span id="@{_descriptionDivider}" hidden>·</span>
                            <span>@{hlsDescription}</span>
                        </p>
                    </div>

                    <div class="flex items-center gap-4">
                        <button id="@{_btnMiniplayerMaximize}" title="Show large video player" class="hidden icon-[material-symbols--open-in-full-rounded] text-slate-400 h-8 w-8 hover:text-slate-200"></button>

                        <button id="@{_btnAudioPlay}" title="Play audio" class="icon-[material-symbols--play-arrow-rounded] text-slate-400 h-10 w-10 hover:text-slate-200"></button>
                        <button id="@{_btnAudioPause}" title="Pause audio" class="hidden icon-[material-symbols--pause-rounded] text-slate-400 h-10 w-10 hover:text-slate-200"></button>
                        
                        <svg id="@{_audioLoadingIndicator}" class="hidden animate-spin text-white h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                </div>
                <div class="flex flex-col overflow-y-scroll" id="@{_scrollContainer}">
                    <!-- video div -->
                    <div id="@{_videoPlayer}" class="hidden md:w-1/3 tall:w-2/3 bg-slate-700 md:mx-auto md:my-4 rounded-md">
                        <!-- video player -->
                        <div id="@{_playerElementContainer}" class="aspect-video w-full">
                            <!-- video data -->
                            <div class="flex justify-between gap-3 p-4">
                                <div>
                                    <p class="text-slate-100 font-sans text-md">@{hlsTitle}</p>
                                    <p class="font-sans text-slate-400 text-xs">
                                        <span>@{hlsEventDate}</span>
                                        <span id="@{_descriptionDivider}" hidden>·</span>
                                        <span>@{hlsDescription}</span>
                                    </p>
                                </div>
                                <div class="flex items-center">
                                    <button id="@{_videoPlayerMinimizeButton}" title="Minimize player" class="icon-[material-symbols--close-fullscreen-rounded] text-slate-300 h-8 w-8 hover:text-slate-100 -mt-0.5">
                                        <span class="sr-only">Minimize player</span>
                                    </button>
                                </div>
                            </div>
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
                    </div>
                    
                    <!-- child controls -->
                    <div id="@{_controlsDiv}" class="w-full flex-1 block p-4"></div>
                </div>
            </div>

            <!-- menu -->
            <div class="fixed bottom-0 left-0 right-0 h-16 bg-slate-900 px-6 flex justify-center">
                <div class="flex justify-between items-center h-full w-96">
                    <button id=@{_btnHome} class="icon-[material-symbols--home-outline-rounded] text-slate-400 hover:text-indigo-300 h-10 w-10"></button>
                    <button id=@{_btnLive} class="icon-[material-symbols--live-tv-outline-rounded] text-slate-400 hover:text-indigo-300 h-10 w-10"></button>
                    <button id=@{_btnUser} class="icon-[material-symbols--person-outline-rounded] text-slate-400 hover:text-indigo-300 h-10 w-10"></button>
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

        this.on('hlsDescription', description => {
            if (description == 'null' || description == '') {
                this.hlsDescription = null;
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

        this._btnAudioPlay.addEventListener('click', () => {
            this._player.play();

            this._btnAudioPlay.classList.add('hidden');
            this._btnAudioPause.classList.remove('hidden');
        });

        this._btnAudioPause.addEventListener('click', () => {
            this._player.pause();

            this._btnAudioPlay.classList.remove('hidden');
            this._btnAudioPause.classList.add('hidden');
        });

        this._btnEnableVideoPlayer.addEventListener('click', () => {
            this.playerMode = 'video';
        });
        
        this._btnEnableAudioPlayer.addEventListener('click', () => {
            this.playerMode = 'audio';
        });
        
        this._videoPlayerMinimizeButton.addEventListener('click', () => {
            this.minimizeVideoPlayer();
        });

        this.on('playerMode', newPlayerMode => {
            if (newPlayerMode == 'audio') {
                this.setPlayerModeButtonToAudio();

                if (this.playerOpen) {
                    this.startAudioPlayer();
                }
                return;
            }

            this.setPlayerModeButtonToVideo();

            if (this.playerOpen) {
                this.startVideoPlayer();
            }
        });

        this.on('audioLoading', loading => {
            if (loading) {
                this._audioLoadingIndicator.classList.remove('hidden');
                this._btnAudioPlay.classList.add('hidden');
                this._btnAudioPause.classList.add('hidden');
            } else {
                this._audioLoadingIndicator.classList.add('hidden');
            }
        });

        this._scrollContainer.addEventListener("scroll", event => {
            if (this.playerMode !== 'video') {
                return;
            }

            if (event.target.scrollTop > 100) {
                this.minimizeVideoPlayer();
            }
        });

        this._miniPlayerVideo.addEventListener('click', e => {
            this.maximizeVideoPlayer();
        });

        this._btnMiniplayerMaximize.addEventListener('click', e => {
            this.maximizeVideoPlayer();
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

    loadEpisode(episode) {
        if (episode.name && this.currentEpisodeId == episode.name) {
            return;
        }

        this.currentEpisodeId = episode.name;

        if (this.playerOpen) {
            this._player.pause();
            this._player.currentTime(0);
        } else {
            this.playerOpen = true;
        }

        this.imgUrl = episode.imgUrl;
        this.hlsUrl = episode.hlsUrl;
        this.hlsTitle = episode.displayName;
        this.hlsDescription = episode.description;

        if (episode.eventDate !== 'null') {
            this.hlsEventDate = this._dateFormatter.format(new Date(episode.eventDate));
        } else {
            this.hlsEventDate = "";
        }

        if (!this.hlsEventDate || !this.hlsDescription) {
            this._descriptionDivider.hidden = true;
        } else {
            this._descriptionDivider.hidden = false;
        }

        if (this.playerMode == 'audio') {
            this.startAudioPlayer();
            return;
        }

        this.startVideoPlayer();
    }

    reloadPlayerUrl(url) {
        document.getElementsByClassName('video-js')[0].prepend(this._playerElement);

        const currentTime = this._player.currentTime();
        const wasPaused = this._player.paused();

        this._player.src({ type: 'application/x-mpegURL', src: url });
        this._player.currentTime(currentTime);

        if (wasPaused) {
            this._btnAudioPlay.classList.remove('hidden');
            this._btnAudioPause.classList.add('hidden');
        } else {
            this._btnAudioPlay.classList.add('hidden');
            this._btnAudioPause.classList.remove('hidden');
            this._player.play();
        }
    }

    startAudioPlayer() {
        this.audioLoading = true;
        this._miniPlayer.classList.remove('hidden');
        this._videoPlayer.classList.add('hidden');

        this._btnMiniplayerMaximize.classList.add('hidden');

        this._miniPlayerImg.classList.remove('hidden');
        this._miniPlayerVideo.classList.add('hidden');

        this.getAudioStream().then(url => {
            this.reloadPlayerUrl(url);
            this.audioLoading = false;
        }).catch(err => console.error(err));
    }

    startVideoPlayer() {
        this.reloadPlayerUrl(this.hlsUrl);

        this._miniPlayer.classList.add('hidden');
        this._videoPlayer.classList.remove('hidden');
    }

    minimizeVideoPlayer() {
        // Show mini player
        this._miniPlayer.classList.remove('hidden');
        this._videoPlayer.classList.add('hidden');

        this._btnMiniplayerMaximize.classList.remove('hidden');

        // Move the video player
        this._miniPlayerImg.classList.add('hidden');
        this._miniPlayerVideo.classList.remove('hidden');

        this._playerElement.classList.add('pointer-events-none');

        this._miniPlayerVideo.append(this._playerElement);

        // Set correct state of mini player
        const wasPaused = this._player.paused();
        if (wasPaused) {
            this._btnAudioPlay.classList.remove('hidden');
            this._btnAudioPause.classList.add('hidden');
        } else {
            this._btnAudioPlay.classList.add('hidden');
            this._btnAudioPause.classList.remove('hidden');
        }
    }

    maximizeVideoPlayer() {
        this._scrollContainer.scrollTop = 0;

        this._miniPlayer.classList.add('hidden');
        this._videoPlayer.classList.remove('hidden');

        this._btnMiniplayerMaximize.classList.add('hidden');

        this._playerElement.classList.remove('pointer-events-none');

        document.getElementsByClassName('video-js')[0].prepend(this._playerElement);
    }

    setPlayerModeButtonToAudio() {
        this._btnEnableAudioPlayer.classList.add("text-slate-200", "bg-slate-500", "shadow");
        this._btnEnableAudioPlayer.classList.remove("text-slate-300", "hover:text-slate-200");
        
        this._btnEnableVideoPlayer.classList.remove("text-slate-200", "bg-slate-500", "shadow");
        this._btnEnableVideoPlayer.classList.add("text-slate-300", "hover:text-slate-200");
    }

    setPlayerModeButtonToVideo() {
        this._btnEnableAudioPlayer.classList.remove("text-slate-200", "bg-slate-500", "shadow");
        this._btnEnableAudioPlayer.classList.add("text-slate-300", "hover:text-slate-200");
        
        this._btnEnableVideoPlayer.classList.add("text-slate-200", "bg-slate-500", "shadow");
        this._btnEnableVideoPlayer.classList.remove("text-slate-300", "hover:text-slate-200");
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

        this._player.landscapeFullscreen({  // player full-screen settings (see https://www.npmjs.com/package/videojs-landscape-fullscreen)
            fullscreen: {
                enterOnRotate: true,
                exitOnRotate: true,
                alwaysInLandscapeMode: true,
                iOS: videojs.browser.IS_SAFARI,
            }
        });

        if (this.hlsUrl) {
            this._player.src({ type: 'application/x-mpegURL', src: this.hlsUrl });
        }
        if (this.imgUrl) {
            this._player.poster(this.imgUrl);
        }

        // Update player source on hlsUrl change
        this.on('hlsUrl', url => {
            this._player.src({ type: 'application/x-mpegURL', src: url });
        });

        // Update player poster on imgUrl change
        this.on('imgUrl', url => {
            this._player.poster(url);
        });
    }

    /**
     * Get audio stream from current video URL
     * @returns Promise
     */
    getAudioStream() {
        return new Promise((resolve, reject) => {
            // Get m3u8 manifest
            fetch(this.hlsUrl).then(res => {
                return res.text();
            }).then(body => {
                // Parse manifest
                this._parser.push(body);
                this._parser.end();
                let manifest = this._parser.manifest;

                // Get currently selected player language
                let selectedTrack = this._player.audioTracks().tracks_.find(t => t.enabled)
                let selectedLang = this.language;
                if (selectedTrack) selectedLang = selectedTrack.language;

                // Get the audio track for the selected player langauge
                if (manifest && manifest.mediaGroups && manifest.mediaGroups.AUDIO) {
                    // Get audio group
                    let aGroup;

                    // First try to get the mono audio group (custom implementation - consider passing group name as env variable).
                    if (manifest.mediaGroups.AUDIO.audio_mono) {
                        aGroup = manifest.mediaGroups.AUDIO.audio_mono

                        // If custom mono audio group does not exist, find the first available audio group.
                    } else {
                        let audioGroups = Object.values(manifest.mediaGroups.AUDIO);
                        if (audioGroups.length > 0) {
                            aGroup = audioGroups[0];
                        }
                    }

                    // Find the matching audio track from the audio group
                    if (aGroup) {
                        let track = Object.values(aGroup).find(t => t.language == selectedLang);
                        if (track) {
                            // Get path by removing the manifest m3u8 file from the hls url path
                            let arr = this.hlsUrl.split('/');
                            arr.length--;
                            let path = arr.join('/');

                            // Return the full uri to the audio track
                            resolve(path + '/' + track.uri);
                        } else {
                            reject('Unable to find audio track');
                        }
                    } else {
                        reject('Unable to find audio track');
                    }
                } else {
                    reject('Unable to find audio track')
                }

            }).catch(err => {
                console.error(err.message);
            });
        });
    }
}
