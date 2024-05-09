<script>
    import { Router, Link, Route } from "svelte-navigator";
    import { userLoginStatus } from "./stores/userLoginStatus.js";
    import { userApiUrl } from "./stores/generalStore.js";
    import { BASE_URL } from "./stores/generalStore.js";
    import { sessionApiUrl } from "./stores/generalStore.js";
    import { onMount } from "svelte";
    import toast, { Toaster } from "svelte-french-toast";   
    import Signup from "./pages/Signup.svelte";
    import Login from "./pages/Login.svelte";


    function logOut(){
        toast("Logging out...");
        $userLoginStatus = !$userLoginStatus;
        fetch($sessionApiUrl + "/destroy");
        window.location.href = "/";
    }

    onMount( async () => {
        const response = await fetch($sessionApiUrl + "/getname");
        let result = await response.json();
        checkIfSessionExists(result);
    });

    function checkIfSessionExists(data) {
        if (data === true) {
            $userLoginStatus = true;
        } else $userLoginStatus = false; 
    }
</script>

<main>
    <Toaster />
    <div id="front-container-div">
        <div class="nav-bar-div">
            {#if $userLoginStatus}
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
            
            {:else}
            <Router>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/signup">New user? Sign up here!</Link>
                        </li>
                    </ul>
                </nav>
            </Router>
            {/if}
        </div>
        <div class="page-header-div">            
            <h1>1618 Design</h1>
        </div>
        <div class="top-right-div">
           
        </div>
        <div class="left-sidebar-div">
            {#if $userLoginStatus}
                <button on:click={logOut}>Log Out</button>
            {:else}
                <Login />
            {/if}
        </div>
    
        <div class="main-content-div">
            <Router>
                <div>
                    <Route path="/">
                        <p>Home, sweet home.</p>
                    </Route>
                    <Route path="/ducks">
                        <p>Something about ducks Ithink?</p>
                    </Route>
                    <Route path="/tanks">
                       <p>Tanks here!</p>
                    </Route>
                    <Route path="/signup">
                        <Signup />
                    </Route>
                </div>
            </Router>
        </div>
    </div>
</main>

<style>

</style>
