import { Controller, Get, Render, Param, Delete, Body, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateProductDto } from './createProduct.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  #products = [
    {
      name: "Bucket",
      price: 3500
    },
    {
      name: 'REST API for dummies',
      price: 7850
    },
    {
      name: 'Tablet',
      price: 45000
    }
  ];

  @Get('products')
  getProducts() {
    return this.#products;
  }

  @Get('products/:id')
  getProduct(@Param('id') id: string) {
    return this.#products[Number(id)];
  }

  @Delete('products/:id')
  deleteProduct(@Param('id') id: string) {
    this.#products.splice(Number(id), 1);
  }

  @Post('products')
  newProduct(@Body() createProductDto: CreateProductDto){
    this.#products.push(createProductDto);
  }

}
