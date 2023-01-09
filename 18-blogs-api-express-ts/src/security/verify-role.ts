
/**
 * THIS HEADER SHOULD BE KEPT INTACT IN ALL CODE DERIVATIVES AND MODIFICATIONS.
 * 
 * This file provided by IPT is for non-commercial testing and evaluation
 * purposes only. IPT reserves all rights not expressly granted.
 *  
 * The security implementation provided is DEMO only and is NOT intended for production purposes.
 * It is exclusively your responsisbility to seek advice from security professionals 
 * in order to secure the REST API implementation properly.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * IPT BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { ForbiddenError } from './../model/errors';
import { UserRepository } from './../dao/user-repository';
import { Request, Response, NextFunction } from 'express';


export default function verifyRole(roles) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const userRepo = req.app.locals.usersRepo as UserRepository;
    try {
      const user = await userRepo.findById(res.locals.userId);
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

