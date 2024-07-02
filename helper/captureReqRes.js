const { addUserApiReq } = require("../api/app/model/userApiReq");

const captureUserReqRes = (req, res, next) => {
    const requestURL = req.originalUrl;
    const requestTime = new Date();
    const requestBodyData = req.body;
    const originalSend = res.send;

    res.send = async function (data) {
        const responseTime = new Date();
        // console.log('Request URL:', req.originalUrl);
        // console.log('Request Body:', requestBodyData);
        // console.log('Request Time:', requestTime);
        // console.log('Response Data:', JSON.parse(data));
        // console.log('Response Time:', responseTime);
        // console.log(req.user);
        const postData = {
            api_name: requestURL,
            request_time: requestTime,
            request_data: requestBodyData && Object.keys(requestBodyData).length !== 0 ? requestBodyData : null,
            response_time: responseTime,
            response_data: JSON.parse(data),
            user_id: req.user ? req.user.id : null
        };
        await addUserApiReq(postData);
        originalSend.apply(res, arguments);
    };
    next();
};

module.exports = {
    captureUserReqRes
};