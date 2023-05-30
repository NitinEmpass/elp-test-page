import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import Rules from "./pages/Rules";
// import Questions from "./components/Questions";
import Result from "./pages/Result";
// import CheckQuestions from "./components/CheckQuestions";
import axios from "axios";
import "react-tippy/dist/tippy.css";
import LoadingPage from "./pages/LoadingPage";
const HomePage = lazy(() => import("./pages/HomePage"));
const Rules = lazy(() => import("./pages/Rules"));
const Questions = lazy(() => import("./components/Questions"));
// const Result = lazy(() => import("./pages/Result"));
function App() {
  axios.defaults.baseURL =
    "https://dashboard.empasslearning.com/apicapi/index.php";
  axios.defaults.withCredentials = true;

  return (
    <div className="min-h-screen max-w-full overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<LoadingPage />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="/rules"
          element={
            <Suspense fallback={<LoadingPage />}>
              <Rules />
            </Suspense>
          }
        />
        <Route
          path="/ques"
          element={
            <Suspense fallback={<LoadingPage />}>
              <Questions />
            </Suspense>
          }
        />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
