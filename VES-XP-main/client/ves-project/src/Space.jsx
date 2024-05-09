import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSquarePlus } from 'react-icons/fa6';
import Modal from './Modal';
import UserStoryForm from './UserStoryForm';
import IterationForm from './IterationForm';
import ReleaseForm from './ReleaseForm';
import { useParams } from 'react-router-dom';
import { formatDate } from './utils';

import { Calendar, Search, User, Infinity, Rocket, GalleryVerticalEnd } from 'lucide-react';


// import { BsSearch } from "react-icons/bs";



import {
  // BarChart,
  // Bar,
  // XAxis,
  // YAxis,
  // CartesianGrid,
  // Tooltip,
  // Legend,
  ResponsiveContainer,
  // LineChart,
  // Line,
} from 'recharts';
import ProgressSpace from './pages/progress/ProgressSpace';

// Main component for the Space page
function Space() {

  const { id } = useParams();

  const [customer, setCustomer] = useState([]);


  // State variables to manage the state of modals and data
  const [userStoryFormOpen, setUserStoryFormOpen] = useState(false);
  const [iterationFormOpen, setIterationFormOpen] = useState(false);
  const [releaseFormOpen, setReleaseFormOpen] = useState(false);

  const [userStories, setUserStories] = useState([]);
  const [iterations, setIterations] = useState([]);
  const [releases, setReleases] = useState([]);

  const userID = window.localStorage.getItem("userID")
  const projectID = window.localStorage.getItem("ProjectID")

  // React Router hook for navigation
  const navigate = useNavigate();

  // Fetch data from the server when the component mounts
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  // Function to fetch data from the server
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
     
      const userStoriesResponse = await fetch(`http://localhost:5000/userStoriesProject/${id}`);
      const iterationsResponse = await fetch(`http://localhost:5000/iterationsProject/${id}`);
      const releasesResponse = await fetch(`http://localhost:5000/releasesProject/${id}`);

      // const userStoriesResponse = await fetch(`http://localhost:5000/userStories`);
      // const iterationsResponse = await fetch(`http://localhost:5000/iterations`);
      // const releasesResponse = await fetch(`http://localhost:5000/releases`);

      const userStoriesData = await userStoriesResponse.json();
      const iterationsData = await iterationsResponse.json();
      const releasesData = await releasesResponse.json();

      setUserStories(userStoriesData);
      setIterations(iterationsData);
      setReleases(releasesData);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error gracefully (could show a message to the user)
    }
  };

  // Function to toggle the user story form modal and fetch data after closing
  const handleUserStoryFormToggle = async () => {
    setUserStoryFormOpen(!userStoryFormOpen);

    // Wait for the user story form to close (assuming it closes after submitting)
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the delay if needed

    // Fetch data again after closing the user story form
    fetchData();
  };

  // Function to toggle the iteration form modal and fetch data after closing
  const handleIterationFormToggle = async () => {
    setIterationFormOpen(!iterationFormOpen);

    // Wait for the iteration form to close (assuming it closes after submitting)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Fetch data again after closing the iteration form
    fetchData();
  };

  // Function to toggle the release form modal and fetch data after closing
  const handleReleaseFormToggle = async () => {
    setReleaseFormOpen(!releaseFormOpen);

    // Wait for the release form to close (assuming it closes after submitting)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Fetch data again after closing the release form
    fetchData();
  };

  const handleDeleteUserStory = async (userId) => {
    // Show confirmation dialog
    const confirmDelete = window.confirm('Are you sure you want to delete this user story?');

    if (confirmDelete) {
      try {
        // Send delete request to the server
        const response = await fetch(`http://localhost:5000/userStories/${userId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          console.log('User story deleted successfully');
          // Fetch data again after deleting
          fetchData();
        } else {
          console.error('Error deleting user story');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleDeleteIteration = async (iterationId) => {
    // Show confirmation dialog
    const confirmDelete = window.confirm('Are you sure you want to delete this iteration?');

    if (confirmDelete) {
      try {
        // Send delete request to the server
        const response = await fetch(`http://localhost:5000/iterations/${iterationId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          console.log('Iteration deleted successfully');
          // Fetch data again after deleting
          fetchData();
        } else {
          console.error('Error deleting iteration');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleDeleteRelease = async (releaseId) => {
    // Show confirmation dialog
    const confirmDelete = window.confirm('Are you sure you want to delete this release?');

    if (confirmDelete) {
      try {
        // Send delete request to the server
        const response = await fetch(`http://localhost:5000/releases/${releaseId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          console.log('Release deleted successfully');
          // Fetch data again after deleting
          fetchData();
        } else {
          console.error('Error deleting release');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleEditUserStory = (userId) => {
    // Navigate to the edit page or open a modal for editing
    // You can implement this based on your preference
    // For simplicity, let's navigate to a new edit page
    navigate(`/userStories/${userId}/edit`);
  };

  const handleEditIteration = (iterationId) => {
    // Navigate to the edit page or open a modal for editing
    // You can implement this based on your preference
    // For simplicity, let's navigate to a new edit page
    navigate(`/iterations/${iterationId}/edit`);
  };

  const handleEditRelease = (releaseId) => {
    // Navigate to the edit page or open a modal for editing
    // You can implement this based on your preference
    // For simplicity, let's navigate to a new edit page
    navigate(`/releases/${releaseId}/edit`);
  };


  // Sample data for the charts
  const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  ];

  const BacKstatusFun = (status) => {
    // const status = iterations.map((ite) => ite.status)
    // console.log(status)

    if (status === "Start"){
      return "#46F7B7"
    } else if(status === "Complete"){
      return "#A8BBFF"
    } else if(status === "Completed"){
      return "#008040"
    }
  }

  const TextstatusFun = (status) => {
    // const status = iterations.map((ite) => ite.status)
    // console.log(status)

    if (status === "Start"){
      return "#096343"
    } else if(status === "Complete"){
      return "#000000"
    } else if(status === "Completed"){
      return "#008040"
    }
  }

  const [selectedFilters, setSelectedFilters] = useState(["All"]);
  
    let filters = ["All", "User Story", "Iteration", "Release"];
  
    const handleFilterButtonClick = (selectedCategory) => {
      if (selectedFilters.includes(selectedCategory)) {
        setSelectedFilters(selectedFilters.filter((el) => el !== selectedCategory));
      } else {
        setSelectedFilters([...selectedFilters, selectedCategory]);
      }
    };

    
    const [iterSearch, setIterSearch] = useState([]);
    const [userSearch, setUserSearch] = useState([]);
    const [releaseSearch, setRelSearch] = useState([]);
    
    let icons = [<GalleryVerticalEnd style={{width: "14px"}} key={1}/> ,
    <User style={{width: "14px"}} key={2}/>,
     <Infinity style={{width: "14px"}} key={3}/>,
      <Rocket style={{width: "14px"}} key={4}/>];
    // const icons = [User, Infinity, Rocket, GalleryVerticalEnd];

    const theOne = customer.filter((c) => {
      return c.idProject === projectID && c.idMember === userID
  })
    
      console.log(theOne[0]?.isCustomer)


      const statusFun = (status) => {
        // const status = userStory.status
    
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

  // JSX for the Space component
  return (
    <main className="main-container">
      {/* Modal for User Story Form */}
      {userStoryFormOpen && (
        <Modal onClose={handleUserStoryFormToggle}>
          <UserStoryForm onClose={handleUserStoryFormToggle} />
        </Modal>
      )}
      {/* Modal for Iteration Form */}
      {iterationFormOpen && (
        <Modal onClose={handleIterationFormToggle}>
          <IterationForm onClose={handleIterationFormToggle} />
        </Modal>
      )}
      {/* Modal for Release Form */}
      {releaseFormOpen && (
        <Modal onClose={handleReleaseFormToggle}>
          <ReleaseForm onClose={handleReleaseFormToggle} />
        </Modal>
      )}
      {/* Dashboard Title */}
      <div className="main-title">
        <h3>DASHBOARD</h3>

        <div>
        <div className="buttons-container">
          {filters.map((category, idx) => (
            <button
              onClick={() => handleFilterButtonClick(category)}
              className={`button ${selectedFilters.includes(category) ? "active" : ""}`}
              style={{display:"flex", alignItems: "center"}}
              key={`filters-${idx}`}
            >
              {/* {icons[idx]} */}
              {icons[idx]}
              {category}
            </button>
          ))}
        </div>
      </div>
      </div>
      {/* User Stories Card */}
      <div className="main-cards">
      {selectedFilters.includes("User Story") || selectedFilters.includes("All") ?
        <div className="card">
          <div className="search-box">
            <Search className="icon" />
            <input type="text" placeholder="Search..." 
            onChange={(e) => {
              setUserSearch(e.target.value);
            }}
            /> 
          </div>
          <div className="card-inner">
            <h3>User Stories</h3>
            {/* Button to open User Story Form */}
            {theOne[0]?.isCustomer ?
            "" 
            :
            <span className="card_icon"> <FaSquarePlus onClick={handleUserStoryFormToggle} /> </span>
            }
          </div>
          {/* List of User Stories */}
          <ul>
            {userStories.map((userStory) => (
                userStory.name.includes(userSearch)?

            <div key={userStory._id} className='card-child'>
              <div onClick={() => navigate(`/userStories/${userStory._id}`)}>
              <li key={userStory._id}>
                {/* Link to User Story Details */}
                {/* <Link to={`/userStories/${userStory._id}`} onClick={() => navigate(`/userStories/${userStory._id}`)}> */}
                <div style={{display:"flex", justifyContent: "space-between"}}>
                  <span className='card-name'> {userStory.name} </span>
                  <span className='card-name' style={{backgroundColor: statusFun(userStory.status), color: "white", borderWidth: "0px"}}> {userStory.status} </span>
                </div>
                  <span className='card-des'> {userStory.description} </span>
                {/* </Link> */}
                {/* Add Delete Icon */}
                <span className='card-date'><Calendar className="card-date-icon"/> {formatDate(userStory?.endDate)}</span>
                {/* <span onClick={() => handleDeleteUserStory(userStory._id)}>🗑️</span> */}
                {/* Add Edit Icon */}
                {/* <span onClick={() => handleEditUserStory(userStory._id)}>✏️</span> */}
              </li>
              </div>
              </div>
              : ""
            ))}
          </ul>
        </div>
        : ""}

        {/* Iterations Card */}
        {selectedFilters.includes("Iteration") || selectedFilters.includes("All")?
        <div className="card">
          <div className="search-box">
              <Search className="icon" />
              <input
                type="text"
                onChange={(e) => {
                  setIterSearch(e.target.value);
                }}
                placeholder="Search..."
              />
            </div>
          <div className="card-inner">
            <h3>Iterations</h3>
            {/* Button to open Iteration Form */}
            {theOne[0]?.isCustomer ?
            "" 
            :
            <FaSquarePlus className="card_icon" onClick={handleIterationFormToggle} />
            }
          </div>
          {/* List of Iterations */}
          <ul>
            {iterations.map((iteration) => (
              iteration.name.includes(iterSearch)?

              // <li key={iteration._id}>
              //   {/* Link to Iteration Details */}
              //   <Link to={`/iterations/${iteration._id}`} onClick={() => navigate(`/iterations/${iteration._id}`)}>
              //     {`${iteration.name} - ${iteration.objective}`}
              //   </Link>
              //   {/* Add Delete Icon */}
              //   <span onClick={() => handleDeleteIteration(iteration._id)}>🗑️</span>
              //   {/* Add Edit Icon */}
              //   <span onClick={() => handleEditIteration(iteration._id)}>✏️</span>
              // </li>

              <div key={iteration._id} className='card-child'>
              <div onClick={() => navigate(`/iterations/${iteration._id}`)}>
              <li key={iteration._id}>
                {/* Link to User Story Details */}
                {/* <Link to={`/userStories/${userStory._id}`} onClick={() => navigate(`/userStories/${userStory._id}`)}> */}
                <div style={{display:"flex", justifyContent: "space-between"}}>
                <span className='card-name'> {iteration.name} </span>
                  <span className='card-name' style={{backgroundColor: BacKstatusFun(iteration.status) , color:TextstatusFun(iteration.status), borderWidth: "0px" }}> {iteration.status} </span>
                </div>
                  <span className='card-des'> {iteration.objective} </span>
                {/* </Link> */}
                {/* Add Delete Icon */}
                <span className='card-date'><Calendar className="card-date-icon"/> {formatDate(iteration.endDate)}</span>
                {/* <span onClick={() => handleDeleteUserStory(userStory._id)}>🗑️</span> */}
                {/* Add Edit Icon */}
                {/* <span onClick={() => handleEditUserStory(userStory._id)}>✏️</span> */}
              </li>
              </div>
              </div>
              : ""
            ))}
          </ul>
        </div>
        : ""}
        {/* Releases Card */}
        {selectedFilters.includes("Release") || selectedFilters.includes("All")?
        <div className="card" >
          <div className="search-box">
            <Search className="icon" />
            <input type="text" placeholder="Search..." 
            onChange={(e) => {
              setRelSearch(e.target.value);
            }}
            />
          </div>
          <div className="card-inner">
            <h3>Releases</h3>
            {/* Button to open Release Form */}
            {theOne[0]?.isCustomer ?
            "" 
            :
            <FaSquarePlus className="card_icon" onClick={handleReleaseFormToggle} />
            }
          </div>
          {/* List of Releases */}
          <ul>
            {releases.map((release) => (
                release.name.includes(releaseSearch)?
              // <li key={release._id}>
              //   {/* Link to Release Details */}
              //   <Link to={`/releases/${release._id}`} onClick={() => navigate(`/releases/${release._id}`)}>
              //     {`${release.name} - ${release.objective}`}
              //   </Link>
              //   {/* Add Delete Icon */}
              //   <span onClick={() => handleDeleteRelease(release._id)}>🗑️</span>
              //   {/* Add Edit Icon */}
              //   <span onClick={() => handleEditRelease(release._id)}>✏️</span>
              // </li>

              <div key={release._id} className='card-child'>
              <div onClick={() => navigate(`/releases/${release._id}`)}>
              <li key={release._id}>
                {/* Link to User Story Details */}
                {/* <Link to={`/userStories/${userStory._id}`} onClick={() => navigate(`/userStories/${userStory._id}`)}> */}
                <div style={{display:"flex", justifyContent: "space-between"}}>
                  <span className='card-name'> {release.name}</span>
                  <span className='card-name' style={{backgroundColor: "#46F7B7", color:"#096343", borderWidth: "0px"}}> {release.released ? "Released" : " Not Released" } </span>
                </div>
                  <span className='card-des'> {release.objective} </span>
                {/* </Link> */}
                {/* Add Delete Icon */}
                <span className='card-date'><Calendar className="card-date-icon"/> {formatDate(release.endDate)}</span>
                {/* <span onClick={() => handleDeleteUserStory(userStory._id)}>🗑️</span> */}
                {/* Add Edit Icon */}
                {/* <span onClick={() => handleEditUserStory(userStory._id)}>✏️</span> */}
              </li>
              </div>
              </div>
              : ""
            ))}
          </ul>
        </div>
        : ""}
      </div>
      <div className='main-container'>
        <ProgressSpace add={false}/>
      </div>
      {/* Charts */}
      <div className="charts">
        {/* Bar Chart */}
        <ResponsiveContainer width="100%" height="100%">
          {/* <BarChart
            width={500}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart> */}
        </ResponsiveContainer>
        {/* Line Chart */}
        <ResponsiveContainer width="100%" height="100%">
          {/* <LineChart
            width={500}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart> */}
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Space;