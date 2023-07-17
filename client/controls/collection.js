class collection extends ui {
    constructor() {
        super();

        this.displayName = "";

    }

    get html() {
        return `
            <div class="relative w-full select-none ">
                <h3 class="text-slate-200 font-sans text-md mb-2">@{displayName}</h3>
                <div id="@{_carousel}" class="w-full overflow-x-scroll scrollbar-hide touch-pan-x touch-pan-y">
                    <div id="@{_controlsDiv}" class="space-x-3 grid grid-flow-col auto-cols-max">
                        
                    </div>
                </div>
                <div class="absolute hidden md:block top-13 left-8 bottom-16 rotate-180">
                    <img id="@{_left}" src="../img/spin.svg" class="h-11 w-11">
                </div>
                <div class="absolute top-13 hidden md:block right-8 bottom-16">
                    <img id="@{_right}" src="../img/spin.svg" class="h-11 w-11">
                </div>
            </div>
        `;
    }
    
    Init() {

        this._left.addEventListener('click', e => {
            this._carousel.scrollLeft -= 100
        })
        this._right.addEventListener('click', e => {
            this._carousel.scrollLeft += 100
        })

        new ResizeObserver(() => {
            if (this._carousel.offsetWidth < this._controlsDiv.scrollWidth && window.innerHeight < window.innerWidth){
                this._left.style.display = 'inherit';
                this._right.style.display = 'inherit';
                // console.log(this._carousel);
            } else {
                this._left.style.display = 'none';
                this._right.style.display = 'none';
            }
        }).observe(this._controlsDiv);
             
    }

    
    
}