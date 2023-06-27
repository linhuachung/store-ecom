import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom';

function CardOutstanding({data}) {
    return (
        <div className="card-container">
            <div className="card-content">
                <div className="card-title">
                    <Link to={`/detail/${data?.id}`} className="title"><h3>{data.title}</h3></Link>
                </div>
                <div className="card-image">
                    <img
                        src={data.thumbnail}
                        alt="" className="image"/>
                </div>
                <div className="card-sale">
                    <h3 className="sale-off">${data.price.toLocaleString()}</h3>
                    <h3 className="percent-off">
                        {data.discountPercentage}% Off
                    </h3>
                </div>
                <div className="card-price">
                    <h2 className="price">${parseFloat(data.price + data.discountPercentage)}</h2>
                </div>
            </div>
        </div>
    )
}

export default CardOutstanding
