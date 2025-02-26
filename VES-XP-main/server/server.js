const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Userstory = require('./models/userstoriesSchema');
const Processor = require("./models/processor")
const Iteration = require('./models/iterationsSchema');
const Release = require('./models/releasesSchema');
const Team = require('./models/teamsSchema');
const ListModel = require('./models/Lists')
const UserModel = require('./models/userSchema')
const ProjectModel = require('./models/projectSchema')
const IsCustomer = require('./models/isCustomer')
const Comments = require('./models/comments')
const FeedbckIte = require('./models/feedbackIte')
const FeedbackRel = require('./models/feedbackRel')
const CommentsPage = require('./models/commentsPage')


const app = express();
const PORT = process.env.PORT || 5000;
const SECRET = "Anything"
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Connect to MongoDB
//mongoose.connect('mongodb://0.0.0.0:27017/vesdb2')
// mongoose.connect(`mongodb://localhost:27017/vesdb2`)
// mongoose.connect('mongodb+srv://Reemaald7:MiQaPhghE8JWGK07@cluster0.xiw3xoh.mongodb.net/vesdb2')
mongoose.connect(`mongodb://localhost:27017/ves-xp-main`)

// @api {get} /project Get all project
app.get('/userProject/:id', async (req, res) => {
  try {
    const projects = await ProjectModel.find({ userIDs: { "$in": (req.params.id) } });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/userProjects/:id', async (req, res) => {
  try {
    const projects = await ProjectModel.find({ _id: req.params.id});
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// @api {post} /project Create a project
app.post('/joinProject', async (req, res) => {
  const {
    passcode,
    userID,
  } = req.body;

  try {

    await ProjectModel.updateOne({ passcode: passcode }, { $push: { userIDs: userID } })

    res.status(201);

  } catch (error) {
    console.error('Error Joining Project', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});

//@api {post} /teams Create a new team
app.post('/isCustomer', async (req, res) => {
  const { 
    idProject,
    idMember,
    isCustomer
  } = req.body;

  try {
    const newCustomer = new IsCustomer({ idProject, idMember, isCustomer });
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/isCustomer', async (req, res) => {
  try {
    const isCustomer = await IsCustomer.find();
    if (!isCustomer) {
      res.status(404).json({ error: 'isCustomer not found' });
      return;
    }
    res.json(isCustomer);
  } catch (error) {
    console.error('Error fetching user story details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// @api {post} /project Create a project
app.post('/project', async (req, res) => {
  const {
    _id,
    projectName,
    passcode,
    userID,
  } = req.body;


  try {
    if (_id == "") {

      const projects = await ProjectModel.find({ passcode: passcode });

      if(projects.length>0){
        res.status(201).json({ message: 'Passcode already reserved' });;
        return;
      }
      const project = new ProjectModel({
        projectName,
        passcode,
        userIDs: [userID],
      });

      await project.save();
      res.status(201).json(project);
    }
    else {
      await ProjectModel.updateOne({ _id: _id }, { $set: { projectName: projectName, passcode: passcode } })
      res.status(201);
    }

  } catch (error) {
    console.error('Error creating Project', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});


//@api {get} /projeect/:id Get details of a projeect
/*app.get('/project/:id', async (req, res) => {
  try {
    const project = await ProjectModel.findById(req.params.id);
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.json(project);
  } catch (error) {
    console.error('Error fetching Project details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});*/

// @api {get} /project/:id Get details of a project with populated userIDs
app.get('/project/:id', async (req, res) => {
  try {
    const project = await ProjectModel.findById(req.params.id).populate('userIDs');
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.json(project);
  } catch (error) {
    console.error('Error fetching project details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/user/:id', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a route to fetch all users
app.get('/users', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new Gantt task
app.post('/project/:id/task', async (req, res) => {
  const { task } = req.body;
  const projectId = req.params.id;

  try {
    const project = await ProjectModel.findById(projectId);
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    project.ganttTasks.push(task);
    await project.save();

    res.status(201).json(project.ganttTasks);
  } catch (error) {
    console.error('Error creating Gantt task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch all Gantt tasks for a project
app.get('/project/:id/tasks', async (req, res) => {
  const projectId = req.params.id;

  try {
    const project = await ProjectModel.findById(projectId);
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    res.json(project.ganttTasks);
  } catch (error) {
    console.error('Error fetching Gantt tasks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/processor', async (req, res) => {
  const {
    // nativeeditor_status,
    duration,
    end_date,
    id,
    parent,
    progress,
    start_date,
    text
  } = req.body;

  try {
    const newProcessor = new Processor({
    // nativeeditor_status,
    duration,
    end_date,
    id,
    parent,
    progress,
    start_date,
    text,
    });

    await newProcessor.save();

    // Send a response with the created user story
    res.status(201).json(newProcessor);
  } catch (error) {
    console.error('Error creating progress:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Add a route to fetch all users
app.get('/progress', async (req, res) => {
  try {
    const processors = await Processor.find();
    res.json(processors);
  } catch (error) {
    console.error('Error fetching processors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// delete projeect
app.delete('/project/:id', async (req, res) => {
  try {
    const deletedProject = await ProjectModel.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting Project:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/register", async (req, res) => {
  const { email, name, password } = req.body

  const user = await UserModel.findOne({ email })
  if (user)
    return res.json({ message: "User already exists!" })

  const hashedPassword = bcrypt.hashSync(password, 10)

  const newUser = new UserModel({ username: name, email: email, password: hashedPassword });
  await newUser.save();

  return res.json({ message: "User created succefully" })

})

app.post("/login", async (req, res) => {
  const { email, password } = req.body

  const user = await UserModel.findOne({ email: email })
  if (!user)
    return res.json({ message: "User doesn't exist!" })

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return res.json({ message: "Email or Password is not correct" })

  const token = jwt.sign({ id: user._id }, SECRET)

  return res.json({ token, userID: user._id, message: "Success" })
})

// get lists
app.get("/lists", async (req, res) => {
  var lists = [
    new ListModel({ name: "To Do", color: "#7F7F7F" }),
    new ListModel({ name: "Doing", color: "#A1FB8E" }),
    new ListModel({ name: "Done", color: "#75FA61" }),
    new ListModel({ name: "To Test", color: "#F09B59" }),
    new ListModel({ name: "Failed", color: "#EB3324" }),
    new ListModel({ name: "Passed", color: "#3282F6" })
  ]
  res.json(lists)
})

// @api {get} /userStories Get all user stories
app.get('/userStoriesProject/:id', async (req, res) => {
  try {

    const userstories = await Userstory.find({ projectID: (req.params.id) }); // Populate assignees
    res.json(userstories);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//@api {get} /iterations Get all iterations
app.get('/iterationsProject/:id', async (req, res) => {
  try {
    const iterations = await Iteration.find({ projectID: (req.params.id) }); // Populate assignees
    res.json(iterations);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// @api {get} /releases Get all releases
app.get('/releasesProject/:id', async (req, res) => {
  try {
    const releases = await Release.find({ projectID: (req.params.id) });
    res.json(releases);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// @api {get} /teams Get all teams
app.get('/teams/:id', async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/addComment', async (req, res) => {
  const {param, projectID, commentsData } = req.body;


  try {
      const comment = await Comments.findOne({'comments.id':projectID});
      const story = await Comments.findOne({'comments.storyId':param});
      
      if (!comment && !story) {
        // const newComment = new Comments({id: projectID , items: commentsData})
        const newComment = new Comments({comments: commentsData})

        await newComment.save();
      } 

      if (!story) {
        // const newComment = new Comments({id: projectID , items: commentsData})
        const newComment = new Comments({comments: commentsData})

        await newComment.save();
      } 

      if (comment && story) {
        await Comments.findOneAndUpdate({'comments.id': projectID}, {comments: commentsData});
      } 

      return res.json({ message: {commentsData}});
  } catch (error) {
      console.error("Error deleting gallery item:", error);
      return res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/deleteComment', async (req, res) => {
  const { folderId, projectID } = req.body;

  try {
      // const comment = await Comments.findOne({'comments.items.id':folderId});
      const comment = await Comments.findOne({'comments.items.id':folderId});

      // const commentw = await Comments.deleteOne({'comments.items.id':comment});

      // await Comments.findByIdAndDelete(comment);

      // const comment = await Comments.updateOne(
      //   { _id : projectID },
      //   {$pull : {"comments.items.id":folderId}}
      // )

      await Comments.updateOne({"comments.id":projectID},{$pull:{"comments.items":{$in:[folderId]}}})

      await Comments.updateOne({"comments.id":projectID}, {$pull: {"comments.items": folderId}})
      await Comments.updateOne({"comments.id": projectID}, {$pull: {"comments.items": {"id": folderId}}})
      return res.json(folderId);
  } catch (error) {
      console.error("Error deleting gallery item:", error);
      return res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/comments', async (req, res) => {
  try {
    const comments = await Comments.find()

    res.json(comments);
  } catch (error) {
    console.error('Error fetching Comments details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/deleteUserStory', async (req, res) => {
    const { id } = req.body;

    try {
        // Assuming AdminModel has a method to delete by ID
        const deletedItem = await Userstory.findByIdAndDelete(id);
        
        if (!deletedItem) {
            return res.status(404).json({ error: "Userstory item not found" });
        }

        return res.json({ message: "Userstory item deleted successfully" });
    } catch (error) {
        console.error("Error deleting gallery item:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});


// @api {post} /userStories Create a new user story
app.post('/userStories', async (req, res) => {
  const {
    name,
    description,
    status,
    priority,
    storyPoints,
    blocked,
    assignees,
    projectID,
    startDate,
    endDate,
  } = req.body;

  try {
    const newUserStory = new Userstory({
      name,
      description,
      status,
      priority,
      storyPoints,
      blocked,
      assignees,
      projectID,
      startDate,
      endDate,
    });

    await newUserStory.save();

    // Send a response with the created user story
    res.status(201).json(newUserStory);
  } catch (error) {
    console.error('Error creating user story:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/deleteIteration', async (req, res) => {
  const { id } = req.body;

  try {
      // Assuming AdminModel has a method to delete by ID
      const deletedItem = await Iteration.findByIdAndDelete(id);
      
      if (!deletedItem) {
          return res.status(404).json({ error: "Iteration item not found" });
      }

      return res.json({ message: "Iteration item deleted successfully" });
  } catch (error) {
      console.error("Error deleting Iteration item:", error);
      return res.status(500).json({ error: "Internal server error" });
  }
});

//@api {post} /iterations Create a new iteration
app.post('/iterations', async (req, res) => {
  const {
    name,
    objective,
    userStories,
    startDate,
    endDate,
    assignees, // Now this will contain user IDs instead of team IDs
    status,
    priority,
    projectID,
  } = req.body;

  try {
    const newIteration = new Iteration({
      name,
      objective,
      userStories,
      startDate,
      endDate,
      assignees, // Update this to accept user IDs
      status,
      priority,
      projectID,
    });

    await newIteration.save();

    // Send a response with the created iteration
    res.status(201).json(newIteration);
  } catch (error) {
    console.error('Error creating iteration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/feedbackIteGet', async (req, res) => {
  try {
    const feedback = await FeedbckIte.find()

    res.json(feedback);
  } catch (error) {
    console.error('Error fetching Comments details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/feedbackIte', async (req, res) => {
  const { newData, projectID, param} = req.body;

  try {
    // Assuming AdminModel has a method to delete by ID
    // const comment = await Comments.findOne({comments:{id:projectID}});
    const iteration = await FeedbckIte.findOne({"idProject": projectID});
    const iterationId = await FeedbckIte.findOne({"iterationId": param});

    
    // if (!iteration && !iterationId) {
    //   const newComment = new FeedbckIte ({idProject:projectID, iterationId:param, comments: newData})

    //   await newComment.save();
    // } 

    // await FeedbckIte.deleteMany()

    // if (!iterationId) {
    //   const newComment = new FeedbckIte ({idProject:projectID, iterationId:param, comments: newData})

    //   await newComment.save();
    // } 
    
    // if (iteration && iterationId) {
    //   await FeedbckIte.findOneAndUpdate({"idProject": iteration}, {comments: newData});
    // } 




    if (!iterationId) {
      const newComment = new FeedbckIte ({idProject:projectID, iterationId:param ,comments: newData})

      await newComment.save();
    } 
    
    if (iterationId) {
      await FeedbckIte.findOneAndUpdate({"iterationId": param}, {comments: newData});
    } 



    return res.json({newData});
} catch (error) {
    console.error("Error deleting gallery item:", error);
    return res.status(500).json({ error: "Internal server error" });
}
});

app.post('/deleteReleases', async (req, res) => {
  const { id } = req.body;

  try {
      // Assuming AdminModel has a method to delete by ID
      const deletedItem = await Release.findByIdAndDelete(id);
      
      if (!deletedItem) {
          return res.status(404).json({ error: "Release item not found" });
      }

      return res.json({ message: "Release item deleted successfully" });
  } catch (error) {
      console.error("Error deleting Release item:", error);
      return res.status(500).json({ error: "Internal server error" });
  }
});

//@api {post} /releases Create a new release
app.post('/releases', async (req, res) => {
  const {
    name,
    objective,
    iterations,
    startDate,
    endDate,
    released,
    projectID,
  } = req.body;

  try {
    const newRelease = new Release({
      name,
      objective,
      iterations,
      startDate,
      endDate,
      released,
      projectID,
    });

    await newRelease.save();

    // Send a response with the created release
    res.status(201).json(newRelease);
  } catch (error) {
    console.error('Error creating release:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/feedbackRelGet', async (req, res) => {
  try {
    const feedback = await FeedbackRel.find()

    res.json(feedback);
  } catch (error) {
    console.error('Error fetching Comments details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/feedbackRel', async (req, res) => {
  const { newData, projectID, param } = req.body;

  try {
    const releaseId = await FeedbackRel.findOne({"releaseId": param});

    if (!releaseId) {
      const newComment = new FeedbackRel ({idProject: projectID,releaseId: param, comments: newData})

      await newComment.save();
    } 
    
    if (releaseId) {
      await FeedbackRel.findOneAndUpdate({"releaseId": param}, {comments: newData});
    } 

    return res.json({newData});
} catch (error) {
    console.error("Error deleting gallery item:", error);
    return res.status(500).json({ error: "Internal server error" });
}
});

//@api {post} /teams Create a new team
app.post('/teams/:id', async (req, res) => {
  const { name, objective } = req.body;

  try {
    const newTeam = new Team({ name, objective });
    await newTeam.save();
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//@api {get} /userStories/:id Get details of a specific user story
app.get('/userStories/:id', async (req, res) => {
  try {
    const userStory = await Userstory.findById(req.params.id).populate('assignees');
    if (!userStory) {
      res.status(404).json({ error: 'User Story not found' });
      return;
    }
    res.json(userStory);
  } catch (error) {
    console.error('Error fetching user story details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//@api {get} /iterations/:id Get details of a specific iteration
app.get('/iterations/:id', async (req, res) => {
  try {
    const iteration = await Iteration.findById(req.params.id).populate('assignees').populate('userStories');
    if (!iteration) {
      res.status(404).json({ error: 'Iteration not found' });
      return;
    }
    res.json(iteration);
  } catch (error) {
    console.error('Error fetching iteration details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//@api {get} /releases/:id Get details of a specific release
app.get('/releases/:id', async (req, res) => {
  try {
    const release = await Release.findById(req.params.id).populate('iterations');
    if (!release) {
      res.status(404).json({ error: 'Release not found' });
      return;
    }
    res.json(release);
  } catch (error) {
    console.error('Error fetching release details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//@api {get} /teams/:id Get details of a specific team
app.get('/teams/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      res.status(404).json({ error: 'Release not found' });
      return;
    }
    res.json(team);
  } catch (error) {
    console.error('Error fetching release details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// delete user story
app.delete('/userStories/:id', async (req, res) => {
  try {
    const deletedUserStory = await Userstory.findByIdAndDelete(req.params.id);
    if (!deletedUserStory) {
      res.status(404).json({ error: 'User Story not found' });
      return;
    }
    res.json({ message: 'User Story deleted successfully' });
  } catch (error) {
    console.error('Error deleting user story:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// delete iteration
app.delete('/iterations/:id', async (req, res) => {
  try {
    const deletedIteartion = await Iteration.findByIdAndDelete(req.params.id);
    if (!deletedIteartion) {
      res.status(404).json({ error: 'Iteration not found' });
      return;
    }
    res.json({ message: 'Iteration deleted successfully' });
  } catch (error) {
    console.error('Error deleting iteration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// delete release
app.delete('/releases/:id', async (req, res) => {
  try {
    const deletedRelease = await Release.findByIdAndDelete(req.params.id);
    if (!deletedRelease) {
      res.status(404).json({ error: 'Release not found' });
      return;
    }
    res.json({ message: 'Release deleted successfully' });
  } catch (error) {
    console.error('Error deleting release:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/addCommentPage', async (req, res) => {
  const {param, projectID, commentsData } = req.body;


  try {
      const comment = await CommentsPage.findOne({'comments.id':projectID});
      const story = await CommentsPage.findOne({'comments.storyId':param});
      
      if (!comment && !story) {
        // const newComment = new Comments({id: projectID , items: commentsData})
        const newComment = new CommentsPage({comments: commentsData})

        await newComment.save();
      } 

      if (!story) {
        // const newComment = new Comments({id: projectID , items: commentsData})
        const newComment = new CommentsPage({comments: commentsData})

        await newComment.save();
      } 

      if (comment && story) {
        await CommentsPage.findOneAndUpdate({'comments.id': projectID}, {comments: commentsData});
      } 

      return res.json({ message: {commentsData}});
  } catch (error) {
      console.error("Error deleting gallery item:", error);
      return res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/deleteCommentPage', async (req, res) => {
  const { folderId, projectID } = req.body;

  try {
      // const comment = await Comments.findOne({'comments.items.id':folderId});
      const comment = await CommentsPage.findOne({'comments.items.id':folderId});

      // const commentw = await Comments.deleteOne({'comments.items.id':comment});

      // await Comments.findByIdAndDelete(comment);

      // const comment = await Comments.updateOne(
      //   { _id : projectID },
      //   {$pull : {"comments.items.id":folderId}}
      // )

      await CommentsPage.updateOne({"comments.id":projectID},{$pull:{"comments.items":{$in:[folderId]}}})

      await CommentsPage.updateOne({"comments.id":projectID}, {$pull: {"comments.items": folderId}})
      await CommentsPage.updateOne({"comments.id": projectID}, {$pull: {"comments.items": {"id": folderId}}})
      return res.json(folderId);
  } catch (error) {
      console.error("Error deleting gallery item:", error);
      return res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/commentsPage', async (req, res) => {
  try {
    const comments = await CommentsPage.find()

    res.json(comments);
  } catch (error) {
    console.error('Error fetching Comments details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 