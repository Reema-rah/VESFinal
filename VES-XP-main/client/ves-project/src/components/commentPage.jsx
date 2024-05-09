import { useState, useRef, useEffect } from "react";
import Action from "./Action";

import { IoTimeSharp } from "react-icons/io5";

import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import { useParams } from "react-router-dom";

const CommentPage = ({
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
  comment,
  customer,
  // user
}) => {
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(true);
  const inputRef = useRef(null);
  const [user, setUser] = useState([]);

  const { id } = useParams();



//   console.log(comment.user)

useEffect(()=>{
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
},[id])
  const username = user[0]?.username
  console.log(username)
  console.log(comment.user)

  useEffect(() => {
    inputRef?.current?.focus();
  }, [editMode]);

  const handleNewComment = () => {
    setExpand(!expand);
    setShowInput(true);
  };

  const onAddComment = () => {
    if (editMode) {
      handleEditNode(comment.id, inputRef?.current?.innerText);
    } else {
      setExpand(true);
      handleInsertNode(comment.id, input);
      setShowInput(false);
      setInput("");
    }

    if (editMode) setEditMode(false);
  };

  const handleDelete = () => {
    handleDeleteNode(comment.id);
  };

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
const userID = window.localStorage.getItem("userID")


  return (
    <div>
      <div className={comment.id === projectID ? "inputContainerP" : "commentContainerP"} style={{backgroundColor: username === comment.user ? "#d3d3d3e0": "floralwhite"}}>

        {/* {( */}
        {comment.id === projectID ? (
        //   (customer?
        //     ""
        //     :
          <>
            <input
              type="text"
              className="inputContainer__inputP first_inputP"
              // autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="type..."
            />

            <Action
              className="replyP commentP"
              type="COMMENT"
              handleClick={onAddComment}
            />
          </>
        //   )
        ) : (
          <>
            <div style={{display:"flex",justifyContent: "space-between"}}>
              <span>{comment.user}</span>
              {/* <span className='text-muted'><IoTimeSharp style={{color: "#6c8b7c"}}/>{timeString}</span> */}
            </div>
            <span
              contentEditable={editMode}
              suppressContentEditableWarning={editMode}
              ref={inputRef}
              style={{ wordWrap: "break-word" }}
            >
              {comment.name}
            </span>

            <div style={{ display: "flex", marginTop: "5px" }}>
              {editMode? (
                <>
                  <Action
                    className="replyP"
                    type="SAVE"
                    handleClick={onAddComment}
                  />
                  <Action
                    className="replyP"
                    type="CANCEL"
                    handleClick={() => {
                      if (inputRef.current)
                        inputRef.current.innerText = comment.name ;
                      setEditMode(false);
                    }}
                  />
                </>
              ) : (
                <>
                    <Action
                    className="replyP"
                    type={
                        <>
                        {expand ? (
                            <IoIosArrowUp width="10px" height="10px" />
                        ) : (
                            <IoIosArrowDown width="10px" height="10px" />
                        )}{" "}
                        REPLY
                        </>
                    } 
                    handleClick={handleNewComment}
                    />
                    {username === comment.user?
                    <Action
                    className="replyP"
                    type="DELETE"
                    handleClick={handleDelete}
                    /> : ""
                    }
                </>
                // :
                // ""
              )
              }
            </div>
          </>
        )
        }
      </div>

      <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
        {showInput && (
          <div className="inputContainerP">
            <input
              type="text"
              className="inputContainer__inputP"
              autoFocus
              onChange={(e) => setInput(e.target.value)}
            />
            <Action className="replyP" type="REPLY" handleClick={onAddComment} />
            <Action
              className="replyP"
              type="CANCEL"
              handleClick={() => {
                setShowInput(false);
                if (!comment?.items?.length) setExpand(false);
              }}
            />
          </div>
        )}

        {comment?.items?.map((cmnt) => {
          return (
            <CommentPage
              key={cmnt.id}
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
              comment={cmnt}
            />
          );
        })}
      </div>
    </div>
  );
};

{/* <Action
                    className="reply"
                    type="EDIT"
                    handleClick={() => {
                      setEditMode(true);
                    }}
                  /> */}

export default CommentPage;