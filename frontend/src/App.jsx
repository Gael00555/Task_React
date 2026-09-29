import { useState, useEffect } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(null)

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:4000/tasks')
    const data = await response.json()
    setTasks(data)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <div className="app">
      <h1>Gestor de Tareas</h1>
      <TaskForm
    key={editingTask ? editingTask.id : 'new'}
    onTaskCreated={fetchTasks}
    editingTask={editingTask}
    setEditingTask={setEditingTask}
  />
      <TaskList
        tasks={tasks}
        onTaskChanged={fetchTasks}
        onEdit={setEditingTask}
      />
    </div>
  )
}

export default App