import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";


export class SectionBuildReq {

  @ApiProperty({ example: 0, description: 'Section id', required: false })
  @IsNumber({}, { message: 'Section must be a number conforming to the specified constraints' })
  nSectionid?: Number;


  @ApiProperty({ example: '', description: 'Folder Name', required: true })
  @IsString()
  @IsNotEmpty()
  cFolder: string;

  @ApiProperty({ example: 0, description: 'Case id', required: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  @IsNotEmpty()
  nCaseid: Number;

  @ApiProperty({ example: 'N', description: 'Permission', required: true })
  @IsString()
  @IsNotEmpty()
  permission: string;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}





export class SectionBuildRes {
  nSectionid?: Number;
  msg?: Number;
  value?: string;
  error?: any;
}



export class BundleBuildReq {

  @ApiProperty({ example: 0, description: 'Bundle id', required: false })
  @IsNumber({}, { message: 'nBundleid must be a number conforming to the specified constraints' })
  nBundleid?: Number;


  @ApiProperty({ example: 0, description: 'Section id', required: true })
  @IsNumber({}, { message: 'Section must be a number conforming to the specified constraints' })
  nSectionid: Number;


  @ApiProperty({ example: '', description: 'Bundle Name', required: true })
  @IsString()
  @IsNotEmpty()
  cBundlename: string;


  @ApiProperty({ example: 0, description: 'Pparent Bundle id', required: false })
  @IsNumber({}, { message: 'nParentBundleid must be a number conforming to the specified constraints' })
  nParentBundleid?: Number;

  @ApiProperty({ example: 0, description: 'Case id', required: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  @IsNotEmpty()
  nCaseid: Number;

  @ApiProperty({ example: 'N', description: 'Permission', required: true })
  @IsString()
  @IsNotEmpty()
  permission: string;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}




export class BundleBuildRes {
  nBundleid?: Number;
  msg?: Number;
  value?: string;
  error?: any;
}





export class FileRenameReq {

  @ApiProperty({ example: 0, description: 'Bundle id', required: false })
  @IsNumber({}, { message: 'nBundleid must be a number conforming to the specified constraints' })
  nBundleid?: Number;


  @ApiProperty({ example: 0, description: 'Section id', required: true })
  @IsNumber({}, { message: 'Section must be a number conforming to the specified constraints' })
  nSectionid: Number;


  @ApiProperty({ example: 0, description: 'Bundle id', required: true })
  @IsNumber({}, { message: 'nBundleid must be a number conforming to the specified constraints' })
  nBundledetailid?: Number;

  @ApiProperty({ example: '', description: 'File Name', required: true })
  @IsString()
  @IsNotEmpty()
  cFilename: string;


  @ApiProperty({ example: 0, description: 'Case id', required: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  @IsNotEmpty()
  nCaseid: Number;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}



export class FileRenameRes {
  msg?: Number;
  value?: string;
  error?: any;
}




export class PermissionReq {

  @ApiProperty({ example: 0, description: 'Bundle id', required: false })
  @IsNumber({}, { message: 'nBundleid must be a number conforming to the specified constraints' })
  nBundleid?: Number;

  @ApiProperty({ example: 0, description: 'Bundle id', required: true })
  @IsNumber({}, { message: 'nBundleid must be a number conforming to the specified constraints' })
  nBundledetailid?: Number;

  @ApiProperty({ example: 0, description: 'User id', required: true })
  @IsNumber({}, { message: 'nUserid must be a number conforming to the specified constraints' })
  nUserid: Number;

  @ApiProperty({ example: 0, description: 'Team id', required: true })
  @IsNumber({}, { message: 'nTeamid must be a number conforming to the specified constraints' })
  nTeamid: Number;

  @ApiProperty({ example: true, description: 'Bundle id', required: true })
  @IsBoolean()
  bPermit?: boolean;

  @ApiProperty({ example: 0, description: 'Case id', required: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  @IsNotEmpty()
  nCaseid: Number;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}

export class PermissionRes {
  msg?: Number;
  value?: string;
  error?: any;
}






export class DeleteBundlesReq {

  @ApiProperty({ example: '{1,2,3}', description: 'Bundle ids as PostgreSQL array string', required: true })
  @IsString()
  jFolders: string;

  @ApiProperty({ example: '{1,2,3}', description: 'Bundle detail ids as PostgreSQL array string', required: true })
  @IsString()
  jFiles: string;  // Changed to an array of integers

  @IsNumber()
  nMasterid?: number;
}



export class PasteBundlesReq {

  @ApiProperty({ example: '{1,2,3}', description: 'Bundle ids as PostgreSQL array string', required: true })
  @IsString()
  jFolders: string;

  @ApiProperty({ example: '{1,2,3}', description: 'Bundle detail ids as PostgreSQL array string', required: true })
  @IsString()
  jFiles: string;  // Changed to an array of integers


  @ApiProperty({ example: 'Cut/Copy', description: 'type Cut/Copy must be a number string conforming to the specified constraints', required: true })
  @IsString()
  type: string;  // Changed to an array of integers

  @ApiProperty({ example: '', description: 'nBundleid must be a number conforming to the specified constraints', required: true })
  @IsNumber()
  nBundleid: number;  // Changed to an array of integers

  @ApiProperty({ example: '', description: 'nSectionid must be a number conforming to the specified constraints', required: true })
  @IsNumber()
  nSectionid: number;  // Changed to an array of integers



  @IsNumber()
  nMasterid?: number;
}



export class UndoBundlesReq {

  @ApiProperty({ example: '{1,2,3}/[[1,2],[2,3]]', description: 'Bundle ids as PostgreSQL array string', required: true })
  @IsString()
  jFolders: any;

  @ApiProperty({ example: '{1,2,3}/[[1,2],[2,3]]', description: 'Bundle detail ids as PostgreSQL array string', required: true })
  @IsString()
  jFiles: any;  // Changed to an array of integers

  @ApiProperty({ example: 'Cut/Copy', description: 'type Cut/Copy must be a number string conforming to the specified constraints', required: true })
  @IsString()
  type: string;  // Changed to an array of integers

  @ApiProperty({ example: '', description: 'nBundleid must be a number conforming to the specified constraints', required: true })
  @IsNumber()
  nBundleid: number;  // Changed to an array of integers

  @ApiProperty({ example: '', description: 'nSectionid must be a number conforming to the specified constraints', required: true })
  @IsNumber()
  nSectionid: number;  // Changed to an array of integers

  @IsNumber()
  nMasterid?: number;
}


/*
class BundleMaster {
  @ApiProperty({ example: 0, description: 'Bundle id', required: true })
  @IsNumber()
  id: number;
}


class BundleDetail {
  @ApiProperty({ example: 0, description: 'BundleDetail id', required: true })
  @IsNumber()
  id: number;
}

export class DeleteBundlesReq {

  @ApiProperty({ type: [BundleMaster], description: 'User Details', required: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BundleMaster)
  jFolders: BundleMaster[];

  @ApiProperty({ type: [BundleDetail], description: 'User Details', required: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BundleDetail)
  jFiles: BundleDetail[];

  @IsNumber()
  nMasterid?: number;
}*/

export class DeleteBundlesRes {
  msg: Number;
  value: string;
  error?: any;
}


export class PasteBundlesRes {
  msg: Number;
  value: string;
  error?: any;
  data?: any;
}


export class UndoBundlesRes {
  msg: Number;
  value: string;
  error?: any;
}






export class updateBundleDetailReq {

  @ApiProperty({ example: 0, description: 'Bundle detail id', required: false })
  @IsNumber({}, { message: 'nBundledetailid must be a number conforming to the specified constraints' })
  nBundledetailid?: Number;

  @ApiProperty({ example: '', description: 'Exhibit no', required: true })
  @IsString()
  cExhibitno: string;

  @ApiProperty({ example: '', description: 'File name', required: true })
  @IsString()
  cFilename: string;

  @ApiProperty({ example: '', description: 'Description', required: true })
  @IsString()
  cDescription: string;

  @ApiProperty({ example: '', description: 'Interest date', required: true })
  @IsString()
  dIntrestDt: string;

  @ApiProperty({ example: '', description: 'Tab date', required: true })
  @IsString()
  cTab: string;


  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}


export class updateBundleDetailRes {
  msg: Number;
  value: string;
  error?: any;
}







export class updateBundleReq {

  @ApiProperty({ example: 0, description: 'Bundle id', required: false })
  @IsNumber({}, { message: 'nBundleid must be a number conforming to the specified constraints' })
  nBundleid?: Number;

  @ApiProperty({ example: '', description: 'Bundle tag', required: true })
  @IsString()
  @IsNotEmpty()
  cBundletag: string;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}



export class updateTabReq {

  @ApiProperty({ example: 0, description: 'Bundle detail id', required: false })
  @IsNumber({}, { message: 'nBundledetailid must be a number conforming to the specified constraints' })
  nBundledetailid?: Number;

  @ApiProperty({ example: '', description: 'bundles', required: true })
  @IsString()
  @IsNotEmpty()
  bundle: string;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}


export class updateBundleRes {
  msg: Number;
  value: string;
  error?: any;
  data?: any;
}




export class UserSectionBuildReq {

  @ApiProperty({ example: 0, description: 'Section id', required: false })
  @IsNumber({}, { message: 'Section must be a number conforming to the specified constraints' })
  nSectionid?: Number;


  @ApiProperty({ example: '', description: 'Folder Name', required: true })
  @IsString()
  @IsNotEmpty()
  cFolder: string;


  @ApiProperty({ example: '', description: 'Folder Type', required: true })
  @IsString()
  @IsNotEmpty()
  cFoldertype: string;


  @ApiProperty({ example: 0, description: 'Case id', required: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  @IsNotEmpty()
  nCaseid: Number;

  @ApiProperty({ example: 'N', description: 'Permission', required: true })
  @IsString()
  @IsNotEmpty()
  permission: string;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}
