
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsString, IsNumber, IsOptional, IsBoolean, IsArray, isArray } from 'class-validator';

class BaseSessionDetail {

  @ApiProperty({ example: 22, description: 'Case ID', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber()
  nCaseid: number;

  @ApiProperty({ example: 57, description: 'Session ID', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber()
  nSessionid: number;

  @ApiProperty({ example: 3, description: 'User ID', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber()
  nUserid: number;
}



export class catListParam {
  @ApiProperty({ example: 0, description: 'Case id', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'Case id must be a number conforming to the specified constraints' })
  nCaseid: Number;


  @ApiProperty({ example: 0, description: 'User id', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'User id must be a number conforming to the specified constraints' })
  nUserid: Number;


}


export class GetIssueDetailsParam {
  @ApiProperty({ example: 11, description: 'Issue Detail ID', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber()
  @IsOptional()
  nIDid?: number;
}

export class GetIssueDetailsGroupedParam extends BaseSessionDetail {
  // @ApiProperty({ example: 1, description: 'Case ID', required: true })
  // @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  // @IsNumber()
  // nCaseid: number;

  // @ApiProperty({ example: 8, description: 'Session ID', required: true })
  // @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  // @IsNumber()
  // nSessionid: number;

  // @ApiProperty({ example: 9, description: 'User ID', required: true })
  // @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  // @IsNumber()
  // nUserid: number;
}

/**
 export class GetIssueDetailsParam {


  @ApiProperty({ example: 0, description: 'Issue Detail ID', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'Case id must be a number conforming to the specified constraints' })
  nIDid: Number;
}
 */

export class IssueRequestBody {
  @ApiProperty({ example: 1, description: 'Issue ID', required: false })
  @IsInt()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  nIid?: number;

  @ApiProperty({ example: 'Issue Name', description: 'Issue Name', required: true })
  @IsString()
  cIName: string;

  @ApiProperty({ example: '000000', description: 'Color Code', required: true })
  @IsString()
  cColor: string;

  @ApiProperty({ example: 1, description: 'Issue Category ID', required: true })
  @IsInt()
  nICid: number;

  @ApiProperty({ example: 1, description: ' Case ID', required: true })
  @IsInt()
  nCaseid: number;

  @ApiProperty({ example: '2023-05-10T12:00:00Z', description: 'Create Date', required: false })
  @IsOptional()
  dCreatedt?: string;

  @ApiProperty({ example: 1, description: 'User ID', required: true })
  @IsInt()
  @IsOptional()
  nUserid?: number;

  @ApiProperty({ example: '2023-05-10T12:00:00Z', description: 'Update Date', required: false })
  @IsOptional()
  dUpdatedt?: string;
}

export class deleteIssueRequestBody {
  @ApiProperty({ example: 1, description: 'Issue ID', required: false })
  @IsInt()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  nIid?: number;


}



















export class IssueListParam extends BaseSessionDetail {
  @ApiProperty({ example: 1, description: 'Issue detail id only in edit mode' })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  nIDid: number;
}


export class IssueCategoryRequestBody {
  @ApiProperty({ example: 1, description: 'Category ID', required: false })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  nICid?: number;

  @ApiProperty({ example: 1, description: 'Case ID', required: true })
  @IsNumber()
  nCaseid: number;

  @ApiProperty({ example: 'Category Name', description: 'Category Name', required: true })
  @IsString()
  cCategory: string;

  @ApiProperty({ example: 1, description: 'User ID', required: true })
  @IsNumber()
  nUserid: number;

  @ApiProperty({ example: '2023-05-10T12:00:00Z', description: 'Create Date', required: false })
  @IsOptional()
  dCreateDt?: string;

  @ApiProperty({ example: '2023-05-10T12:00:00Z', description: 'Update Date', required: false })
  @IsOptional()
  dUpdateDt?: string;
}

export class DeleteIssueCategoryParam {
  @ApiProperty({ example: 1, description: 'Category ID', required: true })
  @IsNumber()
  nICid: number;
}




///////////////////////////////////////////   Issue Detail   ////////////////////////////////////////////////////

class cordinates {
  x: number;
  y: number

}
class issueIds {
  nIid: number;


}
class issueMapping {
  nIid: number;
  nRelid: number;
  nImpactid: number;

}
class BaseIssueDetailRequestBody extends BaseSessionDetail {
  @ApiProperty({ example: 'Original Note text', description: 'Note', required: true })
  @IsString()
  cONote: string;

  @ApiProperty({ example: 'Note text', description: 'Note', required: true })
  @IsString()
  cNote: string;


  @ApiProperty({ example: 'User Note text', description: 'User Note', required: false })
  @IsOptional()
  @IsString()
  cUNote: string;



  @ApiProperty({ example: '', description: 'Issue IDs', required: true })
  @IsArray()
  cIidStr: issueMapping[];



  @ApiProperty({ example: 1, description: 'Last Issue id', required: true })
  @IsNumber()
  nLID: number;

  @ApiProperty({ example: '1', description: 'Page Number', required: true })
  @IsString()
  cPageno: string;



  @ApiProperty({ type: [cordinates], example: [{ x: 100, y: 200 }], description: 'Coordinates', required: true })
  @IsArray()
  jCordinates: cordinates[];


  @ApiProperty({ example: '1', description: 'Transcript', required: false })
  @IsOptional()
  @IsString()
  cTranscript?: string;


}

export class InsertIssueDetailRequestBody extends BaseIssueDetailRequestBody {
  @ApiProperty({ example: '2023-05-10T12:00:00Z', description: 'Create Date', required: false })
  @IsOptional()
  dCreatedt?: string;
}


export class UpdateIssueDetailRequestBody extends BaseIssueDetailRequestBody {
  @ApiProperty({ example: 1, description: 'Issue Detail ID', required: false })
  @IsNumber()
  @IsOptional()
  nIDid?: number;


}

export class DeleteIssueDetailParam {
  @ApiProperty({ example: 1, description: 'Issue Detail ID', required: true })
  @IsNumber()
  nIDid: number;


}

export class deleteHighlightsRequestBody {
  @ApiProperty({ example: 1, description: 'Highlighted id', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber()
  nHid: number;

}

export class HighlightListParam extends BaseSessionDetail {
  // @ApiProperty({ example: 1, description: 'Case ID', required: true })
  // @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  // @IsNumber({}, { message: 'Case ID must be a number' })
  // nCaseid: number;

  // @ApiProperty({ example: 1, description: 'User ID', required: true })
  // @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  // @IsNumber({}, { message: 'User ID must be a number' })
  // nUserid: number;

  // @ApiProperty({ example: 1, description: 'Case ID', required: true })
  // @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  // @IsNumber({}, { message: 'Session ID must be a number' })
  // nSessionid: number;
}

export class InsertHighlightsRequestBody extends BaseSessionDetail {


  // @ApiProperty({ example: 1, description: 'Case ID', required: true })
  // @IsNumber()
  // nCaseid: number;

  @ApiProperty({ example: 'Highlight text', description: 'Highlight text', required: true })
  @IsString()
  cNote: string;

  // @ApiProperty({ example: 1, description: 'Session ID', required: true })
  // @IsNumber()
  // nSessionid: number;

  // @ApiProperty({ example: 1, description: 'User ID', required: true })
  // @IsNumber()
  // nUserid: number;


  @ApiProperty({ type: [cordinates], example: [{ x: 100, y: 200 }], description: 'Coordinates', required: true })
  @IsArray()
  jCordinates: cordinates[];


  @ApiProperty({ example: '[{"nIid":0}]', description: 'Issue IDs', required: true })
  @IsArray()
  cIidStr: issueIds[];

  @ApiProperty({ example: 1, description: 'Last Issue id', required: true })
  @IsNumber()
  nLID: number;

  @ApiProperty({ example: '1', description: 'Page Number', required: true })
  @IsString()
  cPageno: string;

  @ApiProperty({ example: '10', description: 'Line Number', required: true })
  @IsString()
  cLineno: string;

  @ApiProperty({ example: '00:00', description: 'Timestamp', required: true })
  @IsString()
  cTime: string;

  
  @ApiProperty({ example: 'N', description: 'cTranscript', required: true })
  @IsOptional()
  @IsString()
  cTranscript: string;


  @ApiProperty({ example: 1, description: '', required: true })
  @IsOptional()
  @IsNumber()
  oP?: number;

  @ApiProperty({ example: 1, description: '', required: true })
  @IsOptional()
  @IsNumber()
  oL?: number;

}


export class removeMultipleHighlightsReq {


  @ApiProperty({ example: [1, 2], description: 'Highlight IDs', required: true })
  @IsArray()
  jHids: number[];


  @ApiProperty({ example: 1, description: 'User ID', required: true })
  @IsNumber()
  nUserid: number;

}


export class getIssueAnnotationListBody extends BaseSessionDetail {


  @ApiProperty({ example: 0, description: 'nIDid',required: false })
  @IsOptional()
  @IsNumber()
  nIDid?: number;

  @ApiProperty({ example: 0, description: 'jIssues',required: false })
  @IsOptional()
  @IsString()
  jIssues?: string;

  @ApiProperty({ example: 0, description: 'jPages',required: false })
  @IsOptional()
  @IsString()
  jPages?: string;
  
  @ApiProperty({ example: 'A', description: 'Transcript' })
  @IsString()
  cTranscript: string;

}

export class issuedetaillist_by_issueidBody extends BaseSessionDetail {


  @ApiProperty({ example: 107, description: 'RIssue Master id', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber()
  nIid: number;
}

export class isseDetailByIdBody {


  @ApiProperty({ example: 107, description: 'Issue Detail id', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber()
  nIDid: number;
}
export class deleteHighlightsParam {
  

  @ApiProperty({ example: '', description: 'Transcript ', required: true })
  @IsString()
  cTranscript: string;


  @ApiProperty({ example: 107, description: 'Highlight  id', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber()
  nHid: number;
}

export class dynamicComboReq {


  @ApiProperty({ example: 4, description: '' })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nCategoryid must be a number conforming to the specified constraints' })
  nCategoryid?: Number;
}


class HissueIds {
  nIid: number;


}

export class updateHighlightIssueIdsReq extends BaseSessionDetail {

  @ApiProperty({ example: '[{"nIid":0,cLast:0}]', description: 'Issue IDs', required: true })
  @IsArray()
  cDefHIssues: HissueIds[];

  @ApiProperty({ example: [1, 2], description: 'Highlight IDs', required: true })
  @IsArray()
  jHids: number[];


  @ApiProperty({ example: 1, description: 'Last Issue id', required: true })
  @IsNumber()
  nLID: number;
}


export class getLastIssueMDL {


  @ApiProperty({ example: '[]', description: 'Issue IDs', required: true })
  @IsString()
  jIids: string;

}



export class getAnnotHighlightEEP {

  @ApiProperty({ example: 1, description: 'Session ID', required: true })
  @IsNumber()
  nSessionid: number;

  @ApiProperty({ example: 1, description: 'Case ID', required: true })
  @IsNumber()
  nCaseid: number;

  @ApiProperty({ example: 1, description: 'User ID', required: true })
  @IsNumber()
  nUserid: number;

  @ApiProperty({ example: '', description: 'Case name', required: true })
  @IsString()
  cCasename: string;

  @ApiProperty({ example: '', description: 'User name', required: true })
  @IsString()
  cUsername: string;


  @ApiProperty({ example: '', description: 'Transcript ', required: true })
  @IsString()
  cTranscript: string;


  @ApiProperty({ example: [], description: 'Issue IDs', required: false })
  @IsArray()
  @IsNumber({}, { each: true })
  jIssues: number[];


  @ApiProperty({ example: '[]', description: 'Highlight Issues IDs', required: false })
  @IsArray()
  @IsNumber({}, { each: true })
  jHIssues: number[];

  @ApiProperty({ example: [], description: 'Page', required: false })
  @IsArray()
  @IsNumber({}, { each: true })
  jPages: number[];


  @ApiProperty({ example: false, description: 'Advanced', required: false })
  @IsBoolean()
  @IsOptional()
  bAdvanced: boolean;

  @ApiProperty({ example: false, description: 'Cover page ', required: false })
  @IsBoolean()
  @IsOptional()
  bCoverpg: boolean;


  @ApiProperty({ example: false, description: 'Fit page ', required: false })
  @IsBoolean()
  @IsOptional()
  bFitpg: boolean;

  @ApiProperty({ example: false, description: 'Pagination page ', required: false })
  @IsBoolean()
  @IsOptional()
  bPagination: boolean;

  @ApiProperty({ example: false, description: 'Q Fact', required: false })
  @IsBoolean()
  @IsOptional()
  bQfact: boolean;

  @ApiProperty({ example: false, description: 'Quick Mark', required: false })
  @IsBoolean()
  @IsOptional()
  bQmark: boolean;

  @ApiProperty({ example: false, description: 'Timestamp', required: false })
  @IsBoolean()
  @IsOptional()
  bTimestamp: boolean;

  @ApiProperty({ example: 'A', description: 'Orientation', required: false })
  @IsString()
  cOrientation: string;

  @ApiProperty({ example: 'S', description: 'Quick Mark size ', required: true })
  @IsString()
  cQMsize: string;

  @ApiProperty({ example: 'S', description: 'Q Fact size ', required: true })
  @IsString()
  cQFsize: string;

  @ApiProperty({ example: 'A4', description: 'Page size ', required: true })
  @IsString()
  cPgsize: string;


  @ApiProperty({ example: 'N', description: 'Demo ', required: true })
  @IsOptional()
  @IsString()
  cIsDemo: string;

}





export class defaultSetupReq  {


  @ApiProperty({ example: 0, description: '' })
  @IsNumber()
  nSesid: number;

  @ApiProperty({ example: 0, description: '' })
  @IsNumber()
  nUserid: number;

  
  @ApiProperty({ example: 0, description: '' })
  @IsNumber()
  nLID: number;
  
  @ApiProperty({ example: '[]', description: '' })
  @IsString()
  jDefault:  string;

  
  @ApiProperty({ example: 'H', description: '' })
  @IsString()
  cFlag:  'I' | 'H';

}






export class updateDetailIssueNote  {


  @ApiProperty({ example: 0, description: '' })
  @IsNumber()
  nIDid: number;

  @ApiProperty({ example: '', description: '' })
  @IsString()
  cNote:  string;

}