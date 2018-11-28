const Mail = require('../services/Mail')

class CancelMail {
  get key () {
    return 'CancelMail'
  }
  async handle (job, done) {
    const { ad, purchase } = job.data
    //  console.log(ad.author)

    await Mail.sendMail({
      from: `"${ad.author.name}" <${ad.author.email}>`,
      to: purchase.buyer.email,
      subject: `Compra cancelada`,

      template: 'cancelemail',
      context: { ad, purchase }
    })

    return done()
  }
}

module.exports = new CancelMail()
