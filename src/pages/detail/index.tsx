import React, { useEffect, useState } from 'react'
import './style.scss'
import Page from '../../components/page';
import { Images } from '../../theme';
import ReactImageMagnify from 'react-image-magnify';
import { Radio, Rate } from 'antd';
import { Link, useParams } from 'react-router-dom';
import Select from '../../components/select';
import { HeartOutlined, MinusOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Button from '../../components/button';
import Carousel from '../../components/carousel';
import Card from '../../components/card';
import Information from './infomation';
import { actions, TYPES } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import Storage from '../../utils/storage'
import { constant } from '../../utils/constant';
import Notification from '../../components/notification'
import { useTranslation } from 'react-i18next';

const Detail = () => {
    const { t } = useTranslation('message')
    const { productId } = useParams()
    const dispatch = useDispatch()
    const [indexDot, setIndexDot] = useState(0)
    const [imageView, setImageView] = useState(null)
    const [countProduct, setCountProduct] = useState(1)
    const { productList, productDetail } = useSelector((state: any) => state.product)
    const settings = {
        settingListImage: {
            dots: false,
            autoplay: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
        },

        settingBestSeller: {
            beforeChange: (prev: any, next: any) => {
                setIndexDot(next)
            },
            appendDots: (dots: any) => (
                <div className='dot-custom'>
                    <ul className='list-dot'>
                        {dots.map((item: any, index: number) => {
                            return (
                                <li key={index}>{item.props.children}</li>
                            );
                        })}
                    </ul>
                </div>
            ),
            customPaging: (item: any) => (<div
                className={`${item === indexDot ? 'dot-active' : 'dot-inActive'} `}/>),
            dots: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        }

    };

    useEffect(() => {
        dispatch(actions.getProduct({
            limit: 4,
        }))
    }, [productId, dispatch])

    useEffect(() => {
        dispatch(actions.getProductDetail(productId))
    }, [productId])
    const handleChangeImageView = (image: string) => {
        setImageView(image)
    }
    const handleChangeColor = (e) => {
        const { value } = e.target
    }

    const handleAddToCart = () => {
        const {data} = productDetail
        const user = Storage.get(constant.RESULT)
        dispatch(actions.addToCart({
            userId: user.id,
            products: [
                {
                    id: data.id,
                    quantity: countProduct,
                },
            ]
        }, (action: string, data: any, error: any) => {
            if(action === TYPES.ADD_TO_CART_SUCCESS){
                Notification.success(t('add_to_cart_success'))
            }
        }))
    }
    const handleCountProduct = (type) => {
        if (type === 'plus') return setCountProduct(count => count + 1)
        if (countProduct === 1) return
        else return setCountProduct(count => count - 1)
    }
    const {data} = productDetail
    return (
        <Page>
            <div className='container'>
                <section className="product-price">
                    <div className="product-detail">
                        <div className="product-item product-item-top">
                            <div className="product-left product-image-view">
                                <ReactImageMagnify {...{
                                    smallImage: {
                                        alt: 'Wristwatch by Ted Baker London',
                                        src: imageView ? imageView : data.thumbnail,
                                        isFluidWidth: true,
                                    },
                                    largeImage: {
                                        src: imageView ? imageView : data.thumbnail,
                                        width: 900,
                                        height: 900

                                    },
                                    hoverDelayInMs: 10
                                }} className='img-view'/>
                                <img src={data?.thumbnail} className='img-view-responsive' alt='img'/>
                            </div>
                            <div className="product-image-list-responsive product-left product-image-list">
                                <Carousel settings={settings.settingListImage}>
                                    {data?.images?.map((item:string, index:number) => {
                                        return <Button className="item-img" key={index}>
                                            <img
                                                src={item}
                                                alt={data?.title}
                                                onClick={() => handleChangeImageView(item)}
                                            />
                                        </Button>
                                    })}
                                </Carousel>
                            </div>
                            <div className="product-title-price product-right">
                                <div className="title-top">
                                    <h2 className="title">{data?.title}</h2>
                                    <div className="rate">
                                        <Rate disabled={true} allowHalf defaultValue={data.rating}/>
                                        <span className='rate-num'>{parseInt(data?.rating)} rating</span>
                                        <span className='submit-review'><Link to={'/'}>Submit a review</Link> </span>
                                    </div>
                                </div>
                                <div className="title-bottom">
                                    <div className="price-content">
                                        <h2 className="price">${data?.price?.toLocaleString()}</h2>
                                        <h3 className="sale-off">${parseFloat(data?.price + data?.discountPercentage)}</h3>
                                        <h3 className="percent-off">
                                            {data?.discountPercentage}% Off
                                        </h3>
                                    </div>
                                    <div className="status-content">
                                        <div className="status-item">
                                            <p className="status-left">Availability:</p>
                                            <p className="status-right">{data?.stock > 0 ? 'In stock' : 'Out stock'}</p>
                                        </div>
                                        <div className="status-item">
                                            <p className="status-left">Category:</p>
                                            <p className="status-right">{data?.category}</p>
                                        </div>
                                        <div className="status-item">
                                            <p className="status-left">Free Ship</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="product-item product-item-mid">
                            <div className="product-color product-right">
                                <div className="product-color-item">
                                    <p className="product-color-left">Select Color:</p>
                                    <div className="product-color-right">
                                        <Radio.Group onChange={handleChangeColor} defaultValue="#006CFF">
                                            <Radio value="#006CFF" className='item1'/>
                                            <Radio value="#FC3E39" className='item2'/>
                                            <Radio value="#171717" className='item3'/>
                                            <Radio value="#FFF600" className='item4'/>
                                            <Radio value="#FF00B4" className='item5'/>
                                            <Radio value="#EFDFDF" className='item6'/>
                                        </Radio.Group>
                                    </div>
                                </div>
                                <div className="product-color-item">
                                    <p className="product-color-left">Size:</p>
                                    <div className="product-color-right">
                                        <Select
                                            defaultValue="xs"
                                            className='dropdown-size'
                                            // onChange={handleChange}
                                            options={[
                                                { value: 'jack', label: 'Jack' },
                                                { value: 'xs', label: 'XS' },
                                                { value: 'Yiminghe', label: 'yiminghe' },
                                                { value: 'disabled', label: 'Disabled', disabled: true },
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="product-item product-item-bottom">
                            <div className=" product-left product-image-list">
                                <Carousel settings={settings.settingListImage}>
                                    {data?.images?.map((item:string, index:number) => {
                                        return <Button className="item-img" key={index}>
                                            <img
                                                src={item}
                                                alt={data.title}
                                                onClick={() => handleChangeImageView(item)}
                                            />
                                        </Button>
                                    })}
                                </Carousel>
                            </div>
                            <div className="product-add-cart">
                                <div className="cart-item item-left">
                                    <Button onClick={() => handleCountProduct('minus')}><MinusOutlined/></Button>
                                    <p>{countProduct}</p>
                                    <Button onClick={() => handleCountProduct('plus')}><PlusOutlined/></Button>
                                </div>
                                <div className="cart-item item-right">
                                    <Button onClick={handleAddToCart} className='add-cart'><ShoppingCartOutlined/> Add
                                        To Cart</Button>
                                    <Button className='like-cart'><HeartOutlined/></Button>
                                </div>
                            </div>
                        </div>
                        <div className="product-item product-share">
                            <div className="share-content">
                                <Button><img src={Images.Icons.facebook_icon_white} alt=""/>Share on Facebook</Button>
                                <Button><img src={Images.Icons.twitter_icon_white} alt=""/>Share on Twitter</Button>
                            </div>
                        </div>
                        <div className="product-item product-information">
                            <div className="product-information-content">
                                <Information/>
                            </div>
                        </div>
                    </div>
                    <div className="best-seller">
                        <h4 className="title">
                            BEST SELLER
                        </h4>
                        <div className="best-seller-content">
                            <Carousel settings={settings.settingBestSeller}>
                                {productList.data?.map((item: object, index: number) => {
                                    return <div className="best-seller-item" key={index}>
                                        <Card data={item}/>
                                    </div>
                                })}
                            </Carousel>
                        </div>
                    </div>
                </section>
                <section className="product-related">
                    <h1 className="title">
                        RELATED PRODUCTS
                    </h1>
                    <div className="related-container">
                        {productList.data?.map((item: object, index: number) => <Card key={index} data={item}/>)}
                    </div>
                </section>
            </div>
        </Page>
    )
}

export default Detail
