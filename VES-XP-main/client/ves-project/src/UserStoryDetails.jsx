// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';

// function UserStoryDetails() {
//   const { id } = useParams();
//   const [userStory, setUserStory] = useState(null);
//   const [customer, setCustomer] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [assignees, setAssignees] = useState([]);

//   const userID = window.localStorage.getItem("userID")
//   const projectID = window.localStorage.getItem("ProjectID")

//   useEffect(() => {
//     const fetchUserStory = async () => {
//       try {
//         if (id) {
//           const response = await fetch(`http://localhost:5000/userStories/${id}`);

          
//           if (!response.ok) {
//             throw new Error(`Error fetching user story details: ${response.statusText}`);
//           }
          
//           const data = await response.json();
//           setUserStory(data);

//           try{
//           const customersResponse = await fetch(`http://localhost:5000/isCustomer`);

//           if (!customersResponse.ok) {
//             throw new Error(`Error fetching customer `);
//           }
          
//           const customers = await customersResponse.json();
//           setCustomer(customers);

//           } catch (y){
//             console.log(y)
//           }

//           // Extracting assignee IDs from the user story data
//           const assigneeIds = data.assignees.map(assignee => assignee._id);
//           setAssignees(assigneeIds);

//           // Fetch details of assigned users
//           const assigneesDetails = await Promise.all(
//             assigneeIds.map(async (assigneeId) => {
//               const userResponse = await fetch(`http://localhost:5000/user/${assigneeId}`);
//               if (!userResponse.ok) {
//                 throw new Error(`Error fetching user details: ${userResponse.statusText}`);
//               }
//               const userData = await userResponse.json();
//               return userData.username; // Extracting the username of the user
//             })
//           );

//           setAssignees(assigneesDetails);
//         }
//       } catch (error) {
//         console.error('Error fetching user story details:', error.message);
//         setError('Error fetching user story details. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserStory();
//   }, [id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!userStory) {
//     return <div>User Story not found</div>;
//   }

//   const theOne = customer.filter((c) => {
//     return c.idProject === projectID && c.idMember === userID
//     })

//     console.log(theOne[0].isCustomer)
//     // console.log(customers)

//   return (
//     <div>
//       <h2>User Story Details</h2>
//       <p>Name: {userStory.name || 'N/A'}</p>
//       <p>Description: {userStory.description || 'N/A'}</p>
//       <p>Status: {userStory.status || 'N/A'}</p>
//       <p>Priority: {userStory.priority || 'N/A'}</p>
//       <p>Story Points: {userStory.storyPoints || 'N/A'}</p>
//       <p>Blocked: {userStory.blocked ? 'Yes' : 'No'}</p>
//       <p>Assignees: {assignees.length > 0 ? assignees.join(', ') : 'N/A'}</p>
//       {/* Add other details as needed */}
//       {theOne[0].isCustomer ? "" : <p>comment</p>}

//       <Link to={`/space/${window.localStorage.getItem("ProjectID")}`}>Close</Link>
//     </div>
//   );
// }

// export default UserStoryDetails;






/*import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function UserStoryDetails() {
  const { id } = useParams();
  const [userStory, setUserStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assignees, setAssignees] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserStory = async () => {
      try {
        if (id) {
          const response = await fetch(`http://localhost:5000/userStories/${id}`);
          if (!response.ok) {
            throw new Error(`Error fetching user story details: ${response.statusText}`);
          }

          const data = await response.json();
          setUserStory(data);

           // Extracting ObjectId references from userStories
           const assigneeIds = data.assignees.map(assignee => assignee._id);
           setAssignees(assigneeIds);
     
           // Fetch details of user stories associated with the iteration
           const assigneesDetails = await Promise.all(
             assigneeIds.map(async (assigneeId) => {
               const assigneeResponse = await fetch(`http://localhost:5000/teams/${assigneeId}`);
               if (!assigneeResponse.ok) {
                 throw new Error(`Error fetching assignee details: ${assigneeResponse.statusText}`);
               }
               const assigneeData = await assigneeResponse.json();
               return assigneeData.name; // Extracting the name of the assignee
             })
           );
     
           setAssignees(assigneesDetails);

        }
      } catch (error) {
        console.error('Error fetching user story details:', error.message);
        setError('Error fetching user story details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserStory();
  }, [id]);

  const handleEdit = () => {
    navigate(`/userStories/${id}/edit`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userStory) {
    return <div>User Story not found</div>;
  }

  return (
    <div>
      <h2>User Story Details</h2>
      <p>Name: {userStory.name || 'N/A'}</p>
      <p>Description: {userStory.description || 'N/A'}</p>
      <p>Status: {userStory.status || 'N/A'}</p>
      <p>Priority: {userStory.priority || 'N/A'}</p>
      <p>Story Points: {userStory.storyPoints || 'N/A'}</p>
      <p>Blocked: {userStory.blocked ? 'Yes' : 'No'}</p>
      <p>Assignees: {assignees.length > 0 ? assignees.join(', ') : 'N/A'}</p>
   
      <button onClick={handleEdit}>Edit</button>
      <Link to="/space/${projectId}">Close</Link>
    
    </div>
  );
}

export default UserStoryDetails;
*/














