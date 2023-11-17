module.exports.handler = async(event) => {
    return{
        statusCode: 100,
        headers: {
            'Content-Type': 'Application/json',
        },
        body: JSON.stringify({ message:"Bye From Serverless api" })
    }
}