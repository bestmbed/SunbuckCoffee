
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from "../../Models/Product";
import ProductOption from "../../Models/ProductOption";
import CreateProductValidator from '../../Validators/CreateProductValidator'
import LogOrderValidator from '../../Validators/LogOrderValidator';
import LogOrder from '../../Models/LogOrder';

export default class ActivitiesController {
    // public async index({ request }: HttpContextContract) {}
    
    public async create({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateProductValidator)
    if(payload){        
        Product.addNewProduct(payload)
    }
    return response.status(201).send(['msg :', payload])

    }

    public async show({ response }: HttpContextContract) {
    const data = await Product.all()
    return response.status(201).send(['msg :', data])
    
    }

    public async update({request, response}: HttpContextContract) {
    const data =  request.body()
    const product_detial : product = {
        product_name: data.product_name,
        hot_price: data.hot_price,
        iced_price: data.iced_price,
    }
    if(await Product.updateProduct(product_detial)){
        return response.status(201).send(['msg :', 'update success' ,data])
    }
    else{
        return response.status(400).send(['msg :', 'update unsuccess' ,data])
    }
    }

    public async destroy({request, response}: HttpContextContract) {
        const payload =  request.body()
        const product_detial : product = {
            product_name: payload.product_name,
            hot_price: payload.hot_price,
            iced_price: payload.iced_price,
        }
        if(await Product.deleteProduct(product_detial)){
            return response.status(200).send(['msg :', 'delete success'])
        }
        else{
            return response.status(400).send(['msg :', 'something wrong' ])
        }
    }

    public async order({request, response}: HttpContextContract){
        const payload =  await request.validate(LogOrderValidator)
        const SingleOrder = new ProductOption
        const orderReply = await SingleOrder.singleOrder(payload)
        
        response.status(201).send(['data', [orderReply]])

    }

    public async orders({request, response}: HttpContextContract){
        const payload =  request.body()
        const ManyOrder = new ProductOption
        const orderReply = await ManyOrder.manyOrder(payload)

        response.status(201).send(['data', [orderReply]])
    }

    public async orderWithOption({request, response}: HttpContextContract){
        const payload =  request.body()
        const orderWithOption = new ProductOption
        const orderReply = await orderWithOption.singleOrderOption(payload)

        response.status(201).send(['data', [orderReply]])
    }
    public async getAllSummaryOrder({response}: HttpContextContract){

        const logOrder = new LogOrder
        const results = await logOrder.allSummaryOrder()
        console.log(results);

        response.status(201).send(['data', results])
    }
    public async getSummaryOrderAndPrice({response}: HttpContextContract){

        const logOrder = new LogOrder
        const results = await logOrder.allSummaryOrderAndPrice()
        
        response.status(201).send(['data', results])
    }

    public async getAllSummaryOption({response}: HttpContextContract){
        const logOrder = new LogOrder
        const results = await logOrder.allSummaryOption()
        
        response.status(201).send(['data', results])
    }

}
