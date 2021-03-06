import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateForm({ match, history }) {

    const id = match.params.id;
    const [user, setUser] = useState({});
    const [editState, setEditState] = useState(false);
    const [newInfo, setNewInfo] = useState({
        name: "",
        bio: ""
    });

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8080/api/users/${id}`)
            .then(res => {
                setUser(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },[id]);

    const edit = tick => {
    setEditState(true);
    setNewInfo(tick)
    };

    const changeHandler = (e) => {
      setNewInfo({
          ...newInfo,
          [e.target.name]: e.target.value
      })
    };

    const submitHandler = (e) => {
        e.preventDefault();
        axios
            .put(`http://127.0.0.1:8080/api/users/${id}`, newInfo)
            .then(res => {
                console.log(res);
                setEditState(false);
                history.push("/")
            })
            .catch(err => {
                console.log(err)
            });
    };
console.log(newInfo);
    return (
        <div className="updateComponent">
            <h1 className="title">Update your Companions</h1>
        <div className="userCard updateCard" onClick={() => edit(newInfo)}>
            <h1>{user.name}</h1>
            <h3>{user.bio}</h3>
            {editState && (
                  <form className="updateForm" onSubmit={submitHandler}>
                      <label htmlFor="name">{user.name} - </label>
                      <input type="text"
                             className="input update"
                             name="name"
                             value={newInfo.name}
                             placeholder="Update your name"
                             onChange={changeHandler}
                      />
                      <label htmlFor="bio">{user.bio} - </label>
                      <input type="text"
                             className="input update"
                             name="bio"
                             value={newInfo.bio}
                             placeholder="Update your bio"
                             onChange={changeHandler}
                      />
                      <button className="createBtn btn" type="submit">Submit</button>
                  </form>
            )}
        </div>
        </div>
    )
}

export default UpdateForm;
