import Header from './components/Header/Header';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './features/auth/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import { Profile } from './pages/Profile/profile';
import { AuthProvider } from './features/AuthProvider';
import { Register } from './pages/Register/register';
import { UserProfile } from './pages/UserProfiles/userProfiles';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <Header />

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/user/:id" element={<UserProfile />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
