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
        <div>
            <h1 className="Title">The Fellowship of the Ring</h1>
            {users.map((user) => {
                    return (
                        <div key={user.id}>
                            <h1>{user.name}</h1>
                            <h3>{user.bio}</h3>
                            <Link to={`/update/${user.id}`}>Update</Link>
                            <button value={user.id} onClick={clickHandler}>Delete</button>
                        </div>
                    )
                })}
                <Link to="/create">Create New User</Link>
        </div>
    )
}

export default Dashboard;
