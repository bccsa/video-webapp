// Create modular-ui top level control
var controls = new uiTopLevelContainer('controls', 'controls');

controls.SetData({
    appFrame: {
        controlType: "appFrame",
        title: "Title",
        // tile1: {
        //     controlType: "videoTile",
        //     title: "Live",
        //     description: "BCC Africa Online live stream",
        //     publishDate: "2023-03-26",
        //     hlsUrl: "",
        //     imageUrl: "img/vod-test.jpg",
        // },
        // tile2: {
        //     controlType: "videoTile",
        //     title: "Live PiP",
        //     description: "Picture in Picture for hearing impaired",
        //     publishDate: "2023-03-26",
        //     hlsUrl: "",
        //     imageUrl: "img/live-poster.jpg",
        // }
    }
});

// Wait for appFrame to be initialized before connecting to socket.io server
controls.on('appFrame', appFrame => {
    const socket = io();

    // Forward data events to modular-ui controls
    socket.on('data', data => {
        controls.appFrame.SetData(data);
    });
})