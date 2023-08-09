import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ProductOption from '../../app/Models/ProductOption'

export default class extends BaseSeeder {
  public async run () {
    await ProductOption.createMany([
      {
        option: 'Bubble',
        option_price: 10,
      },
      {
        option: 'Jelly',
        option_price: 5,
      },
      {
        option: 'milk',
        option_price: 5,
      },
    
  ])
  }
}
