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
import DevSecOpsChooseTech from './pages/DevSecOps/ChooseTech';
import DevSecOpsListTech from './pages/DevSecOps/DevSecOpsListTech';
import DevSecOpsTech from './pages/DevSecOps/TechContainer';


export default function App() {
  return (
    <AuthContextProvider>
      <Theme>
        <TopBar />
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route path="/start-threat-modelling" element={<Protected><StartThreatModelling /></Protected>} />
          <Route path="/dev-sec-ops-tech" element={<Protected><DevSecOpsTech /></Protected>} />
          <Route path="/dev-sec-ops-list-tech" element={<Protected><DevSecOpsListTech /></Protected>} />
          <Route path="/choose-tech-dev-sec-ops" element={<Protected><DevSecOpsChooseTech /></Protected>} />
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