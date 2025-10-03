import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsBoolean, IsNumber, IsObject, IsOptional, IsString, isNumber } from 'class-validator';


export class jPaginationobj {
    @ApiProperty({ example: '#fff', description: 'Background color' })
    @IsString()
    bc: string;

    @ApiProperty({ example: '#000', description: 'Font color' })
    @IsString()
    fc: string;

    @ApiProperty({ example: '16', description: 'Font size' })
    @IsString()
    fs: string;

    @ApiProperty({ example: 'arial', description: 'Font type' })
    @IsString()
    ft: string;

    @ApiProperty({ example: false, description: 'Hide pagination' })
    @IsBoolean()
    isHide: boolean;

    @ApiProperty({ example: 'BR', description: 'Position of pagination' })
    @IsString()
    position: string;
}



export class getpaginationReq {
    @ApiProperty({ example: 1, description: '' })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
    nCaseid: Number;

    @ApiProperty({ example: 0, description: '', required: false })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nPtaskid must be a number conforming to the specified constraints' })
    @IsOptional()
    nPtaskid?: Number;


    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
    nMasterid?: Number;
}


export class paginationReq {
    @ApiProperty({ example: 1, description: '' })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nSectionid must be a number conforming to the specified constraints' })
    nSectionid: Number;

    @ApiProperty({ example: 1, description: '' })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nBundleid must be a number conforming to the specified constraints' })
    nBundleid: Number;

    @ApiProperty({ example: 1, description: '', required: true })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nBundleid must be a number conforming to the specified constraints' })
    nBundledetailid: Number;

    @ApiProperty({ example: '1-1', description: '', required: false })
    @IsString()
    @IsOptional()
    cRefpage: String;

    @ApiProperty({ example: { "bc": "#fff", "fc": "#000", "fs": "16", "ft": "arial", "isHide": false, "position": "BR" }, description: '', required: false })
    @IsObject()
    jPagination: object;

    @ApiProperty({ example: false, description: 'is apply to all', required: false })
    @IsBoolean()
    bApplyall: boolean;

    @ApiProperty({ example: false, description: 'is cover page', required: false })
    @IsBoolean()
    bPagedefault: boolean;

    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
    nMasterid?: Number;
}



export class paginationRes {
    msg?: Number;
    value?: string;
    error?: any;
    data?: any;
}




export class getpaginationRes {
    msg?: Number;
    value?: string;
    error?: any;
    total_prog?: Number;
    comp_progres?: number;
    nPtaskid?: number;
    nCaseid?: number;
    cStatus?: string;
    jIds?: number[];
}


export class stoppaginationReq {
    @ApiProperty({ example: 1, description: '' })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nPtaskid must be a number conforming to the specified constraints' })
    nPtaskid: Number;

    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
    nMasterid?: Number;
}


