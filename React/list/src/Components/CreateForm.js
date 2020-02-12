import React from 'react';
import axios from 'axios';
import { useState } from 'react';

function CreateForm({ history }) {

    const [newUser, setNewUser] = useState({
        name: "",
        bio: ""
    });

    const changeHandler = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    };

    const submitHandler = (e) => {
        e.preventDefault();
        axios
            .post("http://127.0.0.1:8080/api/users", newUser)
            .then(res => {
                console.log(res);
                history.push("/")
            })
            .catch(err => {
                console.log(err)
            })
    };

    return (
        <div>
            <form onSubmit={submitHandler}>
                <label htmlFor="name">Name</label>
                    <input type="text"
                    name="name"
                    value={newUser.name}
                    placeholder="Please enter a name"
                    onChange={changeHandler}
                    />
                <label htmlFor="bio">Bio</label>
                    <input type="text"
                    name="bio"
                    value={newUser.bio}
                    placeholder="Please enter your bio"
                    onChange={changeHandler}
                    />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateForm;
