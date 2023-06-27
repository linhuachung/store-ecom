import React from 'react'
import {  useSelector } from 'react-redux';

/** component */
import Page from '../../components/page'

/** asset */
import './style.scss'
import Carousel from '../../components/carousel';
import { Images } from '../../theme';
import CardOutstanding from '../../components/card-outstanding';
import BestSeller from './best-seller';


function Home() {
    const { productList } = useSelector((state: any) => state.product)
    const imageCarousel = [
        {
            name: 'Image promotion',
            src: Images.Images.promotion_image
        },
        {
            name: 'Image 1',
            src: Images.Images.ecom_bg_image_1
        },
        {
            name: 'Image 2',
            src: Images.Images.ecom_bg_image_2
        },
        {
            name: 'Image 3',
            src: Images.Images.ecom_bg_image_3
        },
        {
            name: 'Image 4',
            src: Images.Images.ecom_bg_image_4
        }
    ]
    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        pauseOnHover: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className="home">
            <div className="promotion">
                <Carousel settings={settings}>
                    {imageCarousel.map((item, index) => {
                        return <div className="item-img" key={index}><img src={item.src} alt={item.name}/></div>
                    })}
                </Carousel>
                <div className="outstanding">
                    {productList.data.slice(0,3).map((item: any, index: number) => <CardOutstanding key={index} data={item}/>)}
                </div>
            </div>
            <Page>
                <div className="home-content">
                    <BestSeller/>
                </div>
            </Page>
        </div>
    )
}

export default Home
