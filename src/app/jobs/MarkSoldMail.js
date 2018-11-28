const Mail = require('../services/Mail')

class MarkSoldMail {
  get key () {
    return 'MarkSoldMail'
  }
  async handle (job, done) {
    const { ad, purchase } = job.data
    //  console.log(ad.author)

    await Mail.sendMail({
      from: `"${ad.author.name}" <${ad.author.email}>`,
      to: purchase.buyer.email,
      // from: 'imbitubadigital@gmail.com',
      // to: 'telecarimbituba@gmail.com',
      subject: `Sua compra do produto ${purchase.product.title}`,
      // subject: `Sua compra do produto`,
      template: 'marksold',
      context: { ad, purchase }
    })

    return done()
  }
}

module.exports = new MarkSoldMail()
