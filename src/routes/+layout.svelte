
<section>
    <div id="center">
        <a href='/' id="title">Lojot</a>
        <slot></slot>
    </div>
</section>

<style>
    /* General Styling */
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
    
    section {
		font-family: 'Montserrat', 'Poppins';
		background-color: var(--base-bg);
		height: 100vh;
	}

    #center {
        width: min(900px, 93.5%);
        margin: 0 auto;
        padding-top: 3rem;
    }
    #title, #title:visited {
        font-size: 2.5rem;
        font-weight: bold;
        color: black;
        text-decoration: none;
    }
    #title:hover {
        text-decoration: underline;
        cursor: pointer;
    }
</style>