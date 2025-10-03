import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsBoolean, IsNumber, IsObject, IsOptional, IsString, isBoolean, isNumber, isString } from "class-validator";

export class InsertFact {

    @ApiProperty({ example: 1, description: 'Unique identifier for the database entry', required: false })
    @IsNumber()
    @IsOptional()
    nQFSid?: number;

    @ApiProperty({ example: 1, description: 'Bundle Detail id ' })
    @IsNumber()
    nBDid: number;

    @ApiProperty({ example: '["example1", "example2"]', description: 'Array of strings', required: false })
    @IsString()
    jT: string;

    @ApiProperty({ example: '["example1", "example2"]', description: 'Array of strings', required: false })
    @IsString()
    jOT: string;

    @ApiProperty({ example: '[{}, {}]', description: 'Array of objects', required: false })
    @IsString()
    jAn: string;

    @ApiProperty({ example: 1, description: 'File type', required: false })
    @IsNumber()
    nFt: number;

    @ApiProperty({ example: 1, description: 'State number', required: false })
    @IsNumber()
    nSt: number;

    @ApiProperty({ example: '[[22, {}, [{}]]]', description: 'Array of arrays containing mixed types', required: false })
    @IsString()
    jFl: string;

    @ApiProperty({ example: 1, description: 'Timezone identifier', required: false })
    @IsNumber()
    nTZid: number;

    @ApiProperty({ example: 1, description: 'Color id', required: false })
    @IsNumber()
    nColorid: number;


    @ApiProperty({ example: '[{}]', description: 'Array of date objects', required: false })
    @IsString()
    jDate: string;

    @ApiProperty({ example: '[[1, 2, 3], [1, 4, 3]]', description: 'Array of arrays of numbers' })
    @IsString()
    jIssues: string;

    @ApiProperty({ example: '[1, 2, 3]', description: 'Array of contact IDs', required: false })
    @IsString()
    jContacts: string;

    @ApiProperty({ example: '[1, 2, 3]', description: 'Array of task IDs', required: false })
    @IsString()
    jTasks: string;

    @ApiProperty({ example: '[1, 2, 3]', description: 'Array of team IDs', required: false })
    @IsString()
    jUsers: string;


    @ApiProperty({ example: 'S', description: 'Type as a string' })
    @IsString()
    cType: string;

    @ApiProperty({ example: 'F', description: 'File type as a string' })
    @IsString()
    cFtype: string;


    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
    nMasterid?: Number;
}


export class resInsertFact {
    msg: number;
    value?: string;
    nFSid?: number;
    color?: string;
    error?: any;
}


export class resInsertData {
    msg: number;
    value?: string;
    error?: any;
    data?: any;
}




export class factDetailSingle {
    @ApiProperty({ example: 0, description: 'nFSid must be a number' })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber()
    nFSid: number;

    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
    nMasterid?: Number;
}


export class factDetail {

    @ApiProperty({ example: "[1, 2, 3]", description: 'Array of team IDs' })
    @IsString()
    jFSids: string;


    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
    nMasterid?: Number;
}



export class InsertQuickFact {
    @ApiProperty({ example: 1, description: 'Unique identifier for the database entry' })
    @IsNumber()
    nBDid: number;

    @ApiProperty({ example: '[{}, {}]', description: 'Array of objects' })
    @IsString()
    jAn: string;


    @ApiProperty({ example: '["example1", "example2"]', description: 'Array of strings' })
    @IsString()
    jT: string;


    @ApiProperty({ example: 1, description: 'Color id', required: false })
    @IsNumber()
    nColorid: number;

    @ApiProperty({ example: '["example1", "example2"]', description: 'Array of strings' })
    @IsString()
    jOT: string;


    @ApiProperty({ example: '[[1, 2, 3], [1, 4, 3]]', description: 'Array of arrays of numbers' })
    @IsString()
    jIssues: string;


    @ApiProperty({ example: 'F', description: 'File type as a string' })
    @IsString()
    cFtype: string;


    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
    nMasterid?: Number;
}