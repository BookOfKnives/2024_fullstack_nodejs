<script>
    import { debug } from "../stores/generalStore.js";
    import io from "socket.io-client";
    import { chatStore } from "../stores/chatStore.js";

    export let onNewChatMessage;

    let socket = io("http://localhost:8080");

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
        if ($debug) console.log("chatoiutpuit svelte chatmsg from server, args", args) //alt-f3 finds næst change, shift-alt-f3 for next one., jeg skal lave hele restsen af min git commit
        let chatMsg = {
            text: args[0],
            from: args[1]
        }
        if ($debug) console.log("chatmsg in ChatOutput.svelte:", chatMsg);
        $chatStore.push(chatMsg);
        $chatStore = $chatStore;
        setTimeout(() => {
            onNewChatMessage();
        }, 5);
        if ($debug) console.log("chatstore", $chatStore)
    });
</script>

{#each $chatStore as { text, from }}
<div>{from}: {text}</div>
{/each}

<style>
    div:nth-child(odd) {
         background-color: #9a9;
    }
</style>