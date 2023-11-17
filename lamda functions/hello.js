module.exports.abcHandler = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify('Hello from Piyush \'s serverless youtube-api!'),
    };
}