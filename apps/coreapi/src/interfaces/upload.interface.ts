import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";


export class caseDetailMDL {

  @ApiProperty({ example: 1, description: '' })
  @IsString()
  nCaseid: Number;

  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}


export class sectionDetailMDL {

  @ApiProperty({ example: 1, description: '' })
  @IsString()
  nSectionid: Number;

  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}




export class bundleDetailMDL {

  @ApiProperty({ example: 1, description: '' })
  @IsString()
  nBundleid: Number;

  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;


}






export class checkDuplicacyMDL {

  @ApiProperty({ example: 1, description: '' })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nCaseid: Number;

  @ApiProperty({ example: 1, description: '' })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nSectionid: Number;

  @ApiProperty({ example: 1, description: '' })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nBundleid: Number;


  @ApiProperty({ example: 1, description: '' })
  @IsNumber({}, { message: 'nUPid must be a number conforming to the specified constraints' })
  nUPid: Number;

  @ApiProperty({ example: [[1, 2, 'dsf', true]], description: '' })
  @IsString()
  d: string;

  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;


}


export class uploadSummaryMDL {


  @ApiProperty({ example: 0, description: '',required:false })
  @IsOptional()
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nUPid: string;


  @ApiProperty({ example: 1, description: '' })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nCaseid: Number;


  @ApiProperty({ example: 'C', description: '',required:false })
  @IsOptional()
  @IsString()
  cStatus: string;

  @ApiProperty({ example: '', description: '',required:false })
  @IsOptional()
  @IsString()
  cSearch: string;

  
  @ApiProperty({ example: '', description: '',required:false })
  @IsOptional()
  @IsString()
  dDate: string;


  @ApiProperty({ example: 'PDF', description: '',required:false })
  @IsOptional()
  @IsString()
  cFiletype: string;


  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}




export class uploadDetailMDL {

  @ApiProperty({ example: 1, description: '' })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nUPid must be a number conforming to the specified constraints' })
  nUPid: Number;


  @ApiProperty({ example: 'C', description: '' })
  @IsOptional()
  @IsString()
  cStatus: string;



  @ApiProperty({ example: '', description: '' })
  @IsOptional()
  @IsString()
  dDate: string;


  @ApiProperty({ example: 'PDF', description: '' })
  @IsOptional()
  @IsString()
  cFiletype: string;



  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}







export class replaceMDL {

  @ApiProperty({ example: 1, description: '' })
  @IsNumber({}, { message: 'nUDid must be a number conforming to the specified constraints' })
  nUDid: Number;


  @ApiProperty({ example: '', description: '' })
  @IsString()
  cName: string;

  
  @ApiProperty({ example: '', description: '' })
  @IsString()
  cSize: string;
  
  @ApiProperty({ example: '', description: '' })
  @IsString()
  cType: string;

  
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;


}








export class clearCompleteMDL {


  @ApiProperty({ example: 1, description: '' })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nCaseid: Number;
  
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;


}
