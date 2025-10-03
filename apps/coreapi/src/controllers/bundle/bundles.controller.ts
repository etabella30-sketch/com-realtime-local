import { Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BundleCreationService } from '../../services/bundle/bundle-creation.service';
import { BundleDetailReq, BundleDetailRes, BundleReq, BundleRes, BundlesPermissionReq, BundlesPermissionRes, BundletabReq, BundletabRes, BundletagReq, BundletagRes, SectionReq, SectionRes, TeamUsersReq, TeamUsersRes, bundleTypesReq, bundleTypesRes, checkIssuetagReq, displayReq, filedataReq, filedataRes, pagginationReq, pagginationRes, recentFileReq, recentFileRes } from '../../interfaces/bundle.interface';


@ApiBearerAuth('JWT')
@ApiTags('bundles')
@Controller('bundles')
export class BundlesController {
    constructor(private readonly bundleService: BundleCreationService) {
    }

    @Get('sections')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getSections(@Query() query: SectionReq): Promise<SectionRes> {
        return await this.bundleService.getSections(query);
    }

    @Get('bundle')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getBundle(@Query() query: BundleReq): Promise<BundleRes> {
        return await this.bundleService.getBundle(query);
    }

    @Get('bundledetail')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getBundledetail(@Query() query: BundleDetailReq): Promise<BundleDetailRes> {
        return await this.bundleService.getBundledetail(query);
    }

    @Get('bundledetail-search')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getBundledetailSearched(@Query() query: BundleDetailReq): Promise<BundleDetailRes> {
        return await this.bundleService.getBundledetailSearched(query);
    }

    @Get('teamsusers')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getTeamUsers(@Query() query: TeamUsersReq): Promise<TeamUsersRes> {
        return await this.bundleService.getTeamsUsers(query);
    }

    @Get('bundlepermissions')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getBunlesPermissions(@Query() query: BundlesPermissionReq): Promise<BundlesPermissionRes> {
        return await this.bundleService.getBunlesPermissions(query);
    }



    @Get('bundletypes')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getBundleTypes(@Query() query: bundleTypesReq): Promise<bundleTypesRes> {
        return await this.bundleService.getBundleTypes(query);
    }



    @Get('paginationdata')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getPaggination(@Query() query: pagginationReq): Promise<pagginationRes> {
        return await this.bundleService.getPaggination(query);
    }


    @Get('filedata')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getFiledata(@Query() query: filedataReq): Promise<filedataRes> {
        return await this.bundleService.getFiledata(query);
    }


    @Get('recentFile')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getrecentFile(@Query() query: recentFileReq): Promise<recentFileRes> {
        return await this.bundleService.getRecentFile(query);
    }


    @Get('bundletag')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getBundletag(@Query() query: BundletagReq): Promise<BundletagRes> {
        return await this.bundleService.getBundletag(query);
    }

    @Get('bundletab')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getBundletab(@Query() query: BundletabReq): Promise<BundletabRes> {
        return await this.bundleService.getBundletab(query);
    }
    @Get('usersections')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getUserSections(@Query() query: SectionReq): Promise<SectionRes> {
        return await this.bundleService.getUserSections(query);
    }
    @Get('checkissuetag')
    @UsePipes(new ValidationPipe({ transform: true }))
    async checkissuetag(@Query() query: checkIssuetagReq): Promise<SectionRes> {
        return await this.bundleService.checkissuetag(query);
    }

    @Get('getdisplaycontact')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getdisplaycontact(@Query() query: displayReq): Promise<any> {
        return await this.bundleService.getdisplaycontact(query);
    }



    @Get('getdisplaytag')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getdisplaytag(@Query() query: displayReq): Promise<any> {
        return await this.bundleService.getdisplaytags(query);
    }


    @Get('getdisplayissue')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getdisplayissue(@Query() query: displayReq): Promise<any> {
        return await this.bundleService.getdisplayissue(query);
    }


}
