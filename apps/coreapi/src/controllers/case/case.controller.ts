import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CaseService } from '../../services/case/case.service';
import { CaseCreationResonce, CaseDeleteReq, CaseDeleteRes, CaseDetailReq, CaseDetailResponce, CaseModal } from '../../interfaces/case.interface';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('JWT')
@ApiTags('Case')
@Controller('case')
export class CaseController {
    constructor(private readonly caseService: CaseService) {
    }



    @Post('casebuilder')
    async casebuilder(@Body() body: CaseModal): Promise<CaseCreationResonce> {
        return await this.caseService.casebuilder(body);
    }

    @Get('casedetail')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getCaseDetail(@Query() query: CaseDetailReq): Promise<CaseDetailResponce> {
        return await this.caseService.getCaseDetail(query);
    }


    @Get('caseinfo')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getCaseinfo(@Query() query: CaseDetailReq): Promise<CaseDetailResponce> {
        return await this.caseService.getCaseDetail(query);
    }

    @Post('casedelete')
    async deleteCase(@Body() body: CaseDeleteReq): Promise<CaseDeleteRes> {
        return await this.caseService.deleteCase(body);
    }






}
