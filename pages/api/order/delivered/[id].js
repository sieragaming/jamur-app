/* eslint-disable import/no-anonymous-default-export */
import connectDB from '../../../../config/connectDB'
import Orders from '../../../../models/orderModels'
import auth from '../../../../middleware/auth'

connectDB()

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await deliveredOrder(req, res)
      break;
  }
}

const deliveredOrder = async (req, res) => {
  try {
    const result = await auth(req, res)
    if (result.role !== 'admin')
      return res.status(400).json({ err: 'Autentifikasi Tidak Jelas' })
    const { id } = req.query


    const order = await Orders.findOne({ _id: id })
    if (order.paid) {
      await Orders.findOneAndUpdate({ _id: id }, { delivered: true })

      res.json({
        msg: 'Updated success!',
        result: {
          paid: true,
          dateOfPayment: order.dateOfPayment,
          method: order.method,
          delivered: true
        }
      })
    } else {
      await Orders.findOneAndUpdate({ _id: id }, {
        payment: true, dateOfPayment: new Date().toISOString(),
        method: 'Receive Cash', delivered: true
      })

      res.json({
        msg: 'Berhasil Di Perbarui',
        result: {
          paid: true,
          dateOfPayment: new Date().toISOString(),
          method: 'Receive Cash',
          delivered: true
        }
      })
    }

  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}