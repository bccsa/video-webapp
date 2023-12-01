class ticket extends ui {
    constructor() {
        super();

        this.name = "";
        this.age = "";

        this.isCollapsed = false;

        this.ticketClasses = [
            [
                'bg-blue-300',
                'text-blue-800',
                'text-blue-900',
            ],
            [
                'bg-green-300',
                'text-green-800',
                'text-green-900',
            ],
            [
                'bg-purple-300',
                'text-purple-800',
                'text-purple-900',
            ],
            [
                'bg-red-300',
                'text-red-800',
                'text-red-900',
            ],
            [
                'bg-cyan-300',
                'text-cyan-800',
                'text-cyan-900',
            ],
            [
                'bg-orange-300',
                'text-orange-800',
                'text-orange-900',
            ],
            [
                'bg-violet-300',
                'text-violet-800',
                'text-violet-900',
            ],
            [
                'bg-pink-300',
                'text-pink-800',
                'text-pink-900',
            ],
            [
                'bg-yellow-300',
                'text-yellow-800',
                'text-yellow-900',
            ],
        ]
    }

    get html() {
        return /*html*/`
            <div class="rounded bg-slate-200 mb-4 shadow">
                <div id="@{_header}" class="p-4 rounded-t flex items-center justify-between cursor-pointer" title="Collapse ticket">
                    <h3 class="font-sans text-md font-semibold flex items-center gap-2">
                        <span id="@{_icon}" class="icon-[material-symbols--confirmation-number-outline-rounded] w-6 h-6"></span>
                        <span id="@{_name}">@{name}</span>
                    </h3>

                    <span id="@{_collapseIcon}" class="icon-[material-symbols--expand-less-rounded] w-8 h-8"></span>
                    <span id="@{_expandIcon}" class="icon-[material-symbols--expand-more-rounded] w-8 h-8 hidden"></span>
                </div>
                <div class="p-4" id="@{_controlsDiv}"></div>
            </div>
        `;
    }
    
    Init() {
        const classes = this.ticketClasses[this._parent.ticketNumber];
        if (this._parent.ticketNumber < this.ticketClasses.length - 1) {
            this._parent.ticketNumber += 1;
        } else {
            this._parent.ticketNumber = 0;
        }

        this._header.classList.add(classes[0]);
        this._icon.classList.add(classes[1]);
        this._collapseIcon.classList.add(classes[1]);
        this._expandIcon.classList.add(classes[1]);
        this._name.classList.add(classes[2]);


        this._header.addEventListener('click', () => {
            if (this.isCollapsed) {
                this.isCollapsed = false;
                this._controlsDiv.hidden = false;
                this._collapseIcon.classList.toggle('hidden');
                this._expandIcon.classList.toggle('hidden');
                this._header.classList.remove('rounded');
                this._header.classList.add('rounded-t');
            } else {
                this.isCollapsed = true;
                this._controlsDiv.hidden = true;
                this._collapseIcon.classList.toggle('hidden');
                this._expandIcon.classList.toggle('hidden');
                this._header.classList.add('rounded');
                this._header.classList.remove('rounded-t');
            }            
        })
    }
}