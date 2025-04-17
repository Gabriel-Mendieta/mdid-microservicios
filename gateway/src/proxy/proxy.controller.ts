import {
    All,
    Controller,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ProxyService } from './proxy.service';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller()
export class ProxyController {
    constructor(private readonly proxyService: ProxyService) { }

    // // ❌ No requiere token
    // @All('/auth/*')
    // async handleAuth(@Req() req: Request, @Res() res: Response) {
    //     try {
    //         const result = await this.proxyService.forward(req.method, req.path, req.body, req.query);
    //         res.status(200).json(result);
    //     } catch (err) {
    //         res.status(err?.response?.status || 500).json({
    //             message: err?.response?.data || 'Proxy Error',
    //         });
    //     }
    // }

    // ✅ Rutas protegidas con JWT
    @All('*')
    // @UseGuards(JwtAuthGuard)
    async proxy(@Req() req: Request, @Res() res: Response) {
        try {
            const result = await this.proxyService.forward(req.method, req.path, req.body, req.query);
            res.status(200).json(result);
        } catch (err) {
            res.status(err?.response?.status || 500).json({
                message: err?.response?.data || 'Proxy Error',
            });
        }
    }
}
