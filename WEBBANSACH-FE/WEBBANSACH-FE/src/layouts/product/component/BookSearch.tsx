import React, { useEffect, useState } from 'react'
import BookModel from '../../../models/BookModel';
import IImageModel from '../../../models/IImageModel';
import { getAllImageByIdBook } from '../../../api/ImageAPI';
import { Link } from 'react-router-dom';

interface BookPropsInterface {

    book: BookModel;
}

const BookSearch: React.FC<BookPropsInterface> = (props) => {
    const bookId: number = props.book.maSach;

    const [rating, setRating] = useState(0);

    const [imageList, setImageList] = useState<IImageModel[]>([])

    const [loadingData, setLoadingData] = useState(true);

    const [error, setError] = useState(null);

    let bookAvata: string = "https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/fahasa-logo.png";

    imageList.forEach(image => {
        if (image.icon == true) {
            bookAvata = image.link != undefined ? image.link : 'https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/fahasa-logo.png';
        }
    })

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


    return (
        <div>
            <Link className='' style={{ 'textDecoration': 'none', 'color': 'black' }} to={`/san-phams/${props.book.maSach}`}  >

                <li  className="px-2  bookSearchIteam border-1 list-group-item d-flex align-items-center">

                    <img width={'60rem'} src={`${bookAvata}`} alt="" className='' />
                    <div className={""}>
                        <span className='ms-2 p-1 two-line overflow-auto'> {props.book.tenSach}</span>
                    </div>

                </li>
            </Link>


        </div>
    )
}

export default BookSearch
