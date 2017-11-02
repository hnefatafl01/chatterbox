const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const logger = require('morgan');

app.set('view engine', 'hbs');
app.use(logger('short'));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index', {title:'sup chatterbox'});
});

const chat = io.of('/chat');

chat.on('connection', (socket) => {
    socket.join('c1', () => {
        chat.to('c1', 'someone joined the chatroom')
    });

    socket.on('chat message', (message) => {
        chat.to('c1').emit('chat message', message);
    });
});

server.listen(8080, () => {
    console.log('listening on port 8080');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});