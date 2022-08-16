import { RequestMethod } from "./RequestMethod";
import { TimeUnit } from "./TimeUnit";

export interface IRequest {
    path: string,
    key: string,
    hashKey?: string | null,
    time: string,
    timeUnit: TimeUnit,
    apiKey: string,
    data: string,
    method: RequestMethod,
    field?: string | null,
    fieldValue?: string | null,
    uuid:string
}