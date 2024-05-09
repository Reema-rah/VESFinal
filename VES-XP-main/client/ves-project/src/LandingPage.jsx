import { useNavigate } from 'react-router-dom';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';





import './Stayle.css'

import img1 from "./assets/img/scr1.png"

import img2 from "./assets/img/chart-bar-33.svg"//./assets/img/ed.svg

import img3 from "./assets/img/main.png"

import img4 from "./assets/img/Icon awesome-eye.svg"
import img5 from "./assets/img/chart-bar-33.svg"
import img6 from "./assets/img/newsletter-dev.svg"//./assets/download (1).png
import img7 from "./assets/img/timeline.svg"
import img8 from "./assets/img/Group 21.svg"
import img9 from "./assets/img/Icon awesome-eye.svg"
import img10 from "./assets/img/Icon awesome-eye.svg" 
import img11 from "./assets/img/image 6.svg"
import img12 from "./assets/img/Screenshot_2024-05-04_001548-removebg-preview.png"
import img13 from "./assets/img/PSAU.png"
import img14 from "./assets/img/PMP.png"
import img15 from "./assets/img/ISO3.png"
import img16 from "./assets/img/SCS.png"
import img17 from "./assets/img/Social Media icons.svg"
import img18 from "./assets/img/Icon ionic-ios-send.svg"
import img19 from "./assets/img/image 7.svg"

