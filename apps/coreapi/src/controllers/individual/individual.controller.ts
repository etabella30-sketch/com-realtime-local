import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IndividualService } from '../../services/individual/individual.service';
import { DocinfoReq, DocinfoRes, fetchTabDataReq, getTabReq, updateBundleDetailRotation } from '../../interfaces/individual.interface';

@ApiBearerAuth('JWT')
@ApiTags('individual')
@Controller('individual')
export class IndividualController {
    constructor(private readonly individualService: IndividualService) {
    }


    @Get('tabinfo')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getCaseDetail(@Query() query: fetchTabDataReq): Promise<any> {
        return await this.individualService.getTabData(query);
    }





    @Get('gettab')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getfetchtab(@Query() query: getTabReq): Promise<any> {
        return await this.individualService.getTab(query);
    }


    @Get('getDocinfo')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getDocinfo(@Query() query: DocinfoReq): Promise<DocinfoRes> {
        return await this.individualService.getDocinfo(query);
    }



    

    @Get('globannots')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getglobalannotas(@Query() query: DocinfoReq): Promise<DocinfoRes> {
        return await this.individualService.getglobalannotas(query);
    }


    @Post('updaterotation')
    async updateRotation(@Body() body: updateBundleDetailRotation): Promise<any> {
        return await this.individualService.updateRotation(body);
    }



}
