<script>
    import { debug } from "./stores/generalStore.js";
    import { Router, Link, Route } from "svelte-navigator";
    import { userLoginStatus, userName } from "./stores/userLoginStatus.js";
    import { sessionApiUrl } from "./stores/generalStore.js";
    import { onMount } from "svelte";
    import toast, { Toaster } from "svelte-french-toast";   
    import Signup from "./util/Signup.svelte";
    import Login from "./util/Login.svelte";
    import KrydsOgBolle from "./pages/games/KrydsOgBolle.svelte";
    import Chatter from "./util/Chatter.svelte";
    import Ducks from "./pages/Ducks.svelte";
    import Tanks from "./pages/Tanks.svelte";

    async function logOut(){
        toast("Logging out...");
        $userLoginStatus = !$userLoginStatus;
        const response = await fetch($sessionApiUrl + "/destroy");
        const result = await response.json();
        window.location.href = "/";
    }

    onMount( async () => {
        const response = await fetch($sessionApiUrl + "/getname");
        let result = await response.json();
        checkIfSessionExists(result);
    });

    function checkIfSessionExists(data) {
        if (debug) console.log("App.svelte checkifsessionexists: ", $userName)
        if (!data) {
            $userLoginStatus = true;
            $userName = data.data;
            if (debug) console.log("app.svelte checkifsession exists, data data:", data)
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
                        <li>
                            <Link to="/krydsogbolle">Kryds Og Bolle</Link>
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
                        <Ducks />
                    </Route>
                    <Route path="/tanks" component={Tanks}>
                    </Route>
                    <Route path="/signup">
                        <Signup />
                    </Route>
                    <Route path="/krydsogbolle" component={KrydsOgBolle} />
                </div>
            </Router>
        </div>

        <div id="right-sidebar-div">
        </div>
        
        <div id="bottom-left-div">
            {#if $userLoginStatus}
        <Chatter />
        {:else}
        <p>Please log in for seeing chat function</p>
        {/if}
        </div>
        <div id="bottom-middle-div">
            bottom mid
        </div>
        <div id="bottom-right-div">
            
        </div>
    </div>
</main>

<style>

</style>
