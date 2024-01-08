class privacyBanner extends ui {
    constructor() {
        super();
        this.bannerText = "";
        this.text = "";
        this.show = false;
    }

    get html() {
        return `
        <div id="@{_banner}" class=" absolute bottom-0 left-0 right-0 z-50 bg-slate-500 p-4 flex flex-col items-center">
            <span>@{bannerText}</span>
            <button type="button" id="@{_btnShowModal}"
            class="m-2 rounded bg-slate-400 hover:bg-slate-300 h-12 w-48 max-w-full text-slate-800 font-bold py-2 px-4">Privacy Policy</button>
            <button type="button" id="@{_btnAccept}"
            class="m-2 rounded bg-green-600 hover:bg-green-500 h-12 w-48 max-w-full text-slate-800 font-bold py-2 px-4">Accept</button>
        </div>

        <!-- Modal -->
        <div id="@{_modal}" style="display: none;" class=" absolute bottom-0 left-0 right-0 top-0 z-50 bg-black/50">
            <div class="absolute left-7 right-7 top-12 bottom-20 bg-slate-100 overflow-hidden rounded-xl flex flex-col">
                <div class=" w-full flex-1 p-3 text-slate-900 overflow-y-auto">@{text}</div>
                <div class=" w-full bg-slate-200 flex flex-col items-center">
                    <button type="button" id="@{_btnHideModal}"
                    class="m-4 rounded bg-slate-400 hover:bg-slate-300 h-12 w-48 max-w-full text-slate-800 font-bold py-2 px-4">Close</button>
                </div>
            </div>
        </div>
        `
    }

    Init() {
        this._btnShowModal.addEventListener('click', () => {
            this._modal.style.display = 'block';
        });

        this._btnHideModal.addEventListener('click', () => {
            this._modal.style.display = 'none';
        });

        this._btnAccept.addEventListener('click', () => {
            // Store the privacy policy to local storage
            localStorage.setItem("privacy policy", this.text);
            this._banner.style.display = 'none';
        });

        this.on('show', show => {
            if (show) {
                this._banner.style.display = '';
                this._properties.show = false;
            }
        }, {immediate: true});
    }
}