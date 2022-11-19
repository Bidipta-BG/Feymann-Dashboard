import Createuser from "./Createuser";
import Dashboard from "./Dashboard";
import Home from "./Home";
import Createcontent from "./Createcontent";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";



function App() {

  return (
    <div>
      <Router>

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/createuser" element={<Createuser />} />
          <Route path="/createcontent" element={<Createcontent />} />
        </Routes>

      </Router>
      
    </div>
  );
}

export default App;
