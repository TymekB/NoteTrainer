<template>
    <div class="notes">
        <div class="column">
            <button class="note-btn">C</button>
            <button class="note-btn">D</button>
            <button class="note-btn">E</button>
        </div>

        <div class="column">
            <button class="note-btn">F</button>
            <button class="note-btn">G</button>
            <button class="note-btn">A</button>
            <button class="note-btn">B</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Notes",
    }
</script>

<style scoped>

    .notes {
        margin-left: 10px;
    }

    .column {
        display: flex;
        justify-content: space-between;
    }

    button.note-btn {
        padding: 6px;
        font-size: 14px;
        width: 50px;
        background: #fdfdfd;
        border: 1px solid #d7d7d7;
        border-radius: 3px;
        margin-bottom: 10px;
        outline: none;
    }

    button.note-btn:hover {
        background: #f5f5f5;
        cursor: pointer;
    }
</style>
