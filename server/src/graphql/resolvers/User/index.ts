import { IResolvers } from 'apollo-server-express';
import { Database, User } from '../../../lib/types';
import { authorize } from '../../../lib/utils';
import { UserArgs } from './types';
import { Request } from 'express';
export const userResolvers: IResolvers = {
  Query: {
    user: async (
      _root: undefined,
      { id }: UserArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<User> => {
      try {
        const user = await db.users.findOne({ _id: id });
        if (!user) {
          throw new Error("Resource can't be found");
        }

        const viewer = await authorize(db, req);
        if (viewer && viewer._id === user._id) {
          user.authorized = true;
        }
        return user;
      } catch (error) {
        throw new Error(`Action failed with the error of ${error}`);
      }
    },
  },
};
