import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: Prisma.UserCreateInput) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
            },
        });
    }

    async update(id: string, data: Prisma.UserUpdateInput) {
        return this.prisma.user.update({
            where: { id },
            data,
        });
    }

    async remove(id: string) {
        return this.prisma.user.delete({
            where: { id },
        });
    }

    async deactivate(id: string) {
        return this.prisma.user.update({
            where: { id },
            data: { isActive: false },
        });
    }

    async activate(id: string) {
        return this.prisma.user.update({
            where: { id },
            data: { isActive: true },
        });
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
}
