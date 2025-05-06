import { useEffect, useState } from 'react';
import { getTasks, updateTask } from '../api/api';

type TaskType = {
  name: string;
  state: boolean;
  id: number;
};

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
  }, []);

  const handleCheck = async (id: number, name: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, state: true } : t))
    );
    try {
      await updateTask({ id, name, state: true });
    } catch {
      setError('Erreur lors de la mise à jour');
    }
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="font-peach w-[50%] mt-16">
      <h1 className="text-maincolor font-bold text-5xl text-center">
        CHECKLIST
      </h1>
      {/* card */}
      <div className="mt-12 max-h-[500px] overflow-y-auto pr-2 no-scrollbar">
        <p className="text-red-600">{error && error}</p>
        {[...tasks]
          .sort((a, b) => Number(a.state) - Number(b.state))
          .map((task) => (
            <div key={task.id}>
              {task.state ? (
                <div className="bg-textlist p-4 mx-6 mt-4 rounded-md justify-between flex-col">
                  <p className="text-4xl w-[70%]">{task.name}</p>
                </div>
              ) : (
                <div className="bg-maincolor p-4 mx-6 mt-4 rounded-md justify-between flex">
                  <div className="w-[70%]">
                    <p className="text-4xl">{task.name}</p>
                    <p className="text-zinc-700">Doit être fait avant :</p>
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
