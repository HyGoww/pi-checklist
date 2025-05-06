import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddElement from './pages/AddElement';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AddElement" element={<AddElement />} />
      </Routes>
    </div>
  );
}

export default App;
