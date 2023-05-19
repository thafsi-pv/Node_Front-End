import "./UserList.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const NodeUserList = () => {
  const [userList, setUserList] = useState([{}]);
  const [userDetails, setUserDetails] = useState({ name: "", email: "" });
  const olRef = useRef(null);

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    const data = await axios("http://localhost:3005/userlist");
    setUserList(data?.data);
  };

  const addNewUser = async (e) => {
    e.preventDefault();
    try {
      if (userDetails.name != "") {
        await axios.post("http://localhost:3005/adduser", userDetails);
        console.log("User details submitted successfully!");
        setUserDetails({ name: "", email: "" });
        getUserList();
        if (olRef.current) {
            olRef.current.scrollTop = olRef.current.scrollHeight;
          }
      }
    } catch (error) {
      console.error("Error submitting user details:", error);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setUserDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="container">
      <div className="counter-container">
        <form onSubmit={(e) => addNewUser(e)} className="node-input-container">
          <div className="input">
            <label htmlFor="">Name</label>
            <input
              type="text"
              value={userDetails.name}
              name="name"
              id=""
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="input">
            <label htmlFor="">Email</label>
            <input
              type="email"
              value={userDetails.email}
              name="email"
              id=""
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <button type="submit">Add New User</button>
          </div>
        </form>
        <ol ref={olRef}>
          {userList.map((user, key) => {
            return (
              <li key={key}>
                <div className="user">
                  <p>Name:{user.name}</p>
                  <p> Email:{user.email}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default NodeUserList;
