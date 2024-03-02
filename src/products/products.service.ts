import { ForbiddenException, Injectable } from '@nestjs/common';
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
      // find exsting product
      const existingProduct = await this.findByProductName(productData.name);
      console.log('Existing', existingProduct);

      if (!existingProduct) {
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
      }
      throw new ForbiddenException('Product already exists');
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }

  async findAll() {
    try {
      const products = await this.prismaService.product.findMany({
        include: {
          categories: true,
        },
      });
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
  async findByProductName(name: string) {
    try {
      const product = await this.prismaService.product.findFirst({
        where: {
          name,
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
      const deletedProduct = await this.prismaService.$transaction([
        this.prismaService.category.deleteMany({
          where: { productId: id },
        }),
        this.prismaService.product.delete({
          where: { id },
        }),
      ]);
      console.log('Deleted product', deletedProduct);
      return deletedProduct;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }
}
