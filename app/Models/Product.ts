import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'


export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public product_name: string
  
  @column()
  public hot_price: number

  @column()
  public iced_price: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static async addNewProduct(product : product){
    const newProduct = new Product
    newProduct.product_name = product.product_name
    newProduct.hot_price = product.hot_price
    newProduct.iced_price = product.iced_price
    newProduct.save()

    return newProduct
  }

  public static async updateProduct(product: product){
   const updatedata =  await Product.query().where('product_name',product.product_name).update({
      product_name : product.product_name,
      hot_price : product.hot_price,
      iced_price : product.iced_price,
      updated_at : `${DateTime.local()}`,
    })
    return updatedata
  }

  public static async deleteProduct(product: product){
    const deletedata =  await Product.query().where('product_name',product.product_name).delete()
     return deletedata
   }

}
