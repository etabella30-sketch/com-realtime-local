import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsNumber, IsOptional, IsString, isNumber } from "class-validator";





export class SessionListReq {


  @ApiProperty({ example: 0, description: 'Page Number', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'pageNumber must be a number conforming to the specified constraints' })
  pageNumber: Number;

  @IsOptional()
  @IsString()
  dDate: string;

  @ApiProperty({ example: '', description: 'cUnicuserid', required: true })
  @IsString()
  cUnicuserid?: string;

}

export interface UserConnection {
  socketId: string;
  rooms: Set<string>;
}



export class CaseListReq {


  @ApiProperty({ example: '', description: 'cUnicuserid', required: true })
  @IsString()
  cUnicuserid?: string;

}


export class TranscriptFileReq {
  @ApiProperty({ example: '', description: 'nCaseid', required: true })
  @IsString()
  nCaseid?: string;
}


export class SessionDataReq {


  @ApiProperty({ example: 0, description: 'nSesid', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nSesid must be a number conforming to the specified constraints' })
  nSesid: Number;

  @ApiProperty({ example: '', description: 'cUnicuserid', required: true })
  @IsString()
  cUnicuserid?: string;

}
export class SessionDataV2Req {


  @ApiProperty({ example: 0, description: 'nSesid', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nSesid must be a number conforming to the specified constraints' })
  nSesid: Number;

  @ApiProperty({ example: 0, description: 'nCaseid', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nCaseid: Number;

  @ApiProperty({ example: 0, description: 'nUserid', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nUserid must be a number conforming to the specified constraints' })
  nUserid: Number;



}
export class SessionByCaseIdReq {


  @ApiProperty({ example: 0, description: 'nCaseid', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nCaseid: Number;


  @ApiProperty({ example: 0, description: 'nUserid', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nUserid must be a number conforming to the specified constraints' })
  nUserid: Number;



}

export class sessionDertailReq {


  @ApiProperty({ example: 0, description: 'nSesid', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nSesid must be a number conforming to the specified constraints' })
  nSesid: Number;


}




export class SessionBuilderReq {

  @ApiProperty({ example: 0, description: 'Session id', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nSesid must be a number conforming to the specified constraints' })
  nSesid: Number;

  @ApiProperty({ example: 0, description: 'Page Number', required: true })
  @IsString()
  cCaseno: string;

  @ApiProperty({ example: 0, description: 'Name', required: true })
  @IsString()
  cName: string;

  @ApiProperty({ example: '2023-04-26T14:20:00Z', description: 'Start Date', required: true })
  @IsString()
  dStartDt: string;

  @ApiProperty({ example: 0, description: 'No of days', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nDays must be a number conforming to the specified constraints' })
  nDays: Number;

  @ApiProperty({ example: 0, description: 'No of lines', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nLines must be a number conforming to the specified constraints' })
  nLines: Number;

  @ApiProperty({ example: 0, description: 'Page no', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nPageno must be a number conforming to the specified constraints' })
  nPageno: Number;

  @ApiProperty({ example: '', description: 'Permission', required: true })
  @IsString()
  permission: string;

  @ApiProperty({ example: '', description: 'cUnicuserid', required: true })
  @IsString()
  cUnicuserid?: string;

}




export class SessionDeleteReq {

  @ApiProperty({ example: 0, description: 'Session id', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nSesid must be a number conforming to the specified constraints' })
  nSesid: Number;

  @ApiProperty({ example: 'D', description: 'Delete', required: true })
  @IsOptional()
  @IsString()
  permission: string;
}

export class SessionEndReq {

  @ApiProperty({ example: 0, description: 'Session id', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nSesid must be a number conforming to the specified constraints' })
  nSesid: Number;

  @ApiProperty({ example: 'C', description: 'Delete', required: true })
  @IsOptional()
  @IsString()
  permission: string;
}


export class setServerReq {

  @ApiProperty({ example: 0, description: 'Session id', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nSesid must be a number conforming to the specified constraints' })
  nSesid: Number;


  @ApiProperty({ example: 0, description: 'server id', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nRTSid must be a number conforming to the specified constraints' })
  nRTSid: Number;
}





export class ServerBuilderReq {

  @ApiProperty({ example: 0, description: 'nRTSid', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nRTSid must be a number conforming to the specified constraints' })
  nRTSid: Number;

  @ApiProperty({ example: '', description: 'Url', required: true })
  @IsString()
  cUrl: string;

  @ApiProperty({ example: 0, description: 'Port', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nPort must be a number conforming to the specified constraints' })
  nPort: Number;


  @ApiProperty({ example: '', description: 'Name', required: true })
  @IsString()
  cName: string;

  @ApiProperty({ example: '', description: 'Permission', required: true })
  @IsString()
  permission: string;

  @ApiProperty({ example: '', description: 'cUnicuserid', required: true })
  @IsString()
  cUnicuserid?: string;

}





export class checkRunningSessionReq {

  @ApiProperty({ example: 0, description: 'Session id', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nSesid must be a number conforming to the specified constraints' })
  nSesid: Number;

  @ApiProperty({ example: '', description: 'cUnicuserid', required: true })
  @IsString()
  cUnicuserid?: string;

  @ApiProperty({ example: 0, description: 'date', required: true })
  @IsString()
  dDate: string;
}


export class createUserInterfaceReq {

  @ApiProperty({ example: '', description: 'cUnicuserid', required: true })
  @IsString()
  cUnicuserid?: string;

}



export class userListReq {

  @ApiProperty({ example: 0, description: 'nCaseid', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nCaseid: Number;


}



export class SearchedUserListReq {

  @ApiProperty({ example: 0, description: 'nCaseid', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nCaseid: Number;


  @ApiProperty({ example: '', description: 'Search', required: true })
  @IsString()
  cSearch: string;


}


export class getConnectivityLogReq {

  @ApiProperty({ example: 0, description: 'nUserid', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nUserid must be a number conforming to the specified constraints' })
  nUserid: Number;

  @ApiProperty({ example: 0, description: 'nPage', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nPage must be a number conforming to the specified constraints' })
  nPage: Number;

  @ApiProperty({ example: 0, description: 'message', required: true })
  @IsOptional()
  @IsString()
  dDate: string;

  @ApiProperty({ example: 0, description: 'search', required: true })
  @IsOptional()
  @IsString()
  cSearch: string;

}
export class conectivityLog {
  // let log = { type: types[type], date: new Date().toISOString(), message: message };
  @ApiProperty({ example: 0, description: 'nId', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nId must be a number conforming to the specified constraints' })
  nId: Number;

  @ApiProperty({ example: 0, description: 'date', required: true })
  @IsString()
  date: string;

  @ApiProperty({ example: 0, description: 'message', required: true })
  @IsString()
  message: string;

  @ApiProperty({ example: 'D', description: 'cPermission', required: true })
  @IsString()
  cPermission: string;

  @ApiProperty({ example: 0, description: 'nUserid', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nUserid must be a number conforming to the specified constraints' })
  nUserid: Number;

  @ApiProperty({ example: 0, description: 'nLogid' })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nLogid must be a number conforming to the specified constraints' })
  nLogid: Number;
}

export class deleteConectivityLog {
  // let log = { type: types[type], date: new Date().toISOString(), message: message };


  @ApiProperty({ example: 'D', description: 'cPermission', required: true })
  @IsString()
  cPermission: string;



  @ApiProperty({ example: 0, description: 'nLogid' })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nLogid must be a number conforming to the specified constraints' })
  nLogid: Number;
}

export class assignMentReq {

  @ApiProperty({ example: 0, description: 'nCaseid', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nCaseid: Number;

  @ApiProperty({ example: 0, description: 'nSesid', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nSesid must be a number conforming to the specified constraints' })
  nSesid: string;

  @ApiProperty({ example: 0, description: 'nRTSid', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nRTSid must be a number conforming to the specified constraints' })
  nRTSid: Number;

  @ApiProperty({ example: '', description: 'jUserid', required: true })
  @IsString()
  jUserid: any


  @ApiProperty({ example: '', description: 'cNotifytype', required: true })
  @IsString()
  cNotifytype: string;

  @ApiProperty({ example: '', description: 'cUnicuserid', required: true })
  @IsString()
  cUnicuserid?: string;

}


export class CaseListRes {
  nCaseid: number;
  cCasename: string;
  nSectionid: number
  dUploadDt
}




export class caseDetailSEC {

  @ApiProperty({ example: 1, description: '' })
  @IsString()
  nCaseid: Number;

}


export class sectionDetailSEC {

  @ApiProperty({ example: 1, description: '' })
  @IsString()
  nSectionid: Number;
}




export class bundleDetailSEC {

  @ApiProperty({ example: 1, description: '' })
  @IsString()
  nBundleid: Number;


}






export class checkDuplicacySEC {

  @ApiProperty({ example: 1, description: '' })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nCaseid: Number;

  @ApiProperty({ example: 1, description: '' })
  @IsNumber({}, { message: 'nSectionid must be a number conforming to the specified constraints' })
  nSectionid: Number;

  @ApiProperty({ example: 1, description: '' })
  @IsNumber({}, { message: 'nBundleid must be a number conforming to the specified constraints' })
  nBundleid: Number;


  @ApiProperty({ example: [[1, 2, 'dsf', true]], description: '' })
  @IsString()
  d: string;

}

export class publishSEC {

  @ApiProperty({ example: 1, description: '' })
  @IsNumber({}, { message: 'nBundledetailid must be a number conforming to the specified constraints' })
  nBundledetailid: Number;


  @ApiProperty({ example: 1, description: '' })
  @IsString()
  cStatus: string;

}





export class userSesionData {

  @ApiProperty({ example: 0, description: 'nSesid', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nSesid must be a number conforming to the specified constraints' })
  nSesid: number;

  @ApiProperty({ example: 0, description: 'nUserid', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nUserid must be a number conforming to the specified constraints' })
  nUserid: number;

  @ApiProperty({ example: 0, description: 'nCaseid', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nCaseid: number;


}






export class updateTransStatusMDL {

  @ApiProperty({ example: 0, description: 'Session id', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nSesid must be a number conforming to the specified constraints' })
  nSesid: Number;

  @ApiProperty({ example: 0, description: 'Session id', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nSesid must be a number conforming to the specified constraints' })
  nCaseid: Number;

  @ApiProperty({ example: 'C', description: 'Delete', required: true })
  @IsOptional()
  @IsString()
  cFlag: string;
  
  @ApiProperty({ example: 'C', description: 'Protocol', required: true })
  @IsOptional()
  @IsString()
  cProtocol: string;

  @ApiProperty({ example: 0, description: 'User id', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nUserid must be a number conforming to the specified constraints' })
  nUserid: Number;
}



export class DocInfoReq {
  @ApiProperty({ example: '', description: 'Tab', required: true })
  @Transform(({ value }) => value, { toClassOnly: true })
  @IsString()
  cTab: string;

  @ApiProperty({ example: '', description: 'Case id', required: true })
  @IsString()
  nCaseid?: string;

}


export class DocInfoRes {
  nBundledetailid?: number;
  cName?: string;
  cPath?: string;
  cPage?: string;
  msg?: number
  value?: string;
  error?: any;
}



export class synsSessionsMDL {

  @ApiProperty({ example: '', description: 'jSessions', required: true })
  @IsString()
  jSessions: string;

  @ApiProperty({ example: '', description: 'jUsers', required: true })
  @IsString()
  jUsers: string;

  @ApiProperty({ example: '', description: 'jServers', required: true })
  @IsString()
  jServers: string;

  @ApiProperty({ example: '', description: 'jDeleted', required: true })
  @IsString()
  jDeleted: string;

}


export class logJoinReq {

  @ApiProperty({ example: 0, description: 'User id', required: true })
  @IsNumber()
  nUserid?: number;


  @ApiProperty({ example: 0, description: 'Session id', required: true })
  @IsNumber()
  nSesid?: number;


  @ApiProperty({ example: 'J', description: 'Status', required: true })
  @IsString()
  cStatus?: string;


  @ApiProperty({ example: 'J', description: 'Status', required: true })
  @IsString()
  cSource?: string;

}





export class RTLogsReq {
  @ApiProperty({ example: 0, description: 'Case id', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber()
  nCaseid?: number;


  @ApiProperty({ example: '', description: 'dStartDt', required: true })
  @IsString()
  dStartDt: string;


  @ApiProperty({ example: '', description: 'dEndDt', required: true })
  @IsString()
  dEndDt: string;

}





export class RTLogsSessionUserReq {
  @ApiProperty({ example: 0, description: 'nSesid id', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber()
  nSesid?: number;

}


export class RTLogsUserLGReq {
  @ApiProperty({ example: 0, description: 'nSesid id', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber()
  nSesid?: number;

  @ApiProperty({ example: 0, description: 'nUserid id', required: true })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber()
  nUserid?: number;


}



export class filedataReq {
  @ApiProperty({ example: 0, description: 'Bundle detail id', required: false })
  @IsOptional()
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber({}, { message: 'nBundledetailid must be a number conforming to the specified constraints' })
  nBundledetailid?: Number;


  @ApiProperty({ example: '', description: 'cTab', required: false })
  @IsOptional()
  @IsString()
  cTab?: string;
  
  @ApiProperty({ example: 0, description: 'nCaseid', required: false })
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsOptional()
  @IsNumber({}, { message: 'nCaseid must be a number conforming to the specified constraints' })
  nCaseid?: Number;

  // @IsNumber({}, { message: 'nMasterid must be a number conforming to the specified constraints' })
  // nMasterid?: Number;

}



export class filedataRes {
  nBundledetailid?: Number;
  cPath?: string;
  cPage?: string;
  cRefpage?: string;
  cFiletype?: string;
  msg?: Number;
  value?: string;
  error?: any;
}

export class DocinfoReq {


  @ApiProperty({ example: 1, description: 'Bundledetailid' })
  @Transform(({ value }) => (value === null || value === undefined) ? 0 : Number(value))
  @IsNumber()
  nBundledetailid: number;


}