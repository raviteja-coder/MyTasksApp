import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTasks extends Component {
  state = {
    tasksList: [],
    activeTag: null, // No active tag initially
    task: '',
    selectedTag: tagsList[0].optionId, // Default selected tag for the form
  }

  onChangeSelect = event => {
    this.setState({selectedTag: event.target.value})
  }

  onChangeTask = event => {
    this.setState({task: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {task, selectedTag} = this.state
    if (task.trim() === '') return
    const newTask = {
      id: uuidv4(),
      task,
      selectedTag,
    }
    this.setState(prevState => ({
      tasksList: [...prevState.tasksList, newTask],
      task: '',
      selectedTag: tagsList[0].optionId,
    }))
  }

  onClickTagBtn = tagId => {
    this.setState(prevState => ({
      activeTag: prevState.activeTag === tagId ? null : tagId,
    }))
  }

  render() {
    const {tasksList, activeTag, task, selectedTag} = this.state
    const filteredTasksList = activeTag
      ? tasksList.filter(eachTask => eachTask.selectedTag === activeTag)
      : tasksList

    return (
      <div className="app-container">
        <div className="form-container">
          <h1 className="heading">Create a task!</h1>
          <form onSubmit={this.onSubmitForm} className="form">
            <label htmlFor="task" className="label">
              Task
            </label>
            <input
              id="task"
              className="input"
              value={task}
              onChange={this.onChangeTask}
              type="text"
              placeholder="Enter the task here"
            />

            <label className="label" htmlFor="tags">
              Tags
            </label>
            <select
              className="select"
              id="tags"
              value={selectedTag}
              onChange={this.onChangeSelect}
            >
              {tagsList.map(tag => (
                <option key={tag.optionId} value={tag.optionId}>
                  {tag.displayText}
                </option>
              ))}
            </select>
            <div className="button-container">
              <button className="add-btn" type="submit">
                Add Task
              </button>
            </div>
          </form>
        </div>
        <div className="tasks-container">
          <h1 className="heading1">Tags</h1>
          <ul className="tags-lists">
            {tagsList.map(eachTag => (
              <li className="list" key={eachTag.optionId}>
                <button
                  onClick={() => this.onClickTagBtn(eachTag.optionId)}
                  className={`tag-button ${
                    eachTag.optionId === activeTag ? 'active-tag' : ''
                  }`}
                  type="button"
                >
                  {eachTag.displayText}
                </button>
              </li>
            ))}
          </ul>
          <h1 className="heading1">Tasks</h1>
          {filteredTasksList.length === 0 ? (
            <p className="no-tasks">No Tasks Added Yet</p>
          ) : (
            <ul className="tasks-lists">
              {filteredTasksList.map(eachTask => (
                <li key={eachTask.id} className="task-list">
                  <p className="task">{eachTask.task}</p>
                  <p className="tag">{eachTask.selectedTag}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default MyTasks
