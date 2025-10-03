import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsBoolean, IsNumber, IsObject, IsOptional, IsString, isBoolean, isNumber, isString } from "class-validator";

export class InsertDoc {
    @ApiProperty({ example: 1, description: 'Unique identifier for the database entry' })
    @IsNumber()
    nBDid: number;

    @ApiProperty({ example: '', description: 'Array of strings' })
    @IsString({ each: true })
    jLT: string;

    @ApiProperty({ example: '[{}, {}]', description: 'Array of objects' })
    @IsString()
    jAn: string;

    @ApiProperty({ example: '[[22, {}, [{}]]]', description: 'Array of arrays containing mixed types' })
    @IsString()
    jDl: string;

    @ApiProperty({ example: '[1, 2, 3]', description: 'Array of team IDs' })
    @IsString()
    jUsers: string;


    @ApiProperty({ example: 'S', description: 'Type as a string' })
    @IsString()
    cType: string;


    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
    nMasterid?: Number;
}


export class resInsertDoc {
    msg: number;
    value?: string;
    nDocid?: any;
    error?: any;
}

export class docID {
    @ApiProperty({ example: 1, description: 'Unique identifier for the database entry' })
    @IsNumber()
    nDocid: number;

    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
    nMasterid?: Number;
}


export class docIDmulti {
    @ApiProperty({ example: "{1, 2, 3}", description: 'Array of team IDs' })
    @IsArray()
    @IsNumber({}, { each: true })
    jDocids: string;

    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
    nMasterid?: Number;
}