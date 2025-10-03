import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class ChunkStatus {
    max: number;
    msg: number;
}

export class ChunkStatusReq {
    @ApiProperty({ example: "unic", description: '' })
    @IsString()
    identifier?: string;

    
    @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
    nMasterid?: Number;
}

export class UploadResponce {
    m: number;
    i: number;
}



export class MergeChunksReq {
    @ApiProperty({ example: "unic", description: '' })
    @IsString()
    identifier?: string;


    

    @ApiProperty({ example: "name", description: '' })
    @IsString()
    name?: string;

    @ApiProperty({ example: "", description: '' })
    @IsString()
    filetype?: string;

    @ApiProperty({ example: "", description: '' })
    @IsString()
    cFilename?: string;


    @ApiProperty({ example: 0, description: '' })
    @IsNumber()
    totalChunks?: number;


    @ApiProperty({ example: 0, description: '' })
    @IsNumber()
    nBundleid?: number;


    @ApiProperty({ example: 0, description: '' })
    @IsNumber()
    nSectionid?: number;

    @ApiProperty({ example: 0, description: '' })
    @IsNumber()
    nUDid?: number;


    @ApiProperty({ example: 0, description: '' })
    @IsNumber()
    nBundledetailid?: number;

    @ApiProperty({ example: 0, description: '' })
    @IsNumber()
    filesize?: number;

    @ApiProperty({ example: 0, description: '' })
    @IsNumber()
    nCaseid?: number;
    
    @IsBoolean()
    @IsOptional()
    bisTranscript?: boolean;

    @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
    nMasterid?: Number;
}




export interface FileValidateResponse {
    isValidate: boolean,
    totalpages: number,
    totalsizeoffile: number,
    pagerotation: number,
    isLinerised: boolean
}

