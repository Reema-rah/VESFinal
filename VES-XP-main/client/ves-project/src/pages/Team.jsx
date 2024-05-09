import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

function Team() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [users, setUsers] = useState([]);

  const userID = window.localStorage.getItem("userID")
  const projectID = window.localStorage.getItem("ProjectID")

  const [customer, setCustomer] = useState([]);

  const [arr, setArr] = useState([]);


  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await Axios.get(`http://localhost:5000/project/${id}`);
        setProject(response.data);
        // Fetch user details for each user ID
        const usersData = await Promise.all(response.data.userIDs.map(userId =>
          Axios.get(`http://localhost:5000/user/${userId}`)
        ));
        setUsers(usersData.map(user => user.data));
      } catch (error) {
        console.error('Error fetching project details:', error);
      }

      try{
        const customersResponse = await fetch(`http://localhost:5000/isCustomer`);

        if (!customersResponse.ok) {
          throw new Error(`Error fetching customer `);
        }
        
        const customers = await customersResponse.json();
        setCustomer(customers);

        } catch (y){
          console.log(y)
        }
    };

    fetchProjectDetails();
  }, [id]);

  useEffect(()=>{
    new Promise((resolve, reject) => {
        Axios.get(`http://localhost:5000/isCustomer`)
          .then(res => {
            setCustomer(res.data);
            resolve();
          })
          .catch(error => {
            console.error('Error fetching project details:', error);
            reject(error);
          });
      });
    },[id])

  // const theOne = 

  useEffect(() => {
        customer.map((c) => {
          users.map((u) => {
          c.idMember === u._id ? arr.push("Customer") : arr.push("Developer")
      })
    })
  }, [users]);

    console.log(arr)

    // console.log(theOne[0]?.isCustomer)

  return (
    <div className='main-container'>
      {/* <h1>Team Page</h1>
      {project && (
        <div>
          <h1>Project Name: {project.projectName}</h1>
          <h2>Team Members:</h2>
          <ul>
            {users.map(user => (
              <li key={user._id}>
                <strong>Name:</strong> {user.username}, <strong>Email:</strong> {user.email}
              </li>
            ))}
          </ul>
        </div>
      )} */}






<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Member role</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user, index) => (
      <tr key={index}>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>
          <p className={`customer ${arr[index] === "Developer"? "notCustomer" : ""}`}>{arr[index]}</p>
          {/* <p className={`developer ${arr[index] === "Not Customer"? "notCustomer" : ""}`}>{arr[index]}</p> */}
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
}

export default Team;



/*import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

function Team() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await Axios.get(`http://localhost:5000/project/${id}`);
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjectDetails();
  }, [id]);

  return (
    <div>
      <h1>Team Page</h1>
      {project && (
        <div>
          <h1>Project Name: {project.projectName}</h1>
          <h2>User IDs:</h2>
          <ul>
            {project.userIDs.map((userId) => (
              <li key={userId}>{userId}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Team;*/