import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { IoTimeSharp } from "react-icons/io5";

import Comment from "./components/comment";
import useNode from "./hooks/useNode";

import "./App.css"
import axios from 'axios';


function UserStoryDetails() {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [userStory, setUserStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assignees, setAssignees] = useState([]);
  const [comments, setComments] = useState([]);
  const [exe, setExe] = useState([]);

  const userID = window.localStorage.getItem("userID")
  const projectID = window.localStorage.getItem("ProjectID")

  const params = useParams()
  const param = params.id
  // console.log(params.id)

  const [customer, setCustomer] = useState([]);

  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchUserStory = async () => {
      // try {
      //     axios.get(`http://localhost:5000/users`)
      //     .then((res)=> setUser(res.data.filter(user => user._id === userID)))
      // } catch (error) {
      //   console.error('Error fetching project details:', error);
      // }

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

      //    new Promise( (resolve, reject) => {
      //     try {
      //         const customersResponse =  fetch(`http://localhost:5000/isCustomer`);
      //         if (!customersResponse.ok) {
      //             throw new Error(`Error fetching customer`);
      //         }
      //         const customers =  customersResponse.json();
      //         setCustomer(customers);
      //         resolve();
      //     } catch (error) {
      //         console.error('Error fetching customers:', error);
      //         reject(error);
      //     }
      // });

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
          const response = await fetch(`http://localhost:5000/userStories/${id}`);
          if (!response.ok) {
            throw new Error(`Error fetching user story details: ${response.statusText}`);
          }

          const data = await response.json();
          setUserStory(data);

          // Extracting ObjectId references from userStories
          const assigneeIds = data.assignees.map(assignee => assignee._id);
          setAssignees(assigneeIds);

          // try{
          //   const customersResponse = await fetch(`http://localhost:5000/isCustomer`);
  
          //   if (!customersResponse.ok) {
          //     throw new Error(`Error fetching customer `);
          //   }
            
          //   const customers = await customersResponse.json();
          //   setCustomer(customers);
  
          //   } catch (y){
          //     console.log(y)
          //   }

        //   new Promise( (resolve, reject) => {
        //     try {
        //         const customersResponse =  fetch(`http://localhost:5000/isCustomer`);
        //         if (!customersResponse.ok) {
        //             throw new Error(`Error fetching customer`);
        //         }
        //         const customers =  customersResponse.json();
        //         setCustomer(customers);
        //         resolve();
        //     } catch (error) {
        //         console.error('Error fetching customers:', error);
        //         reject(error);
        //     }
        // });

            try{
              // const commentsResponse = await fetch(`http://localhost:5000/comments`);
              await axios.get(`http://localhost:5000/comments`)
              .then(res => setComments(res.data[0].comments) + setExe(res.data));

    
              // if (!commentsResponse.ok) {
              //   throw new Error(`Error fetching customer `);
              // }
              
              // const getcomments = await commentsResponse.data;
              // setComments(getcomments[0]?.comments);
    
              } catch (y){
                console.log(y)
              }


          // Fetch details of assigned users
          const assigneesDetails = await Promise.all(
            assigneeIds.map(async (assigneeId) => {
              const userResponse = await fetch(`http://localhost:5000/user/${assigneeId}`);
              if (!userResponse.ok) {
                throw new Error(`Error fetching user details: ${userResponse.statusText}`);
              }
              const userData = await userResponse.json();
              return userData.username; // Extracting the username of the user
            })
          );

          setAssignees(assigneesDetails);
      }} catch (error) {
        console.error('Error fetching user story details:', error.message);
        setError('Error fetching user story details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserStory();
  }, [id]);
  const username = user[0]?.username
  console.log(username)


  // useEffect(()=>{
  //   try{
  //     const commentsResponse = fetch(`http://localhost:5000/comments`);

  //     if (!commentsResponse.ok) {
  //       throw new Error(`Error fetching customer `);
  //     }
      
  //     const getcomments = commentsResponse.json();
  //     setComments(getcomments[0]?.comments);

  //     } catch (y){
  //       console.log(y)
  //     }
  // },[])

  // const commentsTest = {
  //   id: 1,
  //   items: [],
  // };

  // comments = {id, comments}
  // const itemss = comments.items?.[0]

  // useEffect(()=>{
    const commentsTest = {
    id: projectID,
    storyId: param ,
    items: [],
    // [
      // {id: 1714486937140, items: [{id: 1714446937145, items: [], name: "b", user: "ahmed"}], name: "a", user: "nora"}
      // comments?.items
      // itemss
    // ],

    // id: projectID,
    // items: [
      // {id: 1714486937140, items: [{id: 1714446937145, items: [], name: "b", user: "ahmed"}], name: "a", user: "nora"}
    // ],

    // _id: 1714486937140,
    // comments: [
    //   {id: 1714486937140, items: [{id: 1714446937145, items: [], name: "b", user: "ahmed"}], name: "a", user: "nora"}
    // ],
  };
  // },[comments])

  // useEffect(()=>{
    
  // },[])

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

  /////////////////////////////////////////////////////
  const [commentsData, setCommentsData] = useState();
  useEffect(()=>{
    console.log(commentsData)
  },[commentsData])

  const { insertNode, editNode, deleteNode } = useNode();

  const handleInsertNode = async (folderId, item) => {
    const finalStructure = insertNode(commentsData, folderId, item, username);
    setCommentsData(finalStructure);

      await axios.post(`http://localhost:5000/addComment`,{param ,projectID, commentsData})
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

    await axios.post(`http://localhost:5000/deleteComment`,{folderId, projectID})
        .then(res => console.log(res) + console.log("add correctly :)"))
        .catch(err => console.log(err))
  };
