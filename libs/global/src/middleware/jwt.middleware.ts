import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { RedisDbService } from '../db/redis-db/redis-db.service';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private rds: RedisDbService,private config: ConfigService) {
  }
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]; // Assumes "Bearer <token>"

    if (!token) {
      return res.status(403).json({ message: 'A token is required for authentication' });
    }
    let decoded: any
    try {
      decoded = jwt.verify(token,this.config.get('JWT_SECRET'));
      // req['nMasterid'] = decoded;
      if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
        req.body.nMasterid = decoded.userId;
      } else if (req.method === 'GET') {
        req.query.nMasterid = decoded.userId;
      }

    } catch (err) {
      return res.status(401).json({ message: 'Invalid Token' });
    }

    try {
      let dataUSR = await this.rds.getValue(`user/${decoded.userId}`);
      let objs = JSON.parse(dataUSR);
      if (objs.id != decoded.broweserId) {
        return res.status(401).json({ message: 'Old Token' });
      }
      // Attach isAdmin directly to the request object
      req['isAdmin'] = objs.a || false;

    } catch (error) {
      return res.status(401).json({ message: 'Old Token' });
    }
    next();
  }
}
