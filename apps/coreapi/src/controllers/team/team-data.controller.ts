import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CaseTeamReq, CaseUserInfoReq, CaseUserInfoRes, CaseUserReq, RoleListRes, TeamComboRes, TimeZoneRes, UserListRes, assignedUsersReq, assignedUsersRes, teamListResonce } from '../../interfaces/team.interface';
import { TeamDataService } from '../../services/team/team-data/team-data.service';
import { TeamcolorRes } from '../../interfaces/team-setup.interface';

@ApiBearerAuth('JWT')
@ApiTags('team-data')
@Controller('team-data')
export class TeamDataController {

    constructor(private readonly teamService: TeamDataService) {
    }

    @Get('teamlist')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getTeams(@Query() query: CaseTeamReq): Promise<any> {
        return await this.teamService.getCaseTeams(query);
    }

    @Get('userlist')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getUsers(@Query() query: CaseUserReq): Promise<UserListRes> {
        return await this.teamService.getAllusers(query);
    }



    @Get('assignedusers')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getAssigned(@Query() query: assignedUsersReq): Promise<assignedUsersRes> {
        return await this.teamService.getAssignees(query);
    }

    @Get('rolelist')
    async getRoles(): Promise<RoleListRes> {
        return await this.teamService.getRoles();
    }

    @Get('teamcombo')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getCaseCombo(@Query() query: CaseTeamReq): Promise<TeamComboRes> {
        return await this.teamService.getCaseCombo(query);
    }

    @Get('timezone')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getTimeZone(): Promise<TimeZoneRes> {
        return await this.teamService.getTimeZone();
    }

    @Get('getuserdetail')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getUserDetail(@Query() query: CaseUserInfoReq): Promise<CaseUserInfoRes> {
        return await this.teamService.getUserDetail(query);
    }


    @Get('teamcolor')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getTeamcolor(): Promise<TeamcolorRes> {
        return await this.teamService.getTeamcolor();
    }

}
