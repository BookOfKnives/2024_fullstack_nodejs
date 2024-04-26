<script>
    import { LoginStatus } from "./stores/login.js";
    import LoggedIn from "./pages/loggedin/LoggedIn.svelte";
    import NotLoggedIn from "./pages/notloggedin/NotLoggedIn.svelte";
</script>

<main>
    {#if $LoginStatus}
    <LoggedIn />
    {:else}
    <NotLoggedIn />
    {/if}
</main>

<style>

</style>
