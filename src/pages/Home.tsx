import { useEffect } from 'react';

import Mousetrap from 'mousetrap';
import { useNavigate } from 'react-router-dom';
import Tasks from '../components/Tasks';
import Meeting from '../components/Meetings';

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    Mousetrap.bind('m d p', () => {
      navigate('/AddElement');
    });
  });
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
