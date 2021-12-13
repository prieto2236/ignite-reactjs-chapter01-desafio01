import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    //Verifica se título está preenchido
    if (newTaskTitle) {
      //Cria nova tarefa
      const newTask = {
        id: Math.random(),
        title: newTaskTitle,
        isComplete: false
      }

      //faz merge das tarefas antigas com a nova
      setTasks([...tasks, newTask])

      //zera valor do campo de título
      setNewTaskTitle('')
    }
  }

  function handleToggleTaskCompletion(id: number) {
    //Percorre tarefas
    const tasksUpdated = tasks.map(t => {
      //Verifica se é a tarefa do ID
      if (t.id === id) {
        //Altera flag para contrário do atual
        t.isComplete = !t.isComplete
      }

      return t
    })

    //Atualiza lista de tarefas
    setTasks(tasksUpdated)
  }

  function handleRemoveTask(id: number) {
    //Filtra tarefas que não contenham a do ID
    const tasksUpdated = tasks.filter(t => t.id !== id)

    //Atualiza lista de tarefas
    setTasks(tasksUpdated)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}