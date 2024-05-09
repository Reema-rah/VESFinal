import { useState, useEffect } from 'react'
import Axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'

import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Modal, ListGroup, Form, Button } from 'react-bootstrap'

function Projects( ) {
    const api = "http://localhost:5000"

    const [projects, setProjects] = useState([])
    const userID = window.localStorage.getItem("userID")
    const [errorMessage, setErrorMessage] = useState("");
    const [_, setCookies] = useCookies("access_token")
    const navigate = useNavigate()

    const removeCookies = () => {
    setCookies("access_token", "")
    window.localStorage.removeItem("userID")
    // navigate("/login")
    navigate("/splash")
    location.reload();
}

    useEffect(() => {
        fetchData();
    },[]);

    const fetchData = async () => {
        try {
            const response = await fetch(api + `/userProject/${userID}`);
            if (!response.ok) {
                throw new Error(`Error fetching project details: ${response.statusText}`);
            }

            const data = await response.json();
            setProjects(data);


        } catch (error) {
            console.error('Error fetching project details:', error.message);
        }
    };

    const [showModal, setShowModal] = useState(false);
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [newProjectName, setNewProjectName] = useState("");
    const [newPasscode, setNewPasscode] = useState("");
    const [checkbox, setCheckbox] = useState(false);


    const [Id, setInId] = useState("");

    const handleOpenModal = (_id, projectName, passcode) => {
        setInId(_id)
        setErrorMessage("")
        setNewProjectName(projectName)
        setNewPasscode(passcode)
        setShowModal(true);
    };

    const handleJoinModal = (passcode) => {
        setNewPasscode(passcode)
        setShowJoinModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setShowJoinModal(false);
    };

    const handleSave = () => {
        const userID = window.localStorage.getItem("userID")
        Axios.post(`${api}/project`, { _id: Id, projectName: newProjectName, passcode: newPasscode, userID: userID })
            .then(res => {

                if (res.data.message) {
                    setErrorMessage("Passcode already reserved.")
                }
                else {
                    handleCloseModal();
                    fetchData();
                }


                return res.data;
            }).catch(error => {
                if (error.response && error.response.status === 500) {
                    setErrorMessage(error);
                }
            });

    };
    const handleJoin = async () => {
        const userID = window.localStorage.getItem("userID")
        const projectID = window.localStorage.getItem("ProjectID")

        Axios.post(`${api}/joinProject`, { passcode: newPasscode, userID: userID})
        .then(res => res.data)

        Axios.post(`${api}/isCustomer`, { idProject: projectID, idMember: userID, isCustomer: checkbox })
        .then(res => console.log(res.data))

        // try {
        //  Axios.post(`${api}/joinProject`, { passcode: newPasscode, userID: userID})
        //     .then(res => res.data)
        // } catch (e){
        //     console.log(e)
        // } finally{
        //     Axios.post(`${api}/isCustomer`, { idProject: projectID, idMember: userID, isCustomer: checkbox })
        //     .then(res => console.log(res.data))
        // }

        handleCloseModal();
        fetchData();
    };

    const handleDeleteProject = async (projectID) => {
        // Show confirmation dialog
        const confirmDelete = window.confirm('Are you sure you want to delete this Project?');

        if (confirmDelete) {
            try {
                // Send delete request to the server
                const response = await fetch(api + `/project/${projectID}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    console.log('Project deleted successfully');
                    // Fetch data again after deleting
                    fetchData();
                } else {
                    console.error('Error deleting Project');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <Container>
            <div className="result">

                {showModal && (
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Project</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} />

                                <Form.Label>PassCode</Form.Label>
                                <Form.Control type="text" value={newPasscode} onChange={(e) => setNewPasscode(e.target.value)} />
                                <p>{errorMessage}</p>
                            </Form.Group>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit" onClick={handleSave}>
                                Save Changes
                            </Button>

                        </Modal.Footer>
                    </Modal>
                )}

                {showJoinModal && (
                    <Modal show={showJoinModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Join Project</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="formName">
                                <Form.Label>PassCode</Form.Label>
                                <Form.Control type="text" value={newPasscode} onChange={(e) => setNewPasscode(e.target.value)} />

                                <div style={{textAlign:"left"}}>
                                <Form.Check // prettier-ignore
                                    type="checkbox"
                                    onChange={()=> setCheckbox(prev => !prev)}
                                    label="are you customer"
                                />
                                </div>
                            </Form.Group>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit" onClick={handleJoin}>
                                Join
                            </Button>

                        </Modal.Footer>
                    </Modal>

                )}

                <br></br>
                <h1 style={{fontWeight: "bold", color: "#3A5C65", marginBottom: "100px"}}>projects</h1>
                <div style={{display: "flex", gap: "30px"}}>
                    {projects.map(({ _id, projectName, passcode }) => {
                        return (
                            <ListGroup key={_id}>
                                <ListGroup.Item style={{
                                    border: "3px solid black",
                                    borderRadius: "5px",
                                    height: "200px",
                                    width: "180px",
                                    backgroundColor: "white"
                                }} variant="dark" className="align-items-start card">
                                    <div className="ms-2 me-auto">
                                        <div 
                                        // className="fw-bold "
                                        >
                                            <a href={`/space/${_id}`}
                                            style={{textDecoration: "none",
                                            color:"black" , fontSize: "30px"}}
                                            >
                                                {projectName}
                                                <br />
                                                {passcode}
                                            </a>
                                            <div style={{paddingTop: "80px" , display: "flex", justifyContent: "space-around"}}>
                                            <img src="delete.svg" type="submit" alt="Delete List" onClick={() => handleDeleteProject(_id)} />
                                            <img src="edit.svg" type="submit" alt="Edit List" onClick={() => handleOpenModal(_id, projectName, passcode)} />
                                            </div>
                                        </div>
                                    </div>

                                </ListGroup.Item>

                            </ListGroup>
                        );
                    })}
                    <div className='card'>
                    <img className='add-project' src="add.svg" type="submit" alt="Edit List" onClick={() => handleOpenModal("", "", "")} />
                    </div>
                </div>
                {/* <img src="add.svg" type="submit" alt="Edit List" onClick={() => handleOpenModal("", "", "")} /> */}
                <button className='button' type="submit" alt="Edit List" onClick={() => handleJoinModal("")}>join</button>
                {/* <img src="edit.svg" type="submit" alt="Join Project" onClick={() => handleJoinModal("")} /> */}
                <button style={{ color: 'green', width:80 , cursor: 'pointer' }} onClick={removeCookies}>Logout</button>
            </div>

        </Container>
        

    )
}

export default Projects;