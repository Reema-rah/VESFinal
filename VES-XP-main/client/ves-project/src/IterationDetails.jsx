import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { formatDate } from './utils';
import axios from 'axios';
import { IsCustomerData } from './hooks/isCustomer';

function IterationDetails() {
  const { id } = useParams();
  const [iteration, setIteration] = useState(null);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userStories, setUserStories] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false); // State to control the display of the feedback form

  const userID = window.localStorage.getItem("userID")
  const projectID = window.localStorage.getItem("ProjectID")

  const [customer, setCustomer] = useState([]);

  const [comments, setComments] = useState([])

  const [exe, setExe] = useState([]);

  const params = useParams()
  const param = params.id

// const dddc = IsCustomerData()
// console.log(dddc)

  const navigate = useNavigate();

  useEffect(() => {
    const fetchIteration = async () => {
      try {

        try {
          axios.get(`http://localhost:5000/users`)
          .then((res)=> setUser(res.data.filter(user => user._id === userID)))
      } catch (error) {
        console.error('Error fetching project details:', error);
      }

        if (id) {
          const response = await fetch(`http://localhost:5000/iterations/${id}`);
          if (!response.ok) {
            throw new Error(`Error fetching iteration details: ${response.statusText}`);
          }
    
          const data = await response.json();
          setIteration(data);
    
          // Extracting ObjectId references from userStories
          const userStoryIds = data.userStories.map(story => story._id);
          setUserStories(userStoryIds);

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
                // const commentsResponse = await fetch(`http://localhost:5000/comments`);
                await axios.get(`http://localhost:5000/feedbackIteGet`)
                .then(res => setComments(res?.data[0]?.comments) + setExe(res.data));
            // setComments(res?.data[0]?.comments)
                } catch (y){
                  console.log(y)
                }
    
          // Fetch details of user stories associated with the iteration
          const userStoriesDetails = await Promise.all(
            userStoryIds.map(async (storyId) => {
              const storyResponse = await fetch(`http://localhost:5000/userStories/${storyId}`);
              if (!storyResponse.ok) {
                throw new Error(`Error fetching user story details: ${storyResponse.statusText}`);
              }
              const storyData = await storyResponse.json();
              return storyData.name; // Extracting the name of the user story
            })
          );
    
          setUserStories(userStoriesDetails);
    
          // Extracting assignee IDs from the user story data
          const assigneeIds = data.assignees.map(assignee => assignee._id);
          setAssignees(assigneeIds);

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

          setAssignees(assigneesDetails);}
      } catch (error) {
        console.error('Error fetching iteration details:', error.message);
        setError('Error fetching iteration details. Please try again.');
      } finally {
        setLoading(false);
      }

    };

    fetchIteration();
  }, [id]);


  const handleDelete = async () => {
    await axios.post(`http://localhost:5000/deleteIteration`,{id})
      .then(res => console.log(res) + navigate(`/space/${projectID}`))
      .catch(err => console.log(err))
  };

  const toggleFeedbackForm = () => {
    setShowFeedbackForm(prevState => !prevState);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!iteration) {
    return <div>Iteration not found</div>;
  }

  const statusFun = () => {
    const status = iteration.status

    if (status === "Start"){
      return "#008040"
    } else if(status === "Complete"){
      return "#ffa500"
    } else if(status === "Completed"){
      return "#008040"
    }
  }


  const theOne = customer.filter((c) => {
    return c.idProject === projectID && c.idMember === userID
    })
  
    console.log(theOne[0]?.isCustomer)
    // console.log(customers)

// console.log(theOne[0]?.isCustomer)

const theTow = exe?.filter((c) => {
  return c.iterationId === param
  // return c.idProject === projectID && c.iterationId === param

})

const exeData = theTow[0]?.comments

