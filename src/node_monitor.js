let Eos = require('eosjs');
let config = require('./config.js').monitor_sync;
let schedule = require("node-schedule");
var nodemailer = require('nodemailer');

let eos = Eos({
    httpEndpoint: config.nodeos.httpEndPoint,
    chainId: config.nodeos.chainId
});

let alertTime = 300000
let timeoffer = - (new Date().getTimezoneOffset()) * 60000

var transporter = nodemailer.createTransport(config.smtp)
var mailOptions = config.mailOptions

// send mail with defined transport object


schedule.scheduleJob('*/2 * * * * *', function () {
    monitorSync()
})

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
            sendMail(0, result.head_block_time)
        } else {
            console.log("zhi")
        }
    }catch(e){
        sendMail(1);
        console.log('hey ~,it is not your turn yet ):',e)
    }
}