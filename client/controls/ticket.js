class ticket extends ui {
    constructor() {
        super();

        this.name = "";
        this.age = "";

        this.isCollapsed = true;

        this.ticketNumber = 0;
    }

    get html() {
        return /*html*/`
            <div class="rounded bg-slate-200 mb-4 shadow">
                <div id="@{_header}" class="p-4 rounded flex items-center justify-between cursor-pointer bg-slate-300 text-slate-900" title="Collapse ticket">
                    <h3 class="font-sans text-md font-semibold flex items-center gap-2">
                        <span class="icon-[material-symbols--confirmation-number-outline-rounded] w-6 h-6 text-slate-700"></span>
                        <span>@{name}</span>
                    </h3>

                    <span id="@{_collapseIcon}" class="icon-[material-symbols--expand-less-rounded] w-8 h-8 hidden"></span>
                    <span id="@{_expandIcon}" class="icon-[material-symbols--expand-more-rounded] w-8 h-8"></span>
                </div>
                <div class="p-4" id="@{_controlsDiv}" hidden></div>
            </div>
        `;
    }
    
    Init() {
        // Open up this item if it's the only ticket in the event
        if (Object.keys(this._parent._controls).length == 1) {
            this.expand();
        }

        this._header.addEventListener('click', () => {
            if (this.isCollapsed) {
                this.expand();
            } else {
                this.collapse();
            }            
        });
    }

    collapse() {
        this.isCollapsed = true;
        this._controlsDiv.hidden = true;
        this._collapseIcon.classList.toggle('hidden');
        this._expandIcon.classList.toggle('hidden');
        this._header.classList.add('rounded');
        this._header.classList.remove('rounded-t');
    }

    expand() {
        this.isCollapsed = false;
        this._controlsDiv.hidden = false;
        this._collapseIcon.classList.toggle('hidden');
        this._expandIcon.classList.toggle('hidden');
        this._header.classList.remove('rounded');
        this._header.classList.add('rounded-t');
    }
}