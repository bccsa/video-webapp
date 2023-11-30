class ticketInfo extends ui {
    constructor() {
        super();

        this.title = "";
        this.content = "";
    }

    get html() {
        return /*html*/`
            <div id="@{_mainDiv}">
                <div class="text-slate-200 font-sans text-md">@{title}</div>
                <div class="text-slate-200 font-sans text-md">@{content}</div>
            </div>
        `;
    }
    
    Init() {
        if (this.content === '0') {
            this._mainDiv.hidden = true;
        }
    }
}