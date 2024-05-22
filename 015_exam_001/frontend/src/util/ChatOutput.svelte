<script>
    import { onMount, onDestroy } from "svelte";
    import { debug } from "../stores/generalStore.js";
    import io from "socket.io-client";
    import { chatStore } from "../stores/chatStore.js";

    
    let socket = io("http://localhost:8080");
    // function setupChatoutput(){
    //     socket = io("http://localhost:8080");
    // }

    let chatTextForSending = "";

    onMount(() => {

    });
    onDestroy(() => {

    })

    if ($debug) {
        let dummyChatMsg = {
            text: "arg",
            from: "more",
        }
        for (let i = 0; i < 10; i++) {
            $chatStore.push(dummyChatMsg);
        }
    }

    socket.on("chatMessageSentFromServer", (...args) => {
        if ($debug) console.log("chatoiutpuit svelte chatmsg from server, args", args) //finish this chat shit
        let chatMsg = {
            text: args[0],
            from: args[1]
        }
        if ($debug) console.log("chatmsg in ChatOutput.svelte:", chatMsg);
        $chatStore.push(chatMsg);
        $chatStore = $chatStore;
        if ($debug) console.log("chatstore", $chatStore)
    });
    chatTextForSending = "";


</script>
    {#each $chatStore as { text, from }}
    <div>{from}: {text}</div>
    {/each}
<style>
div:nth-child(odd) {
     background-color: #9a9;
}

</style>