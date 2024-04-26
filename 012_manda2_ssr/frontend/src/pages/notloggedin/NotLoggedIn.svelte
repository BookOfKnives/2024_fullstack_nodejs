<script>
    import { LoginStatus } from "../../stores/login.js";
</script>


<label>
	<input type="checkbox" bind:checked={$LoginStatus} />
	log me in
</label>
<h1>You are not logged in.</h1>
<!-- <button bind:LoginStatus>Log in?</button> -->