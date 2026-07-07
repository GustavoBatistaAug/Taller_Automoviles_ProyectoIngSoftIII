export function success(res, status, message, data){
    return res.status(status).json({
        success:true,
        message,
        data
    });
}

export function error(res,status,message){
    return res.status(status).json({
        success:false,
        message
    });
}