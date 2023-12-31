export const baseUrl = "http://localhost:8080";

export default function usePercentDiscount(giaNiemYet: number , giaBan: number) {

        // Tính toán phần trăm giảm giá
        let percentDiscount = ((giaNiemYet - giaBan) / giaNiemYet) * 100;

        // Nếu phần trăm giảm giá không phải là số hoặc không xác định, gán bằng 0
        if (isNaN(percentDiscount) || percentDiscount == undefined) {
            percentDiscount = 0;
        } else {
            // Làm tròn phần trăm giảm giá về số nguyên
            percentDiscount = parseInt(percentDiscount.toString());
        }

        // Trả về giá trị của percentDiscount
        return percentDiscount;

}

export const ROLE_USER_NHANVIEN_QUANLY_ADMIN:string[] = ["USER","ADMIN", "QUAN_LY", "NHAN_VIEN"];
export const ROLE_USER_NHANVIEN_QUANLY:string[] = ["USER", "QUAN_LY", "NHAN_VIEN"];
export const ROLE_USER_NHANVIEN:string[] = ["USER", "NHAN_VIEN"];
export const ROLE_USER:string[] = ["USER"];

export const STATUS_CART_CON_HANG:string = "CON_HANG";
export const STATUS_CART_HET_HANG:string = "HET_HANG";
export const CON_HANG_GIO_HANG_CHO_THANH_TOAN:string = "CON_HANG_GIO_HANG_CHO_THANH_TOAN";



// Hàm chạy 1 lần
// export const  getToken = localStorage.getItem('token');


// hàm chạy khi được gọi
export const getToken = () => {
    return localStorage.getItem('token');
}

export const logout = () => {
    localStorage.removeItem('token');
};

const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

export const formattedPrice = (price: number) => {
    return formatter.format(price);
}


