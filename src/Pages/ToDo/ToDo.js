import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ToDo.module.scss'

export default function ToDo() {
  const dispatch = useDispatch();

  const tasks = useSelector(state => state.toDoReducer.tasks)
  const paginator = useSelector(state => state.toDoReducer.paginator)
  const allPages = useSelector(state => state.toDoReducer.allPages)
  const paginationList = useSelector(state => state.toDoReducer.paginationList)
  
  const addPaginationList = () => {
    const newList = paginationList.map((item) => item + 5)
    dispatch({
      type: "CHANGE_PAGINATION_LIST", payload: newList
    })
  }

  const deletePaginationList = () => {
    const newList = paginationList.map((item) => item - 5)
    dispatch({
      type: "CHANGE_PAGINATION_LIST", payload: newList
    })
  }

  const changePaginator = (value) => {
    dispatch({
      type: "CHANGE_PAGINATOR", payload: +value
    })
  }

  return (
    <div className={styles.tasks}>
        <div className={styles.coloredLine}>
          <p className={styles.title}>To do list:</p>
        </div>
        {tasks.map((item, index) =>{
          
          if(index > (paginator * 5 - 5) && index < paginator * 5){
            return (
              <div className={styles.tasksText}>
                <ul>
                  <li>
                    { item.title }
                  </li>
                </ul>
              </div>
            )
          }
        })}
        
        <div className={styles.paginator}>
        {paginationList[0] !== 1 && <p onClick={deletePaginationList}>←</p>}
          {paginationList.map((item, index, arr) => {
            return(
                <p onClick={(event) => changePaginator(event.target.outerText)}>{item}</p>
            )
          })}
          {paginationList[paginationList.length-1] !== allPages && <p onClick={addPaginationList}>→</p>}
        </div>
    </div>
  )
}
