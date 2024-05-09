// import React, { Component } from 'react';
// import { gantt } from 'dhtmlx-gantt';
// import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
// import './Gantt.css';
 
// export default class Gantt extends Component {
//     initGanttDataProcessor() {
//         const onDataUpdated = this.props.onDataUpdated;
//         this.dataProcessor = gantt.createDataProcessor((entityType, action, item, id) => {
//             return new Promise((resolve, reject) => {
//                 if (onDataUpdated) {
//                     onDataUpdated(entityType, action, item, id);
//                 }
//                 console.log(item)
//                     try {
//                       // Send a POST request to your backend API to create a new user story
//                       const response =  fetch('http://localhost:5000/processor', {
//                         method: 'POST',
//                         headers: {
//                           'Content-Type': 'application/json',
//                         },
//                         body: JSON.stringify({
//                             ...item
//                         //    {id,parent,process,end_data,start_date,text,duration}=item,
//                       }),
//                       });
                  
//                       // Handle the response accordingly (e.g., show success message)
//                       if (response.ok) {
//                         console.log('processor created successfully!');
//                         // Add logic to redirect or update state as needed
//                         // fetchData(); // Fetch data after creating a new user story
//                       } else {
//                         console.error('Failed to create processor');
//                         // Handle errors
//                       }
//                     } catch (error) {
//                       console.error('Error creating processor:', error);
//                       // Handle errors
//                     }
//                 return resolve();
//             });
//         });
//     }
//     componentWillUnmount() {
//         if (this.dataProcessor) {
//             this.dataProcessor.destructor();
//             this.dataProcessor = null;
//         }
//     }
//     initZoom() {
//         gantt.ext.zoom.init({
//             levels: [
//                 {
//                     name: 'Hours',
//                     scale_height: 60,
//                     min_column_width: 30,
//                     scales: [
//                         { unit: 'day', step: 1, format: '%d %M' },
//                         { unit: 'hour', step: 1, format: '%H' }
//                     ]
//                 },
//                 {
//                     name: 'Days',
//                     scale_height: 60,
//                     min_column_width: 70,
//                     scales: [
//                         { unit: 'week', step: 1, format: 'Week #%W' },
//                         { unit: 'day', step: 1, format: '%d %M' }
//                     ]
//                 },
//                           {
//                     name: 'Months',
//                     scale_height: 60,
//                     min_column_width: 70,
//                     scales: [
//                         { unit: "month", step: 1, format: '%F' },
//                         { unit: 'week', step: 1, format: '#%W' }
//                     ]
//                 }
//             ]
//         });
//     }
//     setZoom(value) {
//         if(!gantt.$initialized){
//           this.initZoom();
//         }
//         gantt.ext.zoom.setLevel(value);
//     }
    
//     shouldComponentUpdate(nextProps) {
//         return this.props.zoom !== nextProps.zoom;
//     }
//     componentDidMount() {
        
//         gantt.config.date_format = "%Y-%m-%d %H:%i";
        
        
//         this.initGanttDataProcessor();
//         const { tasks } = this.props;
//         gantt.init(this.ganttContainer);
//         gantt.parse(tasks);
//     }

//     render() {
//         const { zoom, tasks } = this.props;
//         if (tasks.length === 0) {
//             return <div>No tasks to display</div>;
//         }
    
//         this.setZoom(zoom);
//         return (
//             <div
//                 ref={(input) => { this.ganttContainer = input }}
//                 style={{ width: '100%', height: '100%' }}
//             ></div>
//         );
        
//     }
// }






























import React, { useEffect, useRef } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import './Gantt.css';

const Gantt = ({ tasks, zoom, onDataUpdated,add }) => {
  const ganttContainer = useRef(null);
  let dataProcessor = null;

  const initGanttDataProcessor = () => {
    dataProcessor = gantt.createDataProcessor((entityType, action, item, id) => {
      return new Promise((resolve, reject) => {
        if (onDataUpdated) {
          onDataUpdated(entityType, action, item, id);
        }
        try {
          // Send a POST request to your backend API to create a new user story
          fetch('http://localhost:5000/processor', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...item
            }),
          }).then(response => {
            if (response.ok) {
              console.log('Processor created successfully!');
            } else {
              console.error('Failed to create processor');
            }
            resolve();
          }).catch(error => {
            console.error('Error creating processor:', error);
            resolve();
          });
        } catch (error) {
          console.error('Error creating processor:', error);
          resolve();
        }
      });
    });
  };

