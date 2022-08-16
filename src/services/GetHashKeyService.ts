import { IRequest } from "../models/IRequest";
import axios from 'axios';

export default class GetHashKeyService {
    public static async getHashKeyData(req: IRequest) {
        let resp: any = [];
        const url = `${req.path}/${req.key}/${req.hashKey}`;
        await axios.get(url)
            .then((res) => {
                resp = res.data
                return resp;
            })
            .catch((err) => {
                return err;
            });
        return resp;
    }
}    