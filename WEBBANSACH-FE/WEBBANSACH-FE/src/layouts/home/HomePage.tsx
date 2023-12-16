import React from 'react'
import Baner from './component/Baner'
import Carousel from './component/Carousel'
import FeaturedProducts from './component/FeaturedProducts'
import {
    getTheLatestBook,
    getTheLatestBookByComicManga,
    getTheLatestBookByEconomic
} from '../../api/SachAPI'
import './css/home-page.scss'
import {useParams} from 'react-router-dom'
import {baseUrl} from "../ultils/config";

function HomePage() {

    const {maTheLoai} = useParams();
    let matheloaiNumber = 0;
    try {
        matheloaiNumber = parseInt(maTheLoai + '');
    } catch (error) {
        matheloaiNumber = 0;
        console.log(error);


    }

    // @ts-ignore
    return (
        <div className='container p-0'>
            <Baner/>
            <Carousel/>

            <div className={"border  mt-5"}>
                <div className='head-featured '>
                    <h5>Sách mới nhất</h5>
                </div>
                <FeaturedProducts fetchBooks={getTheLatestBook} pageNumber={0} pageSize={6}/>
            </div>

            <div className={"border  mt-5"}>
                <div className='head-featured  bg-warning'>
                    <h5>Sách kinh tế</h5>
                </div>
                <FeaturedProducts fetchBooks={getTheLatestBookByEconomic} pageNumber={0} pageSize={12}/>
            </div>

            <div className={"border  mt-5"}>
                <div className='head-featured  bg-warning'>
                    <h5>Sách Tâm Lý - Kĩ Năng sống</h5>
                </div>
                <FeaturedProducts fetchBooks={getTheLatestBookByEconomic} pageNumber={0} pageSize={12}/>
            </div>

            <div className={"border  mt-5"}>
                <div className='head-featured  bg-warning'>
                    <h5>Văn Học</h5>
                </div>
                <FeaturedProducts fetchBooks={getTheLatestBookByEconomic} pageNumber={0} pageSize={12}/>
            </div>

            <div className={"border  mt-5"}>
                <div className='head-featured  bg-danger'>
                    <h5>Truyện tranh</h5>
                </div>
                <FeaturedProducts fetchBooks={getTheLatestBookByComicManga} pageNumber={0} pageSize={12}/>
            </div>

        </div>
    )
}

export default HomePage
