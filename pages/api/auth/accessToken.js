/* eslint-disable import/no-anonymous-default-export */
import connectDB from '../../../config/connectDB'
import Users from '../../../models/userModels'
import jwt from 'jsonwebtoken'
import { createAccessToken } from '../../../config/generateToken'

connectDB()

export default async (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token) return res.status(400).json({ err: 'Tolong Login Sekarang' })

    const result = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET)
    if (!result) return res.status(400).json({ err: 'Token Sudah Kadaluarsa' })

    const user = await Users.findById(result.id)
    if (!user) return res.status(400).json({ err: 'Pengguna Tidak Ada' })

    const access_token = createAccessToken({ id: user._id })
    res.json({
      access_token,
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        root: user.root
      }
    })
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}