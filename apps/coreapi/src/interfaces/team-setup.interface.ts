import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested, isString } from "class-validator";


export class TeamBuilderReq {

  @ApiProperty({ example: 0, description: 'Team id', required: true })
  @IsNumber({}, { message: 'nTeamid must be a number conforming to the specified constraints' })
  nTeamid: Number;


  @ApiProperty({ example: '', description: 'Team Name', required: true })
  @IsString()
  @IsNotEmpty()
  cTeamname: string;

  @ApiProperty({ example: '', description: 'Team Color', required: true })
  @IsString()
  @IsNotEmpty()
  cClr: string;

  @ApiProperty({ example: 0, description: 'Case id', required: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  @IsNotEmpty()
  nCaseid: Number;

  @ApiProperty({ example: '', description: 'Permission', required: true })
  @IsString()
  @IsNotEmpty()
  permission: string;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}



export class TeamBuilderRes {
  msg: Number;
  value: string;
  nTeamid?: Number
  error?: any
}





export class TeamDeleteReq {

  @ApiProperty({ example: 0, description: 'Team id', required: true })
  @IsNumber({}, { message: 'nTeamid must be a number conforming to the specified constraints' })
  nTeamid: Number;

  @ApiProperty({ example: '', description: 'Permission', required: true })
  @IsString()
  @IsOptional()
  permission: string;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}



export class TeamDeleteRes {
  msg: Number;
  value: string;
  nTeamid?: Number
  error?: any
}

export class UserBuilderReq {

  @ApiProperty({ example: 0, description: 'User id', required: true })
  @IsNumber({}, { message: 'nUserid must be a number conforming to the specified constraints' })
  nUserid: Number;


  @ApiProperty({ example: '', description: 'First Name', required: true })
  @IsString()
  @IsNotEmpty()
  cFname: string;

  @ApiProperty({ example: '', description: 'Last Name', required: true })
  @IsString()
  @IsNotEmpty()
  cLname: string;

  @ApiProperty({ example: '', description: 'Email', required: true })
  @IsEmail()
  cEmail: Number;

  @ApiProperty({ example: '', description: 'Password', required: false })
  @IsString()
  cPassword: string;

  @ApiProperty({ example: '', description: 'Profile', required: true })
  @IsString()
  @IsOptional()
  cProfile: string;

  @ApiProperty({ example: 0, description: 'Timezone', required: true })
  @IsNumber()
  @IsNotEmpty()
  nTZid: Number;

  @ApiProperty({ example: 0, description: 'Role id', required: false })
  @IsNumber()
  @IsOptional()
  nRoleid: Number;

  @ApiProperty({ example: 0, description: 'Case id', required: true })
  @IsNumber()
  nCaseid: Number;


  @ApiProperty({ example: 0, description: 'Team id', required: false })
  @IsNumber()
  @IsOptional()
  nTeamid: Number;

  @ApiProperty({ example: '', description: 'Permission', required: true })
  @IsString()
  @IsNotEmpty()
  permission: string;

  @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  nMasterid?: Number;

}

export class UserBuilderRes {
  msg: Number;
  value: string;
  nUserid?: Number;
  nTeamid?: Number;
  error?: any;
}


class UserDetail {
  @ApiProperty({ example: 0, description: 'User ID', required: true })
  @IsNumber()
  u: number;

  @ApiProperty({ example: 0, description: 'Team ID', required: true })
  @IsNumber()
  t: number;
}

export class teamSetup {
  @ApiProperty({ example: 0, description: 'Case ID', required: true })
  @IsNumber()
  nCaseid: number;

  @ApiProperty({ type: [UserDetail], description: 'User Details', required: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserDetail)
  jUsers: UserDetail[];

  @IsNumber()
  nMasterid?: number;
}

export class teamSetupRes {
  msg: Number;
  value: string;
  error?: any;
}


export class UserDeleteReq {
  @ApiProperty({ example: 0, description: '' })
  @IsNumber()
  nUserid: Number;

  @IsNumber()
  nMasterid?: Number;

  @ApiProperty({ example: 'D', description: '' })
  @IsString()
  permission: string;
}


export class UserDeleteRes {
  msg: Number;
  value: string;
  error?: any;
}


export class TeamcolorRes {
  cClr?: string;
  msg?: Number;
  value?: string;
  error?: any;
}