const username = user[0]?.username
  console.log(username)

  return (
    <div style={{fontWeight: "bold", display: "flex", justifyContent:"space-between", width: "100%", flexWrap:"wrap"}} className='p-4 main-container'>
    <div style={{fontWeight: "bold"}}>
      <h1 style={{color:"#6c8b7c"}}>Iteration Details</h1>
      <p className='h2'>{iteration.name || 'N/A'}</p>
      <p className='border-bottom' style={{width: "max-content", paddingBottom: "10px"}}>Objective: {iteration.objective || 'N/A'}</p>
      {/* <hr /> */}
      <p className='border-bottom' style={{width: "max-content", paddingBottom: "10px"}}>User Stories: {userStories.length > 0 ? userStories.join(', ') : 'N/A'}</p>
      <p className='border-bottom' style={{width: "max-content", paddingBottom: "10px"}}>Start Date: {formatDate(iteration.startDate) || 'N/A'}</p>
      <p className='border-bottom' style={{width: "max-content", paddingBottom: "10px"}}>End Date: {formatDate(iteration.endDate) || 'N/A'}</p>
      <p className='border-bottom' style={{width: "max-content", paddingBottom: "10px"}}>Assignees: {assignees.length > 0 ? assignees.join(', ') : 'N/A'}</p>
      <p style={{marginBottom: "30px"}}>Status: <span className='text-white rounded p-2 px-4 font-weight-bold' style={{backgroundColor:statusFun(),fontWeight: "bold"}}>{iteration.status || 'N/A'}</span></p>
      <p>Priority: <span style={{color:"#6c8b7c", borderColor:"#6c8b7c"}} className='rounded p-2 px-4 border border-2'>{iteration.priority || 'N/A'}</span></p>

      {/* Display FeedbackForm when showFeedbackForm is true */}
      {/* {showFeedbackForm && <FeedbackForm onClose={toggleFeedbackForm} data={iteration.name} />} */}

      {/* Button to toggle FeedbackForm visibility */}
      {/* <button onClick={toggleFeedbackForm}
      style={{backgroundColor: "#6c8b7c", borderColor: "#6c8b7c"}} className="btn btn-primary py-2 px-3"
      >Toggle Feedback Form</button> */}
      {theOne[0]?.isCustomer ? "" : 
      <button onClick={handleDelete}
      style={{backgroundColor: "#6c8b7c", borderColor: "#6c8b7c"}} className="btn btn-primary py-2 px-3 m-3"
      >Delete</button>
      }
      {/* <Link to="/space"
      style={{color: "#6c8b7c",borderColor: "#6c8b7c"}} className='btn btn-outline-primary py-2 px-5'
      >Close</Link> */}
            <Link style={{color: "#6c8b7c",borderColor: "#6c8b7c"}} className='btn  py-2 px-5' to={`/space/${projectID}`}>Close</Link>

    </div>
    <div className='comment-section'>
    {/* {theOne[0]?.isCustomer ?  */}
    <FeedbackForm data={username} cooments={comments} exeData={exeData} customer={theOne[0]?.isCustomer}/>
    {/* } */}
    </div>
    </div>
  );
}

export default IterationDetails;

function FeedbackForm({ onClose, data, cooments, exeData, customer}) {
  const [formData, setFormData] = useState({
    feedback: '', // Single comment field
    comments: exeData || [], // Array to store comments
  });



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Fixed syntax error here
  };

  // const handleAddComment = () => {
  //   const { feedback, comments } = formData;
  //   if (feedback.trim() !== '') {
  //     const newComment = {
  //       text: feedback,
  //       checked: false, // Checkbox state for the comment
  //     };
  //     setFormData({
  //       ...formData,
  //       feedback: '', // Clear the feedback field after adding the comment
  //       comments: [...comments, newComment],
  //     });
  //   }

  //   console.log(formData.comments.map((comment, index) => (comment)))
  // };

  const handleCheckboxChange = (index) => {
    const updatedComments = formData.comments.map((comment, i) => // Fixed syntax error here
      i === index ? { ...comment, checked: !comment.checked } : comment
    );
    setFormData({ ...formData, comments: updatedComments });

    // fetchIteration()
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Your submission logic goes here
    // This function is called when the form is submitted
    // You can send formData to your backend API or perform any other action

    // Clear the form after submission
    setFormData({
      feedback: '',
      comments: [],
    });

    // Close the form modal
    onClose();
  };

  IterationDetails(formData)


// Get the current date and time
const currentDate = new Date();

