import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";


export class excelReport {

    @ApiProperty({ example: 0, description: '' })
    @Transform(({ value }) => (value === null || value === undefined) ? 0 : Number(value))
    @IsNumber()
    nUPid: number;

    @ApiProperty({ example: "", description: '' })
    @IsOptional()
    @IsString()
    cStatus?: string;

    
    @ApiProperty({ example: 0, description: '' })
    @Transform(({ value }) => (value === null || value === undefined) ? 0 : Number(value))
    @IsNumber()
    nCaseid: number;
    
    @ApiProperty({ example: "", description: '' })
    @IsOptional()
    @IsString()
    cFiletype?: string;

    @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
    nMasterid?: Number;
}


export class exportSummary{
    nUPid:number;
    cUnicid:string;
    cBundlename:string;
    cFolder:string;
    totalfiles:number;
}






export class deleteFilesReq {

    @ApiProperty({ example: [1, 2], description: 'Array of file IDs' })
    @IsNumber({}, { each: true, message: 'Each value in jFiles must be a number' })
    jFiles: number[];

    @ApiProperty({ example: 0, description: '' })
    @Transform(({ value }) => (value === null || value === undefined) ? 0 : Number(value))
    @IsNumber()
    nCaseid: number;
    
    // @ApiProperty({ example: [1, 2], description: 'Array of folder  IDs' })
    // @IsNumber({}, { each: true, message: 'Each value in jFolders must be a number' })
    // jFolders: number[];


    @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
    nMasterid?: Number;
}
