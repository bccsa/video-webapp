class collection extends ui {
    constructor() {
        super();

        this.displayName = "";
    }

    get html() {
        return `
            <div class="w-full select-none">
                <h3 class="text-slate-200 font-sans text-md mb-2">@{displayName}</h3>
                <div class="w-full overflow-x-scroll scrollbar-hide touch-pan-x touch-pan-y">
                    <div id="@{_controlsDiv}" class="space-x-3 grid grid-flow-col auto-cols-max">
                    </div>
                </div>
            </div>
        `;
    }

    Init() {

    }
}