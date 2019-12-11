import React from 'react';
import {Link} from 'react-router-dom'
//functional component//
const Header = () => {
    return(
        <div>
            <Link to='/dash'>Dashboard</Link>
            HEADER
            <Link to='/profile'>Profile</Link>
        </div>
    )
}

export default Header;