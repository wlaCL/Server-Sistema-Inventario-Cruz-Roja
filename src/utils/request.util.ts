
import {Request} from "express";
export interface IGetUserAuthInfoRequest extends Request {
    user: string // or any other type
  }