class collection extends ui {
    constructor() {
        super();

        this.displayName = "";
    }

    get html() {
        return `
            <h3 class="text-slate-200 font-sans text-md mb-2">@{displayName}</h3>
            <div id="@{_controlsDiv}" class="w-full overflow-x-scroll scrollbar-hide touch-pan-y">
            </div>
        `;
    }

    Init() {

    }
}