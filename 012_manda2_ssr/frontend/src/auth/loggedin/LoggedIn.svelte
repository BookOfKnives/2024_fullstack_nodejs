<script>
    import { Router, Link, Route } from "svelte-navigator";
    import Home from "../../pages/home/Home.svelte";
    import Ducks from "../../pages/Ducks/Ducks.svelte";
    import Tanks from "../../pages/tanks/Tanks.svelte";
    import { userLoginStatus } from "../../stores/userLoginStatus";

    function logOut(){
        $userLoginStatus = !$userLoginStatus;
        fetch("http://localhost:8080/api/sessions/destroy");
    }
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
        <button on:click={logOut}>Log Out</button>

    </div>
    <div class="page-header-div">            
        <h1>1618 Design</h1>
    </div>
    <div class="auth-div">
        
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