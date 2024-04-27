<script>
    import { LoginStatus } from "../../stores/login.js";
	
	let username_input = "";
	let userpassword_input = "";

	let userWantsToLogIn = true;

	import { fetchPost } from "../../util/fetch.js";

	async function login(){
		console.log("notloggedin svelte 012 hitting login");
		let data = {
			some: "blabla"
		};
		let urlEnd = "/newusersignup";
		const result = await fetchPost(data, urlEnd);
		let response = await result.json();
		console.log("login function in notloggedin svelte hitting fetch, response:", response);
	}

</script>

<div id="front-container-div">
    <div class="nav-bar-div">

    </div>
    <div class="page-header-div">            
        <h1>1618 Design</h1>
    </div>
    <div class="auth-div">
        
    </div>
    <div class="left-sidebar-div">

    </div>

    <div class="main-content-div">
		{#if userWantsToLogIn}
			<label>
				<input type="text" bind:value={$LoginStatus} />
				log me in
			</label>
			<button on:click={login}>Log in?</button>
		{:else}
			<label></label>	
		{/if}
    </div>
</div>

<style>
.page-header-div {
    text-indent: -39%;
    padding-top: 33px; 
    text-align: center;
  }
</style>

