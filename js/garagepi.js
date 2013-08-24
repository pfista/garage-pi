NProgress.start();
var socket = io.connect('http://10.0.1.85:9887');

$(function() {
    NProgress.done();

    socket.on('status', function (data) {
        console.log(data);
    });

    socket.on('toggle-garage', function(data) {
        console.log("client: server got garage toggle");

    });
});

function toggle() {
    socket.emit('toggle-garage', "toggle from client");
}
