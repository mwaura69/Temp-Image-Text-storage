import React from 'React'
import {Link, Outlet} from 'react-router-dom'

const Nav = () => {
    const list = [
        {
            id: 2, 
            nav: 'Insert'
        },
        {
            id: 3,
            nav: 'Read'
        },
        {
            id: 4, 
            nav: 'Upload'
        },
        {
            id: 5,
            nav: 'List'
        },
    ]
    return (
        <>
            <div className='nav-div'>
                <ul className='textul-div'>
                    {list.map(({id, nav}) => (
                        <li className='textli-div' key={id}>
                        <Link to={nav}>{nav}</Link>
                    </li>
                    ))}
                </ul>
                <Outlet />
            </div>
        </>
    )
}

export default Nav