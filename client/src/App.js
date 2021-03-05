import React, { useEffect, useState } from "react";
import Axios from "axios";
import './App.css';

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [listOfFriend, setListOfFriend] = useState([]);

  const addFriend = () =>{
    Axios.post("http://localhost:3001/addFriend", 
    { 
      name:name, 
      age: age
    })
      .then(() => {
        setListOfFriend([...listOfFriend, {name: name, age: age}]);
      })
    
  };
  const updateFriend = (id) =>{
    const newAge = prompt("Enter new age:");

    Axios.put("http://localhost:3001/update", {newAge: newAge, id: id})
      .then(() => {
        setListOfFriend(listOfFriend.map((value) => {
          return value._id === id ? {_id: id, name: value.name, age: newAge} : value;
        }));
      })
  };
  const deleteFriend = (id) =>{
    Axios.delete(`http://localhost:3001/delete/${id}`)
      .then(() =>{
        setListOfFriend(listOfFriend.filter((value) =>{
          return value._id !== id;
        }))
      })
  }
  useEffect(() => {
    Axios.get("http://localhost:3001/read")
    .then((response) => {
      setListOfFriend(response.data);
    })
    .catch(() => {
      console.log("ERROR")
    });
}, [])

  return (
    <div className="App">
      <div className="input"> 
        <input 
          type="text" 
          placeholder ="Friend name..."
          onChange={(event) => setName(event.target.value)} />
        <input 
          type="number"
          placeholder ="Friend age..."
          onChange={(event) => setAge(event.target.value)} />
      <button onClick={addFriend}>Add Friend</button>
      </div>
    <div className="listOfFriends">
        {listOfFriend.map((value) => {
          return (
            <div key={value._id} className="friendContainer">
              <div  className="friend">
                <h3>Name: {value.name}</h3>
                <h3>Age: {value.age}</h3>
              </div>
              <button onClick={() =>{
                updateFriend(value._id);
              }}>Update</button>
              <button onClick={() =>{
                deleteFriend(value._id);
              }}>X</button>
            </div>
          )
        })}
    </div>
    </div>
  );
}

export default App;