// Extract hours, minutes, and AM/PM indicator
let hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const ampm = hours >= 12 ? 'PM' : 'AM';

// Convert hours to 12-hour format
hours = hours % 12;
hours = hours ? hours : 12; // '0' should be treated as 12

// Format hours and minutes with leading zeros if needed
const formattedHours = hours < 10 ? '0' + hours : hours;
const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

// Create the time string in the format (hour:minute AM/PM)
const timeString = `${formattedHours}:${formattedMinutes} ${ampm}`;



// useEffect(()=>{
//   try{
//     // const commentsResponse = await fetch(`http://localhost:5000/comments`);
//     axios.get(`http://localhost:5000/feedbackIteGet`)
//     .then(res => setComments(res.data));

//     } catch (y){
//       console.log(y)
//     }
// },[])

// console.log(cooments)
const projectID = window.localStorage.getItem("ProjectID")

const params = useParams()
const param = params.id


const handleAddComment = async () => {
  const { feedback, comments } = formData;

  const projectID = window.localStorage.getItem("ProjectID")

  if (feedback.trim() !== '') {
    const newComment = {
      text: feedback,
      checked: false, // Checkbox state for the comment
      name: data,
    };
    setFormData({
      ...formData,
      feedback: '', // Clear the feedback field after adding the comment
      comments: [...comments, newComment],
    });
  }


  // fetchIteration()
  // const newData = formData?.comments?.map((comment) => (comment))
  // console.log(formData.comments)
  
  //   await axios.post(`http://localhost:5000/feedbackIte`,{newData, projectID, param})
  //   .then(res => console.log(res) + console.log("add correctly :)"))
  //   .catch(err => console.log(err))
};


const lsk = formData.comments.length > 1

const newData = formData?.comments?.map((comment) => (comment))
console.log(formData?.comments)

useEffect(() => {
  const fetchIteration = async () => {
    if(newData.length > 0){
    await axios.post(`http://localhost:5000/feedbackIte`,{newData, projectID, param})
  .then(res => console.log(res) + console.log("add correctly :)"))
  .catch(err => console.log(err))
  console.log("//////////run////////////")
    }
  }
  fetchIteration()
  // fetchIteration()
  // console.log("//////////run////////////")
},[newData])

// console.log(exeData)
// console.log(cooments)


  return (
    <div className="modal-content" style={{padding: "0px" , textAlign: "left"}}>
      {/* <button className="closebtn" onClick={onClose}></button> */}
      {/* <button type="button" className="btn btn-primary" onClick={handleAddComment}>Add</button> */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <h3>Feedback</h3>
          <input
            id="feedback"
            name="feedback"
            className="form-control"
            style={{width: "200px", display: "inline"}}
            value={formData.feedback}
            onChange={handleChange}
            disabled={customer ? false : true}
            ></input>
          <button disabled={customer ? false : true} type="button" className="btn btn-primary m-2" onClick={handleAddComment}>Add</button>

      {formData.comments?.map((comment, index) => (
          <div key={index} className='kdk'>
            <div style={{display:"flex", justifyContent: "space-between", paddingBottom: "5px"}}><span>{comment?.name}</span></div>
            {/* <div style={{display:"flex", justifyContent: "space-between", paddingBottom: "5px"}}><span>{data}</span><span className='text-muted'>{timeString}</span></div> */}

            <input
              type="checkbox"
              checked={comment.checked}
              disabled={customer ? true : false}
              onChange={() => handleCheckboxChange(index)}
              // onClick={handleCheckboxChange}
            />
            <span style={{ wordWrap: "break-word",textDecorationLine: comment.checked && "line-through" }}>{comment.text}</span>
          </div>
        ))}
        
          <label htmlFor="feedback" className="form-label"></label>
          {/* <input
            id="feedback"
            name="feedback"
            className="form-control"
            value={formData.feedback}
            onChange={handleChange}
          ></input> */}
        </div>
        {/* <button type="button" className="btn btn-primary" onClick={handleAddComment}>Add</button> */}
      </form>
    </div>
  );
}
































































// Frontend - IterationDetails.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import { formatDate } from './utils';

