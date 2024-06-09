<script>
    import { debug } from "./stores/generalStore.js";
    import { Router, Link, Route } from "svelte-navigator";
    import { name, roles } from "./stores/userStore.js";
    import { SESSION_API_URL, BASE_URL } from "./stores/generalStore.js";
    import { onMount } from "svelte";
    import toast, { Toaster } from "svelte-french-toast";   
    import KrydsOgBolle from "./pages/games/KrydsOgBolle.svelte";
    import ChatInput from "./util/ChatInput.svelte";
    import ChatOutput from "./util/ChatOutput.svelte";
    import Ducks from "./pages/Ducks.svelte";
    import Tanks from "./pages/Tanks.svelte";
    import Battleships from "./pages/games/Battleships.svelte";
    import io from "socket.io-client";
    
    let socket;

    async function logOut(){
        toast("Logging out...");
        window.location.href = "/";
    }
    async function getUserData() {
        socket.emit("getUser", (callback) => {
            console.log("getUser in chatinput, info:", callback)
            $name = callback.username 
            $roles = callback.roles
        })
        toast(`Welcome, ${name}!`)
    } 

    let chatScrollable; 
    onMount( async () => {
        socket = io($BASE_URL);
        chatScrollable = document.getElementById("bottom-middle-div"); 
        getUserData();
    });

    function handleNewChatMessage() {
        chatScrollable.scrollTop += 100;
    }

</script>

<main>
    <Toaster />
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
                            <li>
                                <Link to="/krydsogbolle">Kryds Og Bolle</Link>
                            </li>
                            <li>
                                <Link to="/battleships">Battleships</Link>
                            </li>
                        </ul>
                    </nav>
                </Router>
        </div>

        <div class="page-header-div">            
            <h1>1618 Design</h1>
        </div>

        <div class="top-right-div">
        </div>

        <div class="left-sidebar-div">
                <button on:click={logOut}>Log Out</button>
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
                    <!-- <Route path="/signup">
                        <Signup />
                    </Route> -->
                    <Route path="/krydsogbolle" component={KrydsOgBolle} />
                    <Route path="/battleships" component={Battleships} />
                </div>
            </Router>
        </div>

        
        <div id="bottom-left-div">
            <ChatInput />
        </div>

        <div id="bottom-middle-div">
            <ChatOutput onNewChatMessage={handleNewChatMessage}/>
        </div>
 
        <div id="bottom-right-div">
             
        </div>  
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

