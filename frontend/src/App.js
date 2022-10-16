import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/Login/Login';

import './App.css'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
