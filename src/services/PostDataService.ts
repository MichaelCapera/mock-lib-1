import { IRequest } from '../models/IRequest';
import PostHashkeyService from './PostHashKeyService';

export default class PostDataService {
    public static async postData(req: IRequest) {
        let resp: any = [];
        if (req.field && req.fieldValue != null || undefined) {
            const hashKeyData = await PostHashkeyService.postHashKey(req);
            resp = hashKeyData;
        } else {
            resp = 'Entry a field and a field value for filter the object to set';
        }
        return JSON.stringify(resp);

    }
}