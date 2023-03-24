class appFrame extends ui {
    constructor() {
        super();

        this.title = "Title comes here"
        this.description = "Description comes here. This is a description. Read it carefully"
    }

    get html() {
        return `
        <!-- menu -->
        <div class="fixed bottom-0 left-0 right-0 h-14 bg-slate-900">

        </div>

        <!-- Contents -->
        <div class="fixed bottom-14 left-0 right-0 top-0 bg-slate-800">
            <!-- video section -->
            <div id="@{_videoSection}" class="hidden">
                <!-- title -->
                <div class="w-full p-2">
                    <h1 class="text-slate-400 font-sans text-lg text-center" >@{title}</h1>
                </div>

                <!-- video div -->
                <div class="aspect-video mr-2 ml-2 bg-black rounded-lg">

                </div>

                <!-- description -->
                <div class="w-full p-2">
                    <p class="text-slate-400 font-sans text-sm" >@{description}</p>
                </div>
            </div>
        </div>
        `;
    }

    Init() {

    }

    ShowVideo() {
        this._videoSection.style.display = "block";
    }

    HideVideo() {
        this._videoSection.style.display = "none";
    }
}