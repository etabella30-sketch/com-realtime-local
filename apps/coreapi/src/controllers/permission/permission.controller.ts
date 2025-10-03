import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PermissionService } from '../../services/permission/permission/permission.service';
import { roleModuleReq, roleModuleRes, roleModuleUpdateReq, roleModuleUpdateRes, rolePermissionReq, roleStatusReq, roleStatusRes, userModuleReq, userModuleRes, userPermissionReq, userQuotaReq, userQuotaRes, userStatusReq, userStatusRes } from '../../interfaces/permissions.interface';

@ApiBearerAuth('JWT')
@ApiTags('permission')
@Controller('permission')
export class PermissionController {

    constructor(private readonly permissionService: PermissionService) {
    }


    @Get('rolepermission')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getRoles(@Query() query: rolePermissionReq): Promise<any> {
        return await this.permissionService.getrolepermissionlist(query);
    }

    @Post('rolestatus')
    async deleteCase(@Body() body: roleStatusReq): Promise<roleStatusRes> {
        return await this.permissionService.updateStatus(body);
    }

    @Get('rolemodules')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getRolemoduels(@Query() query: roleModuleReq): Promise<roleModuleRes> {
        return await this.permissionService.getRoleModules(query);
    }


    @Get('usermodules')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getUsermoduels(@Query() query: userModuleReq): Promise<userModuleRes> {
        return await this.permissionService.getUserModules(query);
    }

    @Post('updatemodule')
    async updateModule(@Body() body: roleModuleUpdateReq): Promise<roleModuleUpdateRes> {
        return await this.permissionService.updateModule(body);
    }


    @Get('userpermission')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getUserpermission(@Query() query: userPermissionReq): Promise<any> {
        return await this.permissionService.getUserPermission(query);
    }

    @Post('usermanage')
    async userStatusManage(@Body() body: userStatusReq): Promise<userStatusRes> {
        return await this.permissionService.updateUserStatus(body);
    }


    @Post('updatequota')
    async updateUserQuota(@Body() body: userQuotaReq): Promise<userQuotaRes> {
        return await this.permissionService.updateUserQuota(body);
    }

}
