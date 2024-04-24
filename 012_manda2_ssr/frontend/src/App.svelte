<script>
    import { Router, Link, Route } from "svelte-navigator";
    import Home from "./pages/Home/Home.svelte";
    import Auth from "./pages/Auth/Auth.svelte";

</script>

<main>
    <div id="front-container-div">
        <div class="nav-bar-div">
            <Router>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="Auth">Auth</Link>
                </nav>
                <div>
                    <Route path="/">
                        <Home />
                    </Route>

                </div>
            </Router>
        </div>
        <div class="page-header-div">            
            <h1>Welcome to 1618 Design </h1>
        </div>
        <div>

        </div>
        <div class="auth-">
            <Auth />
        </div>
        <div>
            <p>This is a text of intro.</p>
        </div>
    </div>
</main>

<style>

</style>
