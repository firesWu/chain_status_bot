let Eos = require('eosjs');
let config = require('./config.js').monitor_reconnect;
let xhr = require('./http/http.js');
let schedule = require("node-schedule");
var nodemailer = require('nodemailer');

let eos = Eos({
    httpEndpoint: config.nodeos.httpEndPoint,
    chainId: config.nodeos.chainId
});

let alertTime = 100000
let timeoffer = - (new Date().getTimezoneOffset()) * 60000

var transporter = nodemailer.createTransport(config.smtp)
var mailOptions = config.mailOptions

// send mail with defined transport object

function sendMail(type, message){
    if(type == 0){
        mailOptions.subject = '节点滞后'
        mailOptions.text = '节点滞后'  + JSON.stringify(message)
    } else {
        mailOptions.subject = "节点连接失败"
        mailOptions.text = "节点连接失败" 
    }

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error)
        }
        console.log('Message sent: ' + info.response)
    });
}

async function monitorSync() {
    try{
        let result = await eos.getInfo({})
        let data = new Date(result.head_block_time).getTime() + timeoffer
        let dataNow = new Date().getTime()
        if( dataNow - data > alertTime ){
            // sendMail(0, result.head_block_time)
            await disconnect();
            await connect();
        } else {
            console.log("zhi")
        }
    }catch(e){
        sendMail(1);
        console.log('hey ~,it is not your turn yet ):',e)
    }
}

async function disconnect() {
    let peers = config.net_endpoint;
    for( var peer in peers) {
        let result = await xhr({
            method:"post",
            url:config.nodeos.httpEndPoint + "/v1/net/disconnect",
            params: peer
        });
        console.log(result);
    }
}

async function connect() {
    let peers = config.net_endpoint;
    for( var peer in peers) {
        let result = await xhr({
            method:"post",
            url:config.nodeos.httpEndPoint + "/v1/net/connect",
            params: peer
        });
        console.log(result);
    }
}

monitorSync()