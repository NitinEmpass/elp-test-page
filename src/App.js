import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Rules from "./components/Rules";
import Questions from "./components/Questions";
import Result from "./components/Result";
import axios from "axios";
import CheckQuestions from "./components/CheckQuestions";
import "react-tippy/dist/tippy.css";
function App() {
  axios.defaults.baseURL =
    "https://dashboard.empasslearning.com/apicapi/index.php";
  axios.defaults.withCredentials = true;

  return (
    <div className="min-h-screen max-w-full overflow-hidden relative">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/ques" element={<Questions />} />
        <Route path="/checkQues" element={<CheckQuestions />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
