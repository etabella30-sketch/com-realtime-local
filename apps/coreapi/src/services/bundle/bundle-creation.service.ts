import { DbService } from '@app/global/db/pg/db.service';
import { Injectable } from '@nestjs/common';
import { BundleDetailReq, BundleDetailRes, BundleReq, BundleRes, BundlesPermissionReq, BundlesPermissionRes, BundletabReq, BundletabRes, BundletagReq, BundletagRes, SectionReq, SectionRes, TeamUsersReq, TeamUsersRes, bundleTypesReq, bundleTypesRes, checkIssuetagReq, deleteRecentReq, deleteRecentRes, displayReq, filedataReq, filedataRes, pagginationReq, pagginationRes, recentFileReq, recentFileRes } from '../../interfaces/bundle.interface';
import { BundleBuildReq, BundleBuildRes, DeleteBundlesReq, DeleteBundlesRes, FileRenameReq, FileRenameRes, PasteBundlesReq, PasteBundlesRes, PermissionReq, PermissionRes, SectionBuildReq, SectionBuildRes, UndoBundlesReq, UndoBundlesRes, updateBundleDetailReq, updateBundleDetailRes, updateBundleReq, updateBundleRes, updateTabReq, UserSectionBuildReq } from '../../interfaces/bundle.management';

@Injectable()
export class BundleCreationService {

    constructor(private db: DbService) {

    }


    async getSections(body: SectionReq): Promise<SectionRes> {
        let res = await this.db.executeRef('admin_sections', body);
        if (res.success) {
            return res.data[0];
        } else {
            return { msg: -1, value: 'Failed to fetch', error: res.error }
        }
    }

    async getBundle(body: BundleReq): Promise<BundleRes> {
        let res = await this.db.executeRef('bundles', body);
        if (res.success) {
            return res.data[0];
        } else {
            return { msg: -1, value: 'Failed to fetch', error: res.error }
        }
    }

    async getBundledetail(body: BundleDetailReq): Promise<BundleDetailRes> {
        let res = await this.db.executeRef('bundledetail', body);
        if (res.success) {
            return res.data[0];
        } else {
            return { msg: -1, value: 'Failed to fetch', error: res.error }
        }
    }

    async getBundledetailSearched(body: BundleDetailReq): Promise<BundleDetailRes> {
        let res = await this.db.executeRef('bundledetail_search', body);
        if (res.success) {
            return res.data[0];
        } else {
            return { msg: -1, value: 'Failed to fetch', error: res.error }
        }
    }


    async getTeamsUsers(body: TeamUsersReq): Promise<TeamUsersRes> {
        let res = await this.db.executeRef('teams_users', body);
        if (res.success) {
            return res.data[0];
        } else {
            return { msg: -1, value: 'Failed to fetch', error: res.error }
        }
    }

    async getBunlesPermissions(body: BundlesPermissionReq): Promise<BundlesPermissionRes> {
        let res = await this.db.executeRef('bundles_permissions', body);
        if (res.success) {
            return res.data[0];
        } else {
            return { msg: -1, value: 'Failed to fetch', error: res.error }
        }
    }



    async getBundleTypes(body: bundleTypesReq): Promise<bundleTypesRes> {
        let res = await this.db.executeRef('admin_bundles_filetypes', body);
        if (res.success) {
            return res.data[0];
        } else {
            return { msg: -1, value: 'Failed to fetch', error: res.error }
        }
    }



    async getPaggination(body: pagginationReq): Promise<pagginationRes> {
        let res = await this.db.executeRef('admin_bundles_pagination_data', body);
        if (res.success) {
            return res.data[0];
        } else {
            return { msg: -1, value: 'Failed to fetch', error: res.error }
        }
    }


    async sectionBuilder(body: SectionBuildReq): Promise<SectionBuildRes> {
        let res = await this.db.executeRef('sectionbuilder', body);
        if (res.success) {
            return res.data[0][0];
        } else {
            return { msg: -1, value: 'Failed ', error: res.error }
        }
    }



    async bundleBuilder(body: BundleBuildReq): Promise<BundleBuildRes> {
        let res = await this.db.executeRef('bundlebuilder', body);
        if (res.success) {
            return res.data[0][0];
        } else {
            return { msg: -1, value: 'Failed ', error: res.error }
        }
    }


    async fileRename(body: FileRenameReq): Promise<FileRenameRes> {
        let res = await this.db.executeRef('rename_bundledetail', body);
        if (res.success) {
            return res.data[0][0];
        } else {
            return { msg: -1, value: 'Failed to update', error: res.error }
        }
    }

    async setPermission(body: PermissionReq): Promise<PermissionRes> {
        let res = await this.db.executeRef('update_bundles_permisssoins', body);
        if (res.success) {
            return res.data[0][0];
        } else {
            return { msg: -1, value: 'Failed to update', error: res.error }
        }
    }


    async deleteBundles(body: DeleteBundlesReq): Promise<DeleteBundlesRes> {
        this.db.executeRef('delete_bundles', body).then((res) => {
            console.log('Background task completed successfully');
            return res.data[0][0];
        }).catch((error) => {
            console.error('Background task failed', error);
        });
        return { msg: 1, value: 'File deleting is processing' };

    }


