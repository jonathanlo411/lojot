<script lang='ts'>
    export let name: String;
    export let title: String;
    export let id: String;

    let redirect = (name: String) => () => window.open(`https://${name}.lojot.com/`, '_blank')
</script>


<button class="card {id}" on:click={redirect(name)}>
    <h1>{title}</h1>
    <p id="psuedo-link">https://{name}.lojot.com/</p>
</button>

<style>
    @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
    * {
        box-sizing: border-box;
        margin: 0;
    }
    .card {
		font-family: 'Montserrat', 'Poppins';
        margin: 0.35rem;
        border: 1px solid black;
        border-radius: 7px;
        background-color: white;
        padding: 1rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        transition: 0.3s;
    }
    .card:hover {
        cursor: pointer;
        background-color: rgb(241, 241, 241);
    }
    .card * {
        margin: 2%;
    }

    .card h1 {
        font-size: 1rem;
    }
    #psuedo-link, #psuedo-link:visited { color: blue; }
</style>