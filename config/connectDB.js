import mongoose from "mongoose";

const url = process.env.MONGODB_URL
const connectDB = () => {
  if (mongoose.connections[0].readyState) {
    console.log("Database Siap")
    return
  }
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log("Database Terkoneksi")).catch(error => console.error(error.message))
}
export default connectDB