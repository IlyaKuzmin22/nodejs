const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

class Car {
  constructor(title, price, img) {
    (this.title = title),
    (this.price = price),
    (this.img = img),
    (this.id = uuidv4());
  }

  // helper функция
  toJSON() {
    return {
      title: this.title,
      price: this.price,
      img: this.img,
      id: this.id,
    };
  }

  // редактирование
  static async update(car) {
    const cars = await Car.getAll()

    const idx = cars.findIndex(c => c.id === car.id)
    cars[idx] = car

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "../data", "cars.json"),
        JSON.stringify(cars),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  // сохранение
  async save() {
    const cars = await Car.getAll();
    cars.push(this.toJSON());

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "../data", "cars.json"),
        JSON.stringify(cars),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  // получение всех объектов cars.json
  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "../data", "cars.json"),
        "utf-8",
        (err, content) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(content));
          }
        }
      );
    });
  }

  // получение машин по id
  static async getById(id) {
    const cars = await Car.getAll()
    return cars.find(c => c.id === id)
  }
}

module.exports = Car;
