<script lang='ts'>
    import Select from 'svelte-select';
    import DomainCard from '$lib/client/admin-domain-card.svelte'
    import type { PageData } from "./$types";
    export let data: PageData;

    let topics = data['domains'].map((d: Domain) => d.topic);
    topics = Array.from(new Set(topics));
    let items = topics.map((d) => {return { value: d, label: d}})
    let filterText = '';

    function handleFilter(e: any) {        
        if (e.detail.length === 0 && filterText.length > 0) {
            const prev = items.filter((i) => !i.created);
            items = [...prev, { value: filterText, label: filterText, created: true }];
        }
    }
    
    function handleChange(e: CustomEvent) {
        items = items.map((i) => {
            delete i.created;
            return i;
        });
    }

</script>

<section>
    <p>Create, Read, Update, and Destroy events here. Submit empty all empty fields to delete the entry.</p>
    <h2>Domains</h2>
    <div class="domain-list">
        {#each data['domains'] as domain}
            <div class="card-section">
                <div class="card-list">
                    <DomainCard
                        id={domain.id}
                        name={domain.name}
                        title={domain.title}
                        topic={domain.topic}
                        topicList={items}
                    />
                </div>
            </div>
        {/each}
    </div>
    <hr>
    <div id="add-domain" class="domain-list">
        <form action="?/addDomain" method="POST">
            <Select
                name='topic'
                class="new-field"
                on:change={handleChange}
                on:filter={handleFilter}
                bind:filterText
                items={items}
                placeholder='Topic'
            >
                <div slot="item" let:item>
                    {item.created ? 'Add new: ' : ''}
                    {item.label}
                </div>
            </Select>
            <input name='name' placeholder="Domain" class="new-field" type='text' />
            <input name='tite' placeholder="Title" class="new-field" type='text' />
            <button class="submit-bt" type='submit'><svg xmlns="http://www.w3.org/2000/svg" height='16' width='16' viewBox="0 0 32 32"><path fill="currentColor" d="m13 24l-9-9l1.414-1.414L13 21.171L26.586 7.586L28 9z"/></svg></button>
        </form>
    </div>
</section>

<style>
	@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
    h2 {
        margin-top: 2rem;
        font-size: 1.5rem;
    }
    .domain-list {
        margin: 1rem auto;
    }
    #add-domain form {
        display: flex;
        width: 100%;
        justify-content: space-evenly;
    }
    :global(.new-field) {
        width: 30% !important;
        font-family: 'Montserrat' !important;
        font-size: 1rem !important;
        border-radius: 5px;
        border: 1px solid var(--border-color) !important;
        transition: 0.15s !important;
    }
    :global(.new-field:hover) {
        cursor: pointer;
        border: 1px solid black !important;
    }

    :global(.submit-bt) {
        display: flex;
        align-items: center;
        transition: 0.2s;
        border: 1px solid white;
        border-radius: 5px;
        margin: 0.1rem 0;
        background-color: var(--highlight);
        color: white;
    }
    :global(.submit-bt:hover) {
        cursor: pointer;
        background-color: var(--highlight-lighten);
        border: 1px solid black;
    }
</style>
