import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'
import { Button, Container, Form } from "react-bootstrap";

import group from './assets/group.jpg'

import icon from './assets/icon.jpg'

import { Mail ,Lock} from 'lucide-react';



function Login() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const [cookies, setCookies] = useCookies(["access_token"])

    // const inputEmail = useRef().current


    useEffect(() => {
        var userID = window.localStorage.getItem("userID");
        if (userID && userID !== "") {
            navigate(`/Projects`)
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:5000/login", { email, password })
            .then(result => {
                setCookies("access_token", result.data.token)
                console.log(result)
                if (result.data.message === "Success") {
                    navigate(`/Projects`)
                    setCookies("access_token", result.data.token)
                    window.localStorage.setItem("userID", result.data.userID)
                } else {
                    alert("You are not registered to this service")
                    navigate("/Signup")
                }

            })
            .catch(err => console.log(err))
    }


    return (
<>
        {/* <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2><center>Login</center></h2>
                <form onSubmit={handleSubmit}>

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
                        Login
                    </button>
                </form>
                <p>Dont have an account?</p>
                <Link to="/Signup" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Sign Up
                </Link>

            </div>
        </div> */}

    <div>
        <Container>
            <div className="main-login" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>

            <div>
                <h1 style={{color:"#85BCA5", textAlign:"center", webkitTextStrokeWidth: "1px",webkitTextStrokeColor: "black" }}>Login</h1>
                <img style={{maxWidth: "100%"}} src={icon} alt="" />
            <Form  onSubmit={handleSubmit}>
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

                <div className="form-outline flex-fill mb-0" style={{display: "flex", justifyContent: "space-between" ,paddingTop: "10px"}}>
                <div style={{flexDirection: "row",display: "flex"}}>
                <Form.Check type="checkbox" placeholder="كلمة السر"
                        required
                        id="checkbox" value={password}
                        onChange={e => setPassword(e.target.value)}
                />
                <label htmlFor="checkbox">Remember Me</label>
                </div>
                <p>Forget Password?</p>
                </div>

                <Button style={{width:"100%", backgroundColor: "#3A5C65"}} type="submit">Login</Button>
                <p style={{textAlign: "center", paddingTop:"20px"}}>Do Not Have Account? <Link to="/Signup" style={{color: "#3A5C65" , fontWeight: "bold"}}>Create Account</Link></p>
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



{/* <Container>
  <section className="login_up"  style={{marginTop:"150px" , marginBottom:"100px"}}>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className=" text-black ">
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img src={group} className="img-fluid" />
                </div>
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">تسجيل دخول</p>
  
                    <Form className="form" onSubmit={handleSubmit}>
  
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0" ref={inputEmail}>
                      <Form.Control type="email" placeholder="البريد الألكتروني"
                              required
                              id = "email" value={email}
                              onChange={e => setEmail(e.target.value)}
                      />
                      </div>
                      </div>
  
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                      <Form.Control type="password" placeholder="كلمة السر"
                              required
                              id="password" value={password}
                              onChange={e => setPassword(e.target.value)}
                      />
                      </div>
                      </div>
  
                      <Button style={{width:"100%"}} variant="success" type="submit">تسجيل دخول</Button>
                      <p>ليس لدي حساب</p>
                      <a href="/register"> تسجيل دخول جديد</a>  
                    </Form>
    
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
    </Container> */}

export default Login;