// function IterationDetails() {
//   const { id } = useParams();
//   const [iteration, setIteration] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [userStories, setUserStories] = useState([]);
//   const [assignees, setAssignees] = useState([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchIteration = async () => {
//       try {
//         if (id) {
//           const response = await fetch(`http://localhost:5000/iterations/${id}`);
//           if (!response.ok) {
//             throw new Error(`Error fetching iteration details: ${response.statusText}`);
//           }
    
//           const data = await response.json();
//           setIteration(data);
    
//           /*// Extracting ObjectId references from userStories
//           const userStoryIds = data.userStories.map(story => story._id);
//           setUserStories(userStoryIds);
    
//           // Fetch details of user stories associated with the iteration
//           const userStoriesDetails = await Promise.all(
//             userStoryIds.map(async (storyId) => {
//               const storyResponse = await fetch(`http://localhost:5000/userStories/${storyId}`);
//               if (!storyResponse.ok) {
//                 throw new Error(`Error fetching user story details: ${storyResponse.statusText}`);
//               }
//               const storyData = await storyResponse.json();
//               return storyData.name; // Extracting the name of the user story
//             })
//           );
    
//           setUserStories(userStoriesDetails);*/

//           // Extracting ObjectId references from userStories
//           const userStoryIds = data.userStories.map(story => story._id);
//           setUserStories(userStoryIds);
    
//           // Fetch details of user stories associated with the iteration
//           const userStoriesDetails = await Promise.all(
//             userStoryIds.map(async (storyId) => {
//               const storyResponse = await fetch(`http://localhost:5000/userStories/${storyId}`);
//               if (!storyResponse.ok) {
//                 throw new Error(`Error fetching user story details: ${storyResponse.statusText}`);
//               }
//               const storyData = await storyResponse.json();
//               return storyData.name; // Extracting the name of the user story
//             })
//           );
    
//           setUserStories(userStoriesDetails);



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

//           setAssignees(assigneesDetails)
//         }
//       } catch (error) {
//         console.error('Error fetching iteration details:', error.message);
//         setError('Error fetching iteration details. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchIteration();
//   }, [id]);

//   const handleEdit = () => {
//     navigate(`/iterations/${id}/edit`);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!iteration) {
//     return <div>Iteration not found</div>;
//   }

//   return (
//     <div>
//       <h2>Iteration Details</h2>
//       <p>Name: {iteration.name || 'N/A'}</p>
//       <p>Objective: {iteration.objective || 'N/A'}</p>
//       <p>User Stories: {userStories.length > 0 ? userStories.join(', ') : 'N/A'}</p>
//       <p>Start Date: {formatDate(iteration.startDate) || 'N/A'}</p>
//       <p>End Date: {formatDate(iteration.endDate) || 'N/A'}</p>
//       <p>Assignees: {assignees.length > 0 ? assignees.join(', ') : 'N/A'}</p>
//       <p>Status: {iteration.status || 'N/A'}</p>
//       <p>Priority: {iteration.priority || 'N/A'}</p>
//       <button onClick={handleEdit}>Edit</button>
//       <Link to="/space/${projectId}">Close</Link>
//     </div>
//   );

//   /*
//   return (
//     <div>
//       <h2>Iteration Details</h2>
//       <p>Name: {iteration.name || 'N/A'}</p>
//       <p>Objective: {iteration.objective || 'N/A'}</p>
//       <p>User Stories: {userStories.length > 0 ? userStories.map(story => story.name).join(', ') : 'N/A'}</p>
//       <p>Start Date: {formatDate(iteration.startDate) || 'N/A'}</p>
//       <p>End Date: {formatDate(iteration.endDate) || 'N/A'}</p>
//       <p>Assignees: {assignees.length > 0 ? assignees.join(', ') : 'N/A'}</p>
//       <p>Status: {iteration.status || 'N/A'}</p>
//       <p>Priority: {iteration.priority || 'N/A'}</p>
  
//       <button onClick={handleEdit}>Edit</button>
//       <Link to="/space/${projectId}">Close</Link>
//     </div>
//   );
//   */
// }

// export default IterationDetails;

