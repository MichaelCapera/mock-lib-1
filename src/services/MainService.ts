import axios from 'axios';
import debugLib from 'debug';
import { IRequest } from '../models/IRequest';
import GetDataService from './GetDataService';
import PostDataService from './PostDataService';

const debug = debugLib('Mock:MainService');
axios.defaults.timeout === 5000;

export default class MainService {

    public static async main(req: IRequest) {

        try {

            let resp = '';
        if (req.method === "get-hashkey" || req.method === "get-key") {
            const Response = await GetDataService.getData(req);
            return Response;
        }
        if (req.method === "post-hashkey") {
            const Response = await PostDataService.postData(req);
            return Response;
        }
        if(req.method === "post-key") {

        }
        if(req.method === 'delete-key') {

        }
        if(req.method === 'delete-hashkey') {

        }

        } catch ( err ) {

            return err;
        }
        
    }
}
