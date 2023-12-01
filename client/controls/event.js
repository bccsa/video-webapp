class event extends ui {
    constructor() {
        super();

        this.displayName = "";
        this.startDate = "";
        this.endDate = "";

        this.ticketNumber = 0;

        this._dateFormatter = new Intl.DateTimeFormat('en-KE', { dateStyle: 'long' });
    }

    get html() {
        return `
            <div class="mb-4">
                <h3 class="text-slate-200 font-sans text-lg mb-1">@{displayName}</h3>
                <p class="text-slate-300 mb-3">
                    <span>@{startDate}</span>
                    -
                    <span>@{endDate}</span>
                </p>
                <div id="@{_controlsDiv}"></div>
            </div>
        `;
    }
    
    Init() {
        this.startDate = this._dateFormatter.format(new Date(this.startDate));
        this.endDate = this._dateFormatter.format(new Date(this.endDate));
    }
}