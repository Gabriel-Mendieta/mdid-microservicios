import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    async register(data: any) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const response = await axios.post(`${process.env.MUTATION_SERVICE_URL}/users`, {
            name: data.name,
            email: data.email,
            password: hashedPassword,
        });
        const token = this.jwtService.sign({ sub: response.data.id, email: data.email });
        return { user: response.data, token };
    }

    async login(data: any) {
        // Obtener usuario por email desde mutation-service
        const response = await axios.get(`${process.env.MUTATION_SERVICE_URL}/users/email/${data.email}`);
        const user = response.data;

        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const passwordValid = await bcrypt.compare(data.password, user.password);
        if (!passwordValid) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const token = this.jwtService.sign({ sub: user.id, email: user.email });
        return { user, token };
    }
}
