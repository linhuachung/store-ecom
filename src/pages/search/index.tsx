import React, { useEffect, useState } from 'react'
import './style.scss'
import Page from '../../components/page';
import { Radio, Slider } from 'antd';
import Button from '../../components/button';
import Carousel from '../../components/carousel';
import { Images } from '../../theme';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actions, TYPES } from '../../store/actions';
import Card from '../../components/card';
import Pagination from '../../components/pagination';
import Select from '../../components/select';
import Loading from '../../components/loading'

const Search = () => {
    const [valuePrice, setValuePrice] = useState([10, 150]);
    const [limit, setLimit] = useState(20)
    const [loadMore, setLoadMore] = useState(false)
    const [showMenuFilter, setShowMenuFilter] = useState(false);
    const dispatch = useDispatch()
    const { searchProductPageList } = useSelector(state => state.product)
    const history = useHistory()
    const { paramSearch, page } = useParams()
    useEffect(() => {
        setLoadMore(true)
        dispatch(actions.searchProductPageList({ q: paramSearch, limit: limit }, (action: string, data: any, error: any) => {
            if (action === TYPES.SEARCH_PRODUCT_PAGE_LIST_SUCCESS) {
                setLoadMore(false)
            }
        }))
    }, [dispatch, paramSearch, limit ])

    useEffect(() => {
        window.addEventListener('scroll', showMoreItem);
        return () => window.removeEventListener('scroll', showMoreItem);
    },[])

    const showMoreItem = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
            setLimit(limit => limit + 20)
        }
    }

    const handleChangePrice = (value) => {
        setValuePrice(value)
    }
    const handleChangeColor = (e) => {
        const { value } = e.target
    }

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        pauseOnHover: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
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

    return (
        <Page>
            <div className='container'>
                <div className="search-content">
                    <div className="search-content-item item-left">
                        <div className="search-hot-deals">
                            <h3 className='title'>Hot Deals</h3>
                            <div className="hot-deal-content">
                                <div className="hot-deal-item">
                                    <p className="hot-deal-name">Nike</p>
                                    <p className="hot-deal-number">200</p>
                                </div>
                                <div className="hot-deal-item">
                                    <p className="hot-deal-name">Nike</p>
                                    <p className="hot-deal-number">200</p>
                                </div>
                                <div className="hot-deal-item">
                                    <p className="hot-deal-name">Nike</p>
                                    <p className="hot-deal-number">200</p>
                                </div>
                                <div className="hot-deal-item">
                                    <p className="hot-deal-name">Nike</p>
                                    <p className="hot-deal-number">200</p>
                                </div>
                                <div className="hot-deal-item">
                                    <p className="hot-deal-name">Nike</p>
                                    <p className="hot-deal-number">200</p>
                                </div>
                                <div className="hot-deal-item">
                                    <p className="hot-deal-name">Nike</p>
                                    <p className="hot-deal-number">200</p>
                                </div>
                                <div className="hot-deal-item">
                                    <p className="hot-deal-name">Nike</p>
                                    <p className="hot-deal-number">200</p>
                                </div>
                            </div>
                        </div>
                        <div className="search-prices">
                            <h3 className='title'>PRICES</h3>
                            <div className="search-prices-content">
                                <div className="search-prices-item ">
                                    <p className="hot-deal-name">Ranger: </p>
                                    <p className="hot-deal-number">
                                        <span>${valuePrice[0]} - </span>
                                        <span>${valuePrice[1]}</span>
                                    </p>
                                </div>
                                <Slider range defaultValue={[10, 150]} min={10}
                                        max={200} onChange={handleChangePrice}/>
                            </div>
                        </div>
                        <div className="search-color">
                            <h3 className='title'>COLOR</h3>
                            <div className="search-color-item">
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
                        <div className="search-brand search-hot-deals">
                            <h3 className='title'>BRAND</h3>
                            <div className="search-brand-content hot-deal-content">
                                <div className="hot-deal-item search-brand--item">
                                    <p className="hot-deal-name">Nike</p>
                                    <p className="hot-deal-number">200</p>
                                </div>
                                <div className="hot-deal-item search-brand--item">
                                    <p className="hot-deal-name">Nike</p>
                                    <p className="hot-deal-number">200</p>
                                </div>
                                <div className="hot-deal-item search-brand--item">
                                    <p className="hot-deal-name">Nike</p>
                                    <p className="hot-deal-number">200</p>
                                </div>
                                <div className="hot-deal-item search-brand--item">
                                    <p className="hot-deal-name">Nike</p>
                                    <p className="hot-deal-number">200</p>
                                </div>
                                <div className="hot-deal-item search-brand--item">
                                    <p className="hot-deal-name">Nike</p>
                                    <p className="hot-deal-number">200</p>
                                </div>
                                <div className="hot-deal-item search-brand--item">
                                    <p className="hot-deal-name">Nike</p>
                                    <p className="hot-deal-number">200</p>
                                </div>
                                <div className="hot-deal-item search-brand--item">
                                    <p className="hot-deal-name">Nike</p>
                                    <p className="hot-deal-number">200</p>
                                </div>
                            </div>
                        </div>
                        <div className="search-more">
                            <Button type='basic'>MORE</Button>
                        </div>
                    </div>
                    <div className="search-content-item item-right">
                        <div className="carousel">
                            <Carousel settings={settings}>
                                {imageCarousel.map((item, index) => {
                                    return <div className="item-img" key={index}><img src={item.src} alt={item.name}/>
                                    </div>
                                })}
                            </Carousel>
                        </div>
                        <div className="filter">
                            <div className="filter-item item-left">
                                <div className="item button-filter">
                                    <Button onClick={() => setShowMenuFilter(f => !f)}>
                                        <img src={Images.Icons.filter_icon}
                                             alt=""/></Button>
                                    {showMenuFilter && <div className='filter-container-res'>
                                        <div className="search-hot-deals  search-filter-res">
                                            <h3 className='title'>Hot Deals</h3>
                                            <div className="hot-deal-content">
                                                <div className="hot-deal-item">
                                                    <p className="hot-deal-name">Nike</p>
                                                    <p className="hot-deal-number">200</p>
                                                </div>
                                                <div className="hot-deal-item">
                                                    <p className="hot-deal-name">Nike</p>
                                                    <p className="hot-deal-number">200</p>
                                                </div>
                                                <div className="hot-deal-item">
                                                    <p className="hot-deal-name">Nike</p>
                                                    <p className="hot-deal-number">200</p>
                                                </div>
                                                <div className="hot-deal-item">
                                                    <p className="hot-deal-name">Nike</p>
                                                    <p className="hot-deal-number">200</p>
                                                </div>
                                                <div className="hot-deal-item">
                                                    <p className="hot-deal-name">Nike</p>
                                                    <p className="hot-deal-number">200</p>
                                                </div>
                                                <div className="hot-deal-item">
                                                    <p className="hot-deal-name">Nike</p>
                                                    <p className="hot-deal-number">200</p>
                                                </div>
                                                <div className="hot-deal-item">
                                                    <p className="hot-deal-name">Nike</p>
                                                    <p className="hot-deal-number">200</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="search-prices search-filter-res">
                                            <h3 className='title'>PRICES</h3>
                                            <div className="search-prices-content">
                                                <div className="search-prices-item ">
                                                    <p className="hot-deal-name">Ranger: </p>
                                                    <p className="hot-deal-number">
                                                        <span>${valuePrice[0]} - </span>
                                                        <span>${valuePrice[1]}</span>
                                                    </p>
                                                </div>
                                                <Slider range defaultValue={[10, 150]} min={10}
                                                        max={200} onChange={handleChangePrice}/>
                                            </div>
                                        </div>
                                        <div className="search-color search-filter-res">
                                            <h3 className='title'>COLOR</h3>
                                            <div className="search-color-item">
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
                                        <div className="search-brand search-hot-deals search-filter-res">
                                            <h3 className='title'>BRAND</h3>
                                            <div className="search-brand-content hot-deal-content">
                                                <div className="hot-deal-item search-brand--item">
                                                    <p className="hot-deal-name">Nike</p>
                                                    <p className="hot-deal-number">200</p>
                                                </div>
                                                <div className="hot-deal-item search-brand--item">
                                                    <p className="hot-deal-name">Nike</p>
                                                    <p className="hot-deal-number">200</p>
                                                </div>
                                                <div className="hot-deal-item search-brand--item">
                                                    <p className="hot-deal-name">Nike</p>
                                                    <p className="hot-deal-number">200</p>
                                                </div>
                                                <div className="hot-deal-item search-brand--item">
                                                    <p className="hot-deal-name">Nike</p>
                                                    <p className="hot-deal-number">200</p>
                                                </div>
                                                <div className="hot-deal-item search-brand--item">
                                                    <p className="hot-deal-name">Nike</p>
                                                    <p className="hot-deal-number">200</p>
                                                </div>
                                                <div className="hot-deal-item search-brand--item">
                                                    <p className="hot-deal-name">Nike</p>
                                                    <p className="hot-deal-number">200</p>
                                                </div>
                                                <div className="hot-deal-item search-brand--item">
                                                    <p className="hot-deal-name">Nike</p>
                                                    <p className="hot-deal-number">200</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="btn-filter-more">
                                            <Button onClick={() => setShowMenuFilter(false)}
                                                    type='primary'>More</Button>
                                        </div>
                                        <div className="close">
                                            <Button onClick={() => setShowMenuFilter(false)} type='basic'>Close</Button>
                                        </div>
                                    </div>}
                                </div>
                                <div className="item">13 item</div>
                                <div className="item">Sort By
                                    <Select
                                        defaultValue="lucy"
                                        className='dropdown-filter'
                                        // onChange={handleChange}
                                        options={[
                                            { value: 'jack', label: 'Jack' },
                                            { value: 'lucy', label: 'Lucy' },
                                            { value: 'Yiminghe', label: 'yiminghe' },
                                            { value: 'disabled', label: 'Disabled', disabled: true },
                                        ]}
                                    />
                                </div>
                                <div className="item">Show
                                    <Select
                                        defaultValue="lucy"
                                        className='dropdown-filter'
                                        // onChange={handleChange}
                                        options={[
                                            { value: 'jack', label: 'Jack' },
                                            { value: 'lucy', label: 'Lucy' },
                                            { value: 'Yiminghe', label: 'yiminghe' },
                                            { value: 'disabled', label: 'Disabled', disabled: true },
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className="filter-item item-right">
                                <Button className='view-mode'><img src={Images.Icons.grid_icon}/></Button>
                                <Button className='view-mode'><img src={Images.Icons.list_icon}/></Button>
                            </div>
                        </div>
                        <div className="content">
                            {searchProductPageList?.data.map((item, index) => {
                                return (
                                    <Card key={index} data={item}/>
                                )
                            })}
                        </div>
                        {loadMore && <Loading/>}
                    </div>
                </div>
            </div>
        </Page>
    )
}

export default Search
