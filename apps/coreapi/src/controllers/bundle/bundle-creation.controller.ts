import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BundleCreationService } from '../../services/bundle/bundle-creation.service';
import { BundleBuildReq, BundleBuildRes, DeleteBundlesReq, DeleteBundlesRes, FileRenameReq, FileRenameRes, PasteBundlesReq, PasteBundlesRes, PermissionReq, PermissionRes, SectionBuildReq, SectionBuildRes, UndoBundlesReq, updateBundleDetailReq, updateBundleDetailRes, updateBundleReq, updateBundleRes, updateTabReq, UserSectionBuildReq } from '../../interfaces/bundle.management';
import { deleteRecentReq, deleteRecentRes } from '../../interfaces/bundle.interface';

@ApiBearerAuth('JWT')
@ApiTags('bundles-creations')
@Controller('bundles-creations')
export class BundleCreationController {

    constructor(private readonly bundleService: BundleCreationService) {
    }


    @Post('sectionbuilder')
    async sectionBuilder(@Body() body: SectionBuildReq): Promise<SectionBuildRes> {
        return await this.bundleService.sectionBuilder(body);
    }


    @Post('bundlebuilder')
    async bundleBuilder(@Body() body: BundleBuildReq): Promise<BundleBuildRes> {
        return await this.bundleService.bundleBuilder(body);
    }

    @Post('renamefile')
    async renameFile(@Body() body: FileRenameReq): Promise<FileRenameRes> {
        return await this.bundleService.fileRename(body);
    }


    @Post('setpermission')
    async setPermission(@Body() body: PermissionReq): Promise<PermissionRes> {
        return await this.bundleService.setPermission(body);
    }


    @Post('deletebundles')
    async deleteBundles(@Body() body: DeleteBundlesReq): Promise<DeleteBundlesRes> {
        return await this.bundleService.deleteBundles(body);
    }


    @Post('copybundles')
    async copyBundles(@Body() body: PasteBundlesReq): Promise<PasteBundlesRes> {
        return await this.bundleService.copyBundles(body);
    }


    @Post('cutbundles')
    async cutBundles(@Body() body: PasteBundlesReq): Promise<PasteBundlesRes> {
        return await this.bundleService.cutBundles(body);
    }


    @Post('undobundles')
    async undoBundles(@Body() body: UndoBundlesReq): Promise<PasteBundlesRes> {
        return await this.bundleService.undoBundles(body);
    }


    @Post('updatebundledetail')
    async updateBundleDetail(@Body() body: updateBundleDetailReq): Promise<updateBundleDetailRes> {
        return await this.bundleService.updateBundleDetail(body);
    }


    @Post('updatetag')
    async updateBundleTag(@Body() body: updateBundleReq): Promise<updateBundleRes> {
        return await this.bundleService.updateBundleTag(body);
    }


    @Post('updatetab')
    async updateFileTab(@Body() body: updateTabReq): Promise<updateBundleRes> {
        return await this.bundleService.updateFileTab(body);
    }



    @Post('clearrecent')
    async clearRecent(@Body() body: deleteRecentReq): Promise<deleteRecentRes> {
        return await this.bundleService.clearRecent(body);
    }

    @Post('usersectionbuilder')
    async usersectionBuilder(@Body() body: UserSectionBuildReq): Promise<SectionBuildRes> {
        return await this.bundleService.userSectionBuilder(body);
    }


}
