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
controls.on('appFrame', async () => {
    // Auth0 ref: https://auth0.com/docs/quickstart/spa/vanillajs/01-login 
    const client = await auth0.createAuth0Client({
        domain: env.auth0.domain,
        clientId: env.auth0.clientId,
        authorizationParams: {
            // Audience is needed that Auth0 returns a JWT formatted token. This token is passed to the API for verification.
            audience: env.auth0.audience
        },
        cacheLocation: 'localstorage',
        useRefreshTokens: true
    });

    // Set global reference to Auth0 client
    auth0Client = client;

    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")) {
        try {
            await auth0Client.handleRedirectCallback();

            // Clear query string
            window.history.replaceState({}, document.title, "/");
        } catch (err) {
            controls.appFrame.showLoginErrorMessage(err);
        }
    }

    const isAuthenticated = await auth0Client.isAuthenticated();

    // Set login state
    controls.appFrame.isAuthenticated = isAuthenticated;
    
    if (isAuthenticated) {
        // Get the auth token
        const token = await auth0Client.getTokenSilently();
        
        // Connect to Socket.io server
        return initSocket(token);
    }

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


