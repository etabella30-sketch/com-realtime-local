import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaginationdataService } from '../../services/paginationdata/paginationdata.service';
import { getpaginationReq, getpaginationRes, paginationReq, paginationRes, stoppaginationReq } from '../../interfaces/pagination/pagination.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('JWT')
@ApiTags('paginationdata')
@Controller('paginationdata')
export class PaginationdataController {

    constructor(private paginationService: PaginationdataService) {

    }


    @Get('getpagination')
    async getPagination(@Query() query: getpaginationReq): Promise<getpaginationRes> {
        return await this.paginationService.getPagination(query);
    }

    @Post('pagination')
    async generatePagination(@Body() body: paginationReq): Promise<paginationRes> {
        return await this.paginationService.getPaginationData(body);
    }




    @Post('stoppagination')
    async stopPagination(@Body() body: stoppaginationReq): Promise<paginationRes> {
        return await this.paginationService.stopPaginationData(body);
    }
}


