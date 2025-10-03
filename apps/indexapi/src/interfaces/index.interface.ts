import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsString, isObject } from "class-validator";



export class fileListReq {
    @ApiProperty({ example: 1, description: '' })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
    nCaseid: Number;

    @ApiProperty({ example: 1, description: '' })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nSectionid must be a number conforming to the specified constraints' })
    nSectionid: Number;


    @ApiProperty({ example: 'T', description: '' })
    @IsString()
    cHyperlinktype: string;



    @ApiProperty({ example: '["Tab","cTab",80],["Name","cFilename","*"],["Date of Interest","dIntrestDt",75],["Description","cDescription",80],["Page","cRefpage",40],["Exhibit","cExhibitno",75]', description: '' })
    @IsString()
    column: string;


    @ApiProperty({ example: false, description: 'Cover page' })
    // @Transform(({ value }) => value, { toClassOnly: true })
    @IsBoolean()
    bCoverpg?: boolean;

    @ApiProperty({ example: false, description: 'Index page' })
    // @Transform(({ value }) => value, { toClassOnly: true })
    @IsBoolean()
    bIndexpg?: boolean;

    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
    nMasterid?: Number;
}


export class updateIndexReq {
    @ApiProperty({ example: 1, description: '' })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
    nCaseid: number;

    @ApiProperty({ example: 1, description: '' })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nSectionid must be a number conforming to the specified constraints' })
    nSectionid: number;

    @ApiProperty({ example: 'doc/Case22/index.pdf', description: '' })
    @IsString()
    cPath: string;


    @ApiProperty({ example: 2, description: '' })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nPage must be a number conforming to the specified constraints' })
    nPage: number;


    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
    @IsOptional()
    nMasterid?: number;
}

export class fileListRes {
    msg: number;
    value?: string;
    error?: any;
    casedetail?: any;
    bundlelist?: any;
    // nCaseid?: Number;
    // cCasename?: string;
    // cCaseno?: string;
    // dUpdateDt?: string;
}