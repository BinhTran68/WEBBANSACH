import { baseUrl } from "../layouts/ultils/config";
import TheLoaiModel from "../models/TheLoaiModel";
import TheLoai from "../models/TheLoaiModel";
import { getRequest } from "./Request";

export async function getAllImageByIdBook(): Promise<TheLoaiModel[]> {    // Hoạt động bất đồng bộ lấy ra toàn bộ sách
    const result: TheLoaiModel[] = []; // Biến lưu giá trị trả về

    const uri: string = `${baseUrl}/theLoai`;

    const reponse = await getRequest(uri); // Tạm dừng để lấy dữ liệu

    // lấy json sách



    return reponse;
}