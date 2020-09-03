import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { login_user } from '../redux/actions/userActions';
import axios from 'axios';

function Auth(props) {
    
    const dispatch = useDispatch();
    
    let [ usernameInput, setUsername ] = useState('');
    let [ passwordInput, setPassword ] = useState('');

    const handleLogin = () => {
        console.log("Login Called");
        console.log(`Username: ${usernameInput}, ${passwordInput}`)
        axios.post('/auth/login', { 
                username: usernameInput,
                password: passwordInput 
            } )
            .then( res => {
                dispatch( login_user( res.data ) );
                props.history.push('/events');
            } )
            .catch( error => {
                console.log(error);
                alert("Login Failed. Check Login Info");
            } )
    }

    return(
        <div className="Auth">
            <div className="auth-login-window">
                <div className="auth-title-container">
                    <h1 className="auth-title">Login</h1>
                </div>
                <div className="auth-input-container">
                    <h3 className="auth-input">Username:</h3>
                    <input className="auth-input" name="username" type="text" placeholder="username"
                        onChange={ event => setUsername(event.target.value) }
                    />
                    <h3 className="auth-input">Password:</h3>
                    <input className="auth-input" name="password" type="password" placeholder="password"
                        onChange={ event => setPassword(event.target.value) }
                    /> 
                </div>
                <div className="auth-button-container">
                    <button className="auth-button"
                        onClick={() => handleLogin()}
                    >Login</button>
                </div>
            </div>            
        </div>
    );
}

export default Auth;
