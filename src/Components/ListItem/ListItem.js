import React from 'react';
import style from './ListItem.module.scss'

const ListItem = (props) => {
    return (
        <div className={style.ListItem}>
            {props.edit
                ? <input type="text" value={props.text} onChange={(event) => props.changeTask(props.id, event.target.value)}/>
                : <p>{props.text}</p>}


            <div className={style.BtnBlock}>
                <button onClick={() => props.editTask(props.id)}>Edit</button>
                <button onClick={() => props.deleteTask(props.id)}>Delete</button>
            </div>
        </div>
    );
};

export default ListItem;
