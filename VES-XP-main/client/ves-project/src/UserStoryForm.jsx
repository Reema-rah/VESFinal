import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UserStoryForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'To Do',
    priority: 'High',
    storyPoints: 1,
    blocked: false,
    assignees: [],
  });

  const { id } = useParams();
  const [users, setUsers] = useState([]); // State to store the list of users
  const [userStory, setUserStory] = useState([]); // State to store the list of users
  const [filters, setFilters] = useState([]); // State to store the list of users

  useEffect(() => {
    // Fetch the list of users from your backend API
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/users');
        if (!response.ok) {
          throw new Error(`Error fetching users: ${response.statusText}`);
        }

        const data = await response.json();
        setUsers(data);
        if (id) {
          const response = await fetch(`http://localhost:5000/userProjects/${id}`);
          if (!response.ok) {
            throw new Error(`Error fetching user story details: ${response.statusText}`);
          }
      
          const data = await response.json();

          setUserStory(data[0]?.userIDs);

        }
      } catch (error) {
        console.error('Error fetching users:', error);
        // Handle errors
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures the effect runs only once

  useEffect(() => {
    userStory.map((s)=>{
      users.map((u)=>{
  
      return u?._id === s? filters.push(u) : ""
    })
  })
  }, [userStory]);
  
  
    console.log(filters)
  
    function removeDuplicates() {
      return [...new Set(filters)];
  }
  
  const handleChange = (e) => {
    const { name, value, type, checked, selectedOptions } = e.target;
  
    // If the input is a checkbox or multi-select, handle its checked state
    const newValue = type === 'checkbox' ? checked : type === 'select-multiple'
      ? Array.from(selectedOptions).map(option => option.value)
      : value;
  
    setFormData({ ...formData, [name]: newValue });
  };
  

  // Inside UserStoryForm component where you handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Send a POST request to your backend API to create a new user story
      const response = await fetch('http://localhost:5000/userStories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          projectID: id,
        }),
      });
  
      // Handle the response accordingly (e.g., show success message)
      if (response.ok) {
        console.log('User story created successfully!');
        // Add logic to redirect or update state as needed
        // fetchData(); // Fetch data after creating a new user story
      } else {
        console.error('Failed to create user story');
        // Handle errors
      }
    } catch (error) {
      console.error('Error creating user story:', error);
      // Handle errors
    }
  
    // Clear the form after submission
    setFormData({
      name: '',
      description: '',
      status: 'To Do',
      priority: 'High',
      storyPoints: 1,
      startDate: '',
      endDate: '',
      blocked: false,
      assignees: [],
    });
  
    // Close the form modal
    onClose();
  };
  

  return (
    <>
    {/* <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}> */}
    

    <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Name</label>
    <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="name"/>
    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
  </div>

  <div className="form-group">
    <label htmlFor="exampleFormControlTextarea1">Description</label>
    <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>

  <div style={{display: "flex" , alignItems: "center"}}>
  <div className="form-group form-check">
    <input name="blocked" value={formData.blocked} onChange={handleChange} type="checkbox" className="form-check-input" id="exampleCheck1" />
    <label className="form-check-label" htmlFor="exampleCheck1">Bloked?</label>
  </div>

  <label>Story Points:</label>
  <input type="number" name="storyPoints" value={formData.storyPoints} onChange={handleChange} className="form-check-number"/>
  </div>


  <label>Status:</label>
  <select name="status" value={formData.status} className="form-select form-select-sm" aria-label=".form-select-sm example" onChange={handleChange}>
    <option value="To Do">To Do</option>
    <option value="Doing">Doing</option>
    <option value="Done">Done</option>
    <option value="To Test">To Test</option>
    <option value="Failed">Failed</option>
    <option value="Passed">Passed</option>
  </select>

  <div style={{display: "flex"}}>
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">
            Start Date
          </label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            name="startDate"
            // value={formatDate(formData.startDate)}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">
            End Date
          </label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            name="endDate"
            // value={formatDate(formData.endDate)}
            onChange={handleChange}
          />
        </div>
</div>

  <label>Priority:</label>
  <select name="priority" className="form-select form-select-sm" aria-label=".form-select-sm example" value={formData.priority} onChange={handleChange}>
    <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
  </select>

  <select className="form-select" 
    multiple
    aria-label="multiple select example"
    name="assignees"
    value={formData.assignees}
    onChange={handleChange}>
      {(removeDuplicates() || []).map((user) => (
        <option key={user._id} value={user._id}>
          {user.username}
        </option>
      ))}
  </select>

  {/* <label>Story Points:</label>
  <input type="number" name="storyPoints" value={formData.storyPoints} onChange={handleChange} className="form-check-number"/> */}

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </>
  );
};

export default UserStoryForm;



/*import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UserStoryForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'To Do',
    priority: 'High',
    storyPoints: 1,
    blocked: false,
    assignees: [],
  });

  const { id } = useParams();
  const [teams, setTeams] = useState([]); // State to store the list of teams

  useEffect(() => {
    // Fetch the list of teams from your backend API
    const fetchTeams = async () => {
      try {
        const response = await fetch('http://localhost:5000/teams');
        if (!response.ok) {
          throw new Error(`Error fetching teams: ${response.statusText}`);
        }

        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error('Error fetching teams:', error);
        // Handle errors
      }
    };

    fetchTeams();
  }, []); // Empty dependency array ensures the effect runs only once

  
  const handleChange = (e) => {
    const { name, value, type, checked, selectedOptions } = e.target;
  
    // If the input is a checkbox or multi-select, handle its checked state
    const newValue = type === 'checkbox' ? checked : type === 'select-multiple'
      ? Array.from(selectedOptions).map(option => option.value)
      : value;
  
    setFormData({ ...formData, [name]: newValue });
  };
  

  // Inside UserStoryForm component where you handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Assuming you have a function to get selected teams' IDs
      
      // Send a POST request to your backend API to create a new user story
      const response = await fetch('http://localhost:5000/userStories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          projectID: id,
        }),
      });
  
      // Handle the response accordingly (e.g., show success message)
      if (response.ok) {
        console.log('User story created successfully!');
        // Add logic to redirect or update state as needed
        // fetchData(); // Fetch data after creating a new user story
      } else {
        console.error('Failed to create user story');
        // Handle errors
      }
    } catch (error) {
      console.error('Error creating user story:', error);
      // Handle errors
    }
  
    // Clear the form after submission
    setFormData({
      name: '',
      description: '',
      status: 'To Do',
      priority: 'High',
      storyPoints: 1,
      blocked: false,
      assignees: [],
    });
  
    // Close the form modal
    onClose();
  };
  

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        

        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
        

        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="To Do">To Do</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
          <option value="To Test">To Test</option>
          <option value="Failed">Failed</option>
          <option value="Passed">Passed</option>
        </select>
        
      </div>

      <div>
        
        <label>Priority:</label>
        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
       
      </div>
      

      <div>
        <label>Story Points:</label>
        <input type="number" name="storyPoints" value={formData.storyPoints} onChange={handleChange} />
        

        <label>Blocked:</label>
        <select name="blocked" value={formData.blocked} onChange={handleChange}>
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>

      
      </div>

      <div>
        <label>Assignees:</label>
        <select
          name="assignees"
          multiple
          value={formData.assignees}
          onChange={handleChange}
        >
          {teams.map((team) => (
            <option key={team._id} value={team._id}>
              {team.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default UserStoryForm;
*/