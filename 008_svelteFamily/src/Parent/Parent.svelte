<script>
    export let parentName;
    export let myChildren;

    import Child from "../Child/Child.svelte";
    import Chest from "../Chest/Chest.svelte";


    function handleShowLove(childname) {
        console.log("+1: ", childname);
        console.log(`${parentName} is loved by ${childname}!`);
    }

    function handleTakeTreasure() {
        // console.log(Chest.treasure.pop())
        console.log("taking ...")
    }
</script>
<p>Parent: {parentName}</p>

<!-- <p>Children: {myChildren}</p> GIVER OBJECT OBJECT OBJECT-->

{#each myChildren as child}
    <Child child={child} onShowLove={handleShowLove} onTakeTreasure={handleTakeTreasure}></Child>
{/each}