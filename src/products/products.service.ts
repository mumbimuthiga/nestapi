import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const { categories, ...productData } = createProductDto;
    console.log('Product DTO', createProductDto);
    try {
      const newProduct = await this.prismaService.product.create({
        data: {
          ...productData,
          categories: {
            create: categories.map((category) => ({
              name: category.name,
            })),
          },
        },
      });
      console.log('New product', newProduct);
      return newProduct;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }

  async findAll() {
    try {
      const products = await this.prismaService.product.findMany({});
      return products;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.prismaService.product.findUnique({
        where: {
          id,
        },
      });
      return product;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { categories, ...productData } = updateProductDto;
    try {
      const updatedProduct = await this.prismaService.product.update({
        where: { id },
        data: {
          ...productData,
          categories: {
            create: categories.map((category) => ({
              name: category.name,
            })),
          },
        },
      });
      return updatedProduct;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const deletedProduct = await this.prismaService.product.delete({
        where: { id },
      });
      return deletedProduct;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }
}
