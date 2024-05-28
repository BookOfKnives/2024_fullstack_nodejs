<script>
	import { onMount } from "svelte";
    import { userLoginStatus } from "../stores/userLoginStatus.js";
	import toast, {Toaster} from "svelte-french-toast";
    import { BASE_URL, debug } from "../stores/generalStore.js";
	
	let userNameInput = "re";
	let userPasswordInput = "re";

	import { fetchPost } from "../stores/fetchStore.js";

	async function login(){ 
		if (!checkInputValidity(1)) {
			toast.error("Name and password required.");
			return -1;
		}
		toast("Attempting to log in...");
		let user = {
			name: userNameInput,
			password: userPasswordInput
		};
		let url = $BASE_URL + "/login"; 
		const result = await fetchPost(url, user);
		let response = await result.json();
		if (response.username) {
			toast.success(`Welcome back, ${response.username}!`);
			$userLoginStatus = true;
		} else {
			if ($debug) console.log("NOT OK in loginsvelte!"); 
			toast.error("Login not succesful.");
		}
	};

	function checkInputValidity(controlArg) {
		switch(controlArg) {
			case 1: return userNameInput.length >= 1 && userPasswordInput.length >= 1;
			default: return false; 
		}
	};

	onMount(() => {
		document.getElementById("usernameInput").addEventListener("keypress", (e) => {
            if (e.key === "Enter") { login() }
        })
		document.getElementById("userpasswordInput").addEventListener("keypress", (e) => {
            if (e.key === "Enter") { login() }
        })
	})

</script>

	<label for="usersignin">
		<input type="text" bind:value={userNameInput} name="usernameInput" id="usernameInput" placeholder="Username" />
		<input type="text" bind:value={userPasswordInput} name="userpasswordInput" id="userpasswordInput" placeholder="Password" />
	</label>
	<br>
	<button on:click={login}>Log in?</button>
	<p>Login</p>
    <p>Welcome back, user.</p>


    