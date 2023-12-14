<script lang='ts'>
    import Select from 'svelte-select';

    export let id: String;
    export let name: String;
    export let title: String;
    export let topic: String;
    export let topicList: Object[];

    let filterText = '';

    function handleFilter(e: CustomEvent) {        
        if (e.detail.length === 0 && filterText.length > 0) {
            const prev = topicList.filter((i) => !i.created);
            topicList = [...prev, { value: filterText, label: filterText, created: true }];
        }
    }
    
    function handleChange(e: CustomEvent) {
        topicList = topicList.map((i) => {
            delete i.created;
            return i;
        });
    }
</script>

<div>
    <form action="?/updateDomain" method="POST" class="updateDomain">
        <input type="hidden" name="id" value={id} />
        <Select
            name='topic'
            class="cur-field"
            on:change={handleChange}
            on:filter={handleFilter}
            bind:filterText
            items={topicList}
            value={topic}
        >
            <div slot="item" let:item>
                {item.created ? 'Add new: ' : ''}
                {item.label}
            </div>
        </Select>
        <input name='name' value={name} placeholder="Domain" class="cur-field" type='text' />
        <input name='tite' value={title} placeholder="Title" class="cur-field" type='text' />
        <button class="submit-bt" type='submit'><svg xmlns="http://www.w3.org/2000/svg" height='16' width='16' viewBox="0 0 32 32"><path fill="currentColor" d="m13 24l-9-9l1.414-1.414L13 21.171L26.586 7.586L28 9z"/></svg></button>
    </form>
</div>

<style>
	@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
    .updateDomain {
        display: flex;
        width: 100%;
        justify-content: space-evenly;
        flex-direction: row;
        margin: .8rem auto;
    }
    :global(.cur-field) {
        width: 30% !important;
        font-family: 'Montserrat' !important;
        font-size: 1rem !important;
        border: 1px solid var(--border-color);
        border-radius: 5px !important;
        transition: 0.15s !important;
        outline: none !important;
    }
    :global(.cur-field:hover) {
        cursor: pointer;
        border: 1px solid black;
    }
    :global(.cur-field:focus) { border: 1px solid black }
</style>
