import { DbService } from '@app/global/db/pg/db.service';
import { Injectable } from '@nestjs/common';
import { TaskCreateReq, TaskCreateRes, TaskDetailReq, TasklistReq, TasklistRes } from '../../interfaces/task.interface';
import { get } from 'http';
import { query } from 'express';

@Injectable()
export class TaskService {
    constructor(private db: DbService) {

    }


    async taskCreate(body: TaskCreateReq): Promise<TaskCreateRes> {
        let res = await this.db.executeRef('task_insert', body);
        if (res.success) {
            try {
                return res.data[0][0];
            } catch (error) {
                return { msg: -1, value: 'Failed ', error: res.error }
            }
        } else {
            return { msg: -1, value: 'Failed ', error: res.error }
        }
        // return [{ msg: 1 }]
    }

    async createTaskDetail(body: TaskCreateReq): Promise<TaskCreateRes[]> {
        let res = await this.db.executeRef('task_insert_detail', body);
        if (res.success) {
            try {
                return res.data[0];
            } catch (error) {
                return [{ msg: -1, value: 'Failed ', error: res.error }]
            }
        } else {
            return [{ msg: -1, value: 'Failed ', error: res.error }]
        }
    }

    async createTaskReminder(body: TaskCreateReq): Promise<TaskCreateRes[]> {
        let res = await this.db.executeRef('task_insert_reminder', body);
        if (res.success) {
            try {
                return res.data[0];
            } catch (error) {
                return [{ msg: -1, value: 'Failed ', error: res.error }]
            }
        } else {
            return [{ msg: -1, value: 'Failed ', error: res.error }]
        }
    }


    async createTaskAssign(body: TaskCreateReq): Promise<TaskCreateRes[]> {
        let res = await this.db.executeRef('task_insert_assign', body);
        if (res.success) {
            try {
                return res.data[0];
            } catch (error) {
                return [{ msg: -1, value: 'Failed ', error: res.error }]
            }
        } else {
            return [{ msg: -1, value: 'Failed ', error: res.error }]
        }
    }


    async taskDelete(body: TaskDetailReq): Promise<any> {
        let res = await this.db.executeRef('task_delete', body);
        if (res.success) {
            try {
                return res.data[0];
            } catch (error) {
                return [{ msg: -1, value: 'Failed ', error: res.error }]
            }
        } else {
            return [{ msg: -1, value: 'Failed ', error: res.error }]
        }
    }

    async getTasklist(query: TasklistReq): Promise<any> {
        query['ref'] = 2
        let res = await this.db.executeRef('task_list', query);
        if (res.success) {
            return res.data;
        } else {
            return [{ msg: -1, value: 'Failed to fetch', error: res.error }]
        }
    }


    async getTaskDetail(query: TaskDetailReq): Promise<any> {
        query['ref'] = 3
        let res = await this.db.executeRef('task_detail', query);
        if (res.success) {
            return res.data;
        } else {
            return [{ msg: -1, value: 'Failed to fetch', error: res.error }]
        }
    }

}
