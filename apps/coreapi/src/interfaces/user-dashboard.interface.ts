import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class userCaseListReq {
  @ApiProperty({ example: 1, description: '' })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'pageNumber must be a number conforming to the specified constraints' })
  pageNumber: Number;

  @IsOptional()
  @IsNumber()
  ref?: Number;

  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;
}


export class userCaseListResponce {
  msg: number;
  value?: string;
  error?: any;
  nCaseid?: Number;
  cCasename?: string;
  cCaseno?: string;
  dUpdateDt?: string;
}

export class dashInfoReq {

  @IsOptional()
  @IsNumber()
  ref?: Number;

  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;
}


