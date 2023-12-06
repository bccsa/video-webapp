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
                <img src="@{userPicture}" class="m-auto mb-2 rounded-full w-20" onerror="this.style.display='none'" />
                <p class="text-slate-100">Welcome <span>@{userName}</span>!</p>
            </div>
            <button id="@{_loginBcc}" type="button" class="mt-2 mb-2 rounded bg-slate-400 hover:bg-slate-300 h-12 w-48 max-w-full text-slate-800 font-bold py-2 px-4">
                <div class="w-max inline-flex items-center align-middle">
                    <svg class="h-6 w-6 mr-2" viewBox="0 0 136 136" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M135.64 67.8247C135.64 105.283 105.273 135.649 67.8151 135.649C30.357 135.649 0 105.273 0 67.8247C0 30.3761 30.3665 0 67.8247 0C105.283 0 135.649 30.3665 135.649 67.8247H135.64ZM70.0163 20.3464H65.6139C61.5848 20.3464 58.2831 23.6482 58.2831 27.6773V32.0796C58.2831 36.1087 61.5848 39.4105 65.6139 39.4105H70.0163C74.0454 39.4105 77.3471 36.1087 77.3471 32.0796V27.6773C77.3471 23.6482 74.0454 20.3464 70.0163 20.3464ZM92.5639 42.961H88.1616C84.1325 42.961 80.8307 46.2628 80.8307 50.2919V54.6942C80.8307 58.7233 84.1325 62.0251 88.1616 62.0251H92.5639C96.593 62.0251 99.8947 58.7233 99.8947 54.6942V50.2919C99.8947 46.2628 96.593 42.961 92.5639 42.961ZM70.0163 96.2389H65.6139C61.5848 96.2389 58.2831 99.5406 58.2831 103.57V107.972C58.2831 112.001 61.5848 115.303 65.6139 115.303H70.0163C74.0454 115.303 77.3471 112.001 77.3471 107.972V103.57C77.3471 99.5406 74.0454 96.2389 70.0163 96.2389ZM77.3471 54.6272V50.2249C77.3471 46.1958 74.0454 42.8941 70.0163 42.8941H43.0663C39.0372 42.8941 35.7355 46.1958 35.7355 50.2249V54.6272C35.7355 58.6563 39.0372 61.9581 43.0663 61.9581H58.2831V83.2137V85.4149C58.2831 89.444 61.5848 92.7457 65.6139 92.7457H70.0163C74.0454 92.7457 77.3471 89.444 77.3471 85.4149V81.0125V54.6272Z" fill="#004E48"/>
                    </svg>

                    <span class="font-sans">Login with BCC</span>
                </div>
            </button>
            <button id="@{_loginGuest}" type="button" class="mt-2 mb-2 rounded border-2 border-slate-400 hover:bg-slate-700 h-12 w-48 max-w-full text-slate-200 font-bold py-2 px-4">
                <div class="w-max inline-flex items-center align-middle">
                    <div class="icon-[material-symbols--login-rounded] h-6 w-6 mr-2"></div>
                    <span class="font-sans">Login as guest</span>
                </div>
            </button>
            <button id="@{_logout}" type="button" style="display: none;" class="mt-2 mb-2 rounded bg-slate-400 hover:bg-slate-300 h-12 w-48 max-w-full text-slate-800 font-bold py-2 px-4">
                <div class="w-max inline-flex items-center align-middle">
                    <div class="icon-[material-symbols--logout-rounded] h-6 w-6 mr-2"></div>
                    <span class="font-sans">Logout</span>
                </div>
            </button>
            <button id="@{_privacyPolicy}" type="button" class="mt-8 mb-2 max-w-full text-slate-200 hover:text-slate-100 underline font-bold py-2 px-4">
                Privacy policy
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

        this._loginBcc.addEventListener('click', e => {
            auth0Client.loginWithRedirect({
                authorizationParams: {
                    connection: "bcc-login",
                    redirect_uri: window.location.origin
                }
            });
        });

        this._loginGuest.addEventListener('click', e => {
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
            this._loginBcc.style.display = "none";
            this._loginGuest.style.display = "none";
            this._userDetails.style.display = "block";
            this._logout.style.display = "block";
        } else {
            this._logout.style.display = "none";
            this._loginBcc.style.display = "block";
            this._loginGuest.style.display = "block";
            this._userDetails.style.display = "none";
        }
    }

    /**
     * Get user name from Auth0 client
     * @param {Boolean} auth - authentication status
     */
    getUser(auth) {
        if (auth && auth0Client) {
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