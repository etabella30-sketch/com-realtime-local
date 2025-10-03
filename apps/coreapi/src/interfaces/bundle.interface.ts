import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";


export class SectionReq {

  @ApiProperty({ example: 0, description: 'Case id', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nCaseid: Number;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}




export class SectionRes {
  nSectionid?: Number;
  cFolder?: Number;
  cFoldertype?: Number;
  msg?: Number;
  value?: string;
  error?: any;
}




export class BundleReq {

  @ApiProperty({ example: 0, description: 'Section id', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nSectionid must be a number conforming to the specified constraints' })
  nSectionid: Number;

  @ApiProperty({ example: 0, description: 'Bundleid Number', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nBundleid must be a number conforming to the specified constraints' })
  nBundleid?: Number;

  @ApiProperty({ example: 0, description: 'Page Number', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'pageNumber must be a number conforming to the specified constraints' })
  pageNumber: Number;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}

export class BundleRes {
  nBundleid?: Number;
  nParentBundleid?: Number;
  cBundlename?: string;
  cBundletag?: string;
  msg?: Number;
  value?: string;
  error?: any;
}





export class BundleDetailReq {

  @ApiProperty({ example: 0, description: 'Section id', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nSectionid must be a number conforming to the specified constraints' })
  nSectionid: Number;

  @ApiProperty({ example: 0, description: 'Bundle id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nBundleid must be a number conforming to the specified constraints' })
  nBundleid?: Number;

  @ApiProperty({ example: 0, description: 'Page Number', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'pageNumber must be a number conforming to the specified constraints' })
  pageNumber: Number;


  @ApiProperty({ example: '', description: '', required: false })
  @IsOptional()
  @IsString()
  cSearch: string;

  @ApiProperty({ example: '', description: '', required: false })
  @IsOptional()
  @IsString()
  cFiletype: string;

  @ApiProperty({ example: '', description: '', required: false })
  @IsOptional()
  @IsString()
  searchName: string;

  @ApiProperty({ example: '', description: '', required: false })
  @IsOptional()
  @IsString()
  cSortby: string;

  @ApiProperty({ example: '', description: '', required: false })
  @IsOptional()
  @IsString()
  cSorttype: string;



  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}




export class BundleDetailRes {
  nBundledetailid?: Number;
  nBundleid?: Number;
  cName?: string;
  cTab?: string;
  cExhibitno?: string;
  cPage?: string;
  cRefpage?: string;
  cFilesize?: string;
  cFiletype?: string;
  cDescription?: string;
  msg?: Number;
  value?: string;
  error?: any;
}





export class TeamUsersReq {

  @ApiProperty({ example: 0, description: 'Case id', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nCaseid: Number;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}



export class TeamUsersRes {
  nTeamid?: Number;
  cTeamname?: string;
  cFlag?: string;
  cClr?: string;
  users?: any;
  msg?: Number;
  value?: string;
  error?: any;
}





export class BundlesPermissionReq {

  @ApiProperty({ example: 0, description: 'Bundle id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'Bundle must be a number conforming to the specified constraints' })
  nBundleid?: Number;

  @ApiProperty({ example: 0, description: 'Bundle detail id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'Bundle detail must be a number conforming to the specified constraints' })
  nBundledetailid?: Number;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}




export class BundlesPermissionRes {
  nUserid?: Number;
  msg?: Number;
  value?: string;
  error?: any;
}








export class bundleTypesReq {

  @ApiProperty({ example: 0, description: 'Section id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'Section must be a number conforming to the specified constraints' })
  nSectionid?: Number;

  @ApiProperty({ example: 0, description: 'Bundle id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'Bundle must be a number conforming to the specified constraints' })
  nBundleid?: Number;

  @ApiProperty({ example: 0, description: 'Case id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nCaseid?: Number;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}




export class bundleTypesRes {
  nUserid?: Number;
  msg?: Number;
  value?: string;
  nTotal?: Number;
  cFiletype?: string;
  error?: any;
}








export class pagginationReq {

  @ApiProperty({ example: 0, description: 'Bundle detail id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nBundledetailid must be a number conforming to the specified constraints' })
  nBundledetailid?: Number;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}




export class pagginationRes {
  nUserid?: Number;
  msg?: Number;
  value?: string;
  cPage?: Number;
  cRefpage?: Number;
  jPagination?: any;
  error?: any;
}


export class filedataReq {
  @ApiProperty({ example: 0, description: 'Bundle detail id', required: false })
  @IsOptional()
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nBundledetailid must be a number conforming to the specified constraints' })
  nBundledetailid?: Number;


  @ApiProperty({ example: '', description: 'cTab', required: false })
  @IsOptional()
  @IsString()
  cTab?: string;
  
  @ApiProperty({ example: 0, description: 'nCaseid', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsOptional()
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nCaseid?: Number;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}



export class filedataRes {
  nBundledetailid?: Number;
  cPath?: string;
  cPage?: string;
  cRefpage?: string;
  cFiletype?: string;
  msg?: Number;
  value?: string;
  error?: any;
}



export class recentFileReq {

  @ApiProperty({ example: 0, description: 'Case id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nCaseid?: Number;


  @ApiProperty({ example: 0, description: 'Section id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nSectionid must be a number conforming to the specified constraints' })
  nSectionid?: Number;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}






export class recentFileRes {
  nBundledetailid?: Number;
  cName?: string;
  cTab?: string;
  cPage?: string;
  cRefpage?: string;
  cFiletype?: string;
  msg?: Number;
  value?: string;
  error?: any;
}




export class deleteRecentReq {

  @ApiProperty({ example: 0, description: 'Case id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nCaseid?: Number;


  @ApiProperty({ example: 0, description: 'Section id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nSectionid must be a number conforming to the specified constraints' })
  nSectionid?: Number;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}


export class deleteRecentRes {
  msg?: Number;
  value?: string;
  error?: any;
}



export class BundletagReq {

  @ApiProperty({ example: 0, description: 'Section id', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nSectionid must be a number conforming to the specified constraints' })
  nSectionid: Number;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}

export class BundletagRes {
  nBundleid?: number;
  cBundletag?: string;
  msg?: Number;
  value?: string;
  error?: any;
}


export class BundletabReq {

  @ApiProperty({ example: 0, description: 'Section id', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nSectionid must be a number conforming to the specified constraints' })
  nSectionid: Number;

  @ApiProperty({ example: 0, description: 'Bundleid id', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nBundleid must be a number conforming to the specified constraints' })
  nBundleid: Number;


  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}

export class BundletabRes {
  nBundledetailid?: number;
  cTab?: string;
  cPage?: string;
  msg?: Number;
  value?: string;
  error?: any;
}

export class checkIssuetagReq {

  @ApiProperty({ example: 0, description: 'Section id', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nSectionid must be a number conforming to the specified constraints' })
  nSectionid: Number;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}


export class displayReq {

  @ApiProperty({ example: 0, description: 'Case id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nCaseid?: Number;

  @ApiProperty({ example: 0, description: 'Section id', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nSectionid must be a number conforming to the specified constraints' })
  nSectionid: Number;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}
