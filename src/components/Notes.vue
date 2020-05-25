<template>
    <div class="notes">
        <div class="column">
            <button class="note-btn" v-for="note in notes.slice(0,3)" :key="note">{{note}}</button>
        </div>

        <div class="column">
            <button class="note-btn" v-for="note in notes.slice(3,notes.length)" :key="note">{{note}}</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Notes",
        data: function() {
            return {
                notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B']
            }
        }
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
