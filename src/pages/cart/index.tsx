import React, { useEffect } from 'react'
import './style.scss'
import Page from '../../components/page';
import { Images } from '../../theme';
import { Link, useHistory } from 'react-router-dom';
import Button from '../../components/button';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../store/actions';

const Cart = () => {
    const { cart } = useSelector(state => state.product)
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(() => {
        if (cart.data.length === 0) {
            history.push('/')
        }
    }, [cart, history])

    const handleCountProduct = (type: string, data) => {
        const dataCart = {
            ...data,
            type
        }

        dispatch(actions.addToCart(dataCart))
    }
    const subtotal = cart.data.reduce((cost, item) => {
        return cost += parseFloat(item.price) * item.quality
    }, 0)

    const handleDeleteProduct = (type: string, data) => {
        const dataCart = {
            ...data,
            type
        }
        dispatch(actions.addToCart(dataCart))
    }

    return (
        <Page>
            <div className='container'>
                <div className="cart-content">
                    <div className="cart-item cart-item-title">
                        <div className="cart-item-left">
                            <div className="title-product">
                                <h5 className="title">
                                    PRODUCT
                                </h5>
                            </div>
                        </div>
                        <div className="cart-item-right">
                            <div className="info-product title-infor-product price">
                                <h5 className="title">
                                    PRICE
                                </h5>
                            </div>
                            <div className="info-product title-infor-product qty">
                                <h5 className="title">
                                    QTY
                                </h5>
                            </div>
                            <div className="info-product title-infor-product unit">
                                <h5 className="title">
                                    UNIT PRICE
                                </h5>
                            </div>
                        </div>
                    </div>

                    {cart?.data.map((item, index) => {
                            return (
                                <div className="cart-item cart-item-product" key={index}>
                                    <div className="cart-item-left">
                                        <div className="item-delete">
                                            <Button
                                                onClick={() => handleDeleteProduct('delete', item)}
                                                className='btn-delete'>x</Button>
                                        </div>
                                        <div className="item-image">
                                            <img
                                                src={Images.Images.air_max}
                                                alt="" className="image"/>
                                        </div>
                                        <div className="item-product-name">
                                            <Link to={`/detail/${item.id}`}>{item.name}</Link>
                                        </div>
                                    </div>
                                    <div className="cart-item-right">
                                        <div className="info-product price">
                                            <p>
                                                ${parseFloat(item.price)}
                                            </p>
                                        </div>
                                        <div className="info-product qty">
                                            <div className="qty-content">
                                                <div className="btn-minus">
                                                    <Button
                                                        onClick={() => handleCountProduct('minus', item)}><MinusOutlined/></Button>
                                                </div>
                                                <div className="count">
                                                    <p>{item.quality}</p>
                                                </div>
                                                <div className="btn-plus">
                                                    <Button
                                                        onClick={() => handleCountProduct('plus', item)}><PlusOutlined/></Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="info-product unit">
                                            <p>
                                                ${(parseFloat(item.price) * item.quality).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    )}
                    <div className="cart-item cart-item-checkout">
                        <div className="cart-item-left">
                            <Search
                                placeholder="Voucher code"
                                allowClear
                                enterButton="Redeem"
                                size="large"
                                // onSearch={onSearch}
                            />
                        </div>
                        <div className="cart-item-right">
                            <div className="checkout-item">
                                <div className="checkout-info-left">Subtotal</div>
                                <div className="checkout-info-right">${subtotal.toLocaleString()}</div>
                            </div>
                            <div className="checkout-item">
                                <div className="checkout-info-left">Shipping</div>
                                <div className="checkout-info-right">$20</div>
                            </div>
                            <div className="checkout-item">
                                <div className="checkout-info-left">Coupon</div>
                                <div className="checkout-info-right">No</div>
                            </div>
                            <div className="checkout-item ">
                                <div className="checkout-info-left">TOTAL</div>
                                <div className="checkout-info-right">${(subtotal + 20).toLocaleString()}</div>
                            </div>
                            <div className="checkout-item">
                                <Button type='primary'>
                                    Check out
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    )
}

export default Cart
