function commonSuccessHandler (res) {
    return res.data;
}

function commonErrorHandler (err) {
    return err;
}

// export { commonSuccessHandler, commonErrorHandler };
module.exports = {
    commonSuccessHandler, commonErrorHandler  
}