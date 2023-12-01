class event extends ui {
    constructor() {
        super();

        this.displayName = "";
        this.ticketNumber = 0;
    }

    get html() {
        return `
            <div class="mb-4">
                <h3 class="text-slate-200 font-sans text-lg mb-2">@{displayName}</h3>
                <div id="@{_controlsDiv}"></div>
            </div>
        `;
    }
    
    Init() {
             
    }
}