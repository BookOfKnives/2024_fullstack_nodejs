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
    import ChatInput from "./util/ChatInput.svelte";
    import ChatOutput from "./util/ChatOutput.svelte";
    import Ducks from "./pages/Ducks.svelte";
    import Tanks from "./pages/Tanks.svelte";
    import Battleships from "./pages/games/Battleships.svelte";

    async function logOut(){
        toast("Logging out...");
        $userLoginStatus = !$userLoginStatus;
        const response = await fetch($sessionApiUrl + "/destroy");
        const result = await response.json();
        //TODO: should destroy session here as well
        window.location.href = "/";
    }
    let chatScrollable;
    onMount( async () => {
        const response = await fetch($sessionApiUrl + "/getname");
        let result = await response.json();
        if (debug) console.log("app svelte onMount, result:", result)
        checkIfSessionExists(result);
        chatScrollable = document.getElementById("bottom-middle-div"); 
    });

    function handleNewChatMessage() {
        chatScrollable.scrollTop += 100;
    }

    let dummyUser = {
      id: 1,
      username: 're',
      password: '$2b$14$zlsui0yvPRtaP/I3QytLz.suMBfnwsx50jnXiTx4qpCSJFVSuJ3z6',
      email: 're@re.re',
      signUpDate: '10.5.2024 14.00.29',
      lastLogon: null
    }

    function checkIfSessionExists(data) {
        if (debug) { 
            console.log("data in  checkifsess app svelte", data)
            console.log("App.svelte checkifsessionexists: ", $userName);
        }
         if (data.data) { //prod line
        //   if (true) { //debug line
            console.log("checkifsess, insidte data data");
            userLoginStatus.set(true);
            // $userName =dummyUser.username; //debug line
            $userName = data.data; //prod line
            //TODO: have noget her der sætter noget user info til store, så jeg kan vise det under logout button.
            if (debug) console.log("app.svelte checkifsession exists, data data:", data)
        } else $userLoginStatus = false; 
    }

    //__battleships game handling
    function handleClientGameConditionChange() {
        
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
                            <li>
                                <Link to="/battleships">Battleships</Link>
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
    
        <div id="main-content-div">
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
                    <Route path="/battleships" component={Battleships} />
                </div>
            </Router>
        </div>
 
        <!-- <div id="right-sidebar-div">
        </div>  -->
        
        <div id="bottom-left-div">
            {#if $userLoginStatus}
            <ChatInput />
            {:else}
            <p>Please log in for seeing chat function</p>
            {/if}
        </div>

        <div id="bottom-middle-div">
            <ChatOutput onNewChatMessage={handleNewChatMessage}/>
        </div>
<!-- 
        <div id="bottom-right-div">
            unusued because of  
        </div>  -->
    </div>
</main>

<style>
#bottom-middle-div {
    overflow:scroll;
    overflow-x: hidden;
}

#main-content-div {
    grid-area: 2 / 2 / 3 / 4;
}

</style>

