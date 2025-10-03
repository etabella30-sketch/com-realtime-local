import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString, isString, IsNotEmpty } from 'class-validator';


export class ComboCodeReq {
  @ApiProperty({ example: 4, description: '' })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nCategoryid must be a number conforming to the specified constraints' })
  nCategoryid: Number;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid: Number;

}


export class ComboCodeRes {
  nValue?: number;
  cKey?: string;
  jObject?: any;
  nSerialno?: number;
  msg?: number;
  value?: string;
  error?: any;
}



export class IssuelistReq {


  @ApiProperty({ example: 1, description: 'nCaseid' })
  @Transform(({ value }) => (value === null || value === undefined) ? 0 : Number(value))
  @IsNumber()
  nCaseid: number;


  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}



export class IssuelistRes {
  nIid?: number;
  cIName?: string;
  cColor?: string;
  nICid?: number;
  cCategory?: string;
  msg?: number;
  value?: string;
  error?: any;
}




export class UserlistReq {


  @ApiProperty({ example: 1, description: 'nCaseid' })
  @Transform(({ value }) => (value === null || value === undefined) ? 0 : Number(value))
  @IsNumber()
  nCaseid: number;


  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}


export class UserlistRes {
  nUserid?: number;
  cFname?: string;
  cLname?: string;
  cProfile?: number;
  msg?: number;
  value?: string;
  error?: any;
}


export class annotReq {


  @ApiProperty({ example: 1, description: 'nBundledetailid' })
  @Transform(({ value }) => (value === null || value === undefined) ? 0 : Number(value))
  @IsNumber()
  nBundledetailid: number;


  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}

export class annotRes {
  nAId?: number;
  uuid?: string;
  type?: string;
  rects?: string;
  lines?: string;
  width?: string;
  cClr?: string;
  page?: string;
  nFSid?: number;
  nDocid?: number;
  nWebid?: number;  
  msg?: number;
  value?: string;
  error?: any;
}




export class getcoloridMDL {


  @ApiProperty({ example: '[]', description: 'Issue IDs', required: true })
  @IsString()
  jIids: string;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}

