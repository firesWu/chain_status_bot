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
	},
	monitor_reconnect: {
		"nodeos":{
			"httpEndPoint": "http://127.0.0.1:8888",
			"chainId":"a1a3865e8f6215728c8b51e3f978e6f4bc8d59195d2d640aabe5875e6186d351",
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
		},
		"net_endpoint":[""]
	}
}

module.exports = config