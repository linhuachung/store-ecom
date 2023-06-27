import React from 'react'
import ReactDOM from 'react-dom/client'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Theme from './theme';
import RoutesComponent from './app/routes';
import Store from './store';
import './languages';
import './main.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Store>
        <Theme>
            <RoutesComponent/>
        </Theme>
    </Store>
)
