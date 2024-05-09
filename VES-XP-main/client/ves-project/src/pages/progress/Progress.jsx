/*import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Gantt from './components/Gantt';
import Toolbar from './components/Toolbar';
import MessageArea from './components/MessageArea';
import Axios from 'axios';

function Progress() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [currentZoom, setCurrentZoom] = useState('Days');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch tasks for the project from the backend when the component mounts
    fetchTasks();
  }, [projectId]); // Update tasks whenever projectId changes

  const fetchTasks = async () => {
    try {
      const response = await Axios.get(`http://localhost:5000/tasks/${projectId}`);
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addMessage = (message) => {
    const maxLogLength = 5;
    const newMessage = { message };
    const updatedMessages = [newMessage, ...messages.slice(0, maxLogLength - 1)];
    setMessages(updatedMessages);
  };

  const logDataUpdate = (entityType, action, itemData, id) => {
    let text = itemData && itemData.text ? ` (${itemData.text})` : '';
    let message = `${entityType} ${action}: ${id} ${text}`;
    if (entityType === 'link' && action !== 'delete') {
      message += ` (source: ${itemData.source}, target: ${itemData.target})`;
    }
    addMessage(message);
  };

  const handleZoomChange = (zoom) => {
    setCurrentZoom(zoom);
  };

  return (
    <div>
      <Toolbar zoom={currentZoom} onZoomChange={handleZoomChange} />
      <div className="gantt-container">
        <Gantt tasks={tasks} zoom={currentZoom} onDataUpdated={logDataUpdate} />
      </div>
      <MessageArea messages={messages} />
    </div>
  );
}

export default Progress;

*/


// import React, { Component, useState } from 'react';
// import Gantt from './components/Gantt';
// import Toolbar from './components/Toolbar';
// import MessageArea from './components/MessageArea';



// const data = {
//     data: [
//         { id: 1, text: 'Task #1', start_date: '2024-04-9', duration: 3, progress: 0.6 },
//         { id: 2, text: 'Task #2', start_date: '2024-04-18', duration: 3, progress: 0.4 }
//     ],
//     links: [
//         { id: 1, source: 1, target: 2, type: '0' }
//     ]
// };


// const [userStoryFormOpen, setUserStoryFormOpen] = useState(false);

// const [userStories, setUserStories] = useState([]);

//   // Fetch data from the server when the component mounts
//   useEffect(() => {
//     fetchData();
//   }, []); // Empty dependency array ensures this effect runs once when the component mounts

//   // Function to fetch data from the server
//   const fetchData = async () => {
//     try {
//       const userStoriesResponse = await fetch(`http://localhost:5000/Progress`);

//       const userStoriesData = await userStoriesResponse.json();

//       setUserStories(userStoriesData);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       // Handle error gracefully (could show a message to the user)
//     }
//   };


// class Progress extends Component {
  
//   state = {
//     currentZoom: 'Days',
//     messages: [],
// };





// const [userStoryFormOpen, setUserStoryFormOpen] = useState(false);
//   const [iterationFormOpen, setIterationFormOpen] = useState(false);
//   const [releaseFormOpen, setReleaseFormOpen] = useState(false);

//   const [userStories, setUserStories] = useState([]);
//   const [iterations, setIterations] = useState([]);
//   const [releases, setReleases] = useState([]);

//   // React Router hook for navigation
//   const navigate = useNavigate();

//   // Fetch data from the server when the component mounts
//   useEffect(() => {
//     fetchData();
//   }, []); // Empty dependency array ensures this effect runs once when the component mounts

//   // Function to fetch data from the server
//   const fetchData = async () => {
//     try {
     
//       const userStoriesResponse = await fetch(`http://localhost:5000/userStoriesProject/${id}`);
//       const iterationsResponse = await fetch(`http://localhost:5000/iterationsProject/${id}`);
//       const releasesResponse = await fetch(`http://localhost:5000/releasesProject/${id}`);

//       // const userStoriesResponse = await fetch(`http://localhost:5000/userStories`);
//       // const iterationsResponse = await fetch(`http://localhost:5000/iterations`);
//       // const releasesResponse = await fetch(`http://localhost:5000/releases`);

//       const userStoriesData = await userStoriesResponse.json();
//       const iterationsData = await iterationsResponse.json();
//       const releasesData = await releasesResponse.json();

//       setUserStories(userStoriesData);
//       setIterations(iterationsData);
//       setReleases(releasesData);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       // Handle error gracefully (could show a message to the user)
//     }
//   };







// addMessage(message) {
//     const maxLogLength = 5;
//     const newMessage = { message };
//     const messages = [
//         newMessage,
//         ...this.state.messages
//     ];

//     if (messages.length > maxLogLength) {
//         messages.length = maxLogLength;
//     }
//     this.setState({ messages });
// }

// logDataUpdate = (entityType, action, itemData, id) => {
//   let text = itemData && itemData.text ? ` (${itemData.text})`: '';
//   let message = `${entityType} ${action}: ${id} ${text}`;
//   if (entityType === 'link' && action !== 'delete' ) {
//       message += ` ( source: ${itemData.source}, target: ${itemData.target} )`;
//   }
//   this.addMessage(message);
// }
 
// handleZoomChange = (zoom) => {
//     this.setState({
//         currentZoom: zoom
//     });
// }
// render() {  
//   const { currentZoom, messages } = this.state;
//   return (
//     <>
//     {console.log(data)}
//       <div>
//           <Toolbar
//               zoom={ currentZoom }
//               onZoomChange={ this.handleZoomChange }
//           />
//           <div className="gantt-container">
//               <Gantt
//                   tasks={ data }
//                   zoom={ currentZoom }
//                   onDataUpdated ={ this.logDataUpdate }
//               />
//           </div>
//           <MessageArea
//               messages={ messages }
//           />
//       </div>
//     </>
//   )
// }
// }
// export default Progress;



































import { useState, useEffect } from 'react';
import Gantt from './components/Gantt';
import Toolbar from './components/Toolbar';
import MessageArea from './components/MessageArea';

const Progress = () => {
  const [currentZoom, setCurrentZoom] = useState('Days');
  const [messages, setMessages] = useState([]);
  const [progress, setProgress] = useState([]);

  const [customer, setCustomer] = useState([]);
    
  const userID = window.localStorage.getItem("userID")
  const projectID = window.localStorage.getItem("ProjectID")

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {

      try{
        const customersResponse = await fetch(`http://localhost:5000/isCustomer`);

        if (!customersResponse.ok) {
          throw new Error(`Error fetching customer `);
        }
        
        const customers = await customersResponse.json();
        setCustomer(customers);
        // setLoading(false); // Set loading to false after data is fetched

        } catch (y){
          console.log(y)
        }

      const userStoriesResponse = await fetch(`http://localhost:5000/Progress`);
      const userStoriesData = await userStoriesResponse.json();
      setProgress(userStoriesData);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error gracefully (could show a message to the user)
    }
  };

  const addMessage = (message) => {
    const maxLogLength = 5;
    const newMessage = { message };
    const newMessages = [newMessage, ...messages.slice(0, maxLogLength - 1)];
    setMessages(newMessages);
  };

  const logDataUpdate = (entityType, action, itemData, id) => {
    let text = itemData && itemData.text ? ` (${itemData.text})` : '';
    let message = `${entityType} ${action}: ${id} ${text}`;
    if (entityType === 'link' && action !== 'delete') {
      message += ` ( source: ${itemData.source}, target: ${itemData.target} )`;
    }
    addMessage(message);
  };

  const handleZoomChange = (zoom) => {
    setCurrentZoom(zoom);
  };

  const data = {
    data: [
        { id: 1, text: 'Task #1', start_date: '2024-04-9', duration: 3, progress: 0.6 },
        { id: 2, text: 'Task #2', start_date: '2024-04-18', duration: 3, progress: 0.4 }
    ],
    links: [
        { id: 1, source: 1, target: 2, type: '0' }
    ]
};



const progresss  = {
  data: 
    [
      {_id: '6621875af50f500f598f6380', duration: 5, end_date: '2024-03-30 00:00', id: 1713473317415, parent: 0, progress:0, text: "op", start_date: "2024-03-25 00:00",__v: 0},
      {_id: '662187c8f50f500f598f6389', duration: 18, end_date: '2024-04-08 00:00', id: 1713473379549, parent: 0, progress:0, text: "op", start_date: "2024-03-25 00:00",__v: 0},
      {_id: '662187d6f50f500f598f638b', duration: 5, end_date: '2024-03-24 00:00', id: 1713473379554, parent: 0, progress:0, text: "op", start_date: "2024-03-25 00:00",__v: 0},
    ]
  
};

const progresssN  = {
  data: 
      progress
  ,
  links: [
      { id: 1, source: 1, target: 2, type: '0' }
  ]
};

console.log(progresss)
console.log(progresssN)

// console.log(data)

const theOne = customer.filter((c) => {
  return c.idProject === projectID && c.idMember === userID
})

  console.log(theOne[0]?.isCustomer)

  const resulte = () => {
    if(theOne[0]?.isCustomer === true){
    return true
    } else if(theOne[0]?.isCustomer === undefined){
      return false
    }
  }
  
  console.log(resulte())

  // const rool = () => {
  //    return theOne[0]?.isCustomer ? false : true;
  // }

  // console.log(rool())
  
  return (
    <>
      <div className='main-container'>
        <Toolbar zoom={currentZoom} onZoomChange={handleZoomChange} />
        <div className="gantt-container">
          {/* {progress.map((m)=> */}
          <Gantt tasks={progresssN} zoom={currentZoom} onDataUpdated={logDataUpdate} add={resulte()}/>
          {/* )} */}
        </div>
        <MessageArea messages={messages} />
      </div>
    </>
  );
};

export default Progress;