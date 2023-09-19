class episode extends ui {
    constructor() {
        super();

        this.displayName = "";
        this.eventDate = "";
        this.description = "";
        this.hlsUrl = "";
        this.imgUrl = "";
        this.analytics_type = ""
    }

    get html() {
        return `
        <div class="w-36 md:w-44 lg:w-50 xl:w-60 select-none">
            <img loading="lazy" src="@{imgUrl}" id="@{_image}" class="aspect-video rounded-md bg-cover"></img>
            <div class="pt-0 pb-2 text-xs md:text-sm">
                <p class="text-slate-400 font-sans text-md">@{displayName}</p>
            </div>
            <div id="@{_controlsDiv}"></div>
        </div>
        `;
    }

    Init() {
        let appFrame = this._topLevelParent.appFrame;

        this._image.addEventListener('click', e => {
            appFrame.loadEpisode(this);

            // update instance of analytics
            if (env.app.analyticsUrl) {
                this.Set({
                    analytics: {
                        controlType: "analytics",
                        type: this.analytics_type,
                        title: this.description,
                        analyticsUrl: env.app.analyticsUrl
                    }
                })
                if (this.analytics)
                this.analytics.Init();
            }
        });
    }
}