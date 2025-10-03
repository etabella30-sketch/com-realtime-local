import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { fileListReq, fileListRes } from '../../interfaces/index.interface';
import { GenerateindexService } from '../../services/generateindex/generateindex.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('JWT')
@ApiTags('generateindex')
@Controller('generateindex')
export class GenerateindexController {

    constructor(private indexService: GenerateindexService) {

    }

    @Post('indexdata')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getIndexData(@Body() body: fileListReq): Promise<fileListRes> {
        return await this.indexService.getIndexData(body);

    }
}
