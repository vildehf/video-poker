import { Route, Routes } from "react-router";
import GamePage from "./pages/GamePage/GamePage";
import RulesPage from "./pages/RulesPage/RulesPage";
import PlayersPage from "./pages/PlayersPage/PlayersPage";
import Header from "./components/Header/Header";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<GamePage />} />
        <Route path="/regler" element={<RulesPage />} />
        <Route path="/spillere" element={<PlayersPage />} />
      </Routes>
    </>
  );
}
