import { IRequest } from "../models/IRequest";
import axios from 'axios';
import GetHashKeyService from "./GetHashKeyService";

export default class PostHashkeyService {
    public static async postHashKey(req: IRequest) {
        let resp: any = [];
        const url = `${req.path}/${req.key}/${req.hashKey}`;
        const gethashkeyData = await GetHashKeyService.getHashKeyData(req);
        const hashKeyData = JSON.stringify(gethashkeyData);
        resp = this.insertData(hashKeyData, url, req);
        return resp;
    }

    public static async insertData(hashKeyData: string, url: string, req: IRequest) {
        let resp: any = [];
        const field = String(req.field);
        const fieldValue = String(req.fieldValue);
        const HashKeyData = JSON.parse(hashKeyData);
        const fieldHashKeyData = JSON.parse(req.data);
        const verifyField = await this.verifyField(fieldHashKeyData, field);

        if (verifyField === 'Field exist') {
            let newHashKeyData = HashKeyData.filter((item: any) => item[field] !== fieldValue);
            newHashKeyData = await this.deleteDuplicateData(JSON.stringify(newHashKeyData), field);
            newHashKeyData.push(JSON.parse(req.data));
            await axios.post(url, newHashKeyData)
                .then((res) => {
                    resp = `Data saved succesfully !!!!`;
                    return resp + res.data;
                })
                .catch((err) => {
                    resp = `${err}`;
                    return err;
                });
            return resp;

        } else {

            resp = "Invalid Field entry"
            return resp;
        }
    }

    public static async verifyField(data: object, field: string) {
        let resp = '';
        const validFields = Object.keys(data);
        const fieldExist = validFields.indexOf(field);
        if (fieldExist !== -1) {
            resp = 'Field exist';
        } else {
            resp = 'Field don´t exist in object';
        }

        return resp;
    }

    public static async deleteDuplicateData(hashKeyData: string, field: string) {
        let newArray: any = [];
        const hashKey = JSON.parse(hashKeyData);
        hashKey.forEach((element: any) => {
            try {
                if (JSON.stringify(newArray[newArray.length - 1][field]) !== JSON.stringify(element[field])) {
                    newArray.push(element);
                }
            } catch (err) {
                newArray.push(element);
            }
        });
        return newArray;
    }
}



