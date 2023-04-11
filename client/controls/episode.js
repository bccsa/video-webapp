class episode extends ui {
    constructor() {
        super();

        this.title = "";
        this.publishDate = "";
        this.description = "";
        this.hlsUrl = "";
        this.imageUrl = "";
    }

    get html() {
        return `
        <div class="max-w-sm min-h-[50pt] bg-slate-700 rounded-lg overflow-hidden flex">
            <img loading="lazy" src="@{imageUrl}" id="@{_image}" class="h-[60pt] w-[100pt] min-w-[100pt] bg-cover"></img>
            <div class="p-2">
                <span class="text-slate-900 font-sans font-bold text-md">@{title}</span>
                <p class="text-slate-400 font-sans text-sm">@{description}</p>
            </div>
        </div>
        
        `;
    }

    Init() {
        this._image.addEventListener('click', e => {
            this._parent.videoPlayer.imageUrl = this.imageUrl;
            this._parent.videoPlayer.hlsUrl = this.hlsUrl;
            this._parent.videoPlayer.title = this.title;
            this._parent.videoPlayer.Show();
        });
    }
}