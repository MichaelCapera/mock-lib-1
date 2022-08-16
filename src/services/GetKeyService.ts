import axios from "axios";
import { IRequest } from "../models/IRequest";


export default class GetKeyServie {
    
    public static async getKeyData(req: IRequest) {

        let resp: any = [];
        const url = `${req.path}/${req.key}`;
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