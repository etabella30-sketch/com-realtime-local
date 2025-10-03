import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional } from "class-validator";

export class CaseListReq {
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

export class CaseListResponce {
  msg: number;
  value?: string;
  error?: any;
  nCaseid?: Number;
  cCasename?: string;
  cCaseno?: string;
  dUpdateDt?: string;
}

export class archiveCaseReq {
  @ApiProperty({ example: 0, description: 'Case id', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nCaseid: Number;

  @ApiProperty({ example: false, description: 'is Archived', required: false })
  @IsBoolean()
  bIsarchived: Boolean;

  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;
}


export class archiveCaseRes {
  msg: number;
  value?: string;
  error?: any;
}
