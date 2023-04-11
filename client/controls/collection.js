class collection extends ui {
    constructor() {
        super();

        this.displayName = "";
    }

    get html() {
        return `
            <h3 class="text-slate-400 font-sans text-md">@{displayName}</h3>
            <div id="@{_controlsDiv}" class="w-full overflow-x-scroll scrollbar-hide touch-pan-y">
            </div>
        `;
    }

    Init() {

    }
}