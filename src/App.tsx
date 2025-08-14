import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RestaurantGrid, { restaurantsData } from "./components/RestaurantGrid";
import RestaurantDetail from "./components/RestaurantDetail";
import { useParams, useNavigate } from "react-router-dom";
import LikePage from "./pages/LikePage";
import { FavoritesProvider } from "./components/FavoriteContext";

function RestaurantDetailWrapper() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const restaurant = restaurantsData.find((r) => r.slug === slug);

  if (!restaurant) {
    return <div>Restaurant introuvable</div>;
  }

  return (
    <RestaurantDetail restaurant={restaurant} onBack={() => navigate(-1)} />
  );
}

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Navigation />

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <Footer />
                </>
              }
            />

            <Route
              path="/carnet-de-tables/"
              element={
                <>
                  <RestaurantGrid />
                  <Footer />
                </>
              }
            />
            <Route path="/coups-de-coeur/" element={<LikePage />} />

            <Route
              path="/carnet-de-tables/:slug"
              element={<RestaurantDetailWrapper />}
            />

            <Route
              path="*"
              element={
                <>
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
