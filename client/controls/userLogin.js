class userLogin extends ui {
    constructor() {
        super();
        this.cssClass = "w-full"
        this.userName = '';
        this.userPicture = '';
        this.isAuthenticated = false; // Set from index.js Auth0 logic
    }

    get html() {
        return `
        <div class="flex flex-col items-center w-full">
            <div id="@{_userDetails}" style="display: none;" class="">
                <img src="@{userPicture}" class="m-auto mb-2 rounded-full w-20" onerror="this.style.display='none'"></img>
                <p class="text-slate-100">Welcome <span>@{userName}</span>!</p>
            </div>
            <button id="@{_login}" type="button" class="mt-2 mb-2 rounded bg-slate-400 hover:bg-slate-300 h-12 w-48 max-w-full text-slate-800 font-bold py-2 px-4">
                <div class="w-max inline-flex items-center align-middle">
                    <div class="icon-[material-symbols--login-rounded] h-6 w-6 mr-2"></div>
                    <span class="font-sans">Login</span>
                </div>
            </button>
            <button id="@{_logout}" type="button" style="display: none;" class="mt-2 mb-2 rounded bg-slate-400 hover:bg-slate-300 h-12 w-48 max-w-full text-slate-800 font-bold py-2 px-4">
                <div class="w-max inline-flex items-center align-middle">
                    <div class="icon-[material-symbols--logout-rounded] h-6 w-6 mr-2"></div>
                    <span class="font-sans">Logout</span>
                </div>
            </button>
            <button id="@{_privacyPolicy}" type="button" class=" mt-2 mb-2 rounded bg-slate-400 hover:bg-slate-300 h-12 w-48 max-w-full text-slate-800 font-bold py-2 px-4">
                <div class="w-max inline-flex items-center align-middle">
                    <div class="icon-[material-symbols--privacy-tip-outline-rounded] h-6 w-6 mr-2"></div>
                    <span class="font-sans">Privacy policy</span>
                </div>
            </button>
        </div>
        <div id="@{_controlsDiv}"></div>
        `;
    }

    Init() {
        let appFrame = this._topLevelParent.appFrame;

        this.showLogin(appFrame.isAuthenticated);
        this.getUser(appFrame.isAuthenticated);

        appFrame.on('isAuthenticated', auth => {
            this.showLogin(auth);
            this.getUser(auth);
        });

        this._login.addEventListener('click', e => {
            auth0Client.loginWithRedirect({
                authorizationParams: {
                    redirect_uri: window.location.origin
                }
            });
        });

        this._logout.addEventListener('click', e => {
            auth0Client.logout({
                logoutParams: {
                    returnTo: window.location.origin
                }
            });
        });

        // Add privacy banner
        let bannerTxt;
        let savedPolicy = localStorage.getItem("privacy policy");
        if (!savedPolicy) {
            bannerTxt = 'By using this website / app you agree to our privacy policy.';
        } else if (savedPolicy != env.app.privacyPolicy) {
            bannerTxt = 'We have updated our privacy policy. By using this website / app you agree to our privacy policy.';
        }

        if (bannerTxt) {
            this._topLevelParent.Set({
                privacyBanner: {
                    controlType: 'privacyBanner',
                    text: env.app.privacyPolicy,
                    bannerText: bannerTxt,
                }
            });
        }

        this._privacyPolicy.addEventListener('click', e => {
            this._topLevelParent.Set({
                privacyBanner: {
                    controlType: 'privacyBanner',
                    text: env.app.privacyPolicy,
                    bannerText: "By using this website / app you agree to our privacy policy.",
                    show: true,
                }
            });
        })
    }

    /**
     * Show login/logout
     * @param {*} login - if true, show logout, else show login
     */
    showLogin(login) {
        if (login) {
            this._login.style.display = "none";
            this._userDetails.style.display = "block";
            this._logout.style.display = "block";
        } else {
            this._logout.style.display = "none";
            this._login.style.display = "block";
            this._userDetails.style.display = "none";
        }
    }

    /**
     * Get user name from Auth0 client
     * @param {Boolean} auth - authentication status
     */
    getUser(auth) {
        if (auth) {
            // Get the username
            auth0Client.getUser().then(data => {
                if (data && data.name) {
                    this.userName = data.name;
                    this.userPicture = data.picture;
                }
            });
        } else {
            this.userName = "";
            this.userPicture = "";
        }
    }
}