////////////////////////////////////////////////////////




  const handleDelete = async () => {
    await axios.post(`http://localhost:5000/deleteUserStory`,{id})
      .then(res => console.log(res) + navigate(`/space/${projectID}`))
      .catch(err => console.log(err))
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userStory) {
    return <div>User Story not found</div>;
  }

  const statusFun = () => {
    const status = userStory.status

    if (status === "To Do"){
      return "#ffd966"
    } else if(status === "Doing"){
      return "#5ed795"
    } else if(status === "Done"){
      return "#008040"
    } else if(status === "To Test"){
      return "#ffa500"
    } else if(status === "Failed"){
      return "#cc3333"
    } else if(status === "Passed"){
      return "#008040"
    }
  }

  const theOne = customer.filter((c) => {
    return c.idProject === projectID && c.idMember === userID
  })

  // const result = theOne !== undefined ? theOne : null;

    
        // console.log(theOne[0].isCustomer)
        // console.log(customers)

        // console.log(customer[0]?.isCustomer)

        const resulte = () => {
          if(theOne[0]?.isCustomer === true){
          return true
          } else if(theOne[0]?.isCustomer === undefined){
          return false
          }
        }

        console.log(resulte())
 
  return (
    <div style={{fontWeight: "bold", display: "flex", justifyContent:"space-between", width: "100%", flexWrap:"wrap"}} className='p-4 main-container'>
      <div>
      <h1 style={{color:"#6c8b7c"}}>{userStory.name || 'N/A'}</h1>
      {/* <p className='h2'>{userStory.name || 'N/A'}</p> */}
      <p className=''>Description:</p>
      <p className='border-bottom' style={{width: "max-content", paddingBottom: "10px"}}>{userStory.description || 'N/A'}</p>
      <p className='border-bottom' style={{width: "max-content", paddingBottom: "10px"}}>Assignees: {assignees.length > 0 ? assignees.join(', ') : 'N/A'}</p>
      <p style={{paddingBottom: "10px"}}>Status: <span className='text-white rounded p-2 px-4 font-weight-bold' style={{backgroundColor:statusFun(),fontWeight: "bold"}}>{userStory.status || 'N/A'}</span></p>
      <p style={{paddingBottom: "10px"}}>Priority: <span style={{color:"#6c8b7c", borderColor:"#6c8b7c"}} className='rounded p-2 px-4 border border-2'>{userStory.priority || 'N/A'}</span></p>
      <p style={{paddingBottom: "10px"}}>Story Points: <span style={{color:"#6c8b7c", borderColor:"#6c8b7c"}} className='rounded p-2 px-4 border border-2'>{userStory.storyPoints || 'N/A'}</span></p>
      <p>{userStory.blocked !== false?
          <span className='rounded p-2 px-4 border border-2 text-white bg-dark'>Bloked</span>
        : 
          ''
      }</p>
      {/* {console.log(userStory.blocked)} */}
  
      {theOne[0]?.isCustomer ? "" : 
      <button style={{backgroundColor: "#6c8b7c", borderColor: "#6c8b7c"}} className="btn btn-primary btn-lg py-2 px-5 m-3" onClick={handleDelete}>Delete</button>
      }
      <Link style={{color: "#6c8b7c",borderColor: "#6c8b7c"}} className='btn  py-2 px-5' to={`/space/${projectID}`}>Close</Link>
      </div>

      <div className="comment-section">
      <Comment
        handleInsertNode={handleInsertNode}
        handleEditNode={handleEditNode}
        handleDeleteNode={handleDeleteNode}
        comment={commentsData}
        // customer={resulte()}
      />
      </div>

    </div>
  );
  
}



export default UserStoryDetails;