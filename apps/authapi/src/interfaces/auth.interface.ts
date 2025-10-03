import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, isNumber } from "class-validator";
export class SignInReq {

  @ApiProperty({ example: 'example@gmail.com', description: '' })
  @IsEmail()
  cEmail: string;

  @ApiProperty({ example: 'your password', description: '' })
  @IsString()
  password: string;


  @ApiProperty({ example: '', description: '' })
  @IsString()
  cBroweserid: string;

  @IsOptional()
  @IsString()
  cToken?: string;
}

export class SignInRTReq {

  @ApiProperty({ example: 'example@gmail.com', description: '' })
  @IsEmail()
  cEmail: string;


  @ApiProperty({ example: 'Secure key required', description: '' })
  @IsString()
  cRTKey?: string;
}


export interface SignInResponceUpdate {
  nMasterid: Number;
  cToken?: string;
  cJwt: string;
  bResponce: boolean;
}


export interface userDetail {
  nUserid?: Number;
  cEmail?: string;
  cFname?: string;
  cLname?: string;
  cProfile?: string;
  isAdmin?: boolean;
}

export interface SignInResponce {
  msg: Number;
  value: string;
  error?: any;
  userDetail?: userDetail;
  token?: string;
  expir_limit?: Number;
}

export interface SignOutReq {
  nMasterid: Number;
}

export interface UserInfoReq {

  nMasterid?: Number;

}

export interface SignOutResponce {
  msg: Number;
  value: string;
}