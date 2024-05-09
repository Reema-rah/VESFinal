import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { formatDate } from './utils';
import axios from 'axios';

function ReleaseDetails() {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [release, setRelease] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [iterations, setIterations] = useState([]);

  const userID = window.localStorage.getItem("userID")
  const projectID = window.localStorage.getItem("ProjectID")

  const [customer, setCustomer] = useState([]);

  const [comments, setComments] = useState([])

  const [exe, setExe] = useState([]);

  const params = useParams()
  const param = params.id

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRelease = async () => {
      try {

        try {
          axios.get(`http://localhost:5000/users`)
          .then((res)=> setUser(res.data.filter(user => user._id === userID)))
      } catch (error) {
        console.error('Error fetching project details:', error);
      }

        if (id) {
          const response = await fetch(`http://localhost:5000/releases/${id}`);
          if (!response.ok) {
            throw new Error(`Error fetching releases details: ${response.statusText}`);
          }

          const data = await response.json();
          setRelease(data);
        
          // Extracting ObjectId references from iterations
          const iterationIds = data.iterations.map(iteration => iteration._id);
          setIterations(iterationIds);

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
              await axios.get(`http://localhost:5000/feedbackRelGet`)
              .then(res => setComments(res?.data[0]?.comments) + setExe(res.data));
          // setComments(res?.data[0]?.comments)
              } catch (y){
                console.log(y)
              }
    
          // Fetch details of iterations associated with the release
          const iterationsDetails = await Promise.all(
            iterationIds.map(async (iterationId) => {
              const iterationResponse = await fetch(`http://localhost:5000/iterations/${iterationId}`);
              if (!iterationResponse.ok) {
                throw new Error(`Error fetching iteration details: ${iterationResponse.statusText}`);
              }
              const iterationData = await iterationResponse.json();
              return iterationData.name; // Extracting the name of the iteration
            })
          );
    
          setIterations(iterationsDetails);
        }
      } catch (error) {
        console.error('Error fetching release details:', error.message);
        setError('Error fetching release details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRelease();
  }, [id]);


  const handleDelete = async () => {
    await axios.post(`http://localhost:5000/deleteReleases`,{id})
      .then(res => console.log(res) + navigate(`/space/${projectID}`))
      .catch(err => console.log(err))
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!release) {
    return <div>Release not found</div>;
  }
    // Log iterations array to console
    console.log('Iterations:', release?.iterations);

    const theOne = customer.filter((c) => {
      return c.idProject === projectID && c.idMember === userID
      })
    
      // console.log(theOne[0].isCustomer)
      // console.log(customers)

      const theTow = exe?.filter((c) => {
        return c.releaseId === param
        // return c.idProject === projectID && c.iterationId === param
      
      })
      
      const exeData = theTow[0]?.comments
  
      const username = user[0]?.username
      console.log(username)

  return (
    <div style={{fontWeight: "bold", display: "flex", justifyContent:"space-between", width: "100%", flexWrap:"wrap"}} className='p-4 main-container'>
      <div style={{fontWeight: "bold"}}>
      <h1 style={{color:"#6c8b7c"}}>Release Details</h1>
      <p className='h2'>{release.name || 'N/A'}</p>
      <p className='border-bottom' style={{width: "max-content", paddingBottom: "10px"}}>Objective: {release.objective || 'N/A'}</p>
      <p className='border-bottom' style={{width: "max-content", paddingBottom: "10px"}}>Iterations: {iterations.length > 0 ? iterations.join(', ') : 'N/A'}</p>
      <p className='border-bottom' style={{width: "max-content", paddingBottom: "10px"}}>Start Date: {formatDate(release.startDate) || 'N/A'}</p>
      <p className='border-bottom' style={{width: "max-content", paddingBottom: "10px"}}>End Date: {formatDate(release.endDate) || 'N/A'}</p>
      {/* <p>Released: {release.released ? 'Yes' : 'No'}</p> */}
      {/* <p>Released:<span className='rounded p-2 px-4 border border-2 text-white bg-dark'>{release.released? "Yes" : 'No'}</span></p> */}
      {release.released? <span className='rounded p-2 px-4 border border-2 text-white bg-dark'>Released</span> : ""}

      {/* Add other details as needed */}
      <div style={{padding:"20px 20px 0 0"}}>
      {theOne[0]?.isCustomer ? "" : 
      <button
      style={{backgroundColor: "#6c8b7c", borderColor: "#6c8b7c"}} className="btn btn-primary py-2 px-3 m-3"
      onClick={handleDelete}>Delete</button>
      }
      {/* <Link 
      style={{color: "#6c8b7c",borderColor: "#6c8b7c"}} className='btn btn-outline-primary py-2 px-5'
      to="/space">Close</Link> */}
      <Link style={{color: "#6c8b7c",borderColor: "#6c8b7c"}} className='btn  py-2 px-5' to={`/space/${projectID}`}>Close</Link>

      {/* Or use a button with navigate function for closing */}
      {/* <button onClick={() => navigate('/iterations')}>Close</button> */}
      </div>
      </div>
      <div>
      {/* {theOne[0]?.isCustomer ?  */}
      <FeedbackForm data={username} cooments={comments} exeData={exeData} customer={theOne[0]?.isCustomer}/> 
      {/* // : ""} */}
      </div>
    </div>
  );
}

