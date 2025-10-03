import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import exp from "constants";

export class batchdownloadReq {

    @ApiProperty({ example: 1, description: 'is apply to all', required: true })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
    nCaseid?: Number;

    @ApiProperty({ example: 1, description: 'is apply to all', required: true })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nSectionid must be a number conforming to the specified constraints' })
    nSectionid?: Number;

    @ApiProperty({ example: '{1, 2, 3, 4}', description: 'is apply to all', required: false })
    @IsOptional()
    @IsString()
    cBundleids?: string;

    @ApiProperty({ example: 'example.xlsx', description: 'is apply to all', required: true })
    @IsString()
    cFilename: string;


    @ApiProperty({ example: '["Tab","cTab"],["Name","cFilename"],["Date of Interest","dIntrestDt"],["Description","cDescription"],["Page","cRefpage"],["Exhibit","cExhibitno"]', description: '' })
    @IsString()
    column: string;

    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
    nMasterid?: Number;
}



export class batchColumnReq {

    @ApiProperty({ example: 1, description: 'is apply to all', required: true })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
    nCaseid?: Number;

    @ApiProperty({ example: 1, description: 'is apply to all', required: true })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nSectionid must be a number conforming to the specified constraints' })
    nSectionid?: Number;

    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
    nMasterid?: Number;
}


export class batchDwdpathReq {

    @ApiProperty({ example: '', description: 'is apply to all', required: true })
    @IsString()
    cPath?: string;

    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
    nMasterid?: Number;
}

export class batchUploadReq {

    @ApiProperty({ example: 1, description: 'is apply to all', required: true })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
    nCaseid?: Number;

    @ApiProperty({ example: 1, description: 'is apply to all', required: true })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nSectionid must be a number conforming to the specified constraints' })
    nSectionid?: Number;

    @ApiProperty({ example: '', description: 'is apply to all', required: true })
    @IsString()
    cPath?: string;

    @ApiProperty({ example: '["Tab","cTab"],["Name","cFilename"],["Date of Interest","dIntrestDt"],["Description","cDescription"],["Page","cRefpage"],["Exhibit","cExhibitno"]', description: '' })
    @IsString()
    column: string;


    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
    nMasterid?: Number;

}



export class batchdownloadRes {
    msg?: Number;
    value?: string;
    error?: any;
    data?: any;
}



export class batchLogReq {

    @ApiProperty({ example: 1, description: 'is apply to all', required: true })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
    nCaseid?: Number;

    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
    nMasterid?: Number;

}

export class batchLogDetailReq {

    @ApiProperty({ example: 1, description: 'is apply to all', required: true })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nBlogid must be a number conforming to the specified constraints' })
    nBlogid?: Number;


    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
    nMasterid?: Number;
}


export class batchLogRes {
    cBatchno?: string;
    nBlogid?: number;
    cFilename?: string;
    cColumn?: string;
    cStatus?: string;
    dUpdateDt?: string;
    msg?: Number;
    value?: string;
    error?: any;
}