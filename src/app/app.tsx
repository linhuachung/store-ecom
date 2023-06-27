import React from 'react'
import {createRoot} from 'react-dom/client';

import '../resources/styles'
import Store from '../store'
import Theme from '../theme'
import RoutesComponent from './routes'

const rootElement = document.getElementById('application');
``
const root = createRoot(rootElement);
root.render(
    <Store>
        <Theme>
            <RoutesComponent/>
        </Theme>
    </Store>
);
