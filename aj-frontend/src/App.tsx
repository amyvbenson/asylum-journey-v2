import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import ReactGA from "react-ga4";
import Home from "./home/Home";
import NotFound from "./components/NotFound";
import Services from "./services/Services";
import DataProvider from "./contexts/dataContext";
import { useEffect, useState } from "react";

function App() {
  return (
    <DataProvider>
      <Router>
        <AppRoutes />
      </Router>
    </DataProvider>
  );
}

export default App;

function AppRoutes() {
  const location = useLocation();
  const [analyticsInitialized, setAnalyticsInitialized] = useState(false);
  useEffect(() => {
    ReactGA.initialize(import.meta.env.VITE_GA);
    setAnalyticsInitialized(true);
  }, []);

  useEffect(() => {
    if (analyticsInitialized) {
      ReactGA.send({ hitType: "pageview" });
    }
  }, [analyticsInitialized, location]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tool" element={<Navigate to="/services" />} />
      <Route path="/service" element={<Navigate to="/services" />} />
      <Route path="/services">
        <Route index element={<Services />} />
        <Route path=":slug" element={<Services />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
