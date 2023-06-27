import React, { useCallback, useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import Storage from '../../utils/storage'
import Request from '../../utils/request'
/** component */
import Notification from '../../components/notification'
/** asset */
import './style.scss'
import { useTranslation } from 'react-i18next'
import { constant } from '../../utils/constant';
import { Images } from '../../theme';
import Button from '../../components/button';
import DropDown from '../../components/drop-down';
import Search from 'antd/es/input/Search';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../store/actions';
import DataRowSearch from './search-container';
import { debounce } from 'lodash';
import { MenuOutlined } from '@ant-design/icons';
import CartHeader from './cart-header-container';


function Header() {
    const { i18n } = useTranslation()
    const history = useHistory()
    const dispatch = useDispatch()
    const { searchProductList } = useSelector(state => state.product)
    const { t } = useTranslation('message')
    const [language, setLanguage] = useState(Storage.get('language') || 'vn')
    const [showSearchColumn, setShowSearchColumn] = useState(true)
    const [notShow, setNotShow] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const itemsDropDown = [
        {
            label: (
                <div className='change-language'
                     onClick={() => changeLanguage('vn')}>VN</div>
            ),
            key: '0',
        },
        {
            label: (
                <div className='change-language'
                     onClick={() => changeLanguage('en')}>EN</div>
            ),
            key: '1',
        },
    ];
    const onLogout = () => {
        Storage.remove(constant.ACCESS_TOKEN)
        Storage.remove(constant.RESULT)
        Request.removeAccessToken()
        history.push('/login')
        Notification.success(t('logout_success'))
    }
    const changeLanguage = (lng: 'en' | 'vn') => {
        i18n.changeLanguage(lng)
        Storage.set('language', lng)
        setLanguage(lng)
    }
    const controlNavbar = () => {
        if (window.scrollY > 200) {
            setNotShow(true);
        } else {
            setNotShow(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);
        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, []);
    const onSearch = (value) => {
        history.push(`/search/${value}`)
        dispatch(actions.clearSearchProduct())
    };

    const debounceDropDown = useCallback(debounce((value) => dispatch(actions.searchProduct(value)), 500), [])

    const handleChangeSearch = (e) => {
        debounceDropDown(e.target.value)
    }

    return (
        <header>
            <div className={`menu ${showMenu ? 'show-menu' : 'close-menu'}`}>
                <div className="menu-container">
                    <div className='menu-content-top'>
                        <div className="header-item menu-item">
                            <img src={Images.Icons.profile_icon} alt="icon"/>
                            <p className='profile-content'>My profile</p>
                        </div>
                        <div className="header-item menu-item menu-language">
                            <img src={Images.Icons.shopping_card_icon} alt="icon"/>
                            <span className='badge badge-warning' id='lblCartCount'> 5 </span>
                        </div>
                        <div className="header-item menu-item">
                            <DropDown items={itemsDropDown} title={language}/>
                        </div>
                        <div className="header-item menu-item item-close">
                            <Button onClick={() => setShowMenu(false)}>Close</Button>
                        </div>
                    </div>
                    <div className="menu-content-bottom">
                        <div className="menu-item">
                            <Button onClick={onLogout} type="primary">Log out</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-container">
                <div className={`nav-logo ${notShow && 'logo-header-hidden'} `}>
                    {notShow && <img src={Images.Icons.ECom_icon} alt="icon"/>}
                </div>
                <div className='header-content'>
                    <div className="header-item icon-hidden">
                        <div className="header-logo">
                            <img src={Images.Icons.ECom_icon} alt="icon"/>
                        </div>
                    </div>
                    <div className="header-item item-hidden">
                        <img src={Images.Icons.profile_icon} alt="icon"/>
                        <p className='profile-content'>My profile</p>
                    </div>
                    <div className="header-item item-hidden">
                        <CartHeader/>
                    </div>
                    <div className="header-item item-hidden">
                        <DropDown items={itemsDropDown} title={language}/>
                    </div>
                    <div className="header-item item-search">
                        <Search
                            placeholder="Search......"
                            onSearch={onSearch}
                            className='search-box'
                            onChange={handleChangeSearch}
                            onBlur={() => {
                                setShowSearchColumn(false)
                                dispatch(actions.clearSearchProduct())
                            }
                            }
                            onClick={() => setShowSearchColumn(true)}
                        />
                        {showSearchColumn && <div className="search-container">
                            <div className="search-content">
                                <DataRowSearch dataRow={searchProductList.data}/>
                            </div>
                        </div>}
                    </div>
                    <div className="header-item item-hidden">
                        <Button onClick={onLogout} type="primary">Log out</Button>
                    </div>
                    <div className="header-item item-show-menu">
                        <Button onClick={() => {
                            setShowMenu(true)
                        }}><MenuOutlined/></Button>
                    </div>
                </div>
            </div>
            <nav className={`nav-container ${notShow && 'not-show-nav'}`}>
                <div className="nav-logo">
                    <img src={Images.Icons.ECom_icon} alt="icon"/>
                </div>
                <div className="nav-content">
                    <div className="nav-item">
                        <NavLink to={'/'}
                                 className={(isActive: boolean) => (isActive ? 'active' : '')}>HOME </NavLink>
                    </div>
                    <div className="nav-item">
                        <NavLink to={'/bags'}
                                 className={(isActive: boolean) => (isActive ? 'active' : '')}>BAGS</NavLink>
                    </div>
                    <div className="nav-item">
                        <NavLink to={'/sneakers'}
                                 className={(isActive: boolean) => (isActive ? 'active' : '')}>SNEAKERS</NavLink>
                    </div>
                    <div className="nav-item">
                        <NavLink to={'/belt'}
                                 className={(isActive: boolean) => (isActive ? 'active' : '')}>BELT</NavLink>
                    </div>
                    <div className="nav-item">
                        <NavLink to={'/contact'}
                                 className={(isActive: boolean) => (isActive ? 'active' : '')}>CONTACT</NavLink>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
