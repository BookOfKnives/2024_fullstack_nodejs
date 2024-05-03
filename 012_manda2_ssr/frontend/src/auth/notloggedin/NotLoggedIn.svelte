<script>
    import { LoginStatus } from "../../stores/login.js";
	
	let userNameInput = "re";
	let userPasswordInput = "re";

	let userWantsToSignup = true;
	let newUserSignupName = "re";
	let newUserSignupPassword = "re";

	import { fetchPost } from "../../stores/fetchStore.js";

	async function login(){ //cant test this, have no signup yet.
		if (!checkInputValidity(1)) return -1;
		let user = {
			name: userNameInput,
			password: userPasswordInput
		};
		let urlEnd = "/login";
		const result = await fetchPost(user, urlEnd);
		let response = await result.json();
		console.log("login function in notloggedin svelte hitting fetch, response:", response);
	}

	async function newUserSignup() {
		if (!checkInputValidity(2)) return -1;
		let user = {
			name: newUserSignupName,
			password: newUserSignupPassword,
		};
		let urlEnd = "/newusersignup";
		const result = await fetchPost(user, urlEnd);
		let response = await result.json();
		console.log("newusersignup in notloggedin.svelte, response from newusersignup-endpoint:", response);
	}

	function checkInputValidity(controlArg) {
		switch(controlArg) {
			case 1: return userNameInput.length >= 1 && userPasswordInput.length >= 1;
			case 2: return newUserSignupName.length >= 1 && newUserSignupPassword.length >= 1;
			default: return false; //this feels dangerous ... like where does this come from?
		}
		// let name = userNameInput.length >= 1;
		// let password = userPasswordInput.length >= 1;
		// return (name && password);
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
		<h3>Do you wish to sign up as a new user?</h3>
		<label for="signupButtonToggle">
			<input type="checkbox" bind:value={userWantsToSignup}>
		</label>
    </div>

    <div class="main-content-div">
		{#if !userWantsToSignup}
			<label for="usersignin">
				<input type="text" bind:value={userNameInput} name="usernameInput" id="usernameInput" placeholder="Username" />
				<input type="text" bind:value={userPasswordInput} name="userpasswordInput" id="userpasswordInput" placeholder="Password" />
				<p>Login</p>
			</label>
			<button on:click={login}>Log in?</button>
		{:else}
			<label for="newUserSignup">
				<p>Sign up as new user</p>
				<input type="text" bind:value={newUserSignupName} name="newUserSignupName" id="newUserSignupName" placeholder="Your username">
				<input type="text" bind:value={newUserSignupPassword} name="newUserSignupPassword" id="newUserSignupPassword" placeholder="Your password">
				<button on:click={newUserSignup}>Sign up!</button>
				<p>Isn't it exciting?</p>
			</label>	
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