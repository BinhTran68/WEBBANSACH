import axios from "axios"
import {getToken} from "../../layouts/ultils/config";


class AxiosApiService {
    getApiResponse(url: string) {
        return axios.get(url);
    }

    getApiResponseAuthor(url: string) {


        const config = {
            headers: {Authorization: `Bearer ${getToken()}`}
        };

        return axios.get(url, config);
    }

    postApiFormDataAndAuthor(url: string, fileFormData: any) {
        const config = {
            headers: {Authorization: `Bearer ${getToken()}`}
        };

        return axios.post(url, fileFormData, config);
    }

    postApiUrlAndAuthor(url: string) {

        const config = {
            headers: {Authorization: `Bearer ${getToken()}`}
        };

        return axios.post(url,"", config);
    }

    deleteApiWithAxios(url: string) {


        const config = {
            headers: {Authorization: `Bearer ${getToken()}`}
        };

        return axios.delete(url, config);
    }

}

export default new AxiosApiService();

function e() {
    throw new Error("Function not implemented.");
}
