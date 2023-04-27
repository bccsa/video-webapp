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
        <div class="w-fit">
            <img loading="lazy" src="@{imgUrl}" id="@{_image}" class="h-[200pt] rounded-md w-[300pt] bg-cover "></img>
            <div class="p-2">
                <span class="text-slate-200 font-sans font-semibold text-md">@{displayName}</span>
                <p class="text-slate-400 font-sans w-[300pt] text-md text-sm">@{description}</p>
            </div>
        </div>
        
        `;
    }

    Init() {
        let videoPlayer = this._topLevelParent.appFrame.videoPlayer;

        this._image.addEventListener('click', e => {
            videoPlayer.imgUrl = this.imgUrl;
            videoPlayer.hlsUrl = this.hlsUrl;
            videoPlayer.title = this.displayName;
            videoPlayer.description = this.description;
            videoPlayer.Show();
        });
    }
}