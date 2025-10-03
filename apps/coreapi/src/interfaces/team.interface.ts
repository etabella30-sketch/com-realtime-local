import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, isNumber, isString } from "class-validator";

export class CaseTeamReq {

  @ApiProperty({ example: 0, description: 'Case ID' })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nCaseid: number;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  nMasterid?: Number;

  ref?: Number;
}


export class CaseUserReq {

  @ApiProperty({ example: 0, description: 'Case ID' })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nCaseid: number;


  @ApiProperty({ example: 0, description: 'Page No' })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'pageNumber must be a number conforming to the specified constraints' })
  pageNumber: number;


  @ApiProperty({ example: 0, description: 'Team id', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsOptional()
  @IsNumber({}, { message: 'nTeamid must be a number conforming to the specified constraints' })
  nTeamid?: number;


  @ApiProperty({ example: 0, description: 'Last name', required: false })
  @IsOptional()
  @IsString()
  cLname?: string;



  @ApiProperty({ example: '', description: 'Search', required: false })
  @IsOptional()
  @IsString()
  searchText?: string;



  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  nMasterid?: Number;

  ref?: Number;
}



export class teamListResonce {
  msg: number;
  value?: string;
  error?: any;
  nCaseid?: Number;
  cCasename?: string;
  cCaseno?: string;
  cClaimant?: string;
  cRespondent?: string;
  cIndexheader?: string;
  cDesc?: string;
}


export class CaseUserInfoReq {
  @ApiProperty({ example: 0, description: 'Case ID' })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nCaseid?: number;


  @ApiProperty({ example: 0, description: 'Userid ID' })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nUserid must be a number conforming to the specified constraints' })
  nUserid: number;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  nMasterid?: Number
}

export class CaseUserInfoRes {
  msg: number;
  value?: string;
  error?: any;
  nUserid?: Number;
  cFname?: string;
  cLname?: string;
  cEmail?: string;
  nRoleid?: Number;
  cProfile?: string;
  nTZid?: Number;
  nTeamid?: Number;
}

export class TimeZoneRes {
  msg: number;
  value?: string;
  error?: any;

  nValue?: Number;
  cKey?: string;
  jOther?: any;
}

export class TeamComboRes {
  msg: number;
  value?: string;
  error?: any;

  nTeamid?: Number;
  cTeamname?: string;
  cFlag?: string;
}



export class RoleListRes {
  msg: number;
  value?: string;
  error?: any;

  nRoleid?: Number;
  cRole?: string;
  cRStatus?: string;
}




export class UserListRes {
  msg: number;
  value?: string;
  error?: any;

  nUserid?: Number;
  cFname?: string;
  cLname?: string;
  cProfile?: string;
  nTeamid?:number;
  nRoleid?:number;
}





export class assignedUsersReq {

  @ApiProperty({ example: 0, description: 'Case ID' })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nCaseid: number;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  nMasterid?: Number;

  ref?: Number;
}







export class assignedUsersRes {
  msg: number;
  value?: string;
  error?: any;

  u?: Number;
  t?: Number;
}