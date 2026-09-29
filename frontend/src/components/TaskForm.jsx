import { useState } from 'react'

const emptyForm = {
  projectName: '',
  activityType: '',
  status: 'Pendiente',
  summary: '',
  description: '',
  priority: '',
  reporter: '',
  assignee: '',
  precondition: '',
  createdDate: new Date().toISOString().slice(0, 10),
  closedDate: '',
  sprint: '',
}

const taskToForm = (task) => ({
  projectName: task.project_name || '',
  activityType: task.activity_type || '',
  status: task.status || '',
  summary: task.summary || '',
  description: task.description || '',
  priority: task.priority || '',
  reporter: task.reporter || '',
  assignee: task.assignee || '',
  precondition: task.precondition || '',
  createdDate: task.created_date ? task.created_date.slice(0, 10) : '',
  closedDate: task.closed_date ? task.closed_date.slice(0, 10) : '',
  sprint: task.sprint || '',
})

function TaskForm({ onTaskCreated, editingTask, setEditingTask }) {
  const [formData, setFormData] = useState(
    editingTask ? taskToForm(editingTask) : emptyForm
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleCancel = () => {
    setEditingTask(null)
    setFormData(emptyForm)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const isEditing = Boolean(editingTask)
    const url = isEditing
      ? `http://localhost:4000/tasks/${editingTask.id}`
      : 'http://localhost:4000/tasks'

    try {
      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Error al guardar la tarea')
      }

      onTaskCreated()
      setFormData(emptyForm)
      setEditingTask(null)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>{editingTask ? 'Editar tarea' : 'Nueva tarea'}</h2>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="projectName">Nombre del Proyecto</label>
          <input
            id="projectName"
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            required
          />
        </div>

         <div className="field">
          <label htmlFor="activityType">Tipo de Actividad</label>
          <select
            id="activityType"
            name="activityType"
            value={formData.activityType}
            onChange={handleChange}
          >
           <option value="">Seleccionar...</option>
            <option value="Épica">Épica</option>
            <option value="Historia">Historia</option>
            <option value="Tarea">Tarea</option>
            <option value="Subtarea">Subtarea</option>
            <option value="Bug">Bug</option>
            <option value="Mejora">Mejora</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="status">Estado</label>
         <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Pendiente">Pendiente</option>
            <option value="En Progreso">En Progreso</option>
            <option value="Finalizada">Finalizada</option>
          </select>
        </div>
        
        <div className="field field--full">
          <label htmlFor="summary">Resumen</label>
          <input
            id="summary"
            type="text"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
          />
        </div>

        <div className="field field--full">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

       <div className="field">
          <label htmlFor="priority">Prioridad</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="">Seleccionar...</option>
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="reporter">Informador</label>
          <input
            id="reporter"
            type="text"
            name="reporter"
            value={formData.reporter}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label htmlFor="assignee">Persona asignada</label>
          <input
            id="assignee"
            type="text"
            name="assignee"
            value={formData.assignee}
            onChange={handleChange}
          />
        </div>

        <div className="field field--full">
          <label htmlFor="precondition">Precondición</label>
          <textarea
            id="precondition"
            name="precondition"
            value={formData.precondition}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label htmlFor="createdDate">Fecha de Creación</label>
          <input
            id="createdDate"
            type="date"
            name="createdDate"
            value={formData.createdDate}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label htmlFor="closedDate">Fecha de Cierre</label>
          <input
            id="closedDate"
            type="date"
            name="closedDate"
            value={formData.closedDate}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label htmlFor="sprint">Sprint</label>
          <input
            id="sprint"
            type="text"
            name="sprint"
            value={formData.sprint}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-actions">
        {editingTask && (
          <button type="button" className="btn btn--ghost" onClick={handleCancel}>
            Cancelar
          </button>
        )}
        <button type="submit" className="btn btn--primary">
          {editingTask ? 'Guardar Cambios' : 'Crear Tarea'}
        </button>
      </div>
    </form>
  )
}

export default TaskForm