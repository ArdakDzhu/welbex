let defaultStore ={
 tasks: [],
 paginator: 1,
 allPages: 0,
 paginationList: [1, 2, 3, 4, 5]
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
        default:
            return {...state}
    }
}