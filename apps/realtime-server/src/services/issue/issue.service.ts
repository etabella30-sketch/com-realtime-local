import { DbService } from '@app/global/db/pg/db.service';
import { Injectable } from '@nestjs/common';
import { SessionListReq } from '../../interfaces/session.interface';
import { DeleteIssueCategoryParam, DeleteIssueDetailParam, GetIssueDetailsGroupedParam, GetIssueDetailsParam, HighlightListParam, InsertHighlightsRequestBody, InsertIssueDetailRequestBody, IssueCategoryRequestBody, IssueListParam, IssueRequestBody, UpdateIssueDetailRequestBody, catListParam, defaultSetupReq, deleteHighlightsRequestBody, deleteIssueRequestBody, dynamicComboReq, getAnnotHighlightEEP, getIssueAnnotationListBody, getLastIssueMDL, isseDetailByIdBody, issuedetaillist_by_issueidBody, removeMultipleHighlightsReq, updateDetailIssueNote, updateHighlightIssueIdsReq } from '../../interfaces/issue.interface';
import { ExportService } from '../export/export.service';

@Injectable()
export class IssueService {
  constructor(private db: DbService, private exportService: ExportService) {

  }

  async getIssueCategory(body: catListParam): Promise<any> {
    let res = await this.db.executeRef('realtime_issuecategory', body);
    if (res.success) {
      return res.data[0];
    } else {
      return { msg: -1, value: 'Failed to fetch', error: res.error }
    }
  }

  async getIssueList(body: IssueListParam): Promise<any> {
    const res = await this.db.executeRef('realtime_issuelist', body);

    if (res.success) {
      return res.data[0];
    } else {
      return { msg: -1, value: 'Failed to fetch issue list', error: res.error };
    }
  }

  async handleIssue(body: IssueRequestBody, permission: 'I' | 'U' | 'D'): Promise<any> {
    const parameter = {
      ...body,
      cPermission: permission,
    };
    const res = await this.db.executeRef('realtime_handle_issue_master', parameter);
    if (res.success) {
      return res.data[0];
    } else {
      return { msg: -1, value: 'Failed to handle issue', error: res.error };
    }
  }


  async deleteIssue(body: deleteIssueRequestBody): Promise<any> {
    const parameter = {
      ...body,
      cPermission: 'D',
    };
    const res = await this.db.executeRef('realtime_handle_issue_master', parameter);

    if (res.success) {
      return res.data[0];
    } else {
      return { msg: -1, value: 'Failed to handle issue', error: res.error };
    }
  }
  async handleIssueCategory(body: IssueCategoryRequestBody, permission: 'I' | 'U'): Promise<any> {
    const parameter = { ...body, cICtype: permission };
    const res = await this.db.executeRef('realtime_handle_issue_category', parameter);

    if (res.success) {
      return res.data[0];
    } else {
      return { msg: -1, value: 'Failed to handle issue category', error: res.error };
    }
  }

  async deleteIssueCategory(param: DeleteIssueCategoryParam): Promise<any> {
    const parameter = { ...param, cICtype: 'D' };
    console.log('deleteIssueCategory', parameter)
    const res = await this.db.executeRef('realtime_handle_issue_category', parameter);

    if (res.success) {
      return res.data[0];
    } else {
      return { msg: -1, value: 'Failed to delete issue category', error: res.error };
    }
  }

  async executeIssueDetailOperation<T>(body: T, permission: 'I' | 'U' | 'D'): Promise<any> {
    const parameter = permission === 'D' ? { nIDid: (body as DeleteIssueDetailParam).nIDid, cPermission: permission } : { ...body, cPermission: permission };
    const res = await this.db.executeRef('realtime_handle_issue_detail', parameter);

    if (res.success) {
      return res.data[0];
    } else {
      return { msg: -1, value: 'Failed to handle issue detail', error: res.error };
    }
  }

  async insertHighlights(body: InsertHighlightsRequestBody, permission: 'I' | 'D'): Promise<any> {
    const parameter = { ...body, permission: permission };
    const res = await this.db.executeRef('realtime_handle_rhighlights', parameter);

    if (res.success) {
      return res.data[0];
    } else {
      return { msg: -1, value: 'Failed to handle issue highlights', error: res.error };
    }
  }

  async removemultihighlights(body: removeMultipleHighlightsReq): Promise<any> {
    const res = await this.db.executeRef('realtime_delete_multiple_rhighlights', body);

    if (res.success) {
      return res.data[0];
    } else {
      return { msg: -1, value: 'Failed to handle issue highlights', error: res.error };
    }
  }


  async deleteHighlights(body: any, permission: 'I' | 'D'): Promise<any> {
    const parameter = { ...body, permission: permission };
    const res = await this.db.executeRef('realtime_handle_rhighlights', parameter);

    if (res.success) {
      return res.data[0];
    } else {
      return { msg: -1, value: 'Failed to handle issue highlights', error: res.error };
    }
  }
  async GetHighlightLists(body: HighlightListParam): Promise<any> {
    const res = await this.db.executeRef('realtime_get_highlightlist', body);

    if (res.success) {
      return res.data[0];
    } else {
      return { msg: -1, value: 'Failed to fetch issue list', error: res.error };
    }
  }

  async getIssueDetails(param: GetIssueDetailsParam): Promise<any> {
    const res = await this.db.executeRef('realtime_get_issue_details', param);

    if (res.success) {
      return res.data[0];
    } else {
      return { msg: -1, value: 'Failed to fetch issue details', error: res.error };
    }
  }