//   gantt.config.layout = {
//     css: "gantt_container",
//     rows:[
//       {
//         cols: [
//           {view: "grid", id: "grid", },
//           {resizer: true, width: 1},
//           {view: "timeline", id: "timeline"},
//           {view: "scrollbar", scroll: "y", id:"scrollVer"}
//         ]
//        },
//       {view: "scrollbar", scroll: "x", id:"scrollHor", height:20}
//     ]
// };

// gantt.init("gantt_here");
  if(add){
  gantt.config.columns =
    [ {name:"text", label:"Task name", width:"*", tree:true }, {name:"start_date", label:"Start time", align: "center" }, {name:"duration", label:"Duration", align: "center" } ]; 
  }
    const initZoom = () => {

 // Calculate the start date of the week containing the current day
 const currentDate = new Date();
 const currentDayOfWeek = currentDate.getDay() + 1; // Sunday is 0, Monday is 1, ..., Saturday is 6
 const startOfWeek = new Date(currentDate);
 startOfWeek.setDate(startOfWeek.getDate() - currentDayOfWeek); // Set to the first day of the week

    gantt.ext.zoom.init({
      levels: [
        {
          name: 'Hours',
          scale_height: 60,
          min_column_width: 30,
          scales: [
            { unit: 'day', step: 1, format: '%d %M' },
            { unit: 'hour', step: 1, format: '%H' }
          ]
        },
        {
          name: 'Days',
          scale_height: 60,
          min_column_width: 70,
          scales: [
            { unit: 'week', step: 1, format: 'Week #%W' },
            { unit: 'day', step: 1, format: '%d %M' }
          ]
        },
        {
          name: 'Months',
          scale_height: 60,
          min_column_width: 70,
          scales: [
            { unit: "month", step: 1, format: '%F' },
            { unit: 'week', step: 1, format: '#%W' }
          ]
        },
        {
          name: 'Weak',
          scale_height: 60,
          min_column_width: 800,
          scales: [
            // { unit: 'week', step: 1, format: 'Weak #%W' },
            // { unit: 'day', step: 1, format: '%d %M' }

            { unit: 'day', step: 1, format: '%d %M', date: startOfWeek }, // Start from the calculated start of the week
            { unit: 'week', step: 1, format: 'Weak #%W' }

            // { unit: 'day', step: 1, format: '%d %M' }
          ]
        },
        // {
        //   name:"week",
        //   scale_height: 50,
        //   min_column_width:50,
        //   scales:[
        //    {unit: "week", step: 1, format: function (date) {
        //     var dateToStr = gantt.date.date_to_str("%d %M");
        //     var endDate = gantt.date.add(date, 6, "day");
        //     var weekNum = gantt.date.date_to_str("%W")(date);
        //     return "#" + weekNum + ", " + dateToStr(date) + " - " + dateToStr(endDate);
        //     }},
        //     {unit: "day", step: 1, format: "%j %D"}
        //   ]
        // }
      ]
    });
  };

  const setZoom = (value) => {
    if (!gantt.$initialized) {
      initZoom();
    }
    gantt.ext.zoom.setLevel(value);
  };

  useEffect(() => {
    gantt.config.date_format = "%Y-%m-%d %H:%i";
    initGanttDataProcessor();
    gantt.init(ganttContainer.current);
    gantt.parse(tasks);

    return () => {
      if (dataProcessor) {
        dataProcessor.destructor();
        dataProcessor = null;
      }
    };
  }, [tasks]);

  useEffect(() => {
    setZoom(zoom);
  }, [zoom]);

  return (
    <div
      ref={ganttContainer}
      style={{ width: '100%', height: '100%' }}
    ></div>
  );
};

export default Gantt;