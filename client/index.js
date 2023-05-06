// Create modular-ui top level control
var controls = new uiTopLevelContainer('controls', 'controls');
var auth0Client;
var env;
var socket;

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
controls.on('appFrame', appFrame => {
    // Auth0 ref: https://auth0.com/docs/quickstart/spa/vanillajs/01-login
    auth0.createAuth0Client({
        domain: env.auth0.domain,
        clientId: env.auth0.clientId,
    }).then(res => {
        // Set global reference to Auth0 client
        auth0Client = res;

        // Handle authentication callbacks (via query string parameters)
        auth0Client.isAuthenticated().then(auth => {
            // Set login state
            controls.appFrame.isAuthenticated = auth;

            // Only parse if not already authenticated
            const query = window.location.search;
            if (!auth && query.includes("code=") && query.includes("state=")) {
                auth0Client.handleRedirectCallback().then(res => {
                    window.history.replaceState({}, document.title, "/");

                    // Set login state after login
                    auth0Client.isAuthenticated().then(a => {
                        controls.appFrame.isAuthenticated = a;
                    });
                }).catch(err => {
                    // Trigger logout if failed to login
                    auth0Client.logout({
                        logoutParams: {
                            returnTo: window.location.origin
                        }
                    });
                });
            } else if (auth && query.includes("code=") && query.includes("state=")) {
                window.history.replaceState({}, document.title, "/");
            }
        });
    });

    // Connect to Socket.io server
    socket = io(env.app.socketUrl);

    // Listen for data events, and forward to modular-ui controls
    socket.on('data', data => {
        appFrame.SetData(data);
    });
});


