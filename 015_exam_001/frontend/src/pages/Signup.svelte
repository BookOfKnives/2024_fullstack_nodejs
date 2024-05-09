<script>
    import { userLoginStatus } from "../stores/userLoginStatus.js";
	import toast from "svelte-french-toast";
    import { BASE_URL } from "../stores/generalStore.js";
	import { useNavigate } from "svelte-navigator";
	import { fetchPost } from "../stores/fetchStore.js";

	let newUserSignupName = "re";
	let newUserSignupPassword = "re";

	const navigate = useNavigate();

    async function newUserSignup() {
		toast.success("Attempting to create user ...");
		if (!checkInputValidity(2)) return -1;
		let user = {
			name: newUserSignupName,
			password: newUserSignupPassword,
		};
		let urlEnd = $BASE_URL + "/newusersignup";
		const result = await fetchPost(user, urlEnd);
		let response = await result.json(); 
		if (response.data.username) {
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

</script>

	<label for="newUserSignup">
		<input type="text" bind:value={newUserSignupName} name="newUserSignupName" id="newUserSignupName" placeholder="Your username">
		<input type="text" bind:value={newUserSignupPassword} name="newUserSignupPassword" id="newUserSignupPassword" placeholder="Your password">
	</label>	
    <br>
    <button on:click={newUserSignup}>Sign up!</button>
	<p>Sign up as new user</p>
	<p>Isn't it exciting?</p>

    