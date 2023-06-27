import React from 'react'

/** component */
/** asset */
import './style.scss'
import {NavLink} from "react-router-dom";
import {RoutePath} from "../../../app/routes/routesConstant";


function Switch() {
    return (
        <nav className='switch-login'>
            <NavLink to={RoutePath.AuthPath.Login}
                     className={(isActive: boolean) => (isActive ? 'active' : 'inactive')}>Login</NavLink>
            <NavLink to={RoutePath.AuthPath.Register}
                     className={(isActive: boolean) => (isActive ? 'active' : 'inactive')}>Register</NavLink>
            <div className="animation start-home"></div>
        </nav>
    )
}

export default Switch
