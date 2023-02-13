import './App.css';
import TopBar from './pages/TopBar';
import Footer from './pages/Footer';

import ReactDOM from "react-dom/client";
import Signin from './pages/Signin';
import Loading from './pages/Loading';
import Protected from './components/Protected';
import { AuthContextProvider } from './context/AuthContext';
import { Theme } from './components/Theme'
import Error from './pages/Error'
import {
  // eslint-disable-next-line
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ReviewDeveloperThreats from './pages/DevSecOps/ReviewDeveloperThreats';
import StartThreatModelling from './pages/StartThreatModelling';
import ChooseTech from './pages/DevSecOps/ChooseTech';
import ChooseSecurity from './pages/DevSecOps/ChooseSecurity';


export default function App() {
  return (
    <AuthContextProvider>
      <Theme>
        <TopBar />
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route path="/start-threat-modelling" element={<Protected><StartThreatModelling /></Protected>} />
          <Route path="/choose-tech" element={<Protected><ChooseTech /></Protected>} />
          <Route path="/choose-security" element={<Protected><ChooseSecurity /></Protected>} />
          <Route path="/review-developer-threats" element={<Protected><ReviewDeveloperThreats /></Protected>} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/error' element={<Error />} />

          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
        </Theme>
    </AuthContextProvider>

  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);