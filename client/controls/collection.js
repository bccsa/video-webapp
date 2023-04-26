class collection extends ui {
    constructor() {
        super();

        this.displayName = "";
    }

    get html() {
        return `
                <h3 class="text-slate-200 font-sans text-md mb-2 ">@{displayName}</h3>
                <div class="grid row-span-2"></div>
                <div id="@{_controlsDiv}" class="swiper swiper-navigation-disabled swiper-initialized swiper-horizontal items-start scroll-auto my-5 space-x-3 h-full w-full w-full overflow-x-scroll rounded-lg overflow-x-auto scrollbar-hide touch-pan-x">
                </div>
            
        `;
    }

    Init() {

    }
}