const {Router} = require('express')
const Card = require('../models/card')
const Car = require('../models/car')
const router = Router()

router.post('/add', async (req, res) => {
    const car = await Car.getById(req.body.id)
    await Card.add(car)
    res.redirect('/card')
})

router.delete('/remove/:id', async (req, res) => {
    const card = await Card.remove(req.params.id)
    res.status(200).json(card)
})

router.get('/', async (req, res) => {
    const card = await Card.fetch()
    res.render('card', {
        title: 'Корзина',
        isCard: true,
        cars: card.cars,
        price: card.price
    })
})

module.exports = router