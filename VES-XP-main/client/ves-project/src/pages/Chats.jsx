import { useState, useEffect } from 'react';

import CommentPage from "../components/commentPage";
import useNode from "../hooks/useNode";

import { useParams } from 'react-router-dom';


import "../App.css"
import axios from 'axios';


const Chats = () => {
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);
    const [exe, setExe] = useState([]);

    const userID = window.localStorage.getItem("userID")
    const projectID = window.localStorage.getItem("ProjectID")

    const params = useParams()
    const param = params.id

    const [customer, setCustomer] = useState([]);


    useEffect(() => {
        const fetchComments = async () => {
        // try {
        //    await axios.get(`http://localhost:5000/users`)
        //     .then((res)=> setUser(res.data.filter(user => user._id === userID)))
        // } catch (error) {
        //     console.error('Error fetching project details:', error);
        // }
        new Promise((resolve, reject) => {
            axios.get(`http://localhost:5000/users`)
              .then(res => {
                const filteredUser = res.data.filter(user => user._id === userID);
                setUser(filteredUser);
                resolve();
              })
              .catch(error => {
                console.error('Error fetching project details:', error);
                reject(error);
              });
          });
    
        try {
            if (id) {

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
    
                try{
                await axios.get(`http://localhost:5000/commentsPage`)
                .then(res => setComments(res.data[0].comments) + setExe(res.data));
    
                } catch (y){
                console.log(y)
                }  

                // try {
                //     await axios.get(`http://localhost:5000/users`)
                //         .then((res)=> setUser(res.data.filter(user => user._id === userID)))
                //     } catch (error) {
                //         console.error('Error fetching project details:', error);
                //     }

    
            }
            } catch (error) {
                console.error('Error fetching comments:', error.message);
                setError('Error comments. Please try again.');
            } finally {
                setLoading(false);
            }
        };
    
        fetchComments();
    }, [id]);

    const username = user[0]?.username
    console.log(username)

    const commentsTest = {
        id: projectID,
        storyId: param ,
        items: [],
        };

        const theTow = exe.filter((c) => {
            return c.comments.id === projectID && c.comments.storyId === param
        })
        
        const exeData = theTow[0]?.comments
        
        useEffect(()=>{
            if(theTow.length > 0){
            setCommentsData(exeData)
            console.log("test")
        
            }else{
            setCommentsData(commentsTest)
            // console.log("test")
        
            }
        },[comments])
        console.log(comments)

///////////////////////////
        const [commentsData, setCommentsData] = useState();
        useEffect(()=>{
            console.log(commentsData)
        },[commentsData])
        
        const { insertNode, editNode, deleteNode } = useNode();
        
        const handleInsertNode = async (folderId, item) => {
            const finalStructure = insertNode(commentsData, folderId, item, username);
            setCommentsData(finalStructure);
        
                await axios.post(`http://localhost:5000/addCommentPage`,{param ,projectID, commentsData})
                .then(res => console.log(res) + console.log("add correctly :)"))
                .catch(err => console.log(err))
                
            };
        
            const handleEditNode = (folderId, value) => {
            const finalStructure = editNode(commentsData, folderId, value);
            setCommentsData(finalStructure);
            };
        
            const handleDeleteNode = async (folderId) => {
            const finalStructure = deleteNode(commentsData, folderId);
            const temp = { ...finalStructure };
            setCommentsData(temp);
        
            await axios.post(`http://localhost:5000/deleteCommentPage`,{folderId, projectID})
                .then(res => console.log(res) + console.log("add correctly :)"))
                .catch(err => console.log(err))
            };
      ////////////////////////////////////////////////////////


    
        if (loading) {
        return <div>Loading...</div>;
        }
    
        if (error) {
        return <div>Error: {error}</div>;
        }
    
        
    
    
        const theOne = customer.filter((c) => {
        return c.idProject === projectID && c.idMember === userID
        })
    
        const resulte = () => {
            if(theOne[0]?.isCustomer === true){
            return true
            } else if(theOne[0]?.isCustomer === undefined){
            return false
            }
        }

        console.log(resulte())

    return (
    <div className='main-container'>
        <div className="comment-section">
        <CommentPage
            handleInsertNode={handleInsertNode}
            handleEditNode={handleEditNode}
            handleDeleteNode={handleDeleteNode}
            comment={commentsData}
            username={username}
            customer={resulte()}
        />
    </div>
    </div>
    );
};

export default Chats;