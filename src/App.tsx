import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddElement from './pages/AddElement';
import { PrimeReactProvider } from 'primereact/api';

function App() {
  return (
    <div>
      <PrimeReactProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AddElement" element={<AddElement />} />
        </Routes>
      </PrimeReactProvider>
    </div>
  );
}

export default App;
