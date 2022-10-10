import { ForbiddenError } from './../model/errors';
import { UserRepository } from './../dao/user-repository';
import { RequestWithUserId } from './verify-token';
/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { Response, NextFunction } from 'express';


export default function verifyRole(roles) {
  return async function (req: RequestWithUserId, res: Response, next: NextFunction) {
    const userRepo = req.app.locals.usersRepo as UserRepository;
    try {
      const user = await userRepo.findById(req.userId);
      if (!roles.includes(user.role)) {
        next(new ForbiddenError(`Access not allowed`));
        return;
      }
      next();
    } catch (err) {
      next(err);
      return;
    }
  }
}

