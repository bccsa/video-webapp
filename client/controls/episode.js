class episode extends ui {
    constructor() {
        super();

        this.displayName = "";
        this.publishDate = "";
        this.description = "";
        this.hlsUrl = "";
        this.imgUrl = "";
    }

    get html() {
        return `
        <div class="w-36 md:w-44 lg:w-50 xl:w-60">
            <img loading="lazy" src="@{imgUrl}" id="@{_image}" class="aspect-video rounded-md bg-cover "></img>
            <div class="pt-0 pb-2 text-xs md:text-sm">
                <p class="text-slate-400 font-sans text-md">@{displayName}</p>
            </div>
        </div>
        `;
    }

    Init() {
        let appFrame = this._topLevelParent.appFrame;

        this._image.addEventListener('click', e => {
            appFrame.imgUrl = this.imgUrl;
            appFrame.hlsUrl = this.hlsUrl;
            appFrame.hlsTitle = this.displayName;
            appFrame.hlsDescription = this.description;
            appFrame.ShowPlayer();
        });
    }
}