const formatDate = (date) => (date ? date.slice(0, 10) : '')

function TaskList({ tasks, onTaskChanged, onEdit }) {
  const handleDelete = async (id) => {

    try {
      const response = await fetch(`http://localhost:4000/tasks/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Error al eliminar la tarea')
      }

      onTaskChanged()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleFinish = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/tasks/${id}/finish`, {
        method: 'PATCH',
      })

      if (!response.ok) {
        throw new Error('Error al finalizar la tarea')
      }

      onTaskChanged()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <section className="card">
      <h2>Listado de Tareas</h2>

      <div className="table-wrap">
        <table className="task-table">
          <thead>
            <tr>
              <th>Proyecto</th>
              <th>Tipo de Actividad</th>
              <th>Estado</th>
              <th>Resumen</th>
              <th>Descripción</th>
              <th>Prioridad</th>
              <th>Informador</th>
              <th>Persona asignada</th>
              <th>Precondición</th>
              <th>Fecha de Creación</th>
              <th>Fecha de Cierre</th>
              <th>Sprint</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 && (
              <tr>
                <td colSpan={13} className="empty">
                  Todavía no hay tareas. Crea la primera con el formulario.
                </td>
              </tr>
            )}
            {tasks.map((task) => (
              <tr key={task.id}>
                <td className="strong">{task.project_name}</td>
                <td>{task.activity_type}</td>
                <td>
                  <span
                    className={
                      task.status === 'Finalizada' ? 'badge badge--done' : 'badge'
                    }
                  >
                    {task.status}
                  </span>
                </td>
                <td>{task.summary}</td>
                <td className="long">{task.description}</td>
                <td>{task.priority}</td>
                <td>{task.reporter}</td>
                <td>{task.assignee}</td>
                <td className="long">{task.precondition}</td>
                <td className="nowrap">{formatDate(task.created_date)}</td>
                <td className="nowrap">{formatDate(task.closed_date)}</td>
                <td>{task.sprint}</td>
                <td>
                  <div className="row-actions">
                    <button className="btn btn--sm btn--ghost" onClick={() => onEdit(task)}>
                      Editar
                    </button>
                    <button className="btn btn--sm btn--success" onClick={() => handleFinish(task.id)}>
                      Finalizar
                    </button>
                    <button className="btn btn--sm btn--danger" onClick={() => handleDelete(task.id)}>
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default TaskList