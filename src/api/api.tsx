const API_URL = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_TOKEN;

export const getTasks = async () => {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Erreur lors de la récupération');
  return res.json();
};

export const updateTask = async (task: {
  id: number;
  name: string;
  state: boolean;
}): Promise<void> => {
  const res = await fetch(`${API_URL}/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Erreur lors de la mise à jour');
  return res.json();
};

export const addTask = async (task: {
  name: string;
  date: string;
}): Promise<void> => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Erreur lors de l'ajout");
  return res.json();
};

export const deletedTask = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(id),
  });
  if (!res.ok) throw new Error('Erreur lors de la suppression');
  return res.json();
};
