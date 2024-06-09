<script>
    import { onMount, onDestroy } from "svelte";
    import { debug, BASE_URL } from "../stores/generalStore.js";
    import io from "socket.io-client";
    import { name } from "../stores/userStore.js";


    let socket;
    function setupChatIo(){
        socket = io($BASE_URL);
        document.getElementById("chatText").addEventListener("keypress", (e) => {
            if (e.key === "Enter") { sendChatText() }
        })
        // socket.emit("getUser", (callback) => {
        //     console.log("getUser in chatinput, info:", callback)
        // })
        
    }

    let chatTextForSending = "";

    onMount(() => {
        setupChatIo();
    });
    onDestroy(() => {
        socket.off()
    })

function sendChatText() {
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