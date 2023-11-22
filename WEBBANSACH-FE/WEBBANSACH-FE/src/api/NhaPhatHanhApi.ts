import {baseUrl} from "../layouts/ultils/config";
import {getRequest} from "./Request";
import INhaPhatHanhModel from "../models/INhaPhatHanhModel";

export async function getAllNhaPhatHanh(): Promise<INhaPhatHanhModel[]> {    // Hoạt động bất đồng bộ lấy ra toàn bộ sách


    const uri: string = `${baseUrl}/nha-phat-hanh`;

    const reponse = await getRequest(uri);

    const listNhaPhatHanh = reponse._embedded;

    return listNhaPhatHanh.nhaPhatHanhs;
}


export async function getAllNhaPhatHanhByIdSach(maSach: string | undefined):Promise<INhaPhatHanhModel> {    // Hoạt động bất đồng bộ lấy ra toàn bộ sách


    const uri: string = `${baseUrl}/api/nha-phat-hanh/get-by-masach?maSach=${maSach}`;

    const response = await fetch(uri);

    return await response.json();

}