import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout_user } from '../redux/actions/userActions'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'; 


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
                { props.history.location.pathname === '/events' ?
                <Link to="/grid">
                    <img className="nav-icons" src="./media/grid.png" alt="grid-icon" />
                </Link> 
                :
                <Link to="/events">
                    <img className="nav-icons" src="./media/eventcard.png" alt="eventcard-icon" />
                </Link> 
                }
                <Link to="/settings">
                    <img className="nav-icons" src="./media/settings.png" alt="settings-logo" />
                </Link>
                <Link to="/">
                    <img className="nav-icons" src="./media/logout.png" alt="logout" 
                        onClick={ () => handleLogout() }
                    />
                </Link>
            </div>
        </div>
    );
}

export default withRouter(Nav);