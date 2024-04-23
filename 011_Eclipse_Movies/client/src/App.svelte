<script>
import { Router, Link, Route } from "svelte-navigator";
import Home from "./pages/home/Home.svelte";
import Movies from "./pages/movies/Movies.svelte";
import SunglassesShop from "./pages/sunglassesshop/SunglassesShop.svelte";
</script>

<Router>
  <nav>
    <Link to="/">Home</Link>
    <Link to="movies">Movies</Link>
    <Link to="shop">Sunglasses Shop</Link>
  </nav>

  <div>
    <Route path="/">
    </Route>
    <Route path="movies" component={Movies} />
    

    <Route path="shop">
      <SunglassesShop />
    </Route>
  </div>
</Router>

<style>
</style>
