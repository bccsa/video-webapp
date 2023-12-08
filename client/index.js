// Create modular-ui top level control
const controls = new uiTopLevelContainer('controls', 'controls');
let auth0Client;
let env;
let socket;

// Get env settings
fetch('env')
    .then(response => response.json())
    .then(json => {
        env = json;

        // Create appFrame
        controls.SetData({
            appFrame: {
                controlType: "appFrame",
                title: env.app.title,
                User: {
                    controlType: "section",
                    displayName: "User",
                    login: {
                        controlType: "userLogin",
                    }
                }
            }
        });
    });

// Wait for appFrame to be initialized
controls.on('appFrame', () => {
    // Auth0 ref: https://auth0.com/docs/quickstart/spa/vanillajs/01-login 
    auth0.createAuth0Client({
        domain: env.auth0.domain,
        clientId: env.auth0.clientId,
        authorizationParams: {
            // Audience is needed that Auth0 returns a JWT formatted token. This token is passed to the API for verification.
            audience: env.auth0.audience
        },
        cacheLocation: 'localstorage',
        useRefreshTokens: true
    }).then(res => {
        // Set global reference to Auth0 client
        auth0Client = res;

        // Handle authentication callbacks (via query string parameters)
        auth0Client.isAuthenticated().then(async auth => {
            // Set login state
            controls.appFrame.isAuthenticated = auth;

            // Only parse auth query string if not already authenticated
            const query = window.location.search;
            if (!controls.appFrame.isAuthenticated && query.includes("code=") && query.includes("state=")) {
                await auth0Client.handleRedirectCallback().then(async res => {
                    window.history.replaceState({}, document.title, "/");

                    // Set login state after login
                    await auth0Client.isAuthenticated().then(a => {
                        controls.appFrame.isAuthenticated = a;
                    });
                }).catch(err => {
                    controls.appFrame.showLoginErrorMessage("Error handling callback: " + err);
                });
            } else if (auth && query.includes("code=") && query.includes("state=")) {
                window.history.replaceState({}, document.title, "/");//
            }

            if (controls.appFrame.isAuthenticated) {
                // Get the auth token
                auth0Client.getTokenSilently().then(token => {
                    // Connect to Socket.io server
                    initSocket(token);
                }).catch(err => {
                    controls.appFrame.showLoginErrorMessage("Error getting token: " + err);
                });
            } else {
                // Keep track of selected location for redirection after user login
                localStorage.setItem("pathname", window.location.pathname);

                // Show user page (with login)
                if (controls.appFrame.User) {
                    controls.appFrame.ShowUser();
                } else {
                    controls.appFrame.one('User', () => {
                        controls.appFrame.ShowUser();
                    });
                }
            }
        });
    });
});

/**
 * Start the Socket.io connection
 * @param {String} token 
 */
function initSocket(token) {
    // Connect to Socket.io server
    socket = io(env.app.socketUrl, {
        auth: {
            token: token
        }
    });

    // Listen for data events, and forward to modular-ui controls
    socket.on('data', data => {
        controls.appFrame.SetData(data);

        if (data.noAccess) {
            controls.appFrame.showNoAccessMessage();
        }
    });
}


