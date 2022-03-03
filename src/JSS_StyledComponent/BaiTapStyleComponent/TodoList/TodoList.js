import React, { Component } from 'react';
import { Container } from '../../ComponentTodoList/Container';
import { ThemeProvider } from 'styled-components'
import { Dropdown } from '../../ComponentTodoList/Dropdown'
import { Heading3 } from '../../ComponentTodoList/Heading'
import { TextField } from '../../ComponentTodoList/TextField';
import { Button } from '../../ComponentTodoList/Button';
import { Table, Tr, Th, Thead } from '../../ComponentTodoList/Table'
import { connect } from 'react-redux'
import { addTaskAction, changeThemeAction, doneTaskAction, deleteTaskAction, editTaskAction, updateTaskAction } from '../../../redux/actions/TodoListActions';
import { arrTheme } from '../../Themes/ThemeManager'
class TodoList extends Component {

  state = {
    taskName: '',
    disabled: true
  }

  renderTaskTodo = () => {
    return this.props.taskList.filter(task => !task.done).map((task, index) => {
      return <Tr key={index}>
        <Th style={{ verticalAlign: 'middle' }}>{task.taskName}</Th>
        <Th className='text-right'>
          <Button onClick={() => {
            this.setState({
              disabled: false
            }, () => {
              this.props.dispatch(editTaskAction(task))
            })
          }} className="ml-1"><i className='fa fa-edit'></i></Button>

          <Button onClick={() => {
            this.props.dispatch(doneTaskAction(task.id))
          }} className="ml-1"><i className='fa fa-check'></i></Button>

          <Button onClick={() => {
            this.props.dispatch(deleteTaskAction(task.id))
          }} className="ml-1"><i className='fa fa-trash'></i></Button>
        </Th>
      </Tr>
    })
  }

  renderTaskCompleted = () => {
    return this.props.taskList.filter(task => task.done).map((task, index) => {
      return <Tr key={index}>
        <Th style={{ verticalAlign: 'middle' }}>{task.taskName}</Th>
        <Th className='text-right'>
          <Button onClick={() => {
            this.props.dispatch(deleteTaskAction(task.id))
          }} className="ml-1"><i className='fa fa-trash'></i></Button>
        </Th>
      </Tr>
    })
  }

  // handleChange = (e) => {
  //   let {name, value} = e.target.value
  //   this.setState({
  //     [name]:value
  //   })
  // }

  //Viêt hàm render theme import ThemeManager
  renderTheme = () => {
    return arrTheme.map((theme, index) => {
      return <option key={index} value={theme.id}>{theme.name}</option>
    })
  }

  //Life cycle bảng 16 nhận vào props mới được thực thi trước render
  // componentWillReceiveProps(newProps) {
  //   this.setState({
  //     taskName: newProps.taskEdit.taskName
  //   })
  // }

  // //Lifecycle tĩnh không truy xuất được trỏ this
  // static getDerivedStateFromProps(newProps, currentState) {
  //   //newProps là props mới, props cũ là this.props(không truy xuất được)
  //   //currentState ứng với state hiện tại this.state
  //   //hoặc trả về state mới(this.state)
  //   let newState = { ...currentState, taskName: newProps.taskEdit.taskName }
  //   return newState
  //   //Trả về null state giữ nguyên
  //   //return null
  // }

  render() {
    return (
      <ThemeProvider theme={this.props.themeTodoList}>
        <Container className='w-50'>
          <Dropdown onChange={(e) => {
            let { value } = e.target
            //dispatch value lên reducer
            this.props.dispatch(changeThemeAction(value))
          }}>
            {this.renderTheme()}
          </Dropdown>
          <Heading3>To do list</Heading3>
          <TextField value={this.state.taskName} onChange={(e) => {
            this.setState({
              taskName: e.target.value
            })
          }} label='task name' className='w-50' />
          <Button onClick={() => {
            //Lấy thông tin người dùng nhập vào từ input
            let { taskName } = this.state
            //Tạo ra 1 task object 
            let newTask = {
              id: Date.now(),
              taskName: taskName,
              done: false,
            }
            //Đưa task object lên redux thông qua phương thức dispatch
            this.props.dispatch(addTaskAction(newTask))
          }} className='ml-2'><i className='fa fa-plus'></i>Add task</Button>
          {
            this.state.disabled ? <Button disabled onClick={() => { this.props.dispatch(updateTaskAction(this.state.taskName)) }} className='ml-2'><i className='fa fa-upload'></i>Update task</Button> :
              <Button onClick={() => {
                let { taskName } = this.state
                this.setState({
                  disabled: true,
                  taskName: ''
                }, () => {
                  this.props.dispatch(updateTaskAction(taskName))
                })
              }} className='ml-2'><i className='fa fa-upload'></i>Update task</Button>
          }

          <hr />
          <Heading3>Task to do</Heading3>
          <Table>
            <Thead>
              {this.renderTaskTodo()}
            </Thead>
          </Table>
          <Heading3>Task completed</Heading3>
          <Table>
            <Thead>
              {this.renderTaskCompleted()}
            </Thead>
          </Table>
        </Container>
      </ThemeProvider>
    );
  }

  //Đây là lifecycle trả về props cũ và state cũ của component trước khi render(lifecycle này chạy sau render)
  componentDidUpdate(prevProps, prevState) {
    //So sánh nếu như props trước đó (taskEdit trước mà khác taskEdit hiện tại thì mình mới setState)
    if (prevProps.taskEdit.id !== this.props.taskEdit.id) {
      this.setState({
        taskName: this.props.taskEdit.taskName
      })
    }
  }
}

const mapStateToProps = (state) => {
  return {
    themeTodoList: state.TodoListReducer.themeTodoList,
    taskList: state.TodoListReducer.taskList,
    taskEdit: state.TodoListReducer.taskEdit,
  }
}
export default connect(mapStateToProps)(TodoList);