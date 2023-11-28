class ticket extends ui {
    constructor() {
        super();

        this.Name = "";
    }

    get html() {
        return `
            <div class="border rounded border-slate-100 p-4">
                <h3 class="text-slate-200 font-sans text-md">@{Name}</h3>
            </div>
        `;
    }
    
    Init() {
             
    }
}