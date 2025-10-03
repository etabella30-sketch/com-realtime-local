import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";

export class TagCreateReq {


    @ApiProperty({ example: 1, description: 'Task ID', required: false })
    @Transform(({ value }) => (value === null || value === undefined) ? 0 : Number(value))
    @IsNumber()
    @IsOptional()
    nTagid: number;

    @ApiProperty({ example: '', description: 'Tag', required: true })
    @IsString()
    cTag?: string;

    @ApiProperty({ example: '', description: 'Subtag', required: false })
    @IsString()
    cSubtag?: string;

    @ApiProperty({ example: '', description: 'Color', required: false })
    @IsString()
    cClr?: string;

    @ApiProperty({ example: '', description: 'Color', required: false })
    @IsString()
    cDesc?: string;


    @ApiProperty({ example: 1, description: 'Parenttag ID' })
    @IsNumber()
    @IsOptional()
    nParenttagid: number;

    @ApiProperty({ example: 'N', description: 'Permission', required: true })
    @IsString()
    permission?: string;


    @ApiProperty({ example: 1, description: 'Case ID' })
    @IsNumber()
    nCaseid: number;

    @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
    nMasterid?: Number;
}


export class TagCreateRes {
    nTagid?: number;
    msg?: number;
    value?: string;
    error?: any;
}

export class TagReq {

    @ApiProperty({ example: 1, description: 'Case ID' })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber()
    nCaseid: number;

    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
    nMasterid?: Number;
}

