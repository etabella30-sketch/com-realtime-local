import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { DeleteIssueCategoryParam, DeleteIssueDetailParam, GetIssueDetailsGroupedParam, GetIssueDetailsParam, HighlightListParam, InsertHighlightsRequestBody, InsertIssueDetailRequestBody, IssueCategoryRequestBody, IssueListParam, IssueRequestBody, UpdateIssueDetailRequestBody, catListParam, defaultSetupReq, deleteHighlightsParam, deleteHighlightsRequestBody, deleteIssueRequestBody, dynamicComboReq, getAnnotHighlightEEP, getIssueAnnotationListBody, getLastIssueMDL, isseDetailByIdBody, issuedetaillist_by_issueidBody, removeMultipleHighlightsReq, updateDetailIssueNote, updateHighlightIssueIdsReq } from '../../interfaces/issue.interface';
import { IssueService } from '../../services/issue/issue.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Issue')
@Controller('issue')
export class IssueController {
  constructor(private readonly issu: IssueService) {
  }


  @Get('getIssueCategorylist')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getList(@Query() query: catListParam): Promise<any> {
    return await this.issu.getIssueCategory(query);
  }

  @Get('getissuedetails')
  async getIssueDetails(@Query() query: GetIssueDetailsParam): Promise<any> {
    return this.issu.getIssueDetails(query);
  }



  @Post('getIssueAnnot')
  async getIssueDetailsAnnot(@Body() body: GetIssueDetailsGroupedParam): Promise<any> {
    return this.issu.getIssueDetailsAnnot(body);
  }

  @Post('insertIssue')
  async insertIssue(@Body() body: IssueRequestBody): Promise<any> {
    return this.issu.handleIssue(body, 'I');
  }

  @Put('updateIssue')
  async updateIssue(@Body() body: IssueRequestBody): Promise<any> {
    return this.issu.handleIssue(body, 'U');
  }

  @Delete('deleteIssue')
  async deleteIssue(@Body() body: deleteIssueRequestBody): Promise<any> {
    return this.issu.deleteIssue(body);
  }

  @Get('issuelist')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getIssueList(@Query() query: IssueListParam): Promise<any> {
    return this.issu.getIssueList(query);
  }

  @Post('insertCategory')
  async insertIssueCategory(@Body() body: IssueCategoryRequestBody): Promise<any> {
    return this.issu.handleIssueCategory(body, 'I');
  }

  @Put('updateCategory')
  async updateIssueCategory(@Body() body: IssueCategoryRequestBody): Promise<any> {
    return this.issu.handleIssueCategory(body, 'U');
  }

  @Delete('deleteCategory')
  async deleteIssueCategory(@Body() body: DeleteIssueCategoryParam): Promise<any> {
    console.log('deleteCategory')
    return this.issu.deleteIssueCategory(body);
  }


  @Post('insertIssueDetail')
  async insertIssueDetail(@Body() body: InsertIssueDetailRequestBody): Promise<any> {
    console.log('insertIssueDetail', body)
    return this.issu.executeIssueDetailOperation(body, 'I');
  }

  @Post('insertHighlights')
  async insertHighlights(@Body() body: InsertHighlightsRequestBody): Promise<any> {
    console.log('insertIssueDetail', body)
    return this.issu.insertHighlights(body, 'I');
  }

  @Post('removemultihighlights')
  async removemultihighlights(@Body() body: removeMultipleHighlightsReq): Promise<any> {
    console.log('insertIssueDetail', body)
    return this.issu.removemultihighlights(body);
  }

  @Delete('deleteHighlights')
  async deleteHighlights(@Body() body: deleteHighlightsParam): Promise<any> {
    console.log('deleteHighlights', body)
    return this.issu.deleteHighlights(body, 'D');
  }


  @Get('GetHighlightList')
  @UsePipes(new ValidationPipe({ transform: true }))
  async GetHighlightList(@Query() query: HighlightListParam): Promise<any> {
    return this.issu.GetHighlightLists(query);
  }
  @Put('updateIssueDetail')
  async updateIssueDetail(@Body() body: UpdateIssueDetailRequestBody): Promise<any> {
    //fdfdg
    return this.issu.executeIssueDetailOperation(body, 'U');
  }

  @Delete('deleteIssueDetail')
  async deleteIssueDetail(@Body() body: DeleteIssueDetailParam): Promise<any> {
    return this.issu.executeIssueDetailOperation(body, 'D');
  }





  /////////////////////////// new API for issue details

  @Get('getIssueDetailByIssueId')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getIssueDetailbyIsuseid(@Query() query: issuedetaillist_by_issueidBody): Promise<any> {
    return this.issu.getIssueDetailby_issue_id(query);
  }

  @Get('getIssueAnnotationList')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getIssueAnnotationList(@Query() query: getIssueAnnotationListBody): Promise<any> {
    return this.issu.getIssueAnnotationList(query);
  }

  @Get('getIssueDetailById')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getIssueDetailById(@Query() query: isseDetailByIdBody): Promise<any> {
    return this.issu.getIssueDetailById(query);
  }

  @Get('dynamiccombo')
  @UsePipes(new ValidationPipe({ transform: true }))
  async dynamiccombo(@Query() query: dynamicComboReq): Promise<any> {
    return await this.issu.getcCodeMaster(query);
  }

  @Post('updateHighlightIssueIds')
  async updateHighlightIssueIds(@Body() body: updateHighlightIssueIdsReq): Promise<any> {
    console.log('insertIssueDetail', body)
    return this.issu.updateHighlightIssueIds(body);
  }

  @Get('getLastIssue')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getArrengedIssue(@Query() query: getLastIssueMDL): Promise<any> {
    return this.issu.FilterLastSelecedIssued(query);
  }

  @Post('annothighlightexport')
  async getAnnotHighlightExport(@Body() body: getAnnotHighlightEEP): Promise<any> {
    return this.issu.getAnnotHighlightExport(body);
  }

  @Post('getannotationofpages')
  async getAnnotationOfPages(@Body() body: getIssueAnnotationListBody): Promise<any> {
    return this.issu.getAnnotationOfPages(body);
  }

  

  @Post('deletedemoissuedetail')
  async deletedemoissuedetail(@Body() body: any): Promise<any> {
    console.log('deleteCategory')
    return this.issu.deleteDemoIssueDetails(body);
  }



  @Post('setdefault')
  async serverBuilder(@Body() body: defaultSetupReq): Promise<any> {
    try {
      return await this.issu.updateIssueDetail(body);;
    } catch (error) {
      return { msg: -1, error: error.message };
    }

  }



  @Post('update/issuedetail/note')
  async updateIssueNote(@Body() body: updateDetailIssueNote): Promise<any> {
    try {
      return await this.issu.updateIssueDetailNote(body);;
    } catch (error) {
      return { msg: -1, error: error.message };
    }

  }


}
