const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch(err => next(err));
    };
};

export { asyncHandler };







// using async/await to handle errors in express middleware

// const asyncHandler = (fn)=> async (req ,res , next )=>{
//     try {
//         await fn (req, res , next)
        
//     } catch (error) {
//         res.status(error.code || 500).json({
//             sucess: false,
//             message: error.message
//         })
//     }
// }
// export default asyncHandler;