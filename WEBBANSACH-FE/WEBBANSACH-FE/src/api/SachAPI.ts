import BookModel from "../models/BookModel";
import {getRequest} from "./Request";
import {baseUrl} from "../layouts/ultils/config";
import SachResponseModel from "../models/SachResponseModel";
import AxiosApiService from "./admin/AxiosApiService";
import {AxiosResponse} from "axios";


interface ResultAPI<T> {
    result: T[];
    totalPage: number;
    totalItems: number;
}




export default ResultAPI;

async function getBook(url: string): Promise<ResultAPI<BookModel>> {

    // const result:BookModel[] = []; // Biến lưu giá trị trả về

    const reponse = await getRequest(url); // Tạm dừng để lấy dữ liệu

    const responseData = reponse._embedded.saches;

    // Lấy thông tin trang
    const totalPage: number = reponse.page.totalPages;
    const totalBook: number = reponse.page.totalElements;
    return {result: responseData, totalPage: totalPage, totalItems: totalBook};

}


export async function getTheLatestBook(pageNumber:number, pageSize:number): Promise<BookModel[]> {
    const  url: string = `${baseUrl}/api/client/get-new-book?pageNumber=${pageNumber}&pageSize=${pageSize}`
    const  res = await AxiosApiService.getApiResponse(url);
    return res.data.content;
}

export async function getTheLatestBookByEconomic(pageNumber:number, pageSize:number): Promise<BookModel[]> {
    const  url: string = `${baseUrl}/api/client/get-book-by-category?pageNumber=${pageNumber}&pageSize=${pageSize}&categoryName=Kinh Tế`
    const  res = await AxiosApiService.getApiResponse(url);
    return res.data.content;
}

export async function getTheLatestBookByComicManga(pageNumber:number, pageSize:number): Promise<BookModel[]> {
    const  url: string = `${baseUrl}/api/client/get-book-by-category?pageNumber=${pageNumber}&pageSize=${pageSize}&categoryName=Truyện Tranh`
    const  res = await AxiosApiService.getApiResponse(url);
    return res.data.content;
}

export async function getTheLatestBookLifeSkillAndMentality(pageNumber:number, pageSize:number): Promise<BookModel[]> {
    const  url: string = `${baseUrl}/api/client/get-book-by-category?pageNumber=${pageNumber}&pageSize=${pageSize}&categoryName=Tâm Lý`
    const  res = await AxiosApiService.getApiResponse(url);
    return res.data.content;
}

export async function getTheLatestBookLiterature(pageNumber:number, pageSize:number): Promise<BookModel[]> {
    const  url: string = `${baseUrl}/api/client/get-book-by-category?pageNumber=${pageNumber}&pageSize=${pageSize}&categoryName=Tâm Lý`
    const  res = await AxiosApiService.getApiResponse(url);
    return res.data.content;
}


export async function getFlashSaleBook(): Promise<ResultAPI<BookModel>> {
    const url: string = `${baseUrl}/sach?sort=maSach,desc&page=0&size=6`;
    return getBook(url);
}


// export async function getTop6BookFinanceEconomics(): Promise<ResultAPI<BookModel>> {
//     const  url:string = ``
//
//     return ;
// }

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

export async function getBookById(bookId: number|string): Promise<BookModel | null> {
    const url = `${baseUrl}/sach/${bookId}`;

    // let result: BookModel;

    try {
        const response = await getRequest(url);

        return response;

    } catch (error) {
        throw new Error('Không thể lấy được sách')
    }

}

const token = localStorage.getItem('token');

export async function delSachById(maSach: number) {
    const url = `${baseUrl}/api/admin/san-pham/del-sach-by-id/${maSach}`;
    console.log(url)
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`

        }
    })
    return res;
}

