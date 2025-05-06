import Mousetrap from 'mousetrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import io from 'socket.io-client';

const socket = io('http://82.66.132.73:5000');

type TaskData = {
  name: string;
  state: boolean;
  id: number;
};

const AddElement = () => {
  const navigate = useNavigate();
  const [label, setLabel] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState<TaskData[]>([]);
  const token = import.meta.env.VITE_TOKEN;

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch('http://82.66.132.73:5000/tasks', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setData(data);
      } catch (e) {
        console.error(e);
      }
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit() {
    try {
      if (!label) {
        setError('Il faut rentrer au moins 1 mot quand même');
        return;
      }
      async function sendData() {
        const res = await fetch('http://82.66.132.73:5000/tasks', {
          method: 'POST',
          body: JSON.stringify({ name: label }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const newData = await res.json();
        socket.emit('task_added', newData);
      }
      sendData();
      setSuccess("C'est envoyé !");
      setError('');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (e) {
      console.error('Erreur lors de la récupération des données : ', e);
    }
  }
  useEffect(() => {
    Mousetrap.bind('b a c k', () => {
      navigate('/');
    });
  });

  const shake = {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 },
  };
  return (
    <div className="bg-background h-screen flex items-center justify-center gap-8">
      {/* Ajout d'élément */}
      <div className="flex items-center justify-center">
        <div className="font-PeachCake">
          <p className="text-maincolor text-6xl text-center">
            Ajouter un élément
          </p>
          <div className="mx-auto mt-4">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white text-2xl">
              Chose à faire
            </label>
            <motion.input
              type="text"
              id="first_name"
              animate={
                error == 'Il faut rentrer au moins 1 mot quand même'
                  ? shake
                  : {}
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Faire la vaisselle"
              onChange={(e) => {
                setLabel(e.target.value);
              }}
              required
            />
            <p className="text-green-600">{success && success}</p>
            <p className="text-red-600">{error && error}</p>
            <div className="flex justify-center items-center">
              <button
                className="bg-maincolor text-textlist px-4 py-2 rounded-md text-2xl mt-4 w-full"
                type="submit"
                onClick={handleSubmit}
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* divider */}
      <div className="bg-maincolor w-1.5 h-[40%] rounded-lg"></div>
      {/* Liste éléments */}
      <div className="font-PeachCake">
        {data
          ? data.map((task) => {
              return (
                <div key={task.id}>
                  {!task.state && (
                    <div className="bg-maincolor p-4 mx-6 mt-4 rounded-md justify-between flex">
                      <p className="text-4xl w-[70%]">{task.name}</p>
                      <button>
                        <img
                          src="../check.png"
                          alt="logo check"
                          className="w-8 h-8"
                        />
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          : ''}
      </div>
    </div>
  );
};
export default AddElement;
