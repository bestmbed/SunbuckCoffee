
import { DateTime } from 'luxon'
import { beforeCreate, BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import moment from 'moment';
import Product from './Product'
import ProductOption from './ProductOption'
import Database from '@ioc:Adonis/Lucid/Database';

export default class LogOrder extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public product_name: string
  
  @column()
  public product_type: string

  @column()
  public product_amount: number

  @column()
  public option: string

  @column()
  public total_price: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

public async allSummaryOrder(){
  const createDate: string = moment().format('YYYY-MM-DD')
  console.log(createDate);
  
  const all_data = await LogOrder.query().select().whereBetween('created_at', [`${createDate}T00:00:00Z`, `${createDate}T23:59:59Z`])
  console.log(all_data);
  return all_data
}


public async allSummaryOrderAndPrice(){
  const createDate: string = moment().format('YYYY-MM-DD')
  let sumOrders : string[] = []
  let sumPriceAllOrder : number = 0
  const ProduceName = await Product.query().select('product_name')
  const product_name = [...Object.values(ProduceName)]

  for(let i=0; i<product_name.length; i++ ){
    // console.log(product_name[i].$attributes.product_name);
    
    const allResult  = await Database.rawQuery(
    "SELECT product_name , sum(product_amount) as sum_amount , sum(total_price) as sum_price , NOW() as created_at "
    +"FROM sunbuck_db.log_orders "
    +`where created_at between '${createDate}T00:00:00Z'` 
    +`and '${createDate}T23:59:59Z'  and product_name = '${product_name[i].$attributes.product_name}'`)

    if(this.checkNotNullAndParseInt(allResult[0].at(0).sum_price)){
      sumPriceAllOrder += parseInt(allResult[0].at(0).sum_price) 
    }
    sumOrders.push(allResult[0].at(0))
    
    }

  return  {sumOrders, sumPriceAllOrder : [{sumPriceAllOrder}]}
}
public async allSummaryOption(){
  const createDate: string = moment().format('YYYY-MM-DD')

  let sumOptionPush : number[] = []
  let sumOption: Array<any> =[]
  let mergedArray
  let sumOptionAllOrder : Partial<sumOption> = {}
  const optionName = await ProductOption.query().select('option')
  const productOption = [...Object.values(optionName)]

    for(let j=0; j<productOption.length; j++){    
      const allResult  = await Database.rawQuery(
      `SELECT \`id\`, \`product_name\` ,\`option\``
      +"FROM sunbuck_db.log_orders "
      +`where FIND_IN_SET('${productOption[j].$attributes.option}', \`option\`) and created_at between '${createDate}T00:00:00Z'` 
      +`and '${createDate}T23:59:59Z' group by \`id\``)
      sumOptionPush.push(allResult.at(0).filter((obj) => obj.id).length)

      mergedArray = sumOptionPush.map((item , index) => {
        const name = productOption[index].$attributes.option
        const value = item
        return {'name': name , 'value' : value }
      });
      
    }

    // console.log(mergedArray.sort((a, b) => a.value - b.value));


  return  mergedArray.sort((a, b) => b.value - a.value)
}

public checkNotNullAndParseInt(num : string){
  return parseInt(num)
}

public checkNotNull(num : string){
  return num != null
}

}