import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ContactBuilderReq {

    @ApiProperty({ example: 1, description: 'nCaseid' })
    @Transform(({ value }) => (value === null || value === undefined) ? 0 : Number(value))
    @IsNumber()
    nCaseid: number;

    @ApiProperty({ example: 1, description: 'nContactid' })
    @Transform(({ value }) => (value === null || value === undefined) ? 0 : Number(value))
    @IsNumber()
    nContactid?: number;

    @ApiProperty({ example: '', description: 'cProfile', required: false })
    @Transform(({ value }) => (value === null || value === undefined) ? '' : String(value))
    @IsString()
    cProfile?: string;

    @ApiProperty({ example: '', description: 'cFname' })
    @Transform(({ value }) => (value === null || value === undefined) ? '' : String(value))
    @IsString()
    cFname: string;

    @ApiProperty({ example: '', description: 'cLname' })
    @Transform(({ value }) => (value === null || value === undefined) ? '' : String(value))
    @IsString()
    cLname: string;

    @ApiProperty({ example: '', description: 'cAlias', required: false })
    @Transform(({ value }) => (value === null || value === undefined) ? '' : String(value))
    @IsString()
    cAlias?: string;

    @ApiProperty({ example: '', description: 'cLinkedin', required: false })
    @Transform(({ value }) => (value === null || value === undefined) ? '' : String(value))
    @IsString()
    cLinkedin?: string;

    @ApiProperty({ example: '', description: 'cEmail' })
    @Transform(({ value }) => (value === null || value === undefined) ? '' : String(value))
    @IsString()
    cEmail: string;

    @ApiProperty({ example: '', description: 'cCountrycode' })
    @Transform(({ value }) => (value === null || value === undefined) ? '' : String(value))
    @IsString()
    cCountrycode: string;

    @ApiProperty({ example: '', description: 'cMobile' })
    @Transform(({ value }) => (value === null || value === undefined) ? '' : String(value))
    @IsString()
    cMobile: string;

    @ApiProperty({ example: 1, description: 'nTZid', required: false })
    @Transform(({ value }) => (value === null || value === undefined) ? 0 : Number(value))
    @IsNumber()
    nTZid?: number;

    @ApiProperty({ example: 1, description: 'nRoleid', required: false })
    @Transform(({ value }) => (value === null || value === undefined) ? 0 : Number(value))
    @IsNumber()
    nRoleid?: number;

    @ApiProperty({ example: 1, description: 'nCompanyid', required: false })
    @Transform(({ value }) => (value === null || value === undefined) ? 0 : Number(value))
    @IsNumber()
    nCompanyid?: number;


    @ApiProperty({ example: '', description: 'cNote', required: false })
    @Transform(({ value }) => (value === null || value === undefined) ? '' : String(value))
    @IsString()
    cNote?: string;


    @ApiProperty({ example: 'N', description: 'permission' })
    @Transform(({ value }) => (value === null || value === undefined) ? '' : String(value))
    @IsString()
    permission: string;


    @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
    nMasterid: Number;

}


export class ContactBuilderRes {
    nContactid?: number;
    msg?: number;
    value?: string;
    error?: any;
}



export class ContactlsReq {


    @ApiProperty({ example: 1, description: 'nCaseid' })
    @Transform(({ value }) => (value === null || value === undefined) ? 0 : Number(value))
    @IsNumber()
    nCaseid: number;

    @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
    nMasterid: Number;

}



export class ContactlsRes {
    nContactid?: number;
    cProfile?: string;
    cFname?: string;
    cLname?: string;
    cEmail?: string;
    cRole?: string;
    cCompany?: string;
    msg?: number;
    value?: string;
    error?: any;
}

export class ContactReq {


    @ApiProperty({ example: 1, description: 'nContactid' })
    @Transform(({ value }) => (value === null || value === undefined) ? 0 : Number(value))
    @IsNumber()
    nContactid: number;

    @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
    nMasterid: Number;

}



export class ContactRes {
    nContactid?: number;
    cProfile?: string;
    cFname?: string;
    cLname?: string;
    cAlias?: string;
    cLinkedin?: string;
    cEmail?: string;
    cCountrycode?: string;
    cMobile?: string;
    nTZid?: number;
    nRoleid?: number;
    nCompanyid?: number;
    cNote?: string;
    cTimezone?: string;
    cRole?: string;
    cCompany?: string;
    msg?: number;
    value?: string;
    error?: any;
}




export class CompanyBuilderReq {


    @ApiProperty({ example: 1, description: 'nCaseid' })
    @Transform(({ value }) => (value === null || value === undefined) ? 0 : Number(value))
    @IsNumber()
    nCaseid: number;


    @ApiProperty({ example: 1, description: 'nCompanyid', required: false })
    @Transform(({ value }) => (value === null || value === undefined) ? 0 : Number(value))
    @IsNumber()
    nCompanyid?: number;

    @ApiProperty({ example: '', description: 'cCompany' })
    @Transform(({ value }) => (value === null || value === undefined) ? '' : String(value))
    @IsString()
    @IsNotEmpty()
    cCompany: string;

    @ApiProperty({ example: 'N', description: 'permission' })
    @Transform(({ value }) => (value === null || value === undefined) ? '' : String(value))
    @IsString()
    permission: string;

    @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
    nMasterid?: Number;

}



export class CompanyBuilderRes {
    nCompanyid?: number;
    msg?: number;
    value?: string;
    error?: any;
}



export class CompanyReq {
    @ApiProperty({ example: 1, description: 'nCaseid' })
    @Transform(({ value }) => (value === null || value === undefined) ? 0 : Number(value))
    @IsNumber()
    nCaseid: number;

    @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
    nMasterid?: Number;

}



export class CompanyRes {
    nCompanyid?: number;
    cCompany?: string;
    msg?: number;
    value?: string;
    error?: any;
}





export class CRBuilderReq {
    @ApiProperty({ example: 1, description: 'nCaseid' })
    @Transform(({ value }) => (value === null || value === undefined) ? 0 : Number(value))
    @IsNumber()
    nCaseid: number;


    @ApiProperty({ example: 1, description: 'nCRoleid', required: false })
    @Transform(({ value }) => (value === null || value === undefined) ? 0 : Number(value))
    @IsNumber()
    nCRoleid?: number;

    @ApiProperty({ example: '', description: 'cRole' })
    @Transform(({ value }) => (value === null || value === undefined) ? '' : String(value))
    @IsString()
    @IsNotEmpty()
    cRole: string;

    @ApiProperty({ example: 'N', description: 'permission' })
    @Transform(({ value }) => (value === null || value === undefined) ? '' : String(value))
    @IsString()
    permission: string;

    @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
    nMasterid?: Number;

}



export class CRBuilderRes {
    nCRoleid?: number;
    msg?: number;
    value?: string;
    error?: any;
}


export class ContactroleReq {
    @ApiProperty({ example: 1, description: 'nCaseid' })
    @Transform(({ value }) => (value === null || value === undefined) ? 0 : Number(value))
    @IsNumber()
    nCaseid: number;

    @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
    nMasterid?: Number;

}



export class ContactroleRes {
    nCRoleid?: number;
    cRole?: string;
    cIsdefault?: string;
    msg?: number;
    value?: string;
    error?: any;
}





