import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styles from './ToDo.module.scss'
import ListItem from "../../Components/ListItem/ListItem";

export default function ToDo() {
    const dispatch = useDispatch();

    const tasks = useSelector(state => state.toDoReducer.tasks)
    const paginator = useSelector(state => state.toDoReducer.paginator)
    const allPages = useSelector(state => state.toDoReducer.allPages)
    const paginationList = useSelector(state => state.toDoReducer.paginationList)
    const newTask = useSelector(state => state.toDoReducer.newTask)
    const currentTarget = useSelector(state => state.toDoReducer.currentTarget)

    const addPaginationList = () => {
        const newList = paginationList.map((item) => {
            if ((paginationList[paginationList.length - 1] + 5) < allPages) {
                return item + 5
            } else {
                return item + (allPages % paginationList[paginationList.length - 1])
            }
        })
        dispatch({
            type: "CHANGE_PAGINATION_LIST", payload: newList
        })
    }

    const deletePaginationList = () => {
        const newList = paginationList.map((item) => {
            console.log((paginationList[0]-6) < 5)
            if ((paginationList[0]-6) < 5 && (paginationList[paginationList.length - 1] % 5 !== 0)){
                console.log(paginationList[paginationList.length - 1] % 5)
                return item - (paginationList[paginationList.length - 1] % 5)
            } else {
                return item - 5
            }
            //     console.log(item - (allPages % paginationList[paginationList.length - 1]))
            //     return item - (allPages % paginationList[paginationList.length - 1])
            //
            // } else {
            //     console.log(item - (allPages % paginationList[paginationList.length - 1]))
            // }
        })


        // const newList = paginationList.map((item) => item - 5)
        dispatch({
            type: "CHANGE_PAGINATION_LIST", payload: newList
        })
    }

    const changePaginator = (value) => {
        dispatch({
            type: "CHANGE_PAGINATOR", payload: +value
        })
    }

    const deleteTask = (id) => {
        dispatch({type: 'DELETE_TASK', payload: id})
    }

    const editTask = (id) => {
        dispatch({type: 'EDIT_TASK', payload: id})
    }

    const changeTask = (id, value) => {
        dispatch({type: 'CHANGE_TASK', payload: {id: id, value: value}})
    }

    const changeNewTaskStatus = () => {
        dispatch({type: 'CHANGE_NEW_TASK_VALUE'})
    }

    const changeCurrentValue = (value) => {
        dispatch({type: 'CHANGE_CURRENT_VALUE', payload: value})
    }

    const createNewTask = (value) => {
        dispatch({type: 'CREATE_NEW_TASK'})
    }

    return (
        <div className={styles.tasks}>
            <div className={styles.coloredLine}>
                <p className={styles.title}>To do list:</p>
            </div>

            <div className={styles.tasksText}>
                <button className={styles.addButton} onClick={changeNewTaskStatus}>add new task</button>


                {
                    newTask && (
                        <div className={styles.newTask}>
                            <input type="text" onChange={(event) => changeCurrentValue(event.target.value)}
                                   value={currentTarget}/>
                            <button onClick={createNewTask}>add</button>
                        </div>
                    )}

                <ul>
                    {tasks.map((item, index) => {

                        if (index >= (paginator * 5 - 5) && index < paginator * 5) {
                            return (
                                <li>
                                    <ListItem text={item.title}
                                              id={item.id}
                                              edit={item.edit}
                                              editTask={editTask}
                                              deleteTask={deleteTask}
                                              changeTask={changeTask}
                                    />
                                </li>
                            )
                        }
                    })}
                </ul>
            </div>


            <div className={styles.paginator}>
                {paginationList[0] > 1 && <p onClick={deletePaginationList}>←</p>}
                {paginationList.map((item, index, arr) => {
                    return (
                        <p onClick={(event) => changePaginator(event.target.outerText)}>{item}</p>
                    )
                })}
                {paginationList[paginationList.length - 1] < allPages && <p onClick={addPaginationList}>→</p>}
            </div>
        </div>
    )
}
