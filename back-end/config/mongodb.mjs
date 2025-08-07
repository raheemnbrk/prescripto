import mongoose from "mongoose"

const connectDb = async () => {
    mongoose.connection.on('connected', () => { console.log('connected to db') })
    await mongoose.connect(`${process.env.MONGO_URL}/prescripto`)
}

export default connectDb