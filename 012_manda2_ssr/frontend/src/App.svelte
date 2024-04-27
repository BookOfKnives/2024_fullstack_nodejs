<script>
    import LoggedIn from "./auth/loggedin/LoggedIn.svelte";
    import NotLoggedIn from "./auth/notloggedin/NotLoggedIn.svelte";
    import { LoginStatus } from "./stores/login.js";
    import { onMount } from "svelte";

    onMount( async () => {
        const result = await fetch("http://localhost:8080/session");
        let response = await result.json();
        verifyAuth(response);
    });

function verifyAuth(data) {
    if (data.auth === true) {
        $LoginStatus = true;
    } else $LoginStatus = false;
}

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