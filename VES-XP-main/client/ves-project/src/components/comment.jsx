import { useState, useRef, useEffect } from "react";
import Action from "./Action";

import { IoTimeSharp } from "react-icons/io5";

import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

import axios from "axios";
import { useParams } from "react-router-dom";



const Comment = ({
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
  comment,
  // user
}) => {
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(true);
  const inputRef = useRef(null);

  const [customer, setCustomer] = useState([]);

  const { id } = useParams();

  const projectID = window.localStorage.getItem("ProjectID")
  const userID = window.localStorage.getItem("userID")

  useEffect(()=>{
    new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/isCustomer`)
          .then(res => {
            setCustomer(res.data);
            resolve();
          })
          .catch(error => {
            console.error('Error fetching project details:', error);
            reject(error);
          });
      });
    },[id])

    const theOne = customer.filter((c) => {
      return c.idProject === projectID && c.idMember === userID
    })

    const resulte = () => {
      if(theOne[0]?.isCustomer === true){
      return true
      } else if(theOne[0]?.isCustomer === undefined){
      return false
      }
    }

    console.log(resulte())


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

// const projectID = window.localStorage.getItem("ProjectID")


  return (
    <div>
      <div className={comment.id === projectID ? "inputContainer" : "commentContainer"}>

        {/* {( */}
        {comment.id === projectID ? (
          (resulte()?
            ""
            :
          <>
            <input
              type="text"
              className="inputContainer__input first_input"
              // autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="type..."
            />

            <Action
              className="reply comment"
              type="COMMENT"
              disabled={customer? true: false}
              handleClick={onAddComment}
            />
          </>
          )
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
                    className="reply"
                    type="SAVE"
                    handleClick={onAddComment}
                  />
                  <Action
                    className="reply"
                    type="CANCEL"
                    handleClick={() => {
                      if (inputRef.current)
                        inputRef.current.innerText = comment.name ;
                      setEditMode(false);
                    }}
                  />
                </>
                
              ) : (
                  (resulte()? "":
                <>
                  <Action
                    className="reply"
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
                  {/* } */}
                  <Action
                    className="reply"
                    type="DELETE"
                    handleClick={handleDelete}
                  />
                </>
                  )
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
          // (customer? "" :

          <div className="inputContainer">
            <input
              type="text"
              className="inputContainer__input"
              autoFocus
              onChange={(e) => setInput(e.target.value)}
            /> 
            <Action className="reply" type="REPLY" handleClick={onAddComment} />
            <Action
              className="reply"
              type="CANCEL"
              handleClick={() => {
                setShowInput(false);
                if (!comment?.items?.length) setExpand(false);
              }}
            />
          </div>
          // )
        )}

        {comment?.items?.map((cmnt) => {
          return (
            <Comment
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

export default Comment;