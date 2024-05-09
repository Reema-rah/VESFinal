import {useState, useEffect, useRef} from 'react';
import axios from 'axios';

import DEA from '../assets/icondefult.jpg';

import Avatar from 'react-avatar-edit'


import {Button, Container, Form} from 'react-bootstrap'
import Modal from 'react-modal';
import UserAvatar from '../components/UserAvatar';





const Setting = () => {

    // const api = "http://localhost:5000"
    // const [selectedFile, setSelectedFile] = useState(null);
    // const [message, setMessage] = useState('');

    // var userID = window.localStorage.getItem("userID");
    // var username = window.localStorage.getItem("username");
    // var useremail = window.localStorage.getItem("email");

    // const [name, setName] = useState(username)
    // const [email, setEmail] = useState(useremail)






    // const handleUpdateSubmit = (e) => {
    //     e.preventDefault()
    //     axios.post("http://localhost:5000/updateUser", { userID, name, email })
    //         .then(result => {
    //             window.localStorage.setItem("username", name)
    //             window.localStorage.setItem("email", email)
    //             window.location.reload();
    //         })
    //         .catch(err => console.log(err))
    // };



    // const handleFileChange = (event) => {
    //     setSelectedFile(event.target.files[0]);
    // };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    //     if (!selectedFile) {
    //         setMessage('Please select an image file to upload');
    //         return;
    //     }

    //     const formData = new FormData();
    //     formData.append('avatar', selectedFile);
    //     formData.append('userID', userID);


    //     try {
    //         const response = await axios.post(api + '/upload-avatar', formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //                 'Authorization': '/* Add authorization token if required */'
    //             }
    //         });

    //         setMessage(response.data.message);

    //         if (response.data.message === 'Avatar uploaded successfully') {
    //             window.localStorage.setItem("avatar", response.data.avatar)
    //             window.location.reload();
    //             // Handle successful upload (e.g., update avatar display)
    //         }
    //     } catch (err) {
    //         console.error(err);
    //         setMessage('Error uploading avatar');
    //     } finally {
    //         setSelectedFile(null); // Clear file selection after upload
    //     }
    // };

    const api_key = "111846971978579"
    const cloud_name = "dz7qnyca4"
    
      const  [username, setUsername] = useState("")
      const  [email, setEmail] = useState("")
      const  [avatar, setAvatar] = useState(null)
      const  [file, setFile] = useState()
      const  [change, setchange] = useState(false)
        
    
    //   const  [imgUrl, setimgUrl] = useState()
    
      const  [imgAvatarUrl, setimgAvatarUrl] = useState()
    //   const  [urlavatar, setUrlavatar] = useState("");





      const fileInput = useRef();



  const customStyles = {
    content: {
    top: '70%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: '0',
    },
  };

  const  [modelIsOpen, setIsOpen] = useState(false)

  function openModel(i){
    change && setIsOpen(true) 
    console.log(i)
  }

  function closeModel(i){
    setIsOpen(false)
    console.log(i)
  }

  const onCrop = (i) => {
    setAvatar(i)
    console.log(i)
    setimgAvatarUrl(i)
  }

  const onClose = () => {
    closeModel();
  }

  useEffect(() => {

    const respawn = axios.get(`${import.meta.env.VITE_SERVER_PORT}/users`)
    if(respawn){
     respawn.then((res) => (
      res.data.filter((user) => user._id === window.localStorage.getItem("userID") &&
      setUsername(user.username) + setEmail(user.email) + setAvatar(user.avatar)
      )))
    }else{
      console.log("error")
    }
  
    },[])







      const handleImage = (e) =>{
        const file = e.target.files[0];
        setFile(file);
      }


    const handelUpdate = () =>{
        setchange(prev => !prev) + setFile(null)
      }


  const handelSubmit = async(e) => { 
    e.preventDefault()

    if(imgAvatarUrl){
      const respone = await axios.post(`${import.meta.env.VITE_SERVER_PORT}/uploadImage`, { image: imgAvatarUrl })
      
       var urlavataro =await respone.data
        console.log(respone)
        // var IdImgAvatar = imgUrl.match("([^\\/]+)(?=\\.\\w+$)")[0];
      }



    if(file){
  // get signature. In reality you could store this in localstorage or some other cache mechanism, it's good for 1 hour
  const signatureResponse = await axios.get(`${import.meta.env.VITE_SERVER_PORT}/get-signature`)
  
  // document.querySelector("#file-field").files[0]
  const data = new FormData()
  data.append("file", file)
  data.append("api_key", api_key)
  data.append("signature", signatureResponse.data.signature)
  data.append("timestamp", signatureResponse.data.timestamp)
  
  console.log(data)
  const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`, data, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: function (e) {
      console.log(e.loaded / e.total)
    }
  })
  console.log(cloudinaryResponse.data.url)

  }


    const id = window.localStorage.getItem("userID")
    await axios.post(`${import.meta.env.VITE_SERVER_PORT}/update`,{urlavataro, username, email, id})
    .then(res => console.log(res + window.location.reload()))
    .catch(err => console.log(err))

  }












// console.log(`****************${urlavatar}`)
console.log(`++++++++++++++++${imgAvatarUrl}`)




    useEffect(() => {
      const jdkn = async() => { 
      await axios.post(`${import.meta.env.VITE_SERVER_PORT}/check`,{email})
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }
  jdkn()
},[email])




















        // useEffect(() => {
        //     async function getData(){
        //     const respawn = await Axios.get(`${import.meta.env.VITE_SERVER_PORT}/users`)
        //     if(respawn){
        //         setFriends(respawn.data)
        //       }
        //     }
        //    getData()
        // },[])


console.log(avatar)




    return (
        // <div className="main-cards d-flex justify-content-start" style={{marginTop:'0px',marginBottom:'auto'}}>
        //     <div className="card m-2">
        //         <div className="m-2">
        //             <form onSubmit={handleUpdateSubmit}>
        //                 <div className="mb-3">
        //                     <label htmlFor="name">
        //                         <strong>Name</strong>
        //                     </label>
        //                     <input type="text"
        //                         placeholder='Enter Name'
        //                         autoComplete='off'
        //                         name='name'
        //                         defaultValue={username}
        //                         className='form-control rounded-0'
        //                         onChange={(e) => setName(e.target.value)}
        //                     />
        //                 </div>
        //                 <div className="mb-3">
        //                     <label htmlFor="email">
        //                         <strong>Email</strong>
        //                     </label>
        //                     <input type="text"
        //                         placeholder='Enter Email'
        //                         autoComplete='off'
        //                         name='email'
        //                         defaultValue={useremail}
        //                         className='form-control rounded-0'
        //                         onChange={(e) => setEmail(e.target.value)}
        //                     />
        //                 </div>
        //                 <button type="submit" className="button2">
        //                     Update
        //                 </button>
        //             </form>
        //         </div>
        //         <div className="m-2">
        //             <h1>Upload Avatar</h1>
        //             <form onSubmit={handleSubmit}>
        //                 <input type="file" name="avatar" style={{color:'black'}} accept="image/*" onChange={handleFileChange} required />
        //                 <button type="submit">Upload</button>
        //             </form>
        //             <p>{message}</p>
        //         </div>


        //     </div>
        // </div>












    <>
    <div className="cardup">
    <div className="card__img__UP">

    {change === true &&  <div className='filterBack'></div>}

    <div className="card__avatar" onClick={openModel}>
    <UserAvatar/>
    {change === true &&  <img className='pri' src={avatar ? avatar : DEA}/>}

    {change === true &&  <div className='filterFront'></div>}
    </div>

    <Modal
        isOpen={modelIsOpen}
        onRequestClose={closeModel}
        style={customStyles}
        contentLabel="Example Model"
        ariaHideApp={false}
        >
        <div>
            <Avatar
            width={300}
            height={300}
            onCrop={onCrop}
            onClose={onClose}
            label="أختر ملفا"
            />
        </div>
    </Modal>
    
        <div className="card__img__childe">
        <input ref={fileInput} style={{display: 'none'}} type="file" onChange={(e) => handleImage(e)} />
        {change === true && <button onClick={e => e.preventDefault() + fileInput.current.click()}>chose</button>}
        </div>
        </div>
        <Form>
        <Container>
        <button style={{width: "65px", marginRight: "10px"}} type="button" onClick={handelUpdate} className="btn btn-primary btn-sm change__img">{change === true? "الغاء التعديل" : "تعديل"}</button>
        {change === true && <button style={{width:"65px"}} type="submit" onClick={handelSubmit} className="btn btn-primary btn-sm">حفظ التعديل</button>}

        <div className="card__title__up">
        <p className="card__title">الأسم:</p>
        <span style={{display: change === true? "none" : "block"}}>{username}</span>
        <Form.Control type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                style={{display: change === true? "block" : "none", width:"260px"}}
        />

        <p className="card__email">البريد الألكتروني:</p>
        <span style={{display: change === true? "none" : "block"}}>{email}</span>
        <Form.Control type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{display: change === true? "block" : "none", width:"260px"}}
        />
        </div>

    </Container>
    </Form>
    </div>
    
    </>
    );
};


export default Setting;