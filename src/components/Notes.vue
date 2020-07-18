<template>
    <div class="notes">
        <div class="column" v-for="i in 2" :key="i">
            <button :disabled="disabled" class="note-btn"
                    v-for="note in notes.slice((i-1)*3, Math.floor(notes.length / (2-(i-1))))" :key="note"
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
        data: function () {
            return {
                disabled: false
            }
        },
        computed: mapGetters(['note']),
        methods: {
            clearButtonsStyle() {
                const background = '#fdfdfd';
                const borderColor = '#d7d7d7';

                document.querySelectorAll('.note-btn').forEach((el) => {
                    el.style.background = background;
                    el.style.borderColor = borderColor;
                });
            },
            checkNote(event, note) {
                console.log(note);
                if (note === this.note.substring(-1, 1)) {

                    this.disabled = true;
                    event.target.style.background = '#27ae60';
                    event.target.style.borderColor = '#258744';

                    setTimeout(() => {
                        this.disabled = false;
                        this.clearButtonsStyle();
                        this.$emit('next-note');
                    }, 850);
                } else {
                    event.target.style.background = '#e74c3c';
                    event.target.style.borderColor = '#b94537';
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
        color: #303030;
        transition: 0.5s;
    }

    button.note-btn:hover {
        background: #f5f5f5;
        cursor: pointer;
    }

    button.note-btn:disabled {
        background: #fdfdfd;
        border: 1px solid #d7d7d7;
        color: #303030;
    }

</style>
