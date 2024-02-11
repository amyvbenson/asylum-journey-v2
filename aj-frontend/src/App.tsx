import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./home/Home";
import NotFound from "./components/NotFound";
import Services from "./services/Services";
import DataProvider from "./contexts/dataContext";

function App() {
  return (
    <DataProvider>
      <Router>
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
      </Router>
    </DataProvider>
  );
}

export default App;
