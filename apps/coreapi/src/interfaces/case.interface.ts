import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, isNumber } from "class-validator";

export class CaseModal {

  @ApiProperty({ example: '', description: '' })
  @Transform(({ value }) => (value === null || value === undefined) ? 0 : Number(value))
  @IsNumber()
  nCaseid: Number;

  @ApiProperty({ example: '', description: '' })
  @IsString()
  @IsNotEmpty()
  cCasename: string;

  @ApiProperty({ example: '', description: '' })
  @IsString()
  @IsNotEmpty()
  cCaseno: string;

  @ApiProperty({ example: '', description: '' })
  @IsString()
  @IsNotEmpty()
  cDesc: string;

  @ApiProperty({ example: '', description: '' })
  @IsOptional()
  @IsString()
  cIndexheader: string;

  @ApiProperty({ example: '', description: '' })
  @IsOptional()
  @IsString()
  cClaimant: string;

  @ApiProperty({ example: '', description: '' })
  @IsOptional()
  @IsString()
  cRespondent: string;


  @ApiProperty({ example: '', description: '' })
  @IsString()
  permission: string;

  @IsNumber()
  nMasterid: Number;

}


export class CaseCreationResonce {
  msg: Number;
  value: string;
  nCaseid?: Number
  error?: any
}



export class CaseDetailReq {

  @ApiProperty({ example: 0, description: '' })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nCaseid: Number;


  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;
}

export class CaseDetailResponce {
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


export class CaseDeleteReq {
  @ApiProperty({ example: 0, description: '' })
  @IsNumber()
  nCaseid: Number;

  @IsNumber()
  nMasterid?: Number;
}


export class CaseDeleteRes {
  msg: Number;
  value: string;
  error?: any;
}