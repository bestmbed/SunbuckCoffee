import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Product from '../../app/Models/Product'

export default class extends BaseSeeder {
  public async run () {
    await Product.createMany([
      {
        product_name: 'Americano',
        hot_price: 50,
        iced_price: 55,
      },
      {
        product_name: 'Latte',
        hot_price: 60,
        iced_price: 65,
      },
      {
        product_name: 'Mocha',
        hot_price: 65,
        iced_price: 70,
      },
      {
        product_name: 'GreenTea',
        hot_price: 65,
        iced_price: 70,
      },
      {
        product_name: 'Cocoa',
        hot_price: 60,
        iced_price: 65,
      },
    ])
  }
}
