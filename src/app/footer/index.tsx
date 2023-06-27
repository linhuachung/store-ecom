import React from 'react'
import { Link } from 'react-router-dom'

/** component */
/** asset */
import { Images } from '../../theme';
import './style.scss'
import { useTranslation } from 'react-i18next';

function Footer() {
    const { t } = useTranslation('footer')
    return (
        <footer>
            <div className="footer_content">
                <div className="footer_link footer_information">
                    <div className="footer_link_item">
                        <div className="item_footer_logo">
                            <img src={Images.Icons.ECom_icon} alt="icon"/>
                        </div>
                        <p className="info">{t('description')}</p>
                    </div>
                    <div className="footer_link_item">
                        <h2 className="title">{t('contact')}</h2>
                        <p className="info">BAP Building, 236/29/18 <br/>Dien Bien Phu,<br/> Ward 17, Binh Thanh
                            District, <br/>Ho Chi Minh</p>
                    </div>
                </div>
                <div className="footer_link">
                    <div className="footer_link_item">
                        <h2 className="title">{t('information')}</h2>
                        <ul className="list_item">
                            <li>
                                <Link to="/">{t('introduce')}</Link>
                                <Link to="/">{t('general_information')}</Link>
                                <Link to="/">{t('terms_of_use')}</Link>
                                <Link to="/">{t('privacy_policy')}</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footer_link_item">
                        <h2 className="title">{t('service')}</h2>
                        <ul className="list_item">
                            <li>
                                <Link to="/">E-commerce</Link>
                                <Link to="/">{t('affiliate_marketing')}</Link>
                                <Link to="/">{t('transport')}</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footer_link_item">
                        <h2 className="title">{t('payment_methods')}</h2>
                        <div className="logo">
                            <div className="logo-item"><img src={Images.Icons.visa_card_icon} alt="icon"/>
                            </div>
                            <div className="logo-item"><img src={Images.Icons.master_card_icon} alt="icon"/>
                            </div>
                            <div className="logo-item"><img src={Images.Icons.jcb_icon} alt="icon"/>
                            </div>
                            <div className="logo-item"><img src={Images.Icons.napas_icon} alt="icon"/>
                            </div>
                            <div className="logo-item"><img src={Images.Icons.momo_icon} alt="icon"/>
                            </div>
                            <div className="logo-item"><img src={Images.Icons.zalo_pay_icon} alt="icon"/>
                            </div>
                            <div className="logo-item"><img src={Images.Icons.vnpay_icon} alt="icon"/>
                            </div>
                            <div className="logo-item"><img src={Images.Icons.viettel_pay} alt="icon"/>
                            </div>
                            <div className="logo-item"><img src={Images.Icons.credit_icon} alt="icon"/>
                            </div>
                            <div className="logo-item"><img src={Images.Icons.master_card_icon} alt="icon"/>
                            </div>
                            <div className="logo-item"><img src={Images.Icons.paypal_card_icon} alt="icon"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer_logo">
                    <div className="description">
                        <p>© copyright - E-commerce</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
