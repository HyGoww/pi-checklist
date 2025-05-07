import { useEffect, lazy } from 'react';
import Mousetrap from 'mousetrap';
import { useNavigate } from 'react-router-dom';

const Tasks = lazy(() => import('../components/Tasks'));
const Meeting = lazy(() => import('../components/Meetings'));

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    Mousetrap.bind('m d p', () => {
      navigate('/components/AddElement');
    });
  }, [navigate]);

  return (
    <div>
      <div className="bg-background h-screen w-full flex">
        <Tasks />
        {/* divider */}
        <div className="bg-maincolor h-[80%] w-1.5 rounded-full mt-16"></div>
        <Meeting />
      </div>
    </div>
  );
}

export default App;
