import './App.css';
import TopBar from './pages/TopBar';
import Footer from './pages/Footer';

import ChooseAssets from './pages/SecOps/ChooseAssets';
import SecOpsAssetContainer from './pages/SecOps/AssetContainer';
import ReactDOM from "react-dom/client";
import Signin from './pages/Signin';
import Loading from './pages/Loading';
import Protected from './components/Protected';
import { AuthContextProvider } from './context/AuthContext';
import { Theme } from './components/Theme'
import Error from './pages/Error'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import CurrentSecurityMitigations from './pages/SecOps/CurrentSecurityMitigations';
import ReviewThreats from './pages/SecOps/ReviewThreats';
import ReviewDeveloperThreats from './pages/DevSecOps/ReviewDeveloperThreats';
import MitreTechniquesDataView from './pages/SecOps/MitreTechniquesDataView';
import MitreMalwareDataView from './pages/SecOps/MitreMalwareDataView';
import StartThreatModelling from './pages/StartThreatModelling';
import DevSecOpsChooseTech from './pages/DevSecOps/ChooseTech';
import DevSecOpsTech from './pages/DevSecOps/TechContainer';


export default function App() {
  return (
    <AuthContextProvider>
      <Theme>
        <TopBar />
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route path="/start-threat-modelling" element={<Protected><StartThreatModelling /></Protected>} />
          <Route path="/choose-assets" element={<Protected><ChooseAssets /></Protected>} />
          <Route path="/dev-sec-ops-tech" element={<Protected><DevSecOpsTech /></Protected>} />
          <Route path="/choose-tech-dev-sec-ops" element={<Protected><DevSecOpsChooseTech /></Protected>} />
          <Route path="/asset-container" element={<Protected><SecOpsAssetContainer /></Protected>} />
          <Route path="/review-threats" element={<Protected><ReviewThreats /></Protected>} />
          <Route path="/review-developer-threats" element={<Protected><ReviewDeveloperThreats /></Protected>} />
          <Route path="/select-current-security-mitigations" element={<Protected><CurrentSecurityMitigations /></Protected>} />
          <Route path="/mitre-techniques-data-view" element={<Protected><MitreTechniquesDataView /></Protected>} />
          <Route path="/mitre-malware-campaigns-data-view" element={<Protected><MitreMalwareDataView /></Protected>} />
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