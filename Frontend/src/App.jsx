import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import HomePage from './pages/Home';
import ProtectedRoute from './component/ProtectedRoute';
import CreatePost from './pages/CreatePost';
import DisplayHouse from './pages/DisplayHouse';
import PaymentPage from './pages/PaymentPage';
import { AuthProvider } from '../context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/createpost" element={<ProtectedRoute component={CreatePost} />} />
        <Route path='/houses' element={<DisplayHouse/>}/>
        <Route path='/payment' element={<PaymentPage/>}/>
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;