export default ReleaseDetails;


function FeedbackForm({onClose, data, cooments, exeData , customer}) {
  const [formData, setFormData] = useState({
    feedback: '', // Single comment field
    comments:  exeData || [], // Array to store comments
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
  // };

  const handleCheckboxChange = (index) => {
    const updatedComments = formData.comments.map((comment, i) => // Fixed syntax error here
      i === index ? { ...comment, checked: !comment.checked } : comment
    );
    setFormData({ ...formData, comments: updatedComments });
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

  // ReleaseDetails(formData)


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

const projectID = window.localStorage.getItem("ProjectID")

const params = useParams()
const param = params.id

const handleAddComment = () => {
  const { feedback, comments } = formData;
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
};

const newData = formData?.comments?.map((comment) => (comment))
console.log(formData?.comments)

useEffect(() => {
  const fetchIteration = async () => {
    if(newData.length > 0){
    await axios.post(`http://localhost:5000/feedbackRel`,{newData, projectID, param})
  .then(res => console.log(res) + console.log("add correctly :)"))
  .catch(err => console.log(err))
  console.log("//////////run////////////")
    }
  }
  fetchIteration()
  // fetchIteration()
  // console.log("//////////run////////////")
},[newData])


  // console.log(formData.comments.map((comment, index) => (comment.text)))
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
            disabled={customer ? false : true}
            onChange={handleChange}
          ></input>
          <button disabled={customer ? false : true} type="button" className="btn btn-primary m-2" onClick={handleAddComment}>Add</button>

          {formData.comments?.map((comment, index) => (
            <div key={index} className='kdk'>
              <div style={{display:"flex", justifyContent: "space-between", paddingBottom: "5px"}}><span>{comment?.name}</span></div>
              <input
                type="checkbox"
                checked={comment.checked}
                onChange={() => handleCheckboxChange(index)}
                disabled={customer ? true : false}
              />
              <span style={{ wordWrap: "break-word" ,textDecorationLine: comment.checked && "line-through" }}>{comment.text}</span>
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



// export default ReleaseDetails;

























































// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import { formatDate } from './utils';

// function ReleaseDetails() {
//   const { id } = useParams();
//   const [release, setRelease] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [iterations, setIterations] = useState([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchRelease = async () => {
//       try {
//         if (id) {
//           const response = await fetch(`http://localhost:5000/releases/${id}`);
//           if (!response.ok) {
//             throw new Error(`Error fetching releases details: ${response.statusText}`);
//           }

//           const data = await response.json();
//           setRelease(data);
        
//           // Extracting ObjectId references from iterations
//           const iterationIds = data.iterations.map(iteration => iteration._id);
//           setIterations(iterationIds);
    
//           // Fetch details of iterations associated with the release
//           const iterationsDetails = await Promise.all(
//             iterationIds.map(async (iterationId) => {
//               const iterationResponse = await fetch(`http://localhost:5000/iterations/${iterationId}`);
//               if (!iterationResponse.ok) {
//                 throw new Error(`Error fetching iteration details: ${iterationResponse.statusText}`);
//               }
//               const iterationData = await iterationResponse.json();
//               return iterationData.name; // Extracting the name of the iteration
//             })
//           );
    
//           setIterations(iterationsDetails);
//         }
//       } catch (error) {
//         console.error('Error fetching release details:', error.message);
//         setError('Error fetching release details. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRelease();
//   }, [id]);


//   const handleEdit = () => {
//     navigate(`/releases/${id}/edit`);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!release) {
//     return <div>Release not found</div>;
//   }
//     // Log iterations array to console
//     console.log('Iterations:', release?.iterations);

//   return (
//     <div>
//       <h2>Release Details</h2>
//       <p>Name: {release.name || 'N/A'}</p>
//       <p>Objective: {release.objective || 'N/A'}</p>
//       <p>Iterations: {iterations.length > 0 ? iterations.join(', ') : 'N/A'}</p>
//       <p>Start Date: {formatDate(release.startDate) || 'N/A'}</p>
//       <p>End Date: {formatDate(release.endDate) || 'N/A'}</p>
//       <p>Released: {release.released ? 'Yes' : 'No'}</p>

//       {/* Add other details as needed */}
//       <button onClick={handleEdit}>Edit</button>
//       <Link to="/space/${projectId}">Close</Link>
//       {/* Or use a button with navigate function for closing */}
//       {/* <button onClick={() => navigate('/iterations')}>Close</button> */}
//     </div>
//   );
// }

// export default ReleaseDetails;
