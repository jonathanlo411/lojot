
<section>
    <div id="center">
        <div id="nav">
            <a href='/' id="title">Lojot</a>
            <a id="console" href='/auth'>console</a>
        </div>
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
        --border-color: #e6e8ea;
        --highlight: #2e86df;
        --highlight-lighten: #79aee4;
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

    #nav {
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: space-between;
    }
    #console { margin-right: 1rem; } 
    #title { font-size: 2.5rem;}
    a, a:visited {
        font-weight: bold;
        color: black;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
        cursor: pointer;
    }
</style>