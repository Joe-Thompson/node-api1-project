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
            <h1 className="title">Add a New Companion to your Fellowship</h1>
            <form className="createForm" onSubmit={submitHandler}>
                <label className="label" htmlFor="name">Name</label>
                    <input type="text"
                    className="input"
                    name="name"
                    value={newUser.name}
                    placeholder="Please enter a name"
                    onChange={changeHandler}
                    />
                <label className="label" htmlFor="bio">Bio</label>
                    <input type="text"
                    className="input"
                    name="bio"
                    value={newUser.bio}
                    placeholder="Please enter your bio"
                    onChange={changeHandler}
                    />
                <button className="createBtn btn" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateForm;
