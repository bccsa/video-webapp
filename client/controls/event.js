class event extends ui {
    constructor() {
        super();

        this.displayName = "";

    }

    get html() {
        return `
            <div>
                <h3 class="text-slate-200 font-sans text-md mb-2">@{displayName}</h3>
                <div id="@{_controlsDiv}"></div>
            </div>
        `;
    }
    
    Init() {
             
    }
}