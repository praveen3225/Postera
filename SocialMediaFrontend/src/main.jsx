import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CreateAccount from './CreateAccount'
import App from './App'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import CreateProfile from './CreateProfile'
import ForgotPassword from './ForgotPassword'
import MainScreen from './MainScreen'
import CreatePost from './CreatePost'
import ProfilePage from './ProfilePage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<App></App>}></Route>
          <Route path="/create-account" element={<CreateAccount></CreateAccount>}></Route>
          <Route path="/create-profile" element={<CreateProfile></CreateProfile>}></Route>
          <Route path="/forgot-password" element={<ForgotPassword></ForgotPassword>}></Route>
          <Route path="/home" element={<MainScreen></MainScreen>}></Route>
          <Route path="/create-post" element={<CreatePost></CreatePost>}></Route>
          <Route path="/profile/:profile_name" element={<ProfilePage></ProfilePage>}></Route>
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)
