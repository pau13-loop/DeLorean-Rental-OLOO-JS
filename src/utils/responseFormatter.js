function responseFormatter(err, data = null, message=''){
    console.log('Data: ', data);
    const response = {};
    response.status = err ? -1 : 0;
    response.message = err ? err.message : message;
    response.data = data;
    return response;
}

module.exports = responseFormatter;