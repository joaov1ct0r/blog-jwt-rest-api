import * as jwt from "jsonwebtoken";

// eslint-disable-next-line no-redeclare
// eslint-disable-next-line no-unused-vars
declare namespace Express {
  export interface Request {
    userId?: string
  }
}

declare namespace jwt {
  export interface JwtPayload {
    id: string
  }
}
