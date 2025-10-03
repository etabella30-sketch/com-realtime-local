
export class saveFileInfoReq {
    nMasterid: Number;
    cFilename: string;
    nSectionid: number;
    nBundleid: number;
    nBundledetailid: number;
    cFiletype: string;
    isValidate: boolean;
    cPath: string;
    cFilesize: string;
    nPagerotation: number;
    cPage: string;
    bisTranscript: boolean | false;
    nUDid:number;
}


export class startJob {
    nUDid:number;
    nMasterid: Number;
    cPath: string;
    nCaseid: number;
    nSectionid: number;
    nBundleid: number;
    identifier:string;
}