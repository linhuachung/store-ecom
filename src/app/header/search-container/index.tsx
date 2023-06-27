import React from 'react'
import { Link } from 'react-router-dom';
import './style.scss'
import { Images } from '../../../theme';

function DataRowSearch({ dataRow, ...props }) {
    return (
        <div className='search-list-container'>
            {dataRow.map((item: any, index: number) => {
                return (
                    <Link to='/a' className='list-item' key={index}>
                        <div className='item-title'>
                            <div className="image">
                                <img
                                    src={item.thumbnail}
                                    alt="img"/>
                            </div>
                            <div className="title">{item.title}</div>
                        </div>
                        <div className="item-price">
                            <h2 className="price">${item.price.toLocaleString()}</h2>
                            <div className="price-sale">
                                <h3 className="sale-off">${parseFloat(item.price + item.discountPercentage)}</h3>
                                <h3 className="percent-off">
                                    {item.discountPercentage}% Off
                                </h3>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default DataRowSearch
