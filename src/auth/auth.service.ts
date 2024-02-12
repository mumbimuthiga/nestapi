import {Injectable} from "@nestjs/common";
import {User,Bookmark} from  '@prisma/client';
import { AuthDto } from "src/dto";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable({})

export class AuthService{
    constructor(private prisma:PrismaService){}
    
    signin(dto:AuthDto){
        return 'I am sign in from service'
    }
    signup(){
        return 'I am sign Up from service'

    }
}