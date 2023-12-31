import React, { useEffect, useState } from 'react';
import BookModel from "../../../models/BookModel";
import { getAllImageByIdBook } from "../../../api/ImageAPI";
import IImageModel from "../../../models/IImageModel";
import { Link } from 'react-router-dom';
import DangTaiDuLieuComponent from '../../ultils/DangTaiDuLieuComponent';
import renderRaiting from '../../ultils/renderRaiting';
import "../product.css"


interface BookPropsInterface {

    book: BookModel;
}

const BookProps: React.FC<BookPropsInterface> = (props) => {

    const bookId: number = props.book.maSach;

    const [rating, setRating] = useState(0);

    const [imageList, setImageList] = useState<IImageModel[]>([])

    const [loadingData, setLoadingData] = useState(true);

    const [error, setError] = useState(null);

    const [percentDiscount, setPercentDiscount] = useState(0);


    useEffect(() => {
        getAllImageByIdBook(bookId).then(
            imageData => {
                setImageList(imageData);
                setLoadingData(false);
            }
        ).catch(
            error => {
                setError(error.message);
            }
        );

    }, []) // chỉ gọi 1 lần

    useEffect(() => {

        // @ts-ignore
        let  percentDiscount = (props.book.giaBan - props.book.giaNiemYet)/props.book.giaNiemYet*100;


        if (isNaN(percentDiscount) || percentDiscount == undefined ) {
            setPercentDiscount(0);
        }else  {
            setPercentDiscount(parseInt(percentDiscount.toString()));
        }


    }, [])


    if (loadingData) {
        return (
            <>
                <DangTaiDuLieuComponent />
            </>
        )
    }

    if (error) {
        return (
            <div>
                <h1>Gặp lỗi : {error}</h1>
            </div>

        )
    }

    // Sau khi có được danh sách hình ảnh thì lấy ra icon

    let bookAvata = null;

    imageList.forEach(image => {
        if (image.icon == true) {
       
            
            bookAvata = image.link;
        }
    })

    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const formattedPrice = (price: number) => {
        return formatter.format(price);
    }


    return (
        <div >
            <div className="card  border-0 p-2 overflow-hidden">
                <Link className='' style={{ 'textDecoration': 'none', 'color': 'black', 'minWidth' : '100%' }} to={`/san-phams/${props.book.maSach}`}  >
                    <img
                        src={`${bookAvata}`}
                        className="card-img-top d-block ms-auto me-auto"
                        alt={""}
                        style={{ height: '175px', width: '158px' }}
                    />
                    <div className="card-body">
                        <h6 className="w-100 text-2-lines">{props.book.tenSach}</h6>
                        <strong>{renderRaiting(props.book.trungBinhXepHang?props.book.trungBinhXepHang: 5)}</strong>

                        <div className={"d-flex align-items-center justify-content-between"}>
                            <div className="price d-block">
                            <span className="original-price">
                                <strong className={'price-book text-danger text-orgin-price'}>
                                    {props.book.giaBan != (undefined || null) ? formattedPrice(props.book.giaBan) : formattedPrice(0)}
                                </strong>
                            </span>
                                <br />
                                <span className="discounted-price">
                                <del className={'text-discounted'}>
                                    {props.book.giaNiemYet != (undefined || null) ? formattedPrice(props.book.giaNiemYet) : formattedPrice(0)}
                                </del>
                            </span>
                            </div>
                            <div>
                                <div className={"percentDiscount"}>
                                    {percentDiscount}%
                                </div>
                            </div>

                        </div>



                    </div>

                </Link>



            </div>
        </div>
    );
};

BookProps.propTypes = {};

export default BookProps;