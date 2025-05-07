import { useEffect, useState } from 'react';
import { deletedTask, getTasks, updateTask } from '../api/api';
import io from 'socket.io-client';

type TaskType = {
  name: string;
  state: boolean;
  id: number;
  date: Date;
};

const socket = io('http://82.66.132.73:5000');

const Tasks = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Récupération des données
  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch(() => setError('Erreur lors du chargement'))
      .finally(() => setLoading(false));

    const handleTaskAdded = (addedTask: TaskType) => {
      setTasks((prevTasks) => {
        const alreadyExists = prevTasks.some(
          (task) => task.id === addedTask.id
        );
        if (alreadyExists) return prevTasks;
        return [...prevTasks, addedTask];
      });
    };
    socket.on('task_added', handleTaskAdded);

    const handleTaskChecked = (checkedTask: TaskType) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === checkedTask.id ? checkedTask : task
        )
      );
    };
    socket.on('task_checked', handleTaskChecked);

    const handleTaskDeleted = (deletedTask: TaskType) => {
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== deletedTask.id)
      );
    };
    socket.on('task_deleted', handleTaskDeleted);

    // Cleanup
    return () => {
      socket.off('task_added', handleTaskAdded);
      socket.off('task_checked', handleTaskChecked);
      socket.off('task_deleted', handleTaskDeleted);
    };
  }, []);

  const handleCheck = async (id: number, name: string) => {
    const updatedTask = { id, name, state: true };
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, state: true } : t))
    );

    try {
      await updateTask({ id, name, state: true });
      socket.emit('task_checked', updatedTask);
    } catch {
      setError('Erreur lors de la mise à jour');
    }
  };

  const handleDelete = async (id: number) => {
    await deletedTask(id);
    socket.emit('task_deleted', { id });
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  const handleReload = () => {
    window.location.reload();
  };
  return (
    <div className="font-peach w-[50%] mt-16">
      <h1 className="text-maincolor font-bold text-5xl text-center">
        <button onClick={handleReload}>CHECKLIST</button>
      </h1>

      {/* card */}
      <div className="mt-12 max-h-[350px] overflow-y-auto pr-2 no-scrollbar">
        <p className="text-red-600">{error && error}</p>
        {[...tasks]
          .sort((a, b) => Number(a.state) - Number(b.state))
          .map((task) => (
            <div key={task.id}>
              {task.state ? (
                <div className="bg-textlist p-4 mx-6 mt-4 rounded-md justify-between flex">
                  <p className="text-4xl w-[70%]">{task.name}</p>
                  <button
                    className="bg-amber-400 text-white px-4 py-2 rounded-md"
                    onClick={() => handleDelete(task.id)}
                  >
                    Supprimer
                  </button>
                </div>
              ) : (
                <div className="bg-maincolor p-4 mx-6 mt-4 rounded-md justify-between flex">
                  <div className="w-[70%]">
                    <p className="text-4xl text-textlist">{task.name}</p>
                    <p className="text-zinc-700">
                      Doit être fait avant :{' '}
                      {new Date(task.date).toLocaleString('fr-FR', {
                        dateStyle: 'short',
                        timeStyle: 'short',
                      })}
                    </p>
                  </div>
                  <button onClick={() => handleCheck(task.id, task.name)}>
                    <img
                      src="../check.png"
                      alt="logo check"
                      className="w-8 h-8"
                    />
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Tasks;
