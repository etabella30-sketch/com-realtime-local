import { HttpService } from '@nestjs/axios';
import { DbService } from '@app/global/db/pg/db.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { map, firstValueFrom } from 'rxjs';
import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import { query } from 'express';
import { webListbyids } from '../../interfaces/web.interface';

@Injectable()
export class WeblinkService {

    constructor(private db: DbService, private readonly httpService: HttpService, private config: ConfigService) {

    }

    async insertWeb(body: any): Promise<any> {
        let res = await this.db.executeRef('web_insert', body);
        if (res.success) {
            return res.data[0][0];
        } else {
            return { msg: -1, value: 'Web insert failed', error: res.error }
        }
    }


    async deleteWeb(body: any): Promise<any> {
        let res = await this.db.executeRef('web_delete', body);
        if (res.success) {
            return res.data[0][0];
        } else {
            return { msg: -1, value: 'Web delete failed', error: res.error }
        }
    }

    async getURLData(url: string, nCaseid: number): Promise<any> {
        let matadata, favicon, screenshot;
        try {
            matadata = await this.getMetadata(url);
        } catch (error) {
            matadata = null
        }
        try {
            favicon = await this.getFavicon(url);
        } catch (error) {
            favicon = null;

        }

        try {
            screenshot = await this.getScreenshot(url, nCaseid);
        } catch (error) {
            screenshot = null;
        }
        return { matadata, favicon, screenshot };

    }


    async getMetadata(url: string) {
        try {
            const response$ = this.httpService.get(url, {
                headers: {
                    'Accept-Language': 'en-US,en;q=0.9',
                },
            }).pipe(
                map(response => response.data)
            );
            const data = await firstValueFrom(response$);
            const $ = cheerio.load(data);
            const metadata = {
                title: $('title').text(),
                description: $('meta[name="description"]').attr('content'),
                keywords: $('meta[name="keywords"]').attr('content'),
            };
            return metadata;
        } catch (error) {
            return null;
        }
    }

    async getFavicon(url: string) {
        try {
            const response$ = this.httpService.get(url, {
                headers: {
                    'Accept-Language': 'en-US,en;q=0.9',
                },
            }).pipe(
                map(response => response.data)
            );
            const data = await firstValueFrom(response$);
            const $ = cheerio.load(data);
            let favicon = $('link[rel="icon"]').attr('href');
            if (!favicon) {
                favicon = $('link[rel="shortcut icon"]').attr('href');
            }
            if (!favicon) {
                return null;
            }
            if (!favicon.startsWith('http')) {
                favicon = new URL(favicon, url).href;
            }
            return favicon;
        } catch (error) {
            return null;
        }
    }

    async getScreenshot(url: string, nCaseid: number) {
        let browser;
        try {
            browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
            });
            const page = await browser.newPage();
            await page.goto(url, { waitUntil: 'networkidle2' });

            const shpath = `screenshot/case${nCaseid}`;
            const screenshotDir = path.resolve(this.config.get('ASSETS'), shpath);
            if (!fs.existsSync(screenshotDir)) {
                await fs.mkdirSync(screenshotDir, { recursive: true });
            }

            const fileName = `web_${new Date().getTime()}.png`;
            const screenshotPath = path.resolve(screenshotDir, fileName);
            await page.screenshot({ path: screenshotPath });

            return `${shpath}/${fileName}`;
        } catch (error) {
            return null;
        } finally {
            if (browser) {
                await browser.close();
            }
        }
    }


    async getWebLinkList(query: webListbyids): Promise<any> {
        let res = await this.db.executeRef('web_link_list', query);
        if (res.success) {
            return res.data;
        } else {
            return { msg: -1, value: 'Fetch failed', error: res.error }
        }
    }
}
