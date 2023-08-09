# SunbuckCoffee By Adonis.js 5

## ติดตั้งโปรเจค
1. เตรียม enviroment dev ตาม .env.example แล้ว duplicate ไฟล์ใหม่ชื่อ .env
2. ติดตั้ง package ด้วย pnpm
    > pnpm i
4. Migrate Database
   > node ace migration:run
5. Seed Database
   > node ace db:seed
6. Start server
   > pnpm dev

## Drop DB, Migrate DB และ Seed ใหม่
 > node ace migration:fresh && node ace migration:run && node ace db:seed