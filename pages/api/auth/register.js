/* eslint-disable import/no-anonymous-default-export */
import connectDB from "../../../config/connectDB";
import Users from "../../../models/userModels";
import valid from "../../../config/valid"
import bcrypt from 'bcrypt'

connectDB()

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await register(req, res)
      break;
  }
}

const register = async (req, res) => {
  try {
    const { username, email, password, cpassword } = req.body

    const errMsg = valid(username, email, password, cpassword)
    if (errMsg) return res.status(400).json({ err: errMsg })

    const user = await Users.findOne({ email })
    if (user) return res.status(400).json({ err: 'Email Sudah Digunakan ' })

    const hashPassword = await bcrypt.hash(password, 16)

    const newUser = new Users({ username, email, password: hashPassword, cpassword })

    await newUser.save()
    res.json({ msg: "Register Berhasil" })

  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}