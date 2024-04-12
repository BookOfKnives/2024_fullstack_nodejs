<script>
import Login from "./lib/Login.svelte";
</script>

<div id="front-container-div">

  <Login />
  <h1>Welcome to frontend of manda2.</h1>
  <h2>This is the front,yes ?</h2>
</div>
<style>
#front-container-div {
  margin: 5px;
  background-color: #676;
  border: 2px solid #9a9;
  display: grid;
  grid-template-rows: 100px 400px 100px;
  grid-template-columns: 100px 400px 100px;
}
</style>
