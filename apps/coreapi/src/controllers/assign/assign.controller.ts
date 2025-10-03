import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AssignService } from '../../services/assign/assign.service';
import { AssignBundlesReq, AssignBundlesRes, assigncontactReq, AssignCustomBundlesReq, assignTagReq, assignTaskReq, checkAssignBundleExistsReq, unassignContactReq, unassignTagReq, unassignTaskReq, ViewBundlesReq, ViewContactReq, ViewTaskReq } from '../../interfaces/assign.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('JWT')
@ApiTags('assign')
@Controller('assign')
export class AssignController {

    constructor(private readonly assignService: AssignService) {
    }



    @Post('bundlesassignment')
    async bundlesAssignment(@Body() body: AssignBundlesReq): Promise<AssignBundlesRes> {
        return await this.assignService.bundlesAssignment(body);
    }


    @Post('custombundlesassignment')
    async custombundlesAssignment(@Body() body: AssignCustomBundlesReq): Promise<AssignBundlesRes> {
        return await this.assignService.custombundlesAssignment(body);
    }

    @Post('bundlesunassignment')
    async bundlesUnAssignment(@Body() body: AssignBundlesReq): Promise<AssignBundlesRes> {
        return await this.assignService.bundlesUnAssignment(body);
    }


    @Post('assignContact')
    async assignContact(@Body() body: assigncontactReq): Promise<any> {
        return await this.assignService.assignContact(body);
    }


    @Post('assigntask')
    async assigntask(@Body() body: assignTaskReq): Promise<any> {
        return await this.assignService.assignTask(body);
    }
    @Post('assigntag')
    async assigtag(@Body() body: assignTagReq): Promise<any> {
        return await this.assignService.assignTag(body);
    }

    @Post('unassigntag')
    async unassigtag(@Body() body: unassignTagReq): Promise<any> {
        return await this.assignService.unassignTag(body);
    }



    @Post('unassigntask')
    async unassigtask(@Body() body: unassignTaskReq): Promise<any> {
        return await this.assignService.unassignTask(body);
    }



    @Post('unassigncontact')
    async unassigcontact(@Body() body: unassignContactReq): Promise<any> {
        return await this.assignService.unassignContact(body);
    }


    @Get('viewcustombundle')
    async viewCustombundle(@Query() query: ViewBundlesReq): Promise<any> {
        return await this.assignService.viewCustombundle(query);
    }


    @Get('viewcontact')
    async viewcontact(@Query() query: ViewContactReq): Promise<any> {
        return await this.assignService.viewcontact(query);
    }


    @Get('viewTask')
    async viewTask(@Query() query: ViewTaskReq): Promise<any> {
        return await this.assignService.viewtask(query);
    }


    @Get('viewtag')
    async viewtag(@Query() query: ViewContactReq): Promise<any> {
        return await this.assignService.viewTag(query);
    }


    @Get('checkassignbundleexists')
    async checkCustomBundle(@Query() query: checkAssignBundleExistsReq): Promise<any> {
        return await this.assignService.checkCustomBundle(query);
    }





}
