<script>
    import { fridgeMessages } from "../stores/fridgeMessageStore";


</script>

<p>Hello from Home.sveltecd </p>
<p>DØRMÅTTE</p>
<div class="fridge">
    {#each $fridgeMessages as message}
    <p>{message.creator ?? "Title"}: {message}</p>
    {/each}
</div>
<slot></slot>

<style>
    .fridge {
        border: 2px solid #889;
        background-color: #778
    }
</style>