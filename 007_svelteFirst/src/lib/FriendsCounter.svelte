<script>
  export let count = 0
  const increment = () => {
    count += 1
  }
</script>

<button on:click={increment}>
  friends is {count}
</button>
