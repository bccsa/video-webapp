class appFrame extends ui {
    constructor() {
        super();

        this.title = "Title comes here"
        this.description = "Description comes here. Description comes here. Description comes here. Description comes here. Description comes here. Description comes here.";

    }

    get html() {
        return `
        <div class="flex flex-col h-screen bg-slate-800">
            <!-- title -->
            <div class="w-full pl-4 pr-4 h-12  bg-slate-900 flex ">
                <span class="text-slate-400 font-sans text-lg flex items-center">@{title}</span>
            </div>

            <!-- contents -->
            <div class="fixed top-12 bottom-12 left-0 right-0 p-4">
                <!-- video player div -->
                <div id="@{_videoPlayerDiv}" class=""></div>

                <!-- child controls -->
                <!--div id="@{_controlsDiv}" class=""></div-->
            </div>

            <!-- menu -->
            <div class="fixed bottom-0 left-0 right-0 h-14 bg-slate-900">

            </div>
        </div>
        `;
    }

    Init() {
        // // Add video player
        this.SetData({
            videoPlayer: {
                controlType: "videoPlayer",
                parentElement: "_videoPlayerDiv",
                hlsUrl: "https://za-scc-stream.bccsa.org/toplevelmanifest.m3u8",
                imageUrl: "img/live-poster.jpg"
            }
        })
    }
}