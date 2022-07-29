import { User } from '../model/user';
import { Repository, RepositoryImpl } from './repository';

export interface UserRepository extends Repository<User> {
    findByEmail(email: string): User | undefined;
}

export class UserRepositoryImpl extends RepositoryImpl<User> implements UserRepository {
    findByEmail(email: string): User | undefined {
        const allUsers = this.findAll();
        allUsers.forEach(user => {
            if (user.email === email)
                return user;
        });
        return undefined;
    }
}