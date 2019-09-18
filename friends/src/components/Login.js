import React, { useState, useReducer } from 'react';
import { reducer, initialState } from './reducers/LoginReducer';
import { axiosWithAuth } from './utils/axiosWithAuth';
import Loader from 'react-loader-spinner';

const Login = props => {
    const [user, setNewUser] = useState({username: '', password: ''});

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleChanges = e => {
    setNewUser({...user, [e.target.name]: e.target.value});        
    };

    const login = e => {
        e.preventDefault();

        axiosWithAuth().post('http://localhost:5000/api/login', user)
            .then(res => {
                console.log('Login api', res.data)
                localStorage.setItem('token', res.data.payload);

                dispatch({ type: 'LOGIN', payload: res.data})

                props.history.push('/protected');
            })
            .catch(err => {
                console.log('Error in login api', err.response)
            })
        setNewUser('');
    }
    console.log('State', state);

    return (
        <form>
            <div className="user-form">
                <label>Username: </label>
                <input 
                    className="user-form"
                    type="text"
                    name="username"
                    placeholder="Add a username"
                    value={user.username} 
                    onChange={handleChanges}
                />
            </div>

            <div className="user-form">
                <label>Password:</label>
                <input 
                    className="user-form"
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    value={user.password} 
                    onChange={handleChanges}
                />
            </div>

            <button onClick={login}>
                {props.isLoading ? 
                (<Loader 
                    type="Watch"
                    color="#00BFFF"
                    height="40"
                    width="40"
                    /> ) : 
                   ('Submit')}
                </button>
        </form>
    )
}

export default Login;