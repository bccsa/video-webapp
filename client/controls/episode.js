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
        <div class="max-w-sm min-h-[100pt] bg-slate-700 bg-transparent swiper-slide relative rounded rounded-lg rounded-lx scroll-smooth overflow-hidden grid-cols-1">
            <img loading="lazy" src="@{imgUrl}" id="@{_image}" class="h-200pt] rounded-md rounded w-[300pt] min-w-[250pt] bg-cover flex"></img>
            <div class="p-2">
                <span class="text-slate-200 font-sans font-semibold text-md">@{displayName}</span>
                <p class="text-slate-400 font-sans text-md text-sm">@{description}</p>
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