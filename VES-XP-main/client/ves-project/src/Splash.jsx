// import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom";
// import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, Container } from "react-bootstrap";


import group from './assets/group.jpg'

import icon from './assets/splash.png'


function Splash() {

    const navigate = useNavigate()

    const login = () => {
        navigate("/login")
    }

    const Signup = () => {
        navigate("/Signup")
    }

    return (
        // <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        //     <div className="bg-white p-3 rounded w-25">
        //         <Button className="button1" onClick={Signup}>Signup</Button>
        //         <br />
        //         <br />
        //         <center>
        //             OR
        //         </center>

        //         <br />
        //         <Button className="button2" onClick={login}>Login</Button>
        //     </div>
        // </div>
<div>
        <Container>
            <div className="main-login" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>

            <div>
                <h1 style={{color:"#85BCA5", textAlign:"center", webkitTextStrokeWidth: "1px",webkitTextStrokeColor: "black" }}>Login or Sign Up</h1>
                <div style={{margin: "auto"}}>
                <img style={{maxWidth: "100%"}} src={icon} alt="" />
                </div>
                <Button style={{width:"100%", backgroundColor: "#85BCA5", marginBottom: "30px"}} onClick={Signup}>Sign Up</Button>
                <Button style={{width:"100%", backgroundColor: "#3A5C65"}} onClick={login}>Log In</Button>
            </div>

            <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                <img  src={group} className="img-fluid" />
            </div>

            </div>
        </Container>
    </div>
    )
}

export default Splash;