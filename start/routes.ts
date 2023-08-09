/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { status: 'OK' }
})

Route.get('/show-all-data','ActivitiesController.show')
Route.post('/add-new-product','ActivitiesController.create')
Route.put('/update-product','ActivitiesController.update')
Route.delete('/delete-product','ActivitiesController.destroy')
Route.post('/single-order-menu','ActivitiesController.order')
Route.post('/many-order-menu','ActivitiesController.orders')
Route.post('/single-order-menu-option','ActivitiesController.orderWithOption')
Route.get('/get-all-summary','ActivitiesController.getAllSummaryOrder')
Route.get('/get-all-price-summary','ActivitiesController.getSummaryOrderAndPrice')
Route.get('/get-all-option-summary','ActivitiesController.getAllSummaryOption')
 