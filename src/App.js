import Home from './Pages/Home/Home';
import ToDo from './Pages/ToDo/ToDo';
import Navbar from './Components/Navbar/Navbar';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

function App() {

    const dispatch = useDispatch();

    const tasks = useSelector(state => state.toDoReducer.tasks)

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(res => res.json())
            .then(res => {
                const newData = res.map((item) => {
                    return {...item, edit: false}
                })
                dispatch({type: 'ADD_TASK', payload: newData})
                dispatch({type: 'ADD_PAGES', payload: res.length / 5})
            })
    }, [])

    useEffect(() => {
        dispatch({type: 'ADD_PAGES', payload: Math.ceil(tasks.length / 5)})
    }, [tasks])

    return (
        <div className="App">
            <Navbar/>

            <Routes>
                <Route path="/" exact element={<Home/>}/>
                <Route path="/todo" element={<ToDo/>}/>
            </Routes>
        </div>
    );
}

export default App;
