import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";



export class AssignBundlesReq {

  @ApiProperty({ example: '{1,2,3}', description: 'Bundle ids as PostgreSQL array string', required: true })
  @IsString()
  jFolders: string;

  @ApiProperty({ example: '{1,2,3}', description: 'Bundle detail ids as PostgreSQL array string', required: true })
  @IsString()
  jFiles: string;  // Changed to an array of integers

  @ApiProperty({ example: '', description: 'nBundleid must be a number conforming to the specified constraints', required: true })
  @IsNumber()
  nBundleid: number;  // Changed to an array of integers

  @ApiProperty({ example: '', description: 'nSectionid must be a number conforming to the specified constraints', required: true })
  @IsNumber()
  nSectionid: number;  // Changed to an array of integers

  @IsNumber()
  nMasterid?: number;
}


export class AssignCustomBundlesReq {

  @ApiProperty({ example: '[[1,`1-2`],[2,`1-2`],[3,`1-2`]]', description: '', required: true })
  @IsString()
  jFiles: string;  // Changed to an array of integers

  @ApiProperty({ example: '', description: 'nBundleid must be a number conforming to the specified constraints', required: true })
  @IsNumber()
  nBundleid: number;  // Changed to an array of integers

  @ApiProperty({ example: '', description: 'nSectionid must be a number conforming to the specified constraints', required: true })
  @IsNumber()
  nSectionid: number;  // Changed to an array of integers

  @IsNumber()
  nMasterid?: number;
}



export class AssignBundlesRes {
  msg: Number;
  value: string;
  error?: any;
  data?: any;
}

export class ViewBundlesReq {
  @ApiProperty({ example: 0, description: 'Case id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nCaseid?: Number;

  @ApiProperty({ example: 0, description: 'Case id', required: false })
  @Transform(({ value }) => value, { toClassOnly: true })
  @IsString()
  jBDids?: string;

  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;
}

export class viewBundlesRes {
  msg: Number;
  value: string;
  error?: any;
  nBundleId?: number;
  cBundlename?: string;
  nSectionid?: number;
}

export class assigncontactReq {
  @ApiProperty({ example: 0, description: 'Contact id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'Contactid must be a number conforming to the specified constraints' })
  nContactid?: Number;

  @ApiProperty({ example: '[]', description: 'Files id', required: false })
  @Transform(({ value }) => value, { toClassOnly: true })
  @IsString()
  jFiles?: string;

  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;
}

export class ViewContactReq {
  @ApiProperty({ example: '[]', description: 'Bundle id', required: false })
  @Transform(({ value }) => value, { toClassOnly: true })
  @IsString()
  jBDids?: string;

  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;
}



export class assignTaskReq {
  @ApiProperty({ example: 0, description: 'Task id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'Taskid must be a number conforming to the specified constraints' })
  nTaskid?: Number;

  @ApiProperty({ example: '[]', description: 'Files id', required: false })
  @Transform(({ value }) => value, { toClassOnly: true })
  @IsString()
  jFiles?: string;

  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;
}

export class ViewTaskReq {
  @ApiProperty({ example: '[]', description: 'Bundle id', required: false })
  @Transform(({ value }) => value, { toClassOnly: true })
  @IsString()
  jBDids?: string;

  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;
}

export class assignTagReq {
  @ApiProperty({ example: 0, description: 'Tag id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'Tagid must be a number conforming to the specified constraints' })
  nTagid?: Number;

  @ApiProperty({ example: '[]', description: 'Files id', required: false })
  @Transform(({ value }) => value, { toClassOnly: true })
  @IsString()
  jFiles?: string;

  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;
}


export class unassignTagReq {
  @ApiProperty({ example: 0, description: 'Tag id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'Tagid must be a number conforming to the specified constraints' })
  nTagid?: Number;

  @ApiProperty({ example: [], description: 'Bundle detail ids', required: false })
  @IsArray()
  @IsNumber({}, { each: true })
  jBDids?: string;

  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;
}


export class unassignTaskReq {
  @ApiProperty({ example: 0, description: 'Task id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nTaskid must be a number conforming to the specified constraints' })
  nTaskid?: Number;

  @ApiProperty({ example: [], description: 'Bundle detail ids', required: false })
  @IsArray()
  @IsNumber({}, { each: true })
  jBDids?: string;

  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;
}


export class unassignContactReq {
  @ApiProperty({ example: 0, description: 'Contact id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nContactid must be a number conforming to the specified constraints' })
  nContactid?: Number;

  @ApiProperty({ example: [], description: 'Bundle detail ids', required: false })
  @IsArray()
  @IsNumber({}, { each: true })
  jBDids?: string;

  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;
}

export class checkAssignBundleExistsReq {

  @ApiProperty({ example: 0, description: 'Section id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nSectionid must be a number conforming to the specified constraints' })
  nSectionid?: Number;

  @ApiProperty({ example: 0, description: 'Bundle id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nBundleid must be a number conforming to the specified constraints' })
  nBundleid?: Number;

  @ApiProperty({ example: '[]', description: 'Bundle detail ids', required: false })
  @IsString()
  jFiles?: string;

  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;
}
