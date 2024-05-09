import Axios from "axios"
import {useState, useEffect} from 'react';



import DEA from '../assets/icondefult.jpg';


const UserAvatar = () => {


    const  [avatar, setAvatar] = useState(null)

    // const _PORT = 3002


    useEffect(() => {

      const respawn = Axios.get(`${import.meta.env.VITE_SERVER_PORT}/users`)
      if(respawn){
       respawn.then((res) => (
        res.data.filter((user) => user._id === window.localStorage.getItem("userID") &&
        setAvatar(user.avatar)
        )))
      }else{
        console.log("error")
      }
    
      },[])

  return (
<>
    <img src={avatar? avatar : DEA} alt={DEA} />
</>
  )
}

export default UserAvatar