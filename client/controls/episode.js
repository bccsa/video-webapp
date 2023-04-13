class episode extends ui {
    constructor() {
        super();

        this.title = "";
        this.publishDate = "";
        this.description = "";
        this.hlsUrl = "";
        this.imgUrl = "";
    }

    get html() {
        return `
        <div class="max-w-sm min-h-[50pt] bg-slate-700 rounded-lg overflow-hidden flex">
            <img loading="lazy" src="@{imgUrl}" id="@{_image}" class="h-[60pt] w-[100pt] min-w-[100pt] bg-cover"></img>
            <div class="p-2">
                <span class="text-slate-900 font-sans font-bold text-md">@{title}</span>
                <p class="text-slate-400 font-sans text-sm">@{description}</p>
            </div>
        </div>
        
        `;
    }

    Init() {
        let videoPlayer = this._topLevelParent.appFrame.videoPlayer;

        this._image.addEventListener('click', e => {
            videoPlayer.imgUrl = this.imgUrl;
            videoPlayer.hlsUrl = this.hlsUrl;
            videoPlayer.title = this.title;
            videoPlayer.Show();
        });
    }
}