function LandingPage() {

  const navigate = useNavigate();

  return (
  <div>
    
    <nav className="navbar">
      <div className="logo">
        <img src={img1} alt=""  width="49" height="48" />
      </div>
      <div className="menu">
        <ul>
          <li>
            <a href="#About">About </a>
            <div className="line"></div>
          </li>
          <li>
            <a href="#Objective">Our Objectives </a>
            <div className="line"></div>
          </li>
          <li>
            <a href="#Contact">Contact Us </a>
            <div className="line"></div>
          </li>
          <li>
            <a href="#Login">Login </a>
            <div className="line"></div>
          </li>
        </ul>
        <div className="button">
          <div className="btn1">Start free trial</div>
          <div className="btn2 abs">Let's go</div>
        </div>
        <div className="menu_close">
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
      <div className="menu_btn">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </nav>
    
    <div className="main">
      <div className="container">
        <div
          className="col"
          data-aos="fade-up"
          data-aos-easing="easy"
          data-aos-duration="1000"
        >
          
          <div className="tagg">
            <img src={img2} alt="" />
            <p>v1.1 released. <a href="#">Learn more</a></p>
          </div>
          <h1>with VES-XP</h1>
          <p className="dist">
            inVESt in your time and effort
          </p>
          <div className="btn_group">
            <button>
              Start free trial
              <div style={{backgroundColor: "#fff"}} className="line"></div>
            </button>
            <button>
              Learn more
              <div className="line"></div>
            </button>
          </div>
        </div>
        <div
          className="col right"
          data-aos="fade-up"
          data-aos-easing="easy"
          data-aos-duration="1000"
          data-aos-delay="1000"
        >
          <img className="img" src={img3} alt="VES-XP logo" width="472" height="370"/>
        </div>
      </div>
    </div>

    <div id="About" className="about">
      <div className="container">
        <div
          className="headers card"
          data-aos="fade-up"
          data-aos-easing="easy"
          data-aos-duration="1000"
          data-aos-delay="100"
        >

          <div className="tagg">
            <img src={img4} alt="" />
            <p>Why VES-XP</p>
          </div>
          <h1>Discover VES-XP Advantage<br/> Elevating Management Excellence</h1>
          <p className="disc1">
            Our platform offers an array of cutting-edge features designed to optimize efficiency, foster collaboration, and drive growth.
          </p>
        </div>

        <div className="cards">
          <div
            className="card"
            data-aos="fade-up"
            data-aos-easing="easy"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            <div className="img">
              <img src={img5} alt="" />
            </div>
            <h1>Valuable business insights</h1>
            <p>
              with our platform. Streamline workflow, boost productivity, and drive growth with intuitive tools and actionable analytics.
            </p>
          </div>
          <div
            className="card"
            data-aos="fade-up"
            data-aos-easing="easy"
            data-aos-duration="1000"
            data-aos-delay="450"
          >
            <div className="img">
              <img src={img6} alt="" />
            </div>
            <h1>Our customers Count on us</h1>
            <p>
              depend on our reliability, innovation, and dedication. We understand the importance of delivering excellence every step of the way
            </p>
          </div>
          <div
            className="card"
            data-aos="fade-up"
            data-aos-easing="easy"
            data-aos-duration="1000"
            data-aos-delay="700"
          >
            <div className="img">
              <img src={img7} alt="" />
            </div>
            <h1>Empowering Success Together</h1>
            <p>
              we believe in collaborative success. As your trusted partner, we're dedicated to empowering your growth journey
            </p>
          </div>
        </div>
      </div>
    </div>

    <div id="Objective" className="products">
      <div className="container">
        <div
          className="col right"
          data-aos="fade-up"
          data-aos-easing="easy"
          data-aos-duration="1000"
          data-aos-delay="1000"
        >
          <img className="img" src={img8} alt="" />
        </div>
        <div
          className="col"
          data-aos="fade-up"
          data-aos-easing="easy"
          data-aos-duration="1000"
          data-aos-delay="500"
        >
          <div className="tagg">
            <img src={img9} alt="" />
            <p>For Teamwork </p>
          </div>
          <h1>VES-XP: Transforming Teamwork</h1>
          <p>
            At VES-XP, we understand the importance of teamwork in achieving success. Our platform is designed to streamline collaboration, facilitate communication, and enhance productivity within your team.          </p>
        </div>
      </div>
    </div>

    <div className="engenering">
      <div className="container">
        <div
          className="col"
          data-aos="fade-up"
          data-aos-easing="easy"
          data-aos-duration="1000"
          data-aos-delay="1000"
        >
          <div className="tagg">
            <img src={img10} alt="" />
            <p>For Engineering Teams</p>
          </div>
          <h1>
            VES-XP: Revolutionizing Resource Management 
          </h1>
          <p>
            At VES-XP, we recognize that efficient resource management is essential for business success. Our platform offers comprehensive solutions to optimize resource allocation, track utilization, and maximize efficiency
          </p>
        </div>
        <div
          className="col right"
          data-aos="fade-up"
          data-aos-easing="easy"
          data-aos-duration="1000"
          data-aos-delay="1500"
        >
          <img className="img" src={img11} alt="" />
        </div>
      </div>
    </div>

    <div id="Login" className="colobaration">
      <div className="container">
  
        <div className="top_side">
          <p className="disc">
            "The greatest leader is not necessarily the one who does the greatest things. He is the one that gets the people to do the greatest things"
          </p>
          <img src={img12} alt="" />
          <p className="avatar_text">
            Ronald Reagan
          </p>
        </div>
        <div className="image-container">
          <img
            data-aos="fade-up"
            data-aos-easing="easy"
            data-aos-duration="1000"
            data-aos-delay="200"
            src={img13}
            alt=""
            width="120px" 
          />
          <img
            className="gray-image"
            data-aos="fade-up"
            data-aos-easing="easy"
            data-aos-duration="1000"
            data-aos-delay="600"
            src={img14}
            alt=""
            width="120px" 
          />
          <img
            className="gray-image"
            data-aos="fade-up"
            data-aos-easing="easy"
            data-aos-duration="1000"
            data-aos-delay="1000"
            src={img15} 
            alt=""
            width="120px" 
          />
          <img
            data-aos="fade-up"
            data-aos-easing="easy"
            data-aos-duration="1000"
            data-aos-delay="1400"
            src={img16}
            alt=""
            width="120px" 
          />
        </div>
      </div>
    </div>
    
    <footer>
      <div id="Contact" className="contact">
      <div className="container">
        <div className="top_side">
          <div className="col1">
            <img src={img1} alt="VES-XP logo" width="240" height="170" />
            <p>
              Join our thriving community and stay updated!🌟<br />
              with our latest updates and events by <br />
              following us on social media. <br />
             
            </p>
            <div className="media">
              <img src={img17} alt="" />
            </div>
          </div>
          <div className="footer_col">
            <p className="header">Product</p>
            <p className="date">Connections</p>
            <p className="date">Protocols</p>
            <p className="date">Personas</p>
            <p className="date">Integrations</p>
            <p className="date">Catalog</p>
            <p className="date">Pricing</p>
            <p className="date">Security</p>
            <p className="date">GDPR</p>
          </div>
          <div className="footer_col">
            <p className="header">For Developers</p>
            <p className="date">Docs</p>
            <p className="date">API</p>
            <p className="date">Open Source</p>
            <p className="date">Engineering Team</p>
          </div>
          <div className="footer_col">
            <p className="header">Company</p>
            <p className="date">Careers</p>
            <p className="date">Blog</p>
            <p className="date">Press</p>
          </div>
          <div className="footer_col">
            <p className="header">Support</p>
            <p className="date">Help Center</p>
            <p className="date">Contact Us</p>
            <p className="date">Security</p>
            <p className="date">Bulletins</p>
            <p className="date">Documentation</p>
            <p className="date">Partner</p>
            <p className="date">Portal</p>
          </div>
          <div className="footer_col1">
            <p className="header">Get in touch with us!</p>
            <div className="input">
              <input type="email" placeholder="Email" />
              <img src={img18} alt="" />
            </div>
          </div>
        </div>
        <div className="bottom_side">
          <p>Software ENGs</p>
          <img src={img19} alt="" />
        </div>
      </div>
    </div>
    </footer>
  </div>
  );
}

{/* // <div className="landing-page">
    //   <h1>Welcome to Your App</h1>
    //   <p>Get started by registering or logging in</p>
    //   <Link to="/register">
    //     <button>Register</button>
    //   </Link>
    //   <Link to="/login">
    //     <button>Login</button>
    //   </Link>
    // </div> */}

export default LandingPage;