    async copyBundles(body: PasteBundlesReq): Promise<PasteBundlesRes> {
        let res = await this.db.executeRef('copy_bundles', body)
        if (res.success) {
            console.log('Background task completed successfully');
            return { msg: 1, value: 'File paste is processing', data: res.data[0][0] };
        } else {
            console.error('Background task failed', res.error);
            return { msg: -1, value: 'File paste is failed' };
        };


    }

    async cutBundles(body: PasteBundlesReq): Promise<PasteBundlesRes> {
        let res = await this.db.executeRef('cut_bundles', body);
        if (res.success) {
            return res.data[0][0];
        } else {
            return { msg: -1, value: 'Failed to paste', error: res.error }
        }
    }


    async undoBundles(body: UndoBundlesReq): Promise<UndoBundlesRes> {
        let res = await this.db.executeRef('undo_bundles', body);
        if (res.success) {
            return res.data[0][0];
        } else {
            return { msg: -1, value: 'Failed to paste', error: res.error }
        }
    }

    async updateBundleDetail(body: updateBundleDetailReq): Promise<updateBundleDetailRes> {
        let res = await this.db.executeRef('admin_update_bundledetail', body);
        if (res.success) {
            return res.data[0][0];
        } else {
            return { msg: -1, value: 'Failed to update', error: res.error }
        }
    }


    async updateBundleTag(body: updateBundleReq): Promise<updateBundleRes> {
        let res = await this.db.executeRef('admin_update_bundle_tag', body);
        if (res.success) {
            return res.data[0][0];
        } else {
            return { msg: -1, value: 'Failed to update', error: res.error }
        }
    }


    async updateFileTab(body: updateTabReq): Promise<updateBundleRes> {
        let res = await this.db.executeRef('admin_update_bundle_tab', body);
        if (res.success) {
            return res.data[0];
        } else {
            return { msg: -1, value: 'Failed to update', error: res.error }
        }
    }


    async getFiledata(body: filedataReq): Promise<filedataRes> {
        let res = await this.db.executeRef('get_filedata', body);
        if (res.success) {
            return res.data[0];
        } else {
            return { msg: -1, value: 'Failed to fetch', error: res.error }
        }
    }



    async getRecentFile(body: recentFileReq): Promise<recentFileRes> {
        let res = await this.db.executeRef('recent_files', body);
        if (res.success) {
            return res.data[0];
        } else {
            return { msg: -1, value: 'Failed to fetch', error: res.error }
        }
    }


    async clearRecent(body: deleteRecentReq): Promise<deleteRecentRes> {
        let res = await this.db.executeRef('clearrecent', body);
        if (res.success) {
            return res.data[0][0];
        } else {
            return { msg: -1, value: 'Failed ', error: res.error }
        }
    }


    async getBundletag(body: BundletagReq): Promise<BundletagRes> {
        let res = await this.db.executeRef('navigate_bundletags', body);
        if (res.success) {
            return res.data[0];
        } else {
            return { msg: -1, value: 'Failed to fetch', error: res.error }
        }
    }

    async getBundletab(body: BundletabReq): Promise<BundletabRes> {
        let res = await this.db.executeRef('navigate_bundletabs', body);
        if (res.success) {
            return res.data[0];
        } else {
            return { msg: -1, value: 'Failed to fetch', error: res.error }
        }
    }


    async getUserSections(body: SectionReq): Promise<SectionRes> {
        body["ref"] = 2;
        let res = await this.db.executeRef('user_sections', body);
        if (res.success) {
            return res.data;
        } else {
            return { msg: -1, value: 'Failed to fetch', error: res.error }
        }
    }


    async userSectionBuilder(body: UserSectionBuildReq): Promise<SectionBuildRes> {
        let res = await this.db.executeRef('user_sectionbuilder', body);
        if (res.success) {
            return res.data[0][0];
        } else {
            return { msg: -1, value: 'Failed ', error: res.error }
        }
    }

    async checkissuetag(body: checkIssuetagReq): Promise<any> {
        let res = await this.db.executeRef('bundle_is_issuetag', body);
        if (res.success) {
            return res.data[0][0];
        } else {
            return { msg: -1, value: 'Failed ', error: res.error }
        }
    }

    async getdisplaycontact(body: displayReq): Promise<any> {
        let res = await this.db.executeRef('displaycontact', body);
        if (res.success) {
            return res.data;
        } else {
            return { msg: -1, value: 'Failed ', error: res.error }
        }
    }

    async getdisplaytags(body: displayReq): Promise<any> {
        let res = await this.db.executeRef('displaytag', body);
        if (res.success) {
            return res.data;
        } else {
            return { msg: -1, value: 'Failed ', error: res.error }
        }
    }

    async getdisplayissue(body: displayReq): Promise<any> {
        let res = await this.db.executeRef('displayissue', body);
        if (res.success) {
            return res.data;
        } else {
            return { msg: -1, value: 'Failed ', error: res.error }
        }
    }

}
