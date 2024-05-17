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
    }

    let chatTextForSending = "";

    onMount(() => {
        document.getElementById("chatText").addEventListener("keypress", (e) => {
            if (e.key === "Enter") { chat_test() }
        })
        setupChatIo();
    });
    onDestroy(() => {
        socket.off()
    })

function chat_test() {
    if ($debug) {
        console.log("chatter.svelte chat_test hit!, socket name:", socket.id);
    }
    socket.emit("chatMessageSentFromUser", chatTextForSending)
}
</script>
    <p>I am chatter.</p>
    <label for="chat">
        <input type="text" name="chatText" bind:value={chatTextForSending} id="chatText">
        <button on:click={chat_test}> Chat me! </button>
    </label>
<style>

</style>