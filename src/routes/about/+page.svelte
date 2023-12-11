<script lang='ts'>
    import questions from "$webconfig/faq.json";
</script>

<section>
    {#each Object.entries(questions) as [question, response]}
        <div class="answer-segment">
            <h2>{question}</h2>
            <p>{response}</p>
        </div>
    {/each}
</section>

<style>
    * {
        margin: 0;
    }

    .answer-segment {
        margin: 1.25rem auto;
    }
    .answer-segment h2 { font-size: 1.2rem; }
    .answer-segment p { font-size: 1rem; }
</style>
