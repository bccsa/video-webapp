class ticketInfo extends ui {
    constructor() {
        super();

        this.title = "";
        this.content = "";

        this.ticketClasses = [
            [
                'bg-blue-300',
                'text-blue-950',
            ],
            [
                'bg-green-300',
                'text-green-950',
            ],
            [
                'bg-purple-300',
                'text-purple-950',
            ],
            [
                'bg-red-300',
                'text-red-950',
            ],
            [
                'bg-cyan-300',
                'text-cyan-950',
            ],
            [
                'bg-orange-300',
                'text-orange-950',
            ],
            [
                'bg-violet-300',
                'text-violet-950',
            ],
            [
                'bg-pink-300',
                'text-pink-950',
            ],
            [
                'bg-yellow-300',
                'text-yellow-950',
            ],
        ];
    }

    get html() {
        return /*html*/`
            <div id="@{_mainDiv}" class="bg-slate-100 rounded mb-4 shadow" >
                <div id="@{_header}" class=" font-sans text-md rounded-t px-3 py-2">@{title}</div>
                <div class="text-slate-700 font-sans px-3 py-2">@{content}</div>
            </div>
        `;
    }
    
    Init() {
        // Set a unique color for this ticket
        const classes = this.ticketClasses[this._parent.ticketNumber];
        if (this._parent.ticketNumber < this.ticketClasses.length - 1) {
            this._parent.ticketNumber += 1;
        } else {
            this._parent.ticketNumber = 0;
        }

        this._header.classList.add(...classes);
    }
}