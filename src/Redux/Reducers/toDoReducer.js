let defaultStore = {
    tasks: [],
    paginator: 1,
    allPages: 0,
    paginationList: [1, 2, 3, 4, 5],
    newTask: false,
    currentValue: '',
}

export const toDoReducer = (state = defaultStore, action) => {
    switch (action.type) {
        case "ADD_TASK":
            return {...state, tasks: action.payload}
        case "ADD_PAGES":
            return {...state, allPages: action.payload}
        case "CHANGE_PAGINATION_LIST":
            return {...state, paginationList: action.payload}
        case "CHANGE_PAGINATOR":
            return {...state, paginator: action.payload}
        case "DELETE_TASK": {
            const copyState = [...state.tasks]
            const index = copyState.findIndex((item) => item.id === action.payload)
            copyState.splice(index, 1)
            return {...state, tasks: copyState}
        }
        case "EDIT_TASK": {
            const copyState = [...state.tasks]
            const index = copyState.findIndex((item) => item.id === action.payload)
            copyState[index].edit = !copyState[index].edit
            return {...state, tasks: copyState}
        }
        case "CHANGE_TASK": {
            const copyState = [...state.tasks]
            const index = copyState.findIndex((item) => item.id === action.payload.id)
            copyState[index].title = action.payload.value
            return {...state, tasks: copyState}
        }

        case "CHANGE_NEW_TASK_VALUE": {
            return {...state, newTask: !state.newTask}
        }
        case "CREATE_NEW_TASK": {
            const copyState = [...state.tasks]
            copyState.unshift({
                userId: state.tasks.length + 1,
                id: state.tasks.length + 1,
                title: state.currentValue,
                completed: false,
                edit: false
            })
            return {...state, tasks: copyState, currentValue: '', newTask: false}
        }
        case "CHANGE_CURRENT_VALUE": {
            return {...state, currentValue: action.payload}
        }
        default:
            return {...state}
    }
}
