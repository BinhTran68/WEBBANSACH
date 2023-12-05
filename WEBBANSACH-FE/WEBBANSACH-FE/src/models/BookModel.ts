interface BookModel {

    maSach: number;
    tenSach?: string; // có thể bị NULL
    giaBan?: number;
    giaNiemYet?: number;
    moTa?:string;
    soLuong?: number;
    tenTacGia?:string;
    trungBinhXepHang?:number;
    soTrang?:number;
    isbn?:string;
    dichGia?:string;
    loaiBia?:string;
    hangChinhHang?:boolean;
    nhaXuatBan?:string;
    stringListTheLoai?:string[];
    nhaPhatHanh:string;

    //
    // constructor( maSach: number,
    //              tenSach?: string, // có thể bị NULL
    //              giaBan?: number,
    //              giaNiemYet?: number,
    //              moTa?:string,
    //              soLuong?: number,
    //              tenTacGia?:string,
    //              trungBinhXepHang?:number,
    //              soTrang?:number,
    //              isbn?:string,
    //             dichGia?:string,
    //             loaiBia?:string,
    //             hangChinhHang?:boolean,
    //              ) {
    //     this.maSach= maSach;
    //     this.tenSach= tenSach;
    //     this.giaBan= giaBan;
    //     this.giaNiemYet= giaNiemYet;
    //     this.moTa= moTa;
    //     this.soLuong= soLuong;
    //     this.tenTacGia= tenTacGia;
    //     this.trungBinhXepHang= trungBinhXepHang;
    //     this.soTrang = soTrang;
    //     this.isbn = isbn;
    //     this.dichGia = dichGia;
    //     this.loaiBia = loaiBia;
    //     this.hangChinhHang = hangChinhHang;
    //
    // }



}

export default BookModel;