  async getIssueDetailsAnnot(param: GetIssueDetailsGroupedParam): Promise<any> {
    const res = await this.db.executeRef(`realtime_get_issue_annot`, param);
    if (res.success) {
      return res.data[0];
    } else {
      return { msg: -1, value: 'Failed to fetch grouped issue details', error: res.error };
    }
  }


  /*      async insertIssueDetail(body: InsertIssueDetailRequestBody): Promise<any> {
          const parameter = { ...body, cPermission: "I" };
          const res = await this.db.executeRef('realtime_handle_issue_detail', parameter);
      
          if (res.success) {
            return res.data[0];
          } else {
            return { msg: -1, value: 'Failed to handle issue detail', error: res.error };
          }
        }
  
        async updateIssueDetail(body: UpdateIssueDetailRequestBody): Promise<any> {
          const parameter = { ...body, cPermission: "U" };
          const res = await this.db.executeRef('realtime_handle_issue_detail', parameter);
      
          if (res.success) {
            return res.data[0];
          } else {
            return { msg: -1, value: 'Failed to handle issue detail', error: res.error };
          }
        }
      
        async deleteIssueDetail(param: DeleteIssueDetailParam): Promise<any> {
          const parameter = { nIDid: param.nIDid, cPermission: 'D' };
          const res = await this.db.executeRef('realtime_handle_issue_detail', parameter);
      
          if (res.success) {
            return res.data[0];
          } else {
            return { msg: -1, value: 'Failed to delete issue detail', error: res.error };
          }
        }*/







  async getIssueDetailby_issue_id(body: issuedetaillist_by_issueidBody): Promise<any> {
    const params = { ...body, ref: 2 };
    const res = await this.db.executeRef('realtime_issuedetail_by_issueid', params);

    if (res.success) {
      return res.data;
    } else {
      return { msg: -1, value: 'Failed to fetch getIssueDetailby_issue_id', error: res.error };
    }
  }

  async getIssueAnnotationList(body: getIssueAnnotationListBody): Promise<any> {
    const res = await this.db.executeRef('realtime_get_issue_annotation_list', body);

    if (res.success) {
      return res.data[0];
    } else {
      return { msg: -1, value: 'Failed to fetch realtime_get_issue_annotation_list', error: res.error };
    }
  }

  async getIssueDetailById(body: isseDetailByIdBody): Promise<any> {
    const res = await this.db.executeRef('realtime_get_issuedetail_by_id', body);

    if (res.success) {
      return res.data[0];
    } else {
      return { msg: -1, value: 'Failed to fetch realtime_get_issuedetail_by_id', error: res.error };
    }
  }

  async getAnnotationOfPages(body: getIssueAnnotationListBody): Promise<any> {
    body["ref"] = 2
    console.log('\n\n\n\n\n\n', 'realtime_get_issue_annotation_highlight', '\n', body, '\n\n\n\n\n\n')
    const res = await this.db.executeRef('realtime_get_issue_annotation_highlight', body);

    if (res.success) {
      return res.data;
    } else {
      return { msg: -1, value: 'Failed to fetch realtime_get_issue_annotation_highlight', error: res.error };
    }
  }

  async getcCodeMaster(body: dynamicComboReq): Promise<any> {
    let res = await this.db.executeRef('combo_codemaster', body);
    if (res.success) {
      return res.data[0];
    } else {
      return { msg: -1, value: 'Failed to fetch', error: res.error }
    }
  }

  async updateHighlightIssueIds(body: updateHighlightIssueIdsReq): Promise<any> {

    const res = await this.db.executeRef('realtime_update_default_h_issue', body);

    if (res.success) {
      return res.data[0];
    } else {
      return { msg: -1, value: 'Failed to handle realtime_update_default_h_issue', error: res.error };
    }
  }

  async FilterLastSelecedIssued(body: getLastIssueMDL): Promise<any> {

    const res = await this.db.executeRef('realtime_filter_last_issue', body);

    if (res.success) {
      return res.data[0];
    } else {
      return { msg: -1, value: 'Failed to handle realtime_filter_last_issue', error: res.error };
    }
  }



  async getAnnotHighlightExport(query: getAnnotHighlightEEP): Promise<any> {
    query['ref'] = 2;
    const res = await this.db.executeRef('realtime_get_issue_annotation_highlight_export', query);
    if (res.success) {
      const data = await this.exportService.exportFile(query,res.data);
      return data;
    } else {
      return { msg: -1, value: 'Failed to handle realtime_filter_last_issue', error: res.error };
    }
  }

  async deleteDemoIssueDetails(param: any): Promise<any> {
    const res = await this.db.executeRef('realtime_demo_issues_delete', param);

    if (res.success) {
      return res.data[0];
    } else {
      return { msg: -1, value: 'Failed to delete issue category', error: res.error };
    }
  }



  async updateIssueDetail(param: defaultSetupReq): Promise<any> {
    const res = await this.db.executeRef('realtime_defaultvalueupdate', param);

    if (res.success) {
      return res.data[0][0];
    } else {
      return { msg: -1, value: 'Failed to delete issue category', error: res.error };
    }
  }


  async updateIssueDetailNote(param: updateDetailIssueNote): Promise<any> {
    const res = await this.db.executeRef('realtime_issue_detail_note', param);

    if (res.success) {
      return res.data[0][0];
    } else {
      return { msg: -1, value: 'Failed to delete issue category', error: res.error };
    }
  }

}

