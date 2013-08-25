var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs');

var gpio = require('rpi-gpio');

app.listen(9887);

function handler (req, res) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
              res.writeHead(500);
              return res.end('Error loading index.html');
            }
            res.writeHead(200);
            res.end(data);
    });
}

io.sockets.on('connection', function (socket) {
    socket.emit('status', 'connected');

    socket.on('toggle-garage', function (data) {
        socket.emit('toggle-garage', "toggling the garage"); 

        gpio.setup(11, gpio.DIR_OUT, function() {
            gpio.write(11, true, function(err) {
                if (err) {
                    console.log('## Error' + err );
                }
                console.log("Sending voltage to pin");
            });
        });

        setTimeout(closePins, 700);

        function closePins() {
            gpio.write(11, false, function(err) {
                if (err) {
                    console.log('## Error' + err );
                }
                console.log("Cutting voltage");
            });
            /*
            gpio.destroy(function() {
                console.log('Cleaned up GPIO');
            });
            */
        }
    });

});



