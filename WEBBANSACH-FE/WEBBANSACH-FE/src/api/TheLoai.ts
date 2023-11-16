import { baseUrl } from "../layouts/ultils/config";
import TheLoaiModel from "../models/TheLoaiModel";
import { getRequest } from "./Request";

export async function getAllTheLoaiSach(): Promise<TheLoaiModel[]> {    // Hoạt động bất đồng bộ lấy ra toàn bộ sách
    const result: TheLoaiModel[] = []; // Biến lưu giá trị trả về

    const uri: string = `${baseUrl}/the-loai`;

    const reponse = await getRequest(uri); // Tạm dừng để lấy dữ liệu

    const listTheLoai = reponse._embedded;

    return listTheLoai.theLoais;
}