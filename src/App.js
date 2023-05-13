import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Rules from "./pages/Rules";
import Questions from "./components/Questions";
import Result from "./pages/Result";
import axios from "axios";
import CheckQuestions from "./components/CheckQuestions";
import "react-tippy/dist/tippy.css";
function App() {
  axios.defaults.baseURL =
    "https://dashboard.empasslearning.com/apicapi/index.php";
  axios.defaults.withCredentials = true;

  return (
    <div className="min-h-screen max-w-full overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/ques" element={<Questions />} />
        <Route path="/checkQues" element={<CheckQuestions />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
