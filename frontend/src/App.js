import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import ContactPage from './components/ContactPage/ContactPage';
import LoginPage from './components/Login/LoginPage';
import SignUp from './components/SignUp/SignUp';
import ErrorPage from './components/404Error/ErrorPage';
import Account from './components/Account/Account';
import ProfilePicUpload from './components/ProfilePicUpload/ProfilePicUpload';
import PostShowOne from './components/HomePage/PostShowOne';
import PostImageShow from './components/HomePage/PostImageShow';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/account/:id' element={<Account />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/uploadprofilepic' element={<ProfilePicUpload />} />
        <Route path='/postshowing/:id' element={<PostShowOne />} />
        <Route path='/postImageShow/:id/:image' element={<PostImageShow />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
