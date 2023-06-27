import React from 'react'
import Slider from "react-slick";
import './style.scss'


import {LeftOutlined, RightOutlined} from "@ant-design/icons";

function Carousel({children, settings}) {
    const NextArrow = props => {
        const {className, style, onClick} = props;
        return (
            <RightOutlined className={className}
                           onClick={onClick}/>
        );
    }

    const PrevArrow = props => {
        const {className, style, onClick} = props;
        return (
            <LeftOutlined className={className} onClick={onClick}/>
        );
    }

    const dataSetting = {
        ...settings,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>
    }

    return (
        <Slider {...dataSetting}>
            {children}
        </Slider>
    )
}

export default Carousel
