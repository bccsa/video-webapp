class event extends ui {
    constructor() {
        super();

        this.displayName = "";
        this.startDate = "";
        this.endDate = "";
        this.noTickets = "";

        this._dateFormatter = new Intl.DateTimeFormat('en-KE', { dateStyle: 'long', timeZone: 'Africa/Johannesburg' });
    }

    get html() {
        return `
            <div class="mb-6">
                <h3 class="text-slate-200 font-sans text-lg mb-1">@{displayName}</h3>
                <p id="@{_dates}" class="text-slate-300 mb-3">
                    <span>@{startDate}</span>
                    -
                    <span>@{endDate}</span>
                </p>
                <div id="@{_controlsDiv}"></div>
                <div id="@{_noTickets}" hidden class="text-slate-400">No tickets found</div>
            </div>
        `;
    }
    
    Init() {
        if (this.startDate == 'null') {
            this._dates.classList.add('hidden');
        } else {
            this.startDate = this._dateFormatter.format(new Date(this.startDate));
            this.endDate = this._dateFormatter.format(new Date(this.endDate));
        }

        if (this.noTickets) {
            this._noTickets.hidden = false;
        }
    }
}