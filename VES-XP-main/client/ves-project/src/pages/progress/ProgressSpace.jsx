import { useState, useEffect } from 'react';
import Gantt from './componentsSpace/Gantt';
import Toolbar from './componentsSpace/Toolbar';
import MessageArea from './componentsSpace/MessageArea';

const ProgressSpace = (add) => {
  const [currentZoom, setCurrentZoom] = useState('Days');
  const [messages, setMessages] = useState([]);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
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


  return (
    <>
      <div className='main-container'>
        <Toolbar zoom={currentZoom} onZoomChange={handleZoomChange} />
        <div className="gantt-container">
          {/* {progress.map((m)=> */}
          <Gantt tasks={progresssN} zoom={currentZoom} onDataUpdated={logDataUpdate} add={add} />
          {/* )} */}
        </div>
        {/* <MessageArea messages={messages} /> */}
      </div>
    </>
  );
};

export default ProgressSpace;