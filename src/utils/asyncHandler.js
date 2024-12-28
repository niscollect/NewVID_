//We'll use this wrapper function-asyncHandler, everywhere we need
// #### const asyncHandler = (fn) => async(req, res, next) => {
// ####     try {
// ####         await fn(req, res, next)
// ####     } catch (error) {
// ####         res.status(error.code || 500).json({
// ####             sucess: false,
// ####             message: error.message,
// ####         })
// ####
// ####     }
// #### }
//This was using try-catch method
//this same thing can be done using then-catch/resolve-catch

const asyncHandler  = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((err) => next(err))
    }
}

export { asyncHandler };

