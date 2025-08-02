import { UserDocument } from '../models/user.model';

declare namespace Express {
  export interface Request {
    user?: UserDocument;
  }
}