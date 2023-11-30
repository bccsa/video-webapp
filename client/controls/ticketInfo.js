class ticketInfo extends ui {
    constructor() {
        super();

        this.title = "";
        this.content = "";
    }

    get html() {
        return /*html*/`
            <div id="@{_mainDiv}" class="bg-slate-100 rounded mb-4" >
                <div class="text-slate-900 font-sans text-md">@{title}</div>
                <div class="text-slate-900 font-sans text-md">@{content}</div>
            </div>
        `;
    }
    
    Init() {
        if (this.content === '0' || this.content === '') {
            this._mainDiv.hidden = true;
        }
    }
}