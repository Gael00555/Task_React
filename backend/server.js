import express from 'express'
import cors from 'cors'
import { pool } from './db.js'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())


app.get('/tasks', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks ORDER BY id')
        res.json(result.rows)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


app.post('/tasks', async (req, res) => {
    try {
        const {
            projectName, activityType, status, summary, description,
            priority, reporter, assignee, precondition,
            createdDate, closedDate, sprint,
        } = req.body

        if (!projectName) {
            return res.status(400).json({ error: 'El nombre del proyecto es obligatorio' })
        }

        const result = await pool.query(
            `INSERT INTO tasks
             (project_name, activity_type, status, summary, description,
              priority, reporter, assignee, precondition, created_date, closed_date, sprint)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
             RETURNING *`,
            [projectName, activityType, status, summary, description,
             priority, reporter, assignee, precondition, createdDate || null, closedDate || null, sprint]
        )

        res.status(201).json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.put('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params
        const {
            projectName, activityType, status, summary, description,
            priority, reporter, assignee, precondition,
            createdDate, closedDate, sprint,
        } = req.body

        const result = await pool.query(
            `UPDATE tasks
             SET project_name = COALESCE($1, project_name),
                    activity_type = COALESCE($2, activity_type),
                    status = COALESCE($3, status),
                    summary = COALESCE($4, summary),
                    description = COALESCE($5, description),
                    priority = COALESCE($6, priority),
                    reporter = COALESCE($7, reporter),
                    assignee = COALESCE($8, assignee),
                    precondition = COALESCE($9, precondition),
                    created_date = COALESCE($10, created_date),
                    closed_date = COALESCE($11, closed_date),
                    sprint = COALESCE($12, sprint)
             WHERE id = $13
                RETURNING *`,
            [projectName, activityType, status, summary, description,
             priority, reporter, assignee, precondition, createdDate || null, closedDate || null, sprint, id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' })
        }

        res.json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.patch('/tasks/:id/finish', async (req, res) => {
    try {
        const { id } = req.params

        const result = await pool.query(
            `UPDATE tasks SET status = 'Finalizada' WHERE id = $1 RETURNING *`,
            [id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' })
        }

        res.json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.delete('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query(
            'DELETE FROM tasks WHERE id = $1 RETURNING *',
            [id]
        )

         if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Task not found' })
    }
    res.status(204).send()
    
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
    console.log(`API endpoints available at /tasks`)
})