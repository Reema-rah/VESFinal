import React from 'react';
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, ListGroup } from 'react-bootstrap'
import { useParams } from 'react-router-dom';

import { formatDate } from '../utils';


import { Calendar} from 'lucide-react';


function Lists() {
    const api = "http://localhost:5000"

    const { id } = useParams();
    const [lists, setLists] = useState([])

    const projectID = window.localStorage.getItem("ProjectID")


    // React Router hook for navigation
    const navigate = useNavigate();

    useEffect(() => {
        fetchData()
        Axios.get(`${api}/lists`)
            .then(res => setLists(res.data))
    }, [])


    const fetchData = async () => {
        try {
            const userStoriesResponse = await fetch(`http://localhost:5000/userStoriesProject/${id}`);
            const userStoriesData = await userStoriesResponse.json();
            setUserStories(userStoriesData);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error gracefully (could show a message to the user)
        }
    };

    const [userStories, setUserStories] = useState([]);


    const handleDeleteUserStory = async (userId) => {
        // Show confirmation dialog
        const confirmDelete = window.confirm('Are you sure you want to delete this user story?');

        if (confirmDelete) {
            try {
                // Send delete request to the server
                const response = await fetch(`http://localhost:5000/userStories/${userId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    console.log('User story deleted successfully');
                    // Fetch data again after deleting
                    fetchData();
                } else {
                    console.error('Error deleting user story');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };
    const handleEditUserStory = (userId) => {
        // Navigate to the edit page or open a modal for editing
        // You can implement this based on your preference
        // For simplicity, let's navigate to a new edit page
        navigate(`/userStories/${userId}/edit`);
    };


    return (
        <div className='main-container'>
        <Container>
            <div className="result">
                <br></br>
                <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(325px, 1fr))", gap: "20px", justifyItems:"center" }}>
                    {lists.map(({ _id, name, color }) => {
                        return (
                            <div key={_id}>
                                <div style={{
                                    border: "3px solid " + color,
                                    borderRadius: "5px",
                                    height: "min-content",
                                    width: "300px",
                                    backgroundColor: "white"
                                }} className="align-items-start">
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold" style={{backgroundColor: "#FCFCFC"}}>
                                            {name}
                                        </div>
                                    </div>
                                    <div className='card'>
                                        {/* List of User Stories */}

                                        <ul>
                                            {userStories.map((userStory) => {
                                                if (userStory.status === name) {
                                                    return (
                                                        <div key={userStory._id} className='card-child'>
                                                            <div onClick={() => navigate(`/userStories/${userStory._id}`)}>
                                                            <li key={userStory._id}>
                                                                <span className='card-name'> {userStory.name} </span>
                                                                <span className='card-des'> {userStory.description} </span>
                                                            <span className='card-date'><Calendar className="card-date-icon"/> {formatDate(userStory?.endDate)}</span>
                                                            </li>
                                                            </div>
                                                        </div>
                                                    );
                                                } else {
                                                    return null; // Skip rendering if the condition is not met
                                                }
                                            })}
                                        </ul>
                                    </div>

                                </div>

                            </div>
                        );
                    })}
                </div>

            </div>

        </Container>
        </div>
    )
}

export default Lists;