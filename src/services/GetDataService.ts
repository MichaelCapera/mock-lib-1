import { IRequest } from '../models/IRequest';
import GetHashKeyService from './GetHashKeyService';
import GetKeyServie from './GetKeyService';

export default class GetDataService {
    public static async getData(req: IRequest) {
        let resp: any = [];
        const hashKeyData = await GetHashKeyService.getHashKeyData(req);
        const getHashKey = req.hashKey != null && req.hashKey != undefined && req.method === "get-hashkey";
        const getKey = req.method === "get-key";
        const findHashKeyValue = req.field != null || undefined && req.fieldValue != null || undefined;
        if (getHashKey) {
            if(findHashKeyValue) {
                resp = this.findObject(req.field, req.fieldValue, JSON.stringify(hashKeyData));
            } else {
                resp = hashKeyData;
            }
        } else {
            if(getKey) {
                resp = await GetKeyServie.getKeyData(req);
             } else {
               resp = "Invalid Request method, did you mean get-key ?"
             }
            
        }
        return JSON.stringify(resp);
    }
    public static findObject(field: string | null | undefined, value: string | null | undefined, data: string) {
        let resp = '';
        let fieldKey = String(field);
        let dataIteration = JSON.parse(data);
        let filter = dataIteration.filter((elem: any) => elem[fieldKey] === `${value}`);
        if (filter.length === 0) {
            resp = "Data Not found";
        } else {
            resp = filter;
        }
        return resp;
    }
}
