<script lang='ts'>
    import webconfig from "$webconfig/config.json";
    import PreviewCard from "$lib/client/subdomain-card.svelte";

    let projects: Object[] = webconfig['projects'];
    let experiments: Object[] = webconfig['experiments'];
    let schoolwork: Object[] = webconfig['schoolwork'];
</script>


<section>
    <div id="center">
        <h1 id="title">Lojot</h1>
        <p id="description">This site contains information about all the subdomains attached to <a target='_blank' rel='noreferrer' href='https://lojot.com'>lojot.com</a>. The websites list are generally miscellaneous personal projects, schoolwork, things that happen to be attached to my domain.</p>
        
        {#each Object.entries(webconfig) as [topic, domainInfo]}
            <!-- {topic} -->
            <div class="card-section">
                <h2>{topic}</h2>
                <div class="card-list">
                {#each domainInfo as subdomain}
                    <PreviewCard {...subdomain} />
                {/each}
                </div>
            </div>
        {/each}
    </div>
</section>


<style global>
    @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
    * {
        box-sizing: border-box;
        margin: 0;
    }
    :global(body) {
        /* General Styling */
        box-sizing: border-box;
        margin: 0;

        /* Color vars */
        --base-bg: #f8f8f8;
    }
    a, a:visited { color: blue; }
    
    section {
		font-family: 'Montserrat', 'Poppins';
		background-color: var(--base-bg);
		height: 100vh;
	}

    #center {
        width: 900px;
        margin: 0 auto;
    }
    #title {
        padding-top: 3rem;
        font-size: 2.5rem;
        font-weight: bold;
    }
    #description {
        font-size: 1.1rem;
    }

    .card-section {
        margin: 2rem 0;
    }
    .card-section h2 {
        font-size: 2rem;
    }
    .card-list {
        display: grid;
        margin: auto;
        grid-template-columns: repeat(3, 33%);
        grid-auto-rows: 0.5fr;
    }

</style>