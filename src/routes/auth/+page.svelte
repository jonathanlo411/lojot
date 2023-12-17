<script lang='ts'>
    import { deserialize } from '$app/forms';
    import type { PageData } from "../$types";

    export let data: PageData;

    let passkey = '';
    let errorMessage = '';

    if (data.msg) errorMessage = data.msg

    // Validating responses
    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault()

        if (!passkey.trim()) {
            errorMessage = 'Passkey cannot be empty';
            return;
        }

        // Submitting response
        let fetchRes = await fetch('?/login', {
            method: 'POST',
            body: JSON.stringify({ passkey })
        })
        const result = deserialize(await fetchRes.text())['data'];
        if (result.redirect) {
            location.href = '/admin'
        } else if (result.msg) {
            errorMessage = result.msg;
        }
    }

</script>

<section>
    <form action="?/login" method="POST" id='login-module' on:submit={handleSubmit}>
        <input name="passkey" type='text' bind:value={passkey} placeholder='Enter the key...' />
        <button type='submit'>Enter</button>
    </form>
    
    {#if errorMessage}
        <p id='error'>{errorMessage}</p>
    {/if}
</section>

<style>
    /* General Styling */
    @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
    * {
        margin: 0;
        box-sizing: border-box;
    }
    section {
        font-family: 'Montserrat';
    }
    #login-module {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin: 2rem auto;
        width: 50%;
    }
    #login-module input, button {
        width: 100%;
        padding: 0.5rem;
        font-size: 1rem;
        margin: 1% 0;
        border-radius: 5px;
        outline: none;
        border: 1px solid var(--border-color);
        transition: 0.3s;
    }
    #login-module input:hover { 
        border: 1px solid black;
        cursor: pointer;
    }
    #login-module input:focus {
        border: 1px solid black;
    }
    button {
        display: flex;
        align-items: center;
        transition: 0.2s;
        border: 1px solid white;
        border-radius: 5px;
        margin: 0.1rem 0;
        background-color: var(--highlight);
        color: white;
        text-align: center;
        justify-content: space-evenly;
    }
    button:hover {
        cursor: pointer;
        background-color: var(--highlight-lighten);
        border: 1px solid black;
    }

    #error {
        background-color: red;
        color: white;
        border-radius: 5px;
        font-weight: bold;
        font-size: 1rem;
        position: absolute;
        bottom: 3rem; 
        left: 50%;
        transform: translate(-50%, 0);
        padding: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }

    /* Modile Stuff */
    @media only screen and (max-width: 600px) {
        #login-module {
            width: 100%;
        }
        #login-module input, button {
            padding: 1rem;
        }
    }
</style>