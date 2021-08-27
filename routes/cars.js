const {Router} = require('express')
const Car = require('../models/car')
const router = Router()

// получение массива машин из json файла
router.get('/', async(req, res) => {
    const cars = await Car.getAll()
    res.render('cars', {
        title: 'Каталог авто',
        isCars: true,
        cars
    })
})

// редактирование курса
router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }
    const cars = await Car.getById(req.params.id)

    res.render('cars_edit', {
        title: `Редактировать ${cars.title}`,
        cars
    })
})

router.post('/edit', async (req, res) => {
    await Car.update(req.body)
    res.redirect('/cars')
})

// новая страница с машиной
router.get('/:id', async (req, res) => {
    const car = await Car.getById(req.params.id)
    res.render('car', {
        layout: 'empty',
        title: `${car.title}`,
        car
    })
})

module.exports = router