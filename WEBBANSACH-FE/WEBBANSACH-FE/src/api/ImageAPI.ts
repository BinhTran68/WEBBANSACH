
import {getRequest} from "./Request";
import IImageModel from "../models/IImageModel";
import { baseUrl } from "../layouts/ultils/config";
import { log } from "console";


export async function getAllImageByIdBook(bookId:number|undefined):Promise<IImageModel[]> {    // Hoạt động bất đồng bộ lấy ra toàn bộ sách
    const result:IImageModel[] = []; // Biến lưu giá trị trả về

    const uri:string = `${baseUrl}/sach/${bookId}/danhSachHinhAnh`;

    const reponse = await getRequest(uri); 

    // lấy json sách
    const responseData = reponse._embedded.hinhAnhs;

    console.log(responseData);
    


    return responseData;
}