import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UploadService } from '../../services/upload/upload.service';
import { bundleDetailMDL, caseDetailMDL, checkDuplicacyMDL, clearCompleteMDL, replaceMDL, sectionDetailMDL, uploadDetailMDL, uploadSummaryMDL } from '../../interfaces/upload.interface';


@ApiBearerAuth('JWT')
@ApiTags('upload')
@Controller('upload')
export class UploadController {

    constructor(private readonly uploadService: UploadService) {

    }
    @Get('casedetail')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getCaseDetail(@Query() query: caseDetailMDL): Promise<any> {
        return await this.uploadService.caseDetail(query);
    }



    @Get('sectiondetail')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getSectionDetail(@Query() query: sectionDetailMDL): Promise<any> {
        return await this.uploadService.sectionDetail(query);
    }


    @Get('bundle')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getCaseList(@Query() query: bundleDetailMDL): Promise<any> {
        return await this.uploadService.bundleDetail(query);
    }
    
    @Post('checkduplicacy')
    async teamdelete(@Body() body: checkDuplicacyMDL): Promise<any> {
        return await this.uploadService.checkForDuplicate(body);
    }


    @Get('uploadsummary')
    @UsePipes(new ValidationPipe({ transform: true }))
    async fetchUploadsummary(@Query() query: uploadSummaryMDL): Promise<any> {
        return await this.uploadService.getUploadSummary(query);
    }

    @Get('uploaddetail')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getUploadDetail(@Query() query: uploadDetailMDL): Promise<any> {
        return await this.uploadService.getUploadetail(query);
    }



    @Get('uploadfilter')
    async checkUploadedChunks(@Query() query: uploadSummaryMDL): Promise<any> {
        return await this.uploadService.getUploadFiltered(query);
    }


    
    @Post('replacefile')
    async replaceFIleDetail(@Body() body: replaceMDL): Promise<any> {
        return await this.uploadService.replaceFIleDetail(body);
    }


    @Post('clear-completed')
    async clearcomplete(@Body() body: clearCompleteMDL): Promise<any> {
        return await this.uploadService.clearCompleted(body);
    }

}
