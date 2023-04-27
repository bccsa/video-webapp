class collection extends ui {
    constructor() {
        super();

        this.displayName = "";
    }

    get html() {
        return `
            <div class="w-full mb-2">
                <h3 class="text-slate-200 font-sans text-md mb-2 ">@{displayName}</h3>
                <div class="w-full scroll-auto overflow-x-scroll scrollbar-hide touch-pan-x">
                    <div id="@{_controlsDiv}" class="space-x-3 grid grid-flow-col auto-cols-max">
                    </div>
                </div>
                
            </div>
        `;
    }

    Init() {

    }
}