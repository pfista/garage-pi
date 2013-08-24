NProgress.start();

$(function() {
    NProgress.done();

});

function connect() {
    var socket = io.connect('http://localhost:9887');
    socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
    });
}
