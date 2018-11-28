const User = require('../models/User')
const Ad = require('../models/Ad')
const Queue = require('../services/Queue')
const Purchase = require('../models/Purchase')
const PurchaseMail = require('../jobs/PurchaseMail')
const MarkSoldMail = require('../jobs/MarkSoldMail')
const CancelMail = require('../jobs/CancelMail')

class PurchaseController {
  async index (req, res) {
    const purchase = await Purchase.find()
      .populate('buyer')
      .populate('product')
    return res.json(purchase)
  }

  async marksold (req, res) {
    const purchase = await Purchase.findById(req.params.id)
      .populate('product')
      .populate('buyer')

    if (purchase) {
      const ad = await Ad.findByIdAndUpdate(
        purchase.product.id,
        {
          purchasedBy: purchase._id
        },
        { new: true }
      ).populate('author')
      console.log(ad)

      Queue.create(MarkSoldMail.key, {
        ad,
        purchase
      }).save()

      return res.json(ad)
    } else {
      return req.status(401).json({ error: 'Pedido não localizado' })
    }
    //   console.log(purchase)
  }

  async destroy (req, res) {
    const purchase = await Purchase.findById(req.params.id)
      .populate('product')
      .populate('buyer')

    if (purchase) {
      const ad = await Ad.findById(purchase.product._id).populate('author')
      await Ad.findByIdAndUpdate(purchase.product.id, {
        purchasedBy: null
      })
      await Purchase.findByIdAndDelete(purchase._id)
      Queue.create(CancelMail.key, {
        ad,
        purchase
      }).save()
    }

    return res.json({ message: 'Compra cancelada' })
  }

  async store (req, res) {
    const { ad, content } = req.body
    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    if (purchaseAd && user) {
      if (purchaseAd.purchasedBy) {
        console.log(purchaseAd)
        return res
          .status(400)
          .json({ error: `O Produdo ${purchaseAd.title} já está vendido` })
      }

      await Purchase.create({
        buyer: req.userId,
        product: ad,
        content
      })
    }

    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content
    }).save()
    return res.send()
  }
}
module.exports = new PurchaseController()
