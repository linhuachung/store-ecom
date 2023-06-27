import React, { useEffect, useState } from 'react'
import './style.scss'
import { Tabs } from 'antd';
import Card from '../../../components/card';
import { useDispatch, useSelector } from 'react-redux';
import { actions, TYPES } from '../../../store/actions'
import Button from '../../../components/button';
import Loading from '../../../components/loading'

function BestSeller() {
    const { productList } = useSelector((state: any) => state.product)
    const [limit, setLimit] = useState(20)
    const [loadMore, setLoadMore] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        setLoadMore(true)
        dispatch(actions.getProduct({
            limit: limit,
        }, (action: string, data: any, error: any) => {
            if (action === TYPES.GET_PRODUCT_SUCCESS) {
                setLoadMore(false)
            }
        }))
    }, [dispatch, limit])

    useEffect(() => {
        window.addEventListener('scroll', showMoreItem);
        return () => window.removeEventListener('scroll', showMoreItem);
    },[])

    const showMoreItem = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
            setLimit(limit => limit + 20)
        }
    }
    return (
        <section className='best-seller'>
            <div className="best-seller-container">
                <h1 className="title">
                    BEST SELLER
                </h1>
                <div className="best-seller-content">
                    <div className="item">
                        {productList.data.map((item: any, index: number) => <Card data={item} key={index}/>)}
                    </div>
                    {loadMore && <Loading/>}
                </div>
            </div>
        </section>
    )
}

export default BestSeller
