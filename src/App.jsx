import {
  Routes,
  Route,
} from 'react-router-dom';

import HomePage from './HomePage';
import Login from './Login';
import Register from './Register';
import Profile  from './Profile';
import AdoptionLists from './AdoptionLists';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/adoptionlists' element={<AdoptionLists/>} />
      </Routes>
    </>
  )
}

export default App
