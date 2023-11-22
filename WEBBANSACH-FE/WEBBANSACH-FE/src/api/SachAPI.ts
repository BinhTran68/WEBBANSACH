import BookModel from "../models/BookModel";
import { getRequest } from "./Request";
import { baseUrl } from "../layouts/ultils/config";
import SachResponseModel from "../models/SachResponseModel";


interface ResultAPI<T> {
    result : T[];
    totalPage: number;
    totalItems : number;
}

export default ResultAPI;

async function getBook(url: string): Promise<ResultAPI<BookModel>> {

    // const result:BookModel[] = []; // Biến lưu giá trị trả về

    const reponse = await getRequest(url); // Tạm dừng để lấy dữ liệu

    const responseData = reponse._embedded.saches;

    // Lấy thông tin trang
    const totalPage: number = reponse.page.totalPages;
    const totalBook: number = reponse.page.totalElements;
    return { result: responseData, totalPage: totalPage, totalItems: totalBook };

}





export async function getTheLatestBook(): Promise<ResultAPI<BookModel>> {
    // Lấy sản phẩm được bán ít nhất tháng trước ra làm flash sale hoặc là sản phẩm do admin set
    const url: string = `${baseUrl}/sach?sort=maSach,asc&page=0&size=6`;
    return getBook(url);
}
export async function getFlashSaleBook(): Promise<ResultAPI<BookModel>> {
    const url: string = `${baseUrl}/sach?sort=maSach,desc&page=0&size=6`;
    return getBook(url);
}

export async function getAllBooks(page: number): Promise<ResultAPI<BookModel>> {    // Hoạt động bất độ

    const url: string = `${baseUrl}/sach?sort=maSach,desc&size=12&page=${page}`;

    return getBook(url);
}


export async function getBookBySearchValue(value: string): Promise<ResultAPI<BookModel>> {

    let url: string = `http://localhost:8080`;

    if (value !== '') {
        url = `${baseUrl}/sach/search/findByTenSachContaining?sort=maSach,desc&size=8&page=0&tenSach=${value}`;
        console.log("Call api");
        
    }

    return getBook(url);
}

export async function getBookById(bookId:number): Promise<BookModel | null> {
    const url = `${baseUrl}/sach/${bookId}`;

    let result: BookModel;

    try {
        const response = await getRequest(url);
    
        return response;

    } catch (error) {
      
        throw new Error('Không thể lấy được sách')
    }

}


