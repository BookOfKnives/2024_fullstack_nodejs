<script>
    import {onMount} from "svelte"
    let movies = [];

    onMount(async () => {

        fetch("http://localhost:8080/api/movies")
        .then((response) => (response.json()))
        .then((result) => {
            movies = result.data;
        });
    });
</script>

<h1>Movies</h1>
{#each movies as movie}
{movie.title}
{/each}


