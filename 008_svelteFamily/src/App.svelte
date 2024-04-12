<script>
  import Home from "./Home/Home.svelte";
  import Parent from "./Parent/Parent.svelte";

  let parents = ["Niels", "Ulla" ];
  let children = [
    {
      name: "NIels Jr.",
      familySheep: "black-sheep",
    },
    {
      name: "Oscar",
      familySheep: "grey-sheep",
    },
    {
      name: "Ditte",
      isRich: true,
    },
  ]
</script>

<main>
<p>Welcome frontpage</p>
<Home>
  <p>First of Home from frontpage!</p>
  <Parent parentName={parents[0]} myChildren={children}></Parent>
  <Parent parentName={parents[1]} myChildren={children}></Parent>
</Home>

</main>


<style>
</style>
