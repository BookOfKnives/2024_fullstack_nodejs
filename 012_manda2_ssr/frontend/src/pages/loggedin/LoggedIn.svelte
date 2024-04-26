<script>
    import { Router, Link, Route } from "svelte-navigator";
    import Home from "../home/Home.svelte";
    import Ducks from "../Ducks/Ducks.svelte";
    import Auth from "../auth/Auth.svelte";
    import Tanks from "../tanks/Tanks.svelte";

</script>

<div id="front-container-div">
    <div class="nav-bar-div">
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/ducks">Ducks</Link>
                    </li>
                    <li>
                        <Link to="/tanks">Tanks</Link>
                    </li>
                </ul>
            </nav>
        </Router>

    </div>
    <div class="page-header-div">            
        <h1>1618 Design</h1>
    </div>
    <div class="auth-div">
          <Auth />
    </div>
    <div class="left-sidebar-div">

    </div>

    <div class="main-content-div">
        <Router>
            <div>
                <Route path="/">
                    <Home />
                </Route>
                <Route path="/ducks">
                    <Ducks />
                </Route>
                <Route path="/tanks">
                    <Tanks />
                </Route>
            </div>
        </Router>
    </div>
</div>

<style>
.page-header-div {
    text-indent: -39%;
    padding-top: 33px; 
    text-align: center;
  }
</style>