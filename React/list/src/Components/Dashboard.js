import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8080/api/users")
            .then(res => {
                console.log(res.data);
                setUsers(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    },[]);

    const clickHandler = (e) => {
      e.preventDefault();
      const id = e.target.value;
      axios
          .delete(`http://127.0.0.1:8080/api/users/${id}`)
          .then(res => {
              console.log(res);
              window.location.reload()
          })
          .catch(err => {
              console.log(err)
          })
    };

console.log(users);
    return (
        <>
            <h1 className="title">The Fellowship of the Ring</h1>
            <div className="dashboard">
                {users.map((user) => {
                        return (
                            <div className="userCard" key={user.id}>
                                <h1 className="name">{user.name}</h1>
                                <h3>{user.bio}</h3>
                                <Link className="createBtn btn" to={`/update/${user.id}`}>Update</Link>
                                <button className="createBtn btn delete" value={user.id} onClick={clickHandler}>Delete</button>
                            </div>
                        )
                    })}
            </div>
            <Link className="createBtn" to="/create">Create New User</Link>
        </>
    )
}

export default Dashboard;
