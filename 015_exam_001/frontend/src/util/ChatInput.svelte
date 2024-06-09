<script>
    import { onMount, onDestroy } from "svelte";
    import { BASE_URL } from "../stores/generalStore.js";
    import io from "socket.io-client";

    let socket;
    function setupChatIo(){
        socket = io($BASE_URL);
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
        socket.emit("chatMessageSentFromUser", chatTextForSending);
        chatTextForSending = "";
    }

</script>

<label for="chat">
    <input type="text" name="chatText" bind:value={chatTextForSending} id="chatText">
    <button on:click={sendChatText}> Chat me! </button>
</label>
