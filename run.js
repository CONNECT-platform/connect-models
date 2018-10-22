const nodemon = require('nodemon');

nodemon({ script: 'index.js' });

nodemon.on('exit', () => process.exit(0));
