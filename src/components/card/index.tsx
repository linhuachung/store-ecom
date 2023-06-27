import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom';
import { Rate } from 'antd';
import { Images } from '../../theme';
import { useHistory } from "react-router-dom";
import actions from '../../store/actions';
import { useDispatch } from 'react-redux';
function Card({ data }) {
    const history = useHistory();
    const dispatch = useDispatch()

    return (
        <div className="card-item-container">
            <div className="card-content">
                <div className="card-image">
                    <img
                        src={data.thumbnail}
                        alt="" className="image"/>
                    <div className="card-hover">
                        <div className="hover-content">
                            <div className="hover-item">
                                <img src={Images.Icons.heart_blue_icon} alt="" className='svg'/>
                            </div>
                            <div className="hover-item">
                                <img src={Images.Icons.shopping_card_blue_icon} alt="" className='svg'/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-info" onClick={() => {
                    history.push(`/detail/${data.id}`);
                }}>
                    <div className="card-title">
                        <Link to={`/detail/${data?.id}`} className="title"><h3>{data.title}</h3></Link>
                    </div>
                    <div className="rate">
                        <Rate disabled={true} allowHalf defaultValue={data.rating}/>
                    </div>
                    <div className="card-price">
                        <span className="price">${data.price.toLocaleString()}</span>
                        <span className="sale-off">${parseFloat(data.price + (data.discountPercentage))}</span>
                        <span className="percent-off">
                                {data.discountPercentage}% Off
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
