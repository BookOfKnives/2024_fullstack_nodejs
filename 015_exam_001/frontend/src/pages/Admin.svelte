<script>
    import { onMount } from "svelte";

    let users = [];
    onMount( async () => {
        const response = await fetch("http://localhost:8080/api/users");
        const result = await response.json();
        console.log("result", result.data)  
        users = result.data;
        console.log("users", users)
    })

</script>
{#each users as user}
    <p>Name: {user.user.username}, roles: {user.user.roles}</p>   
{/each}