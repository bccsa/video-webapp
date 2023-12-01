class ticketInfo extends ui {
    constructor() {
        super();

        this.title = "";
        this.content = "";
    }

    get html() {
        return /*html*/`
            <div id="@{_mainDiv}" class="bg-slate-100 rounded mb-4 shadow" >
                <div class="bg-slate-300 text-slate-800 font-sans text-md rounded-t px-3 py-2">@{title}</div>
                <div class="text-slate-700 font-sans px-3 py-2">@{content}</div>
            </div>
        `;
    }
    
    Init() {
        if (this.content === '0' || this.content === '') {
            this._mainDiv.hidden = true;
        }
    }
}