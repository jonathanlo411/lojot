<script lang='ts'>
    import webconfig from "$webconfig/domains.json";
    import PreviewCard from "$lib/client/subdomain-card.svelte";
</script>

<section>
    <p id="description">This site contains information about all the subdomains attached to <a target='_blank' rel='noreferrer' href='https://lojot.com'>lojot.com</a>. The websites list are generally miscellaneous personal projects, schoolwork, things that happen to be attached to my domain. For more information click <a href='/about'>here</a>.</p>
    {#each Object.entries(webconfig) as [topic, domainInfo]}
        {#if domainInfo.length != 0}
        <!-- {topic} -->
        <div class="card-section">
            <h2>{topic}</h2>
            <div class="card-list">
            {#each domainInfo as subdomain}
                <PreviewCard {...subdomain} />
            {/each}
            </div>
        </div>
        {/if}
    {/each}
</section>

<style global>
    * {
        box-sizing: border-box;
        margin: 0;
    }
    a, a:visited { color: blue;; }


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
        margin: 0.5rem auto;
        grid-template-columns: repeat(3, 33%);
        grid-auto-rows: 0.5fr;
    }

    /* Modile Stuff */
    @media only screen and (max-width: 600px) {
        #description {
            font-size: 1.3rem;
        }

        .card-list {
            grid-template-columns: repeat(1, 100%);
            grid-auto-rows: 0.5fr;
            padding: 2rem 0;
        }
    }
</style>