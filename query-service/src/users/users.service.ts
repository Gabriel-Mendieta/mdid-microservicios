import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll() {
        return this.prisma.user.findMany({ where: { isActive: true } });
    }

    async findOne(id: string) {
        return this.prisma.user.findUnique({ where: { id } });
    }
}
