var axios = require('axios');
var { commonSuccessHandler, commonErrorHandler } = require('./commonHandler');


var xhr = ({ method = 'get', url, params = null, noCross }) => {
    let isFullPath = false

    if (url.indexOf('http') >= 0 || url.indexOf('https') >= 0) {
        isFullPath = true
    }

    switch (method) {
        case 'get':
            return axios.get(url, { params })
                .then(commonSuccessHandler)
                .catch(commonErrorHandler);
        case 'post':
            return axios.post(url, params)
                .then(commonSuccessHandler)
                .catch(commonErrorHandler);
    }
};

// export default xhr;
module.exports = xhr