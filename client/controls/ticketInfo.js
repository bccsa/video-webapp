class ticketInfo extends ui {
    constructor() {
        super();

        this.title = "";
        this.content = "";

        this.ticketClasses = [
            [
                'bg-blue-300',
                'text-blue-950',
                'bg-blue-200',
                'text-blue-900',
            ],
            [
                'bg-green-300',
                'text-green-950',
                'bg-green-200',
                'text-green-900',
            ],
            [
                'bg-purple-300',
                'text-purple-950',
                'bg-purple-200',
                'text-purple-900',
            ],
            [
                'bg-red-300',
                'text-red-950',
                'bg-red-200',
                'text-red-900',
            ],
            [
                'bg-cyan-300',
                'text-cyan-950',
                'bg-cyan-200',
                'text-cyan-900',
            ],
            [
                'bg-orange-300',
                'text-orange-950',
                'bg-orange-200',
                'text-orange-900',
            ],
            [
                'bg-violet-300',
                'text-violet-950',
                'bg-violet-200',
                'text-violet-900',
            ],
            [
                'bg-pink-300',
                'text-pink-950',
                'bg-pink-200',
                'text-pink-900',
            ],
            [
                'bg-yellow-300',
                'text-yellow-950',
                'bg-yellow-200',
                'text-yellow-900',
            ],
        ];
    }

    get html() {
        return /*html*/`
            <div class="overflow-hidden">
                <div id="@{_mainDiv}" class="rounded mb-4 shadow relative" >
                    <div id="@{_header}" class="text-center text-md rounded-t px-8 py-2">@{title}</div>
                    <div id="@{_content}" class="text-center px-8 py-2 rounded-b">@{content}</div>

                    <div class="absolute inset-y-0 -left-4 flex items-center justify-center">
                        <div class="h-8 w-8 rounded-full bg-slate-200 shadow-inner"></div>
                    </div>
                    <div class="absolute inset-y-0 -right-4 flex items-center justify-center">
                        <div class="h-8 w-8 rounded-full bg-slate-200 shadow-inner"></div>
                    </div>
                </div>
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

        this._header.classList.add(classes[0], classes[1]);
        this._content.classList.add(classes[2], classes[3]);
    }
}