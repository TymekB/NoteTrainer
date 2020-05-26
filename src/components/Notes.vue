<template>
    <div class="notes">
        <div class="column">
            <button class="note-btn" v-for="note in notes.slice(0,3)" :key="note"
                    v-on:click="checkNote($event, note)">{{note}}
            </button>
        </div>

        <div class="column">
            <button class="note-btn" v-for="note in notes.slice(3,notes.length)" :key="note"
                    v-on:click="checkNote($event, note)">{{note}}
            </button>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "Notes",
        props: ['notes'],
        computed: mapGetters(['note']),
        methods: {
            checkNote(event, note) {

                if (note === this.note.substring(-1, 1)) {
                    console.log('right');

                    setTimeout(() => {
                        this.$emit('next-note');
                    }, 1000);
                } else {
                    console.log('wrong');
                }


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
