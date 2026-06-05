import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    try {
        const { token } = req.headers
        if(!token){
           return res.json({success : false , message : "not authorized login again"})
        }

        const tokenDecode = jwt.verify(token , process.env.JWT_SECRET)

        req.userId = tokenDecode.id
        next()
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

export default authUser