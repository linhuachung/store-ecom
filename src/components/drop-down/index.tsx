import {DownOutlined} from '@ant-design/icons';
import {Dropdown, Space} from 'antd';

export default ({items, title, ...props}) => (
    <Dropdown
        menu={{
            items,
        }}
    >
        <a onClick={(e) => e.preventDefault()}>
            <Space>
                {title}
                <DownOutlined/>
            </Space>
        </a>
    </Dropdown>
);
