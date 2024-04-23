<script>
    import { navigate } from "svelte-navigator";
    import { onMount } from "svelte";
    import { fetchGet, fetchPost } from "../../../util/api.js";

    onMount(async() => {
        const customer = {
            name: "Gleb"
        };
        await fetchPost("http://localhost:8080/api/customers", customer);

        const response = await fetchGet("http://localhost:8080/api/customers");
        const result = await response.json();

    });

</script>

<h1>
    Sunny!
</h1>