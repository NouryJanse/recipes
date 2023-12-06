import mongoose from 'mongoose'
let connectionString = process.env.DATA_CONNECTION || ''

const connectToDB = async () => {
  try {
    await mongoose.connect(connectionString, {})
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
export default connectToDB
