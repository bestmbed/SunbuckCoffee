import { DateTime } from 'luxon'
import { beforeCreate, BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import Product from "./Product";
import moment from 'moment';
import LogOrder from './LogOrder';


export default class ProductOption extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public option: string

  @column()
  public option_price: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public async singleOrder(product_orders :Record<string, any>){
    const type = this.checkType(product_orders.product_type)
    const price = await Product.query().select(`${type}`).where('product_name',`${product_orders.product_name}`)
    const [product_pay] = price
    const attributes_data = product_pay.$attributes

    const result : resultOfOrder ={
      product_name: product_orders.product_name,
      product_type: product_orders.product_type,
      product_amount: 1,
      total_price: parseInt(attributes_data[`${type}`]),
      created_at:  moment().format('YYYY-MM-DD HH:mm:ss')
    }
     return await LogOrder.create(result)
  }

  public async manyOrder(product_orders: Record<string, any>){
    let prices : object
    let calTotalPrice 
    let resultTotalPrice : number = 0
    let amount : number
    let results: Partial<resultOfOrder> ={}
    let allOrder = new Array

    const product_name_arrays = product_orders.product_name.split(',');
    const product_type_arrays = product_orders.product_type.split(',');

    const product = await product_name_arrays.map( ((element : string)  =>{
      const product_name = this.replaceStar(element);
      const product_amount = this.replaceString(element);
      return {'product_name': product_name, 'product_amount' : product_amount}
    }))
    const type =  await product_type_arrays.map((element =>{
      const product_type = this.replaceStar(element);
      return {'product_type' : product_type}
    }))
    
    const mergedArray = product.map((item : string, index : number) => {return Object.assign(product[index], type[index])}); // merged two object in to array

for(let result of [mergedArray]){
      for(let i = 0; i< result.length; i++){
        amount = parseInt(result[i].product_amount);
        
        prices = await Product.query().select(`${this.checkType(result[i].product_type)}`)
        .where('product_name',`${result[i].product_name}`)

        calTotalPrice = [...Object.values(prices[0].$attributes)]      
        await calTotalPrice.forEach((a : number) => {
          resultTotalPrice += a*amount
          results  = {
            product_name: result[i].product_name,
            product_type: result[i].product_type,
            product_amount: result[i].product_amount,
            total_price : a*amount,
            created_at : moment().format('YYYY-MM-DD HH:mm:ss')
          }

          allOrder.push(results)

        });
        await LogOrder.create(results)
      }
    }
    return {allOrder,'sum_total_price' : resultTotalPrice}
  }

  public async singleOrderOption(product_orders :Record<string, any>){
    let option_query
    let results : Partial<resultOfOrder> ={}
    const type = this.checkType(product_orders.product_type)
    let attributes_option: Array<number> = []

    const price = await Product.query().select(`${type}`).where('product_name',`${product_orders.product_name}`)
    const [product_pay] = price
    const attributes_price  = Object.values(product_pay.$attributes).at(0)

    const product_option_arrays : Record<string, any> = this.replaceSpace(product_orders.option)
    
    if(product_option_arrays){
      for(let i =0; i< product_option_arrays.length; i++){
        
        option_query = await ProductOption.query().select('option_price').where('option',product_option_arrays[i])
        const [option_prices] = option_query
        attributes_option.push(option_prices.$attributes.option_price)

      }
      results  = {
        product_name: product_orders.product_name,
        product_type: product_orders.product_type,
        product_amount: 1,
        option: product_orders.option,
        total_price: attributes_price+attributes_option.reduce(this.sum),
        created_at:  moment().format('YYYY-MM-DD HH:mm:ss')
      }
    }else{
      results  = {
        product_name: product_orders.product_name,
        product_type: product_orders.product_type,
        product_amount: 1,
        total_price: attributes_price,
        created_at:  moment().format('YYYY-MM-DD HH:mm:ss')
      }
  }

    return await LogOrder.create(results)
       
  
  }

  public replaceStar(element : string){
    return element.replace(/\*\d/g,'').trim()
  }
  public replaceSpace(element : Record<string, any>){
    return element?.split(',').map((element : string)=>{return element.trim()})
  }
  public replaceString(element : string){
    return element?.replace(/\D/g,'').trim()
  }
  public  sum(total : number, num: number) {
    return total + num;
  }

  public  checkType(type : string){
    switch (type) {
      case 'hot' : return 'hot_price'; break;
      case 'iced' : return 'iced_price'; break
    }
    
  }

}





