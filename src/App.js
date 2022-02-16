import Home from './Pages/Home';
import ToDo from './Pages/ToDo/ToDo';
import Navbar from './Components/Navbar';
import './App.css';
import {  Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(res => res.json())
    .then(res => {
      dispatch({type: 'ADD_TASK',payload: res })
      dispatch({type: 'ADD_PAGES',payload: res.length / 5 })
    })
  },[])

  return (
    <div className="App">
      <Navbar />
      
      <Routes>
        <Route path="/" exact element={<Home/>}/>
        <Route path="/todo" element={<ToDo/>}/>
      </Routes>
    </div>
  );
}
export default App;
