import { ConfigService } from "@nestjs/config";
import { VerifypdfService } from "../services/verifypdf/verifypdf.service";
import { UpdatefileinfoService } from "../services/updatefileinfo/updatefileinfo.service";
import { UtilityService } from "../services/utility/utility.service";
import { ZipService } from "../services/zip/zip.service";
import { LogService } from "@app/global/utility/log/log.service";

export const zipServiceFactory = (
    configService: ConfigService,
    fileVerificationService: VerifypdfService,
    fileInfoService: UpdatefileinfoService,
    utilityService: UtilityService,
    logService: LogService,
) => {
    return new ZipService(
        configService,
        fileVerificationService,
        fileInfoService,
        utilityService,
        logService
    );
};