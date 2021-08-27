const path = require("path");
const fs = require("fs");

const p = path.join(path.dirname(process.mainModule.filename), "data", "card.json");

class Card {
  // добавление в корзину
  static async add(car) {
    const card = await Card.fetch();

    const idx = card.cars.findIndex(c => c.id === car.id);
    const candidate = card.cars[idx];
    if (candidate) {
      // машина уже есть
      candidate.count++
      card.cars[idx] = candidate
    } else {
      // нужно добавить
      car.count = 1
      card.cars.push(car)
    }

    card.price += +car.price

    return new Promise((resolve, reject) => {
        fs.writeFile(
            p,
            JSON.stringify(card),
            (err) => {
                if(err) {
                    reject(err)
                } else {
                    resolve()
                }
            }
        )
    })
  }

  static async remove(id) {
    const card = await Card.fetch()

    const idx = card.cars.findIndex(c => c.id === id)
    const car = card.cars[idx]

    if(car.count === 1) {
      // удалить
      card.cars = card.cars.filter(c => c.id !== id)
    } else {
      // изменить кол-во
      card.cars[idx].count--
    }

    card.price -= car.price

    return new Promise((resolve, reject) => {
      fs.writeFile(
          p,
          JSON.stringify(card),
          (err) => {
              if(err) {
                  reject(err)
              } else {
                  resolve(card)
              }
          }
      )
  })
  }

  // получение данных с корзины
  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(p, "utf-8", (err, content) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(content));
        }
      });
    });
  }
}

module.exports = Card;
