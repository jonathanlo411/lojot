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
    
    async function iconHandler() {
        const submit: HTMLInputElement = document.querySelector(`#update-${id}`)!;
        const destroy: HTMLInputElement = document.querySelector(`#delete-${id}`)!;
        const titleField: HTMLInputElement = document.querySelector(`#title-field-${id}`)!;
        const domainField: HTMLInputElement = document.querySelector(`#name-field-${id}`)!;

        console.log(domainField.value)
        console.log(domainField.value === '')
        if (domainField.value === '' || titleField.value === '') {
            submit.style.display = 'none'
            destroy.style.display = 'flex'
        } else {
            submit.style.display = 'flex'
            destroy.style.display = 'none'
        }
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
        <input name='name' id="name-field-{id}" value={name} placeholder="Domain" class="cur-field" type='text' on:keyup={iconHandler} />
        <input name='title' id="title-field-{id}" value={title} placeholder="Title" class="cur-field" type='text' on:keyup={iconHandler} />
        <button class="mod-bt" type='submit'>
            <svg class='update' id="update-{id}" xmlns="http://www.w3.org/2000/svg" height='16' width='16' viewBox="0 0 32 32"><path fill="currentColor" d="m13 24l-9-9l1.414-1.414L13 21.171L26.586 7.586L28 9z"/></svg>
            <svg class='delete' id="delete-{id}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"/></svg>
        </button>
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
        padding-left: 0.5rem !important;
    }
    :global(.cur-field:hover) {
        cursor: pointer;
        border: 1px solid black;
    }
    :global(.cur-field:focus) { border: 1px solid black }

    .mod-bt {
        margin: 0;
        padding: 0;
        border: none;
        outline: none;
        background-color: transparent;
    }
    .mod-bt svg {
        align-items: center;
        transition: 0.2s;
        border: 1px solid white;
        border-radius: 5px;
        margin: 0.1em 0;
        color: white;
        height: 2rem;
        width: 2rem;
        padding: 0.13rem;
    }
    .mod-bt svg:hover {
        cursor: pointer;
        border: 1px solid black;
    }
    .update { background-color: var(--highlight); display: flex; }
    .delete { background-color: red; display: none; }
    .update:hover { background-color: var(--highlight-lighten); }
    .delete:hover { background-color: rgb(248, 70, 70); }
</style>
