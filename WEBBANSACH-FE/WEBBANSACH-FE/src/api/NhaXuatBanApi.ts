import TheLoaiModel from "../models/TheLoaiModel";
import {baseUrl} from "../layouts/ultils/config";
import {getRequest} from "./Request";
import NhaXuatBanModel from "../models/NhaXuatBanModel";

export async function getAllNhaXuatBan(): Promise<NhaXuatBanModel[]> {    // Hoạt động bất đồng bộ lấy ra toàn bộ sách
    const result: TheLoaiModel[] = []; // Biến lưu giá trị trả về

    const uri: string = `${baseUrl}/nha-xuat-ban`;

    const reponse = await getRequest(uri); // Tạm dừng để lấy dữ liệu

    const listNhaXuatBan = reponse._embedded;

    return listNhaXuatBan.nhaXuatBans;
}

