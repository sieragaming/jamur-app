/* eslint-disable import/no-anonymous-default-export */
import connectDB from '../../../config/connectDB'
import Orders from '../../../models/orderModels'
import Products from '../../../models/productModels'
import auth from '../../../middleware/auth'

connectDB()

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createOrder(req, res)
      break;
    case "GET":
      await getOrders(req, res)
      break;
  }
}

const getOrders = async (req, res) => {
  try {
    const result = await auth(req, res)

    let orders;
    if (result.role !== 'admin') {
      orders = await Orders.find({ user: result.id }).populate("user", "-password")
    } else {
      orders = await Orders.find().populate("user", "-password")
    }

    res.json({ orders })
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}

const createOrder = async (req, res) => {
  try {
    const result = await auth(req, res)
    const { address, mobile, payment, cart, total } = req.body

    const newOrder = new Orders({
      user: result.id, address, mobile, cart, payment, total
    })

    await newOrder.save()

    res.json({
      msg: 'Pesanan Sukses Dan Akan Segera Di Proses',
      newOrder
    })

  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}
