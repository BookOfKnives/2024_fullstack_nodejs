<script>
import Login from "./lib/Login.svelte";
</script>

<div id="front-container-div">
  <div id="container-1-div" class="front-grid-div">
    <Login />
  </div>
  <div id="container-2-div" class="front-grid-div">
    <h1>Welcome to frontend of manda2.</h1>
  </div>
  <div id="container-3-div" class="front-grid-div">
    <h2>This is the front,yes ?</h2>
  </div>
  <div id="container-4-div" class="front-grid-div">
    <!-- <p>dont put anaything here -- see CSS, its hidden</p> -->
  </div>
  <div id="container-5-div" class="front-grid-div">
    <p>a foorter??</p>
  </div>
  <div class="front-grid-div">
  </div>
  <div class="front-grid-div">
  </div>
  <div class="front-grid-div">
  </div>
  <div class="front-grid-div">
  </div>
</div>
<style>
#front-container-div {
  margin: 5px;
  background-color: #676;
  border: 2px solid #9a9;
  display: grid;
  grid-template-rows: 100px 300px 100px;
  grid-template-columns: 200px 400px 100px;
}
</style>
