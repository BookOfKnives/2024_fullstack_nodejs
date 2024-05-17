<script>
    import { userLoginStatus } from "../stores/userLoginStatus.js";
	import toast, {Toaster} from "svelte-french-toast";
    import { BASE_URL } from "../stores/generalStore.js";

	let userNameInput = "re";
	let userPasswordInput = "re";

	import { fetchPost } from "../stores/fetchStore.js";

	async function login(){ 
		toast("Attempting to log in...");
		if (!checkInputValidity(1)) return -1;
		let user = {
			name: userNameInput,
			password: userPasswordInput
		};
		let urlEnd = $BASE_URL + "/login"; 
		const result = await fetchPost(user, urlEnd);
		let response = await result.json();
		if (response.username) {
			toast.success("Welcome back, user!");
			$userLoginStatus = true;
		} else {
			console.log("NOT OK in loginsvelte!"); 
			toast.error("Login not succesful.");
		}
	}

	function checkInputValidity(controlArg) {
		switch(controlArg) {
			case 1: return userNameInput.length >= 1 && userPasswordInput.length >= 1;
			default: return false; 
		}
	}

</script>

	<label for="usersignin">
		<input type="text" bind:value={userNameInput} name="usernameInput" id="usernameInput" placeholder="Username" />
		<input type="text" bind:value={userPasswordInput} name="userpasswordInput" id="userpasswordInput" placeholder="Password" />
	</label>
	<br>
	<button on:click={login}>Log in?</button>
	<p>Login</p>
    <p>Welcome back, user.</p>


    