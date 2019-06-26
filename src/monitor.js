let Eos = require('eosjs');
let config = require('./config.js').monitor_clamer;
let schedule = require("node-schedule");
var nodemailer = require('nodemailer');

let eos = Eos({
    httpEndpoint: config.nodeos.httpEndPoint,
    chainId: config.nodeos.chainId
});

let alertTime = 3600 * 2;
let timeoffer = - (new Date().getTimezoneOffset()) * 60000;


var transporter = nodemailer.createTransport(config.smtp);
var mailOptions = config.mailOptions;

// send mail with defined transport object


schedule.scheduleJob('0 * * * * *', function () {
    monitorClaimTime(config.nodeos.producerName)
})

function sendMail(type, message){
    if(type == 0){
        mailOptions.subject = 'BP 未领取奖励'
        mailOptions.text = 'BP 未领取奖励'  + JSON.stringify(message)
    } else {
        mailOptions.subject = "节点连接失败"
        mailOptions.text = "节点连接失败" 
    }

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}

async function monitorClaimTime(bp) {
    try{
        let result = await eos.getTableRows( {"scope":"eosio","code":"eosio","table":"producers","json":true,"limit":1,"lower_bound":bp})
        let now = new Date().getTime();
        let claimTime = new Date(result["rows"][0]["last_claim_time"]).getTime() + timeoffer;

        if(now - claimTime > alertTime * 1000) {
            sendMail(0, result["rows"][0]);
        }
    }catch(e){
        sendMail(1);
        console.log('hey ~,it is not your turn yet ):',e)
    }
}