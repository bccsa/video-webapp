class ticketInfo extends ui {
    constructor() {
        super();

        this.title = "";
        this.content = "";

        this.ticketClasses = [
            [
                'bg-tuscany-300',
                'text-tuscany-950',
                'bg-tuscany-200',
                'text-tuscany-900',
            ],
            [
                'bg-soya-bean-300',
                'text-soya-bean-950',
                'bg-soya-bean-200',
                'text-soya-bean-900',
            ],
            [
                'bg-porsche-300',
                'text-porsche-950',
                'bg-porsche-200',
                'text-porsche-900',
            ],
            [
                'bg-pewter-300',
                'text-pewter-950',
                'bg-pewter-200',
                'text-pewter-900',
            ],
            [
                'bg-acapulco-300',
                'text-acapulco-950',
                'bg-acapulco-200',
                'text-acapulco-900',
            ],
        ];
    }

    get html() {
        return /*html*/`
            <div class="overflow-hidden">
                <div class="rounded mb-4 shadow relative" >
                    <div id="@{_header}" class="text-center text-md rounded-t px-8 py-2 font-medium">@{title}</div>
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