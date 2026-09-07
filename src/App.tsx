import { Route, Routes } from "react-router";
import GamePage from "./pages/GamePage";
import RulesPage from "./pages/RulesPage";
import PlayersPage from "./pages/PlayersPage";
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<GamePage />} />
      <Route path="/regler" element={<RulesPage />} />
      <Route path="/spillere" element={<PlayersPage />} />
    </Routes>
  );
}
