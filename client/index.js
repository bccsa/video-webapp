// Create modular-ui top level control
var controls = new uiTopLevelContainer('controls', 'controls');

// Get env settings
fetch('env.json')
    .then(response => response.json())
    .then(json => {
        let env = json;

        // Create appFrame
        controls.SetData({
            appFrame: {
                controlType: "appFrame",
                title: "Title"
            }
        });

        // Wait for appFrame to be initialized
        controls.on('appFrame', appFrame => {
            // Connect to Socket.io server
            if (env && env.socketUrl)
            {
                var socket = io(env.socketUrl);
            }
            

            // Listen for data events, and forward to modular-ui controls
            socket.on('data', data => {
                appFrame.SetData(data);
            })
        });
    });

