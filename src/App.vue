<template>
    <div id="app">
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
</style>
