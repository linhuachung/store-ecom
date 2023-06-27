import React from 'react'
import { Tabs } from 'antd';

const Information = () => {
    const renderDataTab = () => {
        return (
            <div className="content-tab">
                <p className="content-item">air max are always very comfortable fit, clean and just perfect in every
                    way. just the box was too small and scrunched the sneakers up a little bit, not sure if the box was
                    always this small but the 90s are and will always be one of my favorites.</p>
                <p className="content-item">air max are always very comfortable fit, clean and just perfect in every
                    way. just the box was too small and scrunched the sneakers up a little bit, not sure if the box was
                    always this small but the 90s are and will always be one of my favorites.</p>
                <p className="content-item">air max are always very comfortable fit, clean and just perfect in every
                    way. just the box was too small and scrunched the sneakers up a little bit, not sure if the box was
                    always this small but the 90s are and will always be one of my favorites.</p>
            </div>
        )
    }
    const items = [
        {
            key: '1',
            label: 'Product Information',
            children: renderDataTab(),
        },
        {
            key: '2',
            label: 'Reviews 0',
            children: renderDataTab(),
        },
        {
            key: '3',
            label: 'Another tab',
            children: renderDataTab(),
        },
    ];
    return (
        <div className='tab-container'>
            <Tabs defaultActiveKey="1" items={items}/>
        </div>
    )
}

export default Information
