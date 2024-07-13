import { Suspense } from "react";
import { StakingPage, ErrorPage } from "./routes";
import Layout from "../layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function AppRouter() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<StakingPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Router>
    </Suspense>
  );
}
