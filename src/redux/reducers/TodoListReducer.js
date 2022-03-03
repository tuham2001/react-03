import { TodoListDarkTheme } from "../../JSS_StyledComponent/Themes/TodoListDarkTheme"
import { add_task, change_theme, delete_task, done_task, edit_task, update_task } from '../types/TodoListTypes'
import { arrTheme } from "../../JSS_StyledComponent/Themes/ThemeManager"
const initialState = {
  themeTodoList: TodoListDarkTheme,
  taskList: [
    { id: "task-1", taskName: "task 1", done: true },
    { id: "task-2", taskName: "task 2", done: false },
    { id: "task-3", taskName: "task 3", done: true },
    { id: "task-4", taskName: "task 4", done: false }
  ],
  taskEdit: { id: "-1", taskName: "", done: false }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case add_task: {
      //Kiễm tra rỗng
      if (action.newTask.taskName.trim() === '') {
        alert('Task name is required!')
        return { ...state }
      }
      //Kiểm tra tồn tại
      let taskListUpdate = [...state.taskList]
      let index = taskListUpdate.findIndex(task => task.taskName === action.newTask.taskName)
      if (index !== -1) {
        alert('Task name already exist')
        return { ...state }
      }
      taskListUpdate.push(action.newTask)
      //Xử lý xong thì gán task list mới vào task list
      state.taskList = taskListUpdate
      return { ...state }
    }
    case change_theme: {
      // eslint-disable-next-line eqeqeq
      let theme = arrTheme.find(theme => theme.id == action.themeId)
      if (theme) {
        state.themeTodoList = { ...theme.theme }
      }
      return { ...state }
    }
    case done_task: {
      //Click vào button check => dispatch lên action có taskId
      let taskListUpdate = [...state.taskList]
      //Từ task id tìm ra task đó ở vị trí nào trong mảng tiến hành cập nhật lại thuôc tính done = true. và cập nhật lại state của redux
      let index = taskListUpdate.findIndex(task => task.id === action.taskId)
      if (index !== -1) {
        taskListUpdate[index].done = true
      }
      //state.taskList = taskListUpdate
      return { ...state, taskList: taskListUpdate }
    }

    case delete_task: {
      // let taskListUpdate = [...state.taskList]
      // //Gán lại giá trị cho mang taskListUpdate = chính nó nhưng filter không có taskId đó
      // taskListUpdate = taskListUpdate.filter(task => task.id !== action.taskId)
      // return { ...state, taskList: taskListUpdate }
      return { ...state, taskList: state.taskList.filter(task => task.id !== action.taskId) }
    }

    case edit_task: {
      return { ...state, taskEdit: action.task }
    }

    case update_task: {
      //Chỉnh sửa lại taskName của taskEdit
      state.taskEdit = { ...state.taskEdit, taskName: action.taskName }
      //Tìm trong taskList cập nhật lại taskEdit người dùng update
      let taskListUpdate = [...state.taskList]
      let index = taskListUpdate.findIndex(task => task.id === state.taskEdit.id)
      if (index !== -1) {
        taskListUpdate[index] = state.taskEdit
      }
      state.taskList = taskListUpdate
      state.taskEdit = { id: '-1', taskName: '', done: false }
      return { ...state }
    }
    default: return { ...state }
  }
}
