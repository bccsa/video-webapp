class section extends ui {
    constructor() {
        super();

        this.displayName = "";
        this.visible = false;
        this.cssClass = "w-full";
    }

    get html() {
        return `
            <div id="@{_controlsDiv}" class="w-full">
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