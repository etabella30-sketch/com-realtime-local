import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ContactService } from '../../services/contact/contact.service';
import { CRBuilderReq, CRBuilderRes, CompanyBuilderReq, CompanyBuilderRes, CompanyReq, CompanyRes, ContactBuilderReq, ContactBuilderRes, ContactReq, ContactRes, ContactlsReq, ContactlsRes, ContactroleReq, ContactroleRes } from '../../interfaces/contact.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('JWT')
@ApiTags('contact')
@Controller('contact')
export class ContactController {


    constructor(private readonly contactService: ContactService) {
    }

    @Get('getcontactlist')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getContactlist(@Query() query: ContactlsReq): Promise<ContactlsRes[]> {
        return await this.contactService.getContactlist(query);
    }


    @Get('getcontactdetail')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getContactDetail(@Query() query: ContactReq): Promise<ContactRes> {
        return await this.contactService.getContactDetail(query);
    }

    @Post('contactbuilder')
    async contactBuilder(@Body() body: ContactBuilderReq): Promise<ContactBuilderRes> {
        return await this.contactService.contactBuilder(body);
    }


    @Get('getcompanylist')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getCompanylist(@Query() query: CompanyReq): Promise<CompanyRes[]> {
        return await this.contactService.getCompanylist(query);
    }

    @Post('companybuilder')
    async companyBuilder(@Body() body: CompanyBuilderReq): Promise<CompanyBuilderRes> {
        return await this.contactService.companyBuilder(body);
    }



    @Get('getcontactrole')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getContactrolelist(@Query() query: ContactroleReq): Promise<ContactroleRes[]> {
        return await this.contactService.getContactrolelist(query);
    }

    @Post('contactrolebuilder')
    async contactroleBuilder(@Body() body: CRBuilderReq): Promise<CRBuilderRes> {
        return await this.contactService.contactroleBuilder(body);
    }



}
