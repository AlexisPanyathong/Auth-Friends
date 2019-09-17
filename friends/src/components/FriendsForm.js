import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from './utils/axiosWithAuth';
import { initialState } from './reducers/LoginReducer';

const FriendForm = () => {
    const [newFriend, setNewFriend] = useState({name: '', age: '', email: '' });
    const [friends, setFriends] = useState([]);

    const getFriend = () => {
        //* GET request for getting friends data goes here */

        axiosWithAuth.get('http://localhost:5000/api/friends')
            .then(res => {
                console.log('Friends api', res.data)
                setFriends(res.data)
            })
            .catch(err => {
                console.log('Error in friends api', err.response)
            })
    }

    useEffect(() => {
        getFriend();
    }, [])

    const handleChanges = e => {
        setNewFriend({...newFriend, [e.target.name]: e.target.value});
    };

    const addFriend = e => {
        e.preventDefault();
        //* POST request for adding a friend goes here */
        axiosWithAuth.post('http://localhost:5000/api/friends', friends)
            .then(res => {
                console.log('Add friend api', res.data)
                setFriends(res.data)
            })
            .catch(err => {
                console.log('Error in add friends api', err.response)
            })
        setNewFriend('');
    };

    return (
        <>
        <form>
            <div className="friends-form">
                <label>Name: </label>
                <input
                    className="friends-form"
                    type="text"
                    name="name"
                    placeholder="Add a name"
                    value={friends.name} required
                    onChange={handleChanges}
                />
            </div>
            
        </form>
        </>
    )

}