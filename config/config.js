'use strict';

var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    pubKey=require('fs').readFileSync('/Users/guma/.ssh/id_rsa');

module.exports = {
  root:rootPath,
  pm2servers: [{
    host: '192.168.0.28',
    username:'guma'
  },
  {
    host:'192.168.0.28',
    username:'guma'
  }
  ],

  // database: {
  //   server: '',
  //   database: '',
  //   user: '',
  //   password: ''
  // }
  redis:{
    host:'192.168.0.28',
    port: 6379
  },
  webServer:{
    port:11111,
   ip: '0.0.0.0'
  }
};
