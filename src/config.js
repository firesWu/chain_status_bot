let config = {
	monitor_clamer: {
		"nodeos":{
			"httpEndPoint": "https://hapi.bos.eosrio.io",
			"chainId":"d5a3d18fbb3c084e3b1f3fa98c21014b5f3db536cc15d08f9f6479517c6a3d86",
			"producerName": ""
		},
		"smtp":{
			"service": "163",
			"port": 465,
			"secureConnection": true,
			"auth": {
				"user": "test@163.com",
				"pass": "test"
			}
		},
		"mailOptions":{
			"from": "test@163.com",
			"to": "test2@qq.com"
		}
	},
	monitor_sync: {
		"nodeos":{
			"httpEndPoint": "https://hapi.bos.eosrio.io",
			"chainId":"d5a3d18fbb3c084e3b1f3fa98c21014b5f3db536cc15d08f9f6479517c6a3d86",
			"producerName": ""
		},
		"smtp":{
			"service": "163",
			"port": 465,
			"secureConnection": true,
			"auth": {
				"user": "test@163.com",
				"pass": "test"
			}
		},
		"mailOptions":{
			"from": "test@163.com",
			"to": "test2@qq.com"
		}
	}
}

module.exports = config