import axios from "axios"

const token = localStorage.getItem('token');

const config = {
    headers: { Authorization: `Bearer ${token}` }
};

class AxiosApiService {
    getAllImages(url:string) {
        return axios.get(url);
    }

    uploadImage(url:string,fileFormData: any){
        return axios.post(url, fileFormData, config);
    }

    deleteApiWithAxios(url:string) {
        return axios.delete(url,config);
    }

}

export default new AxiosApiService();

function e() {
    throw new Error("Function not implemented.");
}
