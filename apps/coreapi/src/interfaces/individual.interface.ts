import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";


export class fetchTabDataReq {

  @ApiProperty({ example: '[123, 142]', description: 'jFiles', required: true })
  @IsString()
  jFiles: number[];

  // @ApiProperty({ example: [123, 142], description: 'jFiles', required: true })
  // @IsArray()
  // @IsNumber({}, { each: true })
  // @Type(() => Number) // Transform each item in the array to a number
  // jFiles: number[];

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}



export class getTabReq {


  @ApiProperty({ example: 1, description: 'Bundledetailid' })
  @Transform(({ value }) => (value === null || value === undefined) ? 0 : Number(value))
  @IsNumber()
  nBundledetailid: number;


  @ApiProperty({ example: 'N', description: 'cFlag like P/N' })
  @IsString()
  cFlag: string;


  @ApiProperty({ example: '[1,2]', description: 'cFlag like P/N' })
  @IsString()
  jAvoid: string;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}
export class DocinfoReq {


  @ApiProperty({ example: 1, description: 'Bundledetailid' })
  @Transform(({ value }) => (value === null || value === undefined) ? 0 : Number(value))
  @IsNumber()
  nBundledetailid: number;


  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}


export class DocinfoRes {
  nBundledetailid?: number;
  nBundleid?: number;
  cFilename?: string;
  cPath?: any;
  cBundle?: string | null;
  cPage?: string;
  cRefpage?: string;
  cFiletype?: string;
  cTab?: string;
  cExihibitno?: string;
  msg?: number;
  value?: string;
  error?: any;
}



export class updateBundleDetailRotation{
  
  @ApiProperty({ example: 1, description: 'Bundledetailid' })
  @IsNumber()
  nBundledetailid: number;

  @ApiProperty({ example: 1, description: 'nRotate' })
  @IsNumber()
  nRotate: number;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}