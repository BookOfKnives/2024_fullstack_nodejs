<script>
    import LoggedIn from "./auth/loggedin/LoggedIn.svelte";
    import NotLoggedIn from "./auth/notloggedin/NotLoggedIn.svelte";
    import { userLoginStatus } from "./stores/userLoginStatus.js";
    import { onMount } from "svelte";

    onMount( async () => {
        const result = await fetch("http://localhost:8080/api/sessions/getname");
        let response = await result.json();
        verifyAuth(response);
    });

function verifyAuth(data) {
    if (data.userAuthenticated === true) {
        $userLoginStatus = true;
    } else $userLoginStatus = false;
}

</script>

<main>
    {#if $userLoginStatus}
    <LoggedIn />
    {:else}
    <NotLoggedIn />
    {/if}
</main>

<style>

</style>