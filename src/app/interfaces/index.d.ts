import { TPortal, TRole } from "../utilities/enum";

export interface ITokenPayload {
  userId: string;
  role: TRole;
  portal: TPortal;
  email: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user: ITokenPayload;
    }
  }
}
