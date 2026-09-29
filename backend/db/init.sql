CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    activity_type VARCHAR(100),
    status VARCHAR(50) DEFAULT 'Pendiente',
    summary VARCHAR(255),
    description TEXT,
    priority VARCHAR(50),
    reporter VARCHAR(255),
    assignee VARCHAR(255),
    precondition TEXT,
    created_date DATE,
    closed_date DATE,
    sprint VARCHAR(100)
);