class appFrame extends ui {
    constructor() {
        super();

        this.title = "Title comes here"
        this.sectionName = "";
    }

    get html() {
        return `
        <div class="flex flex-col h-screen bg-slate-800">
            <!-- title -->
            <div class="fixed top-0 left-0 right-0 pl-4 pr-4 h-12  bg-slate-900 flex ">
                <h1 class="text-slate-300 font-sans text-lg flex items-center">
                    <span class="font-semibold">@{title}</span>
                    <span id="@{_titleDivider}" class="ml-2 mr-2 font-light" hidden>|</span>
                    <span class="font-light">@{sectionName}</span>
                </h1>
            </div>

            <!-- contents -->
            <div class="fixed top-12 bottom-16 left-0 right-0 p-4">
                <!-- video player div -->
                <div id="@{_videoPlayerDiv}" class=""></div>

                <!-- child controls -->
                <div id="@{_controlsDiv}" class="overflow-y-scroll flex flex-wrap gap-4"></div>
            </div>

            <!-- menu -->
            <div class="fixed bottom-0 left-0 right-0 h-16 bg-slate-900 pl-6 pr-6 flex justify-center">
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
        // Add video player
        this.SetData({
            videoPlayer: {
                controlType: "videoPlayer",
                parentElement: "_videoPlayerDiv",
                visible: false
            },
        });

        // Title divider
        this.on('sectionName', data => {
            if (data) {
                this._titleDivider.hidden = false;
            } else {
                this._titleDivider.hidden = true;
            }
        });

        // Subscribe to VOD section created event
        this.on('VOD', section => {
            this.setHome();
        });

        // Buttons event handlers
        this._btnHome.addEventListener('click', e => {
            this.setHome();
        });
        this._btnLive.addEventListener('click', e => {
            this.setLive();
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

    setHome() {
        if (this.VOD) {
            this.VOD.Show();
            this.setBtn(this._btnHome);
            this.resetBtn(this._btnLive);
            this.resetBtn(this._btnUser);
        }
    }

    setLive() {
        if (this.Live) {
            this.Live.Show();
            this.setBtn(this._btnLive);
            this.resetBtn(this._btnHome);
            this.resetBtn(this._btnUser);
        }
    }
}