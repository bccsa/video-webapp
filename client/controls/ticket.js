class ticket extends ui {
    constructor() {
        super();

        this.name = "";
        this.age = "";
    }

    get html() {
        return /*html*/`
            <div class="border rounded border-slate-100 p-4">
                <h3 class="text-slate-200 font-sans text-md">@{name}</h3>
                <div id="@{_controlsDiv}"></div>
            </div>
        `;
    }
    
    Init() {

    }
}