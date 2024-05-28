<script>
    import { userLoginStatus } from "../stores/userLoginStatus.js";
	import toast from "svelte-french-toast";
    import { BASE_URL } from "../stores/generalStore.js";
	import { useNavigate } from "svelte-navigator";
	import { fetchPost } from "../stores/fetchStore.js";
	import { onMount } from "svelte";

	let newUserSignupName = "re";
	let newUserSignupPassword = "re";
	let newUserEmail = "re@re.re";

	const navigate = useNavigate();

    async function newUserSignup() {
		toast.success("Attempting to create user ...");
		if (!checkInputValidity(2)) return -1;
		let user = {
			name: newUserSignupName,
			password: newUserSignupPassword,
			email: newUserEmail,
		};
		let urlEnd = $BASE_URL + "/newusersignup";
		const result = await fetchPost(urlEnd, user);
		let response = await result.json(); 
		if (response.data.username) {
			//fetchlogin her //skal det ikke være den anden ting? i authRouter?
			// fetchPost($BASE_URL + "/")
			toast.success("You have created a user!");
			$userLoginStatus = true;
			
			navigate("/");
		} else {
			toast.error("User not created, try again!")
		}		
	}

	function checkInputValidity(controlArg) {
		switch(controlArg) {
			case 2: return newUserSignupName.length >= 1 && newUserSignupPassword.length >= 1;
			default: return false; //this feels dangerous ... like where does this come from?
		}
	}

	onMount(() => {
		document.getElementById("newUserSignupName").addEventListener("keypress", (e) => {
            if (e.key === "Enter") { newUserSignup() }
        })
		document.getElementById("newUserSignupPassword").addEventListener("keypress", (e) => {
            if (e.key === "Enter") { newUserSignup() }
        })
		document.getElementById("newUserEmail").addEventListener("keypress", (e) => {
            if (e.key === "Enter") { newUserSignup() }
        })
	})

</script>

	<label for="newUserSignup">
		<input type="text" bind:value={newUserSignupName} name="newUserSignupName" id="newUserSignupName" placeholder="Your username">
		<input type="text" bind:value={newUserSignupPassword} name="newUserSignupPassword" id="newUserSignupPassword" placeholder="Your password">
		<input type="text" bind:value={newUserEmail} name="newUserEmail" id="newUserEmail" placeholder="Email">
	</label>	
    <br>
    <button on:click={newUserSignup}>Sign up!</button>
	<p>Sign up as new user</p>
	<p>Isn't it exciting?</p>

    