import {  BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import SignUp from './pages/signup.page';
import SignIn from './pages/signin';
import Home from './pages/home';
import KanbanBoard from './pages/KanbanBoard';
import DragDropContext from './DragDropContext';

const App = () => (
  <DragDropContext>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/kanban" element={<KanbanBoard />} />
      </Routes>
    </Router>
  </DragDropContext>
);


export default App;
