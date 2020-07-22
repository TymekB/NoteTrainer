<template>
    <div class="notes">
        <div class="column" v-for="i in 2" :key="i">
            <button class="note-btn note-btn-default"
                    v-for="note in notes.slice((i-1)*3, Math.floor(notes.length / (2-(i-1))))" :key="note"
                    v-on:click="checkNote($event, note)">{{note}}
            </button>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import $ from 'jquery';

    export default {
        name: "Notes",
        computed: {
            ...mapGetters(['notes', 'note', 'previousNotes'])
        },
        methods: {
            ...mapActions(['setAnswer']),
            checkNote(event, note) {
                if (this.previousNotes.length >= this.max) {
                    return;
                }

                if (note === this.note.substring(-1, 1)) {
                    this.setAnswer({correct: true, answer: this.note});

                    $(event.target).removeClass('note-btn-default')
                        .addClass('note-btn-success');

                    $('.note-btn').attr('disabled', true);

                    setTimeout(() => {
                        $('.note-btn').attr('disabled', false)
                            .removeClass('note-btn-success note-btn-danger')
                            .addClass('note-btn-default');

                        this.$emit('next-note');
                    }, 500);
                } else {
                    this.setAnswer({correct: false, answer: this.note});

                    $(event.target).removeClass('note-btn-default')
                        .addClass('note-btn-danger')
                        .attr('disabled', true);
                }
            }
        },
    }
</script>

<style scoped>

    .notes {
        margin-left: 10px;
        margin-top: 20px;
    }

    .column {
        display: flex;
        justify-content: space-between;
    }

    button.note-btn {
        padding: 6px;
        font-size: 14px;
        width: 50px;
        border-radius: 3px;
        margin-bottom: 10px;
        outline: none;
        color: #303030;
        transition: 0.5s;
    }

    .note-btn-default {
        background-color: #fdfdfd;
        border: 1px solid #d7d7d7;
    }

    button.note-btn-default:hover {
        background: #f5f5f5;
        cursor: pointer;
    }

    button.note-btn-success {
        background: #27ae60;
        border-color: #258744;
    }

    button.note-btn-danger {
        background: #f04c3c;
        border-color: #b94537;
    }

</style>
