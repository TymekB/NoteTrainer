<template>
    <div id="app">
        <h1 class="logo">Note<span style="color: #42b883; font-weight: bold">Trainer</span></h1>
        <Score></Score>
    </div>
</template>

<script>
    import Score from "./components/Score";

    export default {
        name: 'App',
        components: {
            Score
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin-top: 60px;
        width: 300px;
        margin-left: auto;
        margin-right: auto;
    }

    button {
        font-family: Avenir, Helvetica, Arial, sans-serif;
    }

    h1.logo {
        font-weight: 300;
        text-align: center;
    }

    .modal {
        font-family: -apple-system,BlinkMacSystemFont,avenir next,avenir,helvetica neue,helvetica,ubuntu,roboto,noto,segoe ui,arial,sans-serif;
    }

    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.6);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-container {
        background-color: #fff;
        padding: 30px;
        min-width: 400px;
        max-width: 500px;
        max-height: 100vh;
        border-radius: 4px;
        overflow-y: auto;
        box-sizing: border-box;
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .modal-title {
        margin-top: 0;
        margin-bottom: 0;
        font-weight: bold;
        font-size: 1.25rem;
        line-height: 1.25;
        box-sizing: border-box;
    }

    .modal-close {
        background: transparent;
        border: 0;
    }

    .modal-header .modal-close:before { content: "\2715"; }

    .modal-content {
        margin-top: 1rem;
        margin-bottom: 2rem;
        line-height: 1.5;
        color: rgba(0,0,0,.8);
    }

    /**************************\
      Demo Animation Style
    \**************************/
    @keyframes mmfadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes mmfadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }

    @keyframes mmslideIn {
        from { transform: translateY(15%); }
        to { transform: translateY(0); }
    }

    @keyframes mmslideOut {
        from { transform: translateY(0); }
        to { transform: translateY(-10%); }
    }

    .micromodal-slide {
        display: none;
    }

    .micromodal-slide.is-open {
        display: block;
    }

    .micromodal-slide[aria-hidden="false"] .modal-overlay {
        animation: mmfadeIn .3s cubic-bezier(0.0, 0.0, 0.2, 1);
    }

    .micromodal-slide[aria-hidden="false"] .modal-container {
        animation: mmslideIn .3s cubic-bezier(0, 0, .2, 1);
    }

    .micromodal-slide[aria-hidden="true"] .modal-overlay {
        animation: mmfadeOut .3s cubic-bezier(0.0, 0.0, 0.2, 1);
    }

    .micromodal-slide[aria-hidden="true"] .modal-container {
        animation: mmslideOut .3s cubic-bezier(0, 0, .2, 1);
    }

    .micromodal-slide .modal-container,
    .micromodal-slide .modal-overlay {
        will-change: transform;
    }

</style>
