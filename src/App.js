import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:2233/users');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className="App">
      <h1>User Data</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Place</th>
            <th>Phone Number</th>
            <th>Photo</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.class}</td>
              <td>{user.place}</td>
              <td>{user.phoneNumber}</td>
              <td>
                {user.photo && typeof user.photo === 'string' ? (
                  <img src={user.photo} alt={user.name} style={{ width: '50px' }} />
                ) : user.photo && user.photo instanceof Buffer ? (
                  <img src={`data:image/jpeg;base64,${user.photo.toString('base64')}`} alt={user.name} style={{ width: '50px' }} />
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
