class section extends ui {
    constructor() {
        super();

        this.displayName = "";
        this.visible = false;
    }

    get html() {
        return `
            <div class="relative flex-grow flex-shrink-0"></div>
            <div id="@{_controlsDiv}" class="flex swiper swiper-slide swiper-navigation-disabled swiper-initialized swiper-horizontal items-start scroll-auto space-x-3 h-full w-full overflow-scroll  scrollbar-hide">
            </div>
           
        `;
    }

    Init() {

    }

    // Override Show to set section name in appFrame on show and hide all other controls
    Show() {
        Object.values(this._parent._controls).forEach(control => {
            control.Hide();
        });
        this._parent.sectionName = this.displayName;
        super.Show();
    }
}