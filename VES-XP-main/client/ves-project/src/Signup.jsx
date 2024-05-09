import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios'
import { useNavigate } from "react-router-dom";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, Container, Form } from "react-bootstrap";

import group from './assets/group.jpg'

import icon from './assets/icon.jpg'

import { Mail ,Lock} from 'lucide-react';



function Signup() {    

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passwordConfirm, setpasswordConfirm] = useState()

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password === passwordConfirm) {
        Axios.post("http://localhost:5000/register", { name, email, password })
        .then(result => {console.log(result)
        navigate("/login")
        })
        .catch(err => console.log(err))
        }
    }


  return (
    <>
    {/* <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-3 rounded w-25">
        <h2><center>Sign Up</center></h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name">
                        <strong>Name</strong>
                    </label>
                    <input type="text" 
                    placeholder='Enter Name' 
                    autoComplete='off' 
                    name='name' 
                    className='form-control rounded-0'
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Email</strong>
                    </label>
                    <input type="text" 
                    placeholder='Enter Email' 
                    autoComplete='off' 
                    name='email' 
                    className='form-control rounded-0' 
                    onChange={(e) => setEmail(e.target.value)}

                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Password</strong>
                    </label>
                    <input type="password" 
                    placeholder='Enter Password' 
                    name='password' 
                    className='form-control rounded-0' 
                    onChange={(e) => setPassword(e.target.value)}

                    />
                </div>
                <button type="submit" className="button2">
                    Sign Up
                </button>
                </form>
                <p>Already have an account?</p>
                <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Login
                </Link>
            
        </div>
    </div> */}










    <div>
        <Container>
            <div className="main-login" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>

            <div>
                <h1 style={{color:"#85BCA5", textAlign:"center", webkitTextStrokeWidth: "1px",webkitTextStrokeColor: "black" }}>Sign Up</h1>
                <img style={{maxWidth: "100%"}} src={icon} alt="" />
            <Form  onSubmit={handleSubmit}>

            <div className="form-outline flex-fill mb-0">
                    <label style={{fontWeight: "bold", padding: "5px 0"}} htmlFor="email">Full Name</label>
                <Form.Control type="text" placeholder="Your First Name"
                        required
                        id = "name" value={name}
                        onChange={e => setName(e.target.value)}
                        className="email-input"
                />
                </div>

                <div className="form-outline flex-fill mb-0">
                    <label style={{fontWeight: "bold", padding: "5px 0"}} htmlFor="email">Email</label>
                    <div className="hold-input">
                <Form.Control type="email" placeholder="Your Email"
                        required
                        id = "email" value={email}
                        onChange={e => setEmail(e.target.value)}
                        style={{paddingLeft: "30px"}}
                />
                <Mail className="icon-input"/>
                </div>
                </div>

                <div className="form-outline flex-fill mb-0">
                <label style={{fontWeight: "bold", padding: "5px 0"}} htmlFor="password">password</label>
                <div className="hold-input">
                <Form.Control type="password" placeholder="Your Password"
                        required
                        id="password" value={password}
                        onChange={e => setPassword(e.target.value)}
                        style={{paddingLeft: "30px"}}
                />
                <Lock className="icon-input"/>
                </div>
                </div>

                <div className="form-outline flex-fill mb-0">
                <label style={{fontWeight: "bold", padding: "5px 0"}} htmlFor="passwordConfirm">Confirm password</label>
                <div className="hold-input">
                <Form.Control type="password" placeholder="Your Password"
                        required
                        id="passwordConfirm" value={passwordConfirm}
                        onChange={e => setpasswordConfirm(e.target.value)}
                        style={{paddingLeft: "30px"}}
                />
                <Lock className="icon-input"/>
                </div>
                </div>

                {/* <div className="form-outline flex-fill mb-0" style={{display: "flex", justifyContent: "space-between" ,paddingTop: "10px"}}>
                <div style={{flexDirection: "row",display: "flex"}}>
                <Form.Check type="checkbox" placeholder="كلمة السر"
                        required
                        id="checkbox" value={password}
                        onChange={e => setPassword(e.target.value)}
                />
                <label htmlFor="checkbox">Remember Me</label>
                </div>
                <p>Forget Password?</p>
                </div> */}

                <Button style={{width:"100%", backgroundColor: "#3A5C65", margin: "5px 0"}} type="submit">Create</Button>
                <p style={{textAlign: "center", paddingTop:"20px"}}>Do Not Have Account? <Link to="/login" style={{color: "#3A5C65" , fontWeight: "bold"}}>Log in</Link></p>
                {/* <a href="/register"> تسجيل دخول جديد</a>   */}
            </Form>
            </div>

            <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                <img  src={group} className="img-fluid" />
            </div>

            </div>
        </Container>
    </div>
    </>
  );
}

export default Signup;