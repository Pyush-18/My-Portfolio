
export const asyncHandler = (requestHandler) => async(req, res,next) => {
    try {
        return await requestHandler(req, res,next)
    } catch (error) {
        return res.status(error?.status || 500)
        .json({
            message : error?.message,
            success : false
        }) 
    }
}