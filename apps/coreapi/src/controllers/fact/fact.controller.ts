import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FactService } from '../../services/fact/fact.service';
import { factDetail, factDetailSingle, InsertFact, InsertQuickFact, resInsertFact } from '../../interfaces/fact.interface';

@ApiBearerAuth('JWT')
@ApiTags('fact')
@Controller('fact')
export class FactController {
    constructor(private readonly factservice: FactService) {
    }


    @Post('insertfact')
    @UsePipes(new ValidationPipe({ transform: true }))
    async insertfact(@Body() body: InsertFact): Promise<resInsertFact> {
        try {
            const res = await this.factservice.insertFact(body);
            if (res && res.nFSid) {
                body["nFSid"] = res.nFSid;
                await this.factservice.insertFactDetail(body);
                await this.factservice.insertFactlink(body);
                await this.factservice.insertFactissues(body);
                await this.factservice.insertFactcontact(body);
                await this.factservice.insertFacttask(body);
                await this.factservice.insertFactteam(body);
                return {
                    msg: 1,
                    value: 'Fact inserted successfully',
                    nFSid: res["nFSid"],
                    color: res["color"]
                };
            } else {
                return { msg: -1, value: 'Fact not inserted successfully', error: res.error }
            }
        } catch (error) {
            return { msg: -1, value: 'Fact not inserted successfully', error: error }
        }
    }

    @Post('factdelete')
    @UsePipes(new ValidationPipe({ transform: true }))
    async factdelete(@Body() body: factDetailSingle): Promise<any> {
        try {
            const res = await this.factservice.FactDelete(body);
            return res;
        } catch (error) {
            return { msg: -1, value: error.message, error: error }
        }
    }

    @Get('factdetail')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getFactdetail(@Query() query: factDetail): Promise<any> {
        try {
            const res = await this.factservice.getFactdetail(query);
            return res;
        } catch (error) {
            return { msg: -1, value: error.message, error: error }
        }
    }

    @Get('factissuelinks')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getFactIssuelinks(@Query() query: factDetail): Promise<any> {
        try {
            const res = await this.factservice.getFactIssuelinks(query);
            return res;
        } catch (error) {
            return { msg: -1, value: error.message, error: error }
        }
    }

    @Get('factcontact')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getFactContact(@Query() query: factDetailSingle): Promise<any> {
        try {
            const res = await this.factservice.getFactcontact(query);
            return res;
        } catch (error) {
            return { msg: -1, value: error.message, error: error }
        }
    }

    @Get('facttask')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getFacttask(@Query() query: factDetailSingle): Promise<any> {
        try {
            const res = await this.factservice.getFacttask(query);
            return res;
        } catch (error) {
            return { msg: -1, value: error.message, error: error }
        }
    }

    @Get('factlinks')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getFactlinks(@Query() query: factDetailSingle): Promise<any> {
        try {
            const res = await this.factservice.getFactlinks(query);
            return res;
        } catch (error) {
            return { msg: -1, value: error.message, error: error }
        }
    }

    @Get('factshared')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getFactshared(@Query() query: factDetailSingle): Promise<any> {
        try {
            const res = await this.factservice.getFactshared(query);
            return res;
        } catch (error) {
            return { msg: -1, value: error.message, error: error }
        }
    }

    @Post('insertquickfact')
    @UsePipes(new ValidationPipe({ transform: true }))
    async insertQuickfact(@Body() body: InsertQuickFact): Promise<any> {
        try {
            const res = await this.factservice.insertQuickFact(body);
            if (res && res.nFSid) {
                body["nFSid"] = res.nFSid;
                await this.factservice.insertFactDetail(body);
                await this.factservice.insertFactissues(body);
                return {
                    msg: 1,
                    value: 'Quick fact inserted successfully',
                    nFSid: res["nFSid"],
                    color: res["color"]
                };
            } else {
                return { msg: -1, value: 'Quick fact not inserted successfully', error: res.error }
            }
        } catch (error) {
            return { msg: -1, value: 'Quick fact not inserted successfully', error: error }
        }
    }



}
