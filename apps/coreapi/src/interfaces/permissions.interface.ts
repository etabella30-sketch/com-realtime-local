import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsString, isBoolean } from "class-validator";



export class rolePermissionReq {

  @ApiProperty({ example: 0, description: 'Case id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nCaseid: Number;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;


  @IsOptional()
  @IsNumber()
  ref?: Number;

}



export class roleStatusReq {
  @ApiProperty({ example: 0, description: 'Case id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nCaseid: Number;

  @ApiProperty({ example: 0, description: 'Role id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nRoleid must be a number conforming to the specified constraints' })
  nRoleid: Number;

  @ApiProperty({ example: 'A', description: 'Status', required: false })
  @IsString()
  cStatus: string;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;
}

export class roleStatusRes {
  msg: number;
  value?: string;
  error?: any;
}





export class roleModuleReq {

  @ApiProperty({ example: 0, description: 'Case id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nCaseid: Number;

  @ApiProperty({ example: 0, description: 'Role id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nRoleid must be a number conforming to the specified constraints' })
  nRoleid: Number;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}




export class roleModuleRes {
  msg?: Number;
  error?: any;
  value?: string;
  nPMid?: Number;
  cModule?: string;
  bValue?: boolean;
}

export class userModuleReq {

  @ApiProperty({ example: 0, description: 'Case id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nCaseid: Number;

  @ApiProperty({ example: 0, description: 'User id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nUserid must be a number conforming to the specified constraints' })
  nUserid: Number;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}

export class userModuleRes {
  msg?: Number;
  error?: any;
  value?: string;
  nPMid?: Number;
  cModule?: string;
  bValue?: boolean;
}



export class roleModuleUpdateReq {

  @ApiProperty({ example: 0, description: 'Case id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nCaseid: Number;

  @ApiProperty({ example: 0, description: 'Role id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsOptional()
  @IsNumber({}, { message: 'nRoleid must be a number conforming to the specified constraints' })
  nRoleid?: Number;

  @ApiProperty({ example: 0, description: 'Userid id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsOptional()
  @IsNumber({}, { message: 'nUserid must be a number conforming to the specified constraints' })
  nUserid?: Number;

  @ApiProperty({ example: 0, description: 'Permissin module id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nPMid must be a number conforming to the specified constraints' })
  nPMid: Number;


  @ApiProperty({ example: false, description: 'Value', required: false })
  @IsBoolean()
  bValue: Number;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}


export class roleModuleUpdateRes {
  msg?: Number;
  error?: any;
  value?: string;
}




export class userPermissionReq {

  @ApiProperty({ example: 0, description: 'Case id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nCaseid: Number;


  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

  @IsOptional()
  @IsNumber()
  ref?: Number;
}





export class userStatusReq {

  @ApiProperty({ example: 0, description: 'Case id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nCaseid: Number;

  @ApiProperty({ example: 0, description: 'User id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nUserid must be a number conforming to the specified constraints' })
  nUserid: Number;

  @ApiProperty({ example: 'A', description: 'Status', required: false })
  @IsString()
  cStatus: string;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}




export class userStatusRes {
  msg?: Number;
  error?: any;
  value?: string;
}







export class userQuotaReq {

  @ApiProperty({ example: 0, description: 'Case id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nCaseid: Number;

  @ApiProperty({ example: 0, description: 'User id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nUserid must be a number conforming to the specified constraints' })
  nUserid: Number;

  @ApiProperty({ example: 0, description: 'Quota', required: false })
  @IsNumber()
  nQuota?: Number;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}

export class userQuotaRes {
  msg?: Number;
  error?: any;
  value?: string;
}


