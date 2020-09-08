import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout_user } from '../redux/actions/userActions'
import { Link } from 'react-router-dom';

function Nav(props) {

    const dispatch = useDispatch();

    const handleLogout = () => {
        console.log("Logout Called");
        axios.delete('/auth/logout')
            .then( res => {
                dispatch( logout_user() );
                //props.history.push('/');
            } )
            .catch( error => {
                console.log(error);
            } )
    }

    return(
        <div className="Nav">
            <div className="nav-left-container">
                <button className="nav-filter-menu-button">Filter</button>
            </div>
            <div className="nav-right-container">
                <Link to="/grid">
                    <img className="nav-icons" src="./media/grid9-grey-8c8c8c.png" alt="logout" 
                
                    />
                </Link>
                <Link to="/">
                    <img className="nav-icons" src="./media/logout-grey-8c8c8c.png" alt="logout" 
                        onClick={ () => handleLogout() }
                    />
                </Link>
            </div>
        </div>
    );
}

export default Nav;