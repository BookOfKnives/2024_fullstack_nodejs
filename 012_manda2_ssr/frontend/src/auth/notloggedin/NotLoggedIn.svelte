<script>
    import { userLoginStatus } from "../../stores/userLoginStatus.js";
	import toast, {Toaster} from "svelte-french-toast";
	
	let userNameInput = "";
	let userPasswordInput = "";

	let userWantsToSignup = false;
	let newUserSignupName = "";
	let newUserSignupPassword = "";

	import { fetchPost } from "../../stores/fetchStore.js";

	async function login(){ 
		if (!checkInputValidity(1)) return -1;
		let user = {
			name: userNameInput,
			password: userPasswordInput
		};
		let urlEnd = "/login";
		const result = await fetchPost(user, urlEnd);
		let response = await result.json();
		if (response.username) {
			toast.success("You are logged in!");
			$userLoginStatus = true;
		} else {
			console.log("NOT OK in loginsvelte!"); 
		}
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
		if (response.data.username) {
			toast.success("You have created a user!");
			$userLoginStatus = true;
		} else {
			toast.error("User not created, try again!")
		}

		
	}

	function checkInputValidity(controlArg) {
		switch(controlArg) {
			case 1: return userNameInput.length >= 1 && userPasswordInput.length >= 1;
			case 2: return newUserSignupName.length >= 1 && newUserSignupPassword.length >= 1;
			default: return false; //this feels dangerous ... like where does this come from?
		}

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
			<input type="checkbox" checked={userWantsToSignup} on:change={() => userWantsToSignup = !userWantsToSignup}>
		</label>
    </div>

    <div class="main-content-div">
		{#if !userWantsToSignup}
			<label for="usersignin">
				<input type="text" bind:value={userNameInput} name="usernameInput" id="usernameInput" placeholder="Username" />
				<input type="text" bind:value={userPasswordInput} name="userpasswordInput" id="userpasswordInput" placeholder="Password" />
			</label>
			<br>
			<button on:click={login}>Log in?</button>
			<p>Login</p>
		{:else}
			<label for="newUserSignup">
				<input type="text" bind:value={newUserSignupName} name="newUserSignupName" id="newUserSignupName" placeholder="Your username">
				<input type="text" bind:value={newUserSignupPassword} name="newUserSignupPassword" id="newUserSignupPassword" placeholder="Your password">
			</label>	
			<br>
			<button on:click={newUserSignup}>Sign up!</button>
			<p>Sign up as new user</p>
			<p>Isn't it exciting?</p>
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