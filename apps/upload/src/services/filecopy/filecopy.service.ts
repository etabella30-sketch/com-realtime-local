import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { UploadService } from '../../upload.service';
import { ConfigService } from '@nestjs/config';

const pipelineAsync = promisify(pipeline);

@Injectable()
export class filecopyService {
    private ASSETS_PATH = this.config.get('ASSETS');
    constructor(private upload: UploadService, private config: ConfigService) {

    }

    async copyFile(oldPath: string): Promise<void> {
        const newPath: string = `${this.upload.backupDocPath}${oldPath}`;
        console.log(`Copy file from ${oldPath} to ${newPath}`);
        // Extract the directory part of the new path
        const newDir = newPath.substring(0, newPath.lastIndexOf('/'));

        try {
            // Ensure the directory exists
            await fse.ensureDir(newDir);

            const readStream = fs.createReadStream(`${this.ASSETS_PATH}${oldPath}`);
            const writeStream = fs.createWriteStream(newPath);

            await pipelineAsync(readStream, writeStream);
            console.log(`File copied from ${oldPath} to ${newPath}`);
        } catch (error) {
            console.error(`Error copied file: ${error.message}`);
            throw error;
        }
    }

}
