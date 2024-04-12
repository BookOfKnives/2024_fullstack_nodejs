<script>
  import { fridgeMessages } from "../stores/fridgeMessageStore";

    export let child;
    export let onShowLove;
    export let onTakeTreasure;

    let fridgeMessageInputValue = "";

    function submitFridgeMessage() {
        const fridgeMessage = {
            creator: child.name,
            message: fridgeMessageInputValue,
        }
        // console.log("input value field.... in child.svelte", fridgeMessageInputValue);
        fridgeMessages.set({...$fridgeMessages, fridgeMessageInputValue})
    }

</script>

<div
    class:is-rich={child.isRich}
    class={child.familySheep || "not-a-sheep"}
>
    <h3>{child.name}</h3>

    <button on:click={() => onShowLove(child.name)}> Show Love x3 </button>
    <br>
    <button on:click={() => onTakeTreasure()}> Take Treasure </button>
    <label for="fridgeMessage">Write fridge message</label>
    <input type="text" name="fridgeMessage" placeholder="Fridge Message"
        bind:value={fridgeMessageInputValue}
    >
    <br>
    <button on:click={submitFridgeMessage}></button>
</div>
<style>
    .is-rich {
        background-color: purple;
    }
    .black-sheep{
        background-color: #111
    }
    .grey-sheep {
        background-color: #444;
    }
    .not-a-sheep {
        border: 2px solid goldenrod;
    }
</style>