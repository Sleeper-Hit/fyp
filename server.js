'use strict'

/**
* Module dependencies
*/

const express      =   require('./config/express');
const mongoose     =   require('./config/mongoose');
const passport     =   require('./config/passport');

const db           =   mongoose();
const app          =   express();
const auth         =   passport();

app.set('port', process.env.PORT || 3400);

app.listen(app.get('port'), function() {
    console.log('Server running on PORT: ' + app.get('port') + ' at ' + Date(new Date()));
});
