import mongoose from 'mongoose'
let connectionString = process.env.DATA_CONNECTION || ''

const connectToDB = async () => {
    try {
        await mongoose.connect(connectionString, {})
    } catch (error) {
        console.error('connectToDB', error)
    }
}
export default connectToDB
