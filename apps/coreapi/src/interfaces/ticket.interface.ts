import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber} from "class-validator";

export class caseTicketReq {

    @ApiProperty({ example: 1, description: '' })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
    nCaseid: Number;
  
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
    nMasterid?: Number;
  }
  
  

  
  export class caseTicketRes {
    msg: number;
    value?: string;
    error?: any;
    nTicketid?: number;
    nCaseid?: number;
    cFname?: string;
    cLname?: string;
    cSession?: string;
    cDesc?: string;
    cImgname?: string;
    cImgpath?: string;
    cStatus?: string;
    dCreateDt?: string;
  }
  

  export class clearTicketReq {

    @ApiProperty({ example: 1, description: '' })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
    nCaseid: Number;
  
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
    nMasterid?: Number;
  }
  
  
  export class clearTicketRes {
    msg: number;
    value?: string;
    error?: any;
  }
  

  
  export class ticketResolveReq {

    @ApiProperty({ example: 1, description: '' })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nTicketid must be a number conforming to the specified constraints' })
    nTicketid: Number;
  
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
    nMasterid?: Number;
  }


  export class ticketResolveRes {
    msg: number;
    value?: string;
    error?: any;
  }
  


  
  export class ticketResolveClearReq {

    @ApiProperty({ example: 1, description: '' })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
    nCaseid: Number;
  
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
    nMasterid?: Number;
  }

  
  export class ticketResolveClearRes {
    msg: number;
    value?: string;
    error?: any;
  }
  