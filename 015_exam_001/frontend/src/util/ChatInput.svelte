<script>
    import { onMount, onDestroy } from "svelte";
    import { debug } from "../stores/generalStore.js";
    import io from "socket.io-client";
    import { userName } from "../stores/userLoginStatus.js";

    let socket;
    function setupChatIo(){
        if ($debug) {
            console.log("setupchatIo running in Chatter.svelte, username:", $userName);
        }
        socket = io("http://localhost:8080");
        document.getElementById("chatText").addEventListener("keypress", (e) => {
            if (e.key === "Enter") { sendChatText() }
        })
    }

    let chatTextForSending = "";

    onMount(() => {
        setupChatIo();
    });
    onDestroy(() => {
        socket.off()
    })

function sendChatText() {
    if ($debug) {
        console.log("chatter.svelte sendChatText() hit!, socket name:", socket.id);
    }
    socket.emit("chatMessageSentFromUser", chatTextForSending);
    chatTextForSending = "";
    
}

</script>
    <label for="chat">
        <input type="text" name="chatText" bind:value={chatTextForSending} id="chatText">
        <button on:click={sendChatText}> Chat me! </button>
    </label>
<style>

</style>