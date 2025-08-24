import jwt from 'jsonwebtoken'

const authDoctor = async (req, res, next) => {
    try {
        const {token} = req.headers
        if(!token){
            return res.json({success : false , message : "not authorized , login again"})
        }
        const token_decode = jwt.verify(token , process.env.JWT_SECRET)
        req.doctorId = token_decode.id
        next()
    }
    catch (err) {
        console.log(err.message)
        res.json({ success: false, message: err.message })
    }
}

export default authDoctor