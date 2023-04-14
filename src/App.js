import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Campaigns from './components/Campaigns';
import Campaign from './components/Campaign';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="container">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Campaigns />} />
            <Route path="/campaign/:id" element={<Campaign />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
