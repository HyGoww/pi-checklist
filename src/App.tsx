import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddElement from './components/AddElement';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/components/AddElement" element={<AddElement />} />
      </Routes>
    </div>
  );
}

export default App;
