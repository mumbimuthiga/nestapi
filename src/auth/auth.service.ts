import { Injectable } from '@nestjs/common';
import { AuthDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}

  signin(dto: AuthDto) {
    console.log('Dto', dto);
    return 'I am sign in from service';
  }
  signup(dto: AuthDto) {
    console.log('Dto', dto);
    return 'I am sign Up from service';
  }
}
