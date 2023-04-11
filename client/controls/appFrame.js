class appFrame extends ui {
    constructor() {
        super();

        this.title = "Title comes here"
        this.sectionName = "";
        this.description = "Description comes here. Description comes here. Description comes here. Description comes here. Description comes here. Description comes here.";

    }

    get html() {
        return `
        <div class="flex flex-col h-screen bg-slate-800">
            <!-- title -->
            <div class="fixed top-0 left-0 right-0 pl-4 pr-4 h-12  bg-slate-900 flex ">
                <h1 class="text-slate-400 font-sans text-lg flex items-center">
                    <span>@{title}</span>
                    <span id="@{_titleDivider}" class="ml-2 mr-2" hidden>|</span>
                    <span>@{sectionName}</span>
                </h1>
            </div>

            <!-- contents -->
            <div class="fixed top-12 bottom-12 left-0 right-0 p-4">
                <!-- video player div -->
                <div id="@{_videoPlayerDiv}" class=""></div>

                <!-- child controls -->
                <div id="@{_controlsDiv}" class="overflow-y-scroll flex flex-wrap gap-4"></div>
            </div>

            <!-- menu -->
            <div class="fixed bottom-0 left-0 right-0 h-20 bg-slate-900">
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
        })

        // Title divider
        this.on('sectionName', data => {
            if (data) {
                this._titleDivider.hidden = false;
            } else {
                this._titleDivider.hidden = true;
            }
        });
    }
}