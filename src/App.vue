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
</style>
