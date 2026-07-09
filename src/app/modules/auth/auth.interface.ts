import { TPortal, TRole } from "../../utilities/enum";

export interface ITokenPayload {
  userId: string;
  role: TRole;
  portal: TPortal;
  email: string;
}

export interface ISignupPayload {
  name: string;
  email: string;
  password: string;
  role: TRole;
  portal: TPortal;
}

export interface ILoginPayload {
  email: string;
  password: string;
  portal?: TPortal;
}
