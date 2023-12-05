import SachResponseModel from "../../models/SachResponseModel";
import {getRequest} from "../Request";
import ResultAPI from "../SachAPI";

export  async function getSacSachResponseByPage(url: string): Promise<ResultAPI<SachResponseModel>> {


    const reponse = await getRequest(url);   // await  get data

    const totalPage: number = reponse.totalPages;
    const totalElements: number = reponse.totalElements;
    return { result: reponse.content , totalPage: totalPage, totalItems: totalElements };

}