<script>

let isUserLoggedIn = false;
let username = "ab";
let password = "123";

let newUsername = "tesint";
let newPassword = "solid snake";

async function hitAuthenticate() {
    let loginData = {
        username,
        password,
    }
    const data = await fetch("http://localhost:8080/authenticate/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
    });
}

async function hitSignup() {
    let signupData = {
        newUsername,
        newPassword,
    }
    const response = await fetch("http://localhost:8080/signup/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
    });}

</script>

<label for="username">Username</label>
<input type=text bind:value={username} name="username" id="username" placeholder="Username">
<label for="password">Password</label>
<input type=text bind:value={password} name="password" id="password" placeholder="Password">
<!-- <p>Data: {username}, {password}</p> -->

<button on:click={hitAuthenticate}>Hit authenticate</button>

<label for="newUserName">New User name</label>
<input type=text bind:value={newUsername} name="newusername" id="newusername" placeholder="New User Name">
<label for="newUserPassword">New User password</label>
<input type=text bind:value={newPassword} name="newuserpassword" id="newuserpassword" placeholder="New password">
<button on:click={hitSignup}>Signup</button>