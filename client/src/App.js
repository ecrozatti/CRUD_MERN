import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [foodName, setFoodName] = useState('');
  const [newFoodName, setNewFoodName] = useState('');
  const [days, setDays] = useState(0);
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3333/read').then((response) => {
      setFoodList(response.data);
    });
  }, [foodList]);

  const addToList = () => {
    Axios.post('http://localhost:3333/insert', {
      foodName,
      days
    });
  }

  const updateFood = (id) => {
    Axios.put('http://localhost:3333/update', {
      id,
      newFoodName
    });
  }

  const deleteFood = (id) => {
    Axios.delete(`http://localhost:3333/delete/${id}`);
  }

  return (
    <div className="App">
      <h1>CRUD App with MERN</h1>
      <h4>MongoDB, Express, ReactJS and Node.js</h4>

      <label>Food Name</label>
      <input type='text' onChange={(e) => {
        setFoodName(e.target.value);
      }}/>
      <label>Days since you ate it</label>
      <input type='number' onChange={(e) => {
        setDays(e.target.value);
      }}/>
      <button onClick={addToList}>Add to List</button>

      <h1>Food List</h1>

      {foodList.map((value, key) => {
        return(
          <div key={key} className='food'>
            <h2>{value.foodName}</h2>
            <h2>{value.daysSinceIAte}</h2>
            <input type='text' placeholder='New food name...' onChange={(e) => {
              setNewFoodName(e.target.value);
            }}/>
            <button onClick={() => updateFood(value._id)}>Update</button>
            <button onClick={() => deleteFood(value._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
