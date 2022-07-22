import { Request, Response } from "express";

import IReq from "./requestInterface";

interface IUserController {
  handleNewUser(req: Request, res: Response): Promise<Response>;
  handleUserLogin(req: Request, res: Response): Promise<Response>;
  handleEditUser(req: IReq, res: Response): Promise<Response>;
  handleDeleteUser(req: IReq, res: Response): Promise<Response>;
  handleAllUsers(req: Request, res: Response): Promise<Response>;
  handleOneUser(req: Request, res: Response): Promise<Response>;
}

export default IUserController;
