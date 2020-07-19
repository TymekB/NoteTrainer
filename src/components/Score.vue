<template>
    <div>
        <div id="clef" v-if="!clefChosen">
            Choose clef
            <button v-on:click="chooseClef('treble')" class="clef-btn">Treble</button>
            <button v-on:click="chooseClef('bass')" class="clef-btn">Bass</button>
        </div>

        <div id="score" v-if="clefChosen">
            <h2>{{previousNotes.length}}/28</h2>
            <div id="easy-score"></div>

            <Notes :notes="notes" v-on:next-note="drawRandomNote"></Notes>
        </div>

        <div class="modal micromodal-slide" id="modal-1" aria-hidden="true">
            <div class="modal-overlay" tabindex="-1" data-micromodal-close>
                <div class="modal-container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
                    <header class="modal-header">
                        <h2 class="modal-title" id="modal-1-title">
                            Summary
                        </h2>
                        <button class="modal-close" aria-label="Close modal" data-micromodal-close></button>
                    </header>
                    <main class="modal-content" id="modal-1-content">
                        <p>
                            <span style="color: #42b883; font-weight: bold">Correct answers:</span> {{this.answers.correct.length}}
                            ({{correctAnswersPercentage}}%)
                            <br>
                            <template v-for="(note, index) in this.answers.correct">
                                {{note}}
                                <span v-if="answers.correct.length-1 !== index" v-bind:key="index">,</span>
                            </template>
                        </p>
                        <p>
                            <span style="color: #b84242; font-weight: bold">Wrong answers:</span> {{this.answers.wrong.length}}
                            ({{wrongAnswersPercentage}}%)
                            <br>
                            <template v-for="(note, index) in this.answers.wrong">
                                {{note}}
                                <span v-if="answers.wrong.length-1 !== index" v-bind:key="index">,</span>
                            </template>
                        </p>
                    </main>
                    <footer class="modal-footer">

                    </footer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vex from 'vexflow';
    import Notes from "./Notes";
    import {mapGetters, mapActions} from 'vuex';
    import $ from 'jquery';
    import microModal from 'micromodal';

    export default {
        name: "Score",
        components: {Notes},
        data: function () {
            return {
                clefChosen: false
            }
        },
        computed: {
            ...mapGetters(['notes', 'note', 'previousNotes', 'clef', 'answers']),
            answersSum: function() {
                return this.answers.correct.length + this.answers.wrong.length;
            },
            correctAnswersPercentage: function() {
                return Math.floor((this.answers.correct.length / (this.answersSum)) * 100);
            },
            wrongAnswersPercentage: function() {
                return Math.floor((this.answers.wrong.length / (this.answersSum)) * 100);
            }
        },
        methods: {
            ...mapActions(['setRandomNote', 'setClef']),
            clearScore() {
                $('#easy-score').empty();
            },
            drawNote(note) {
                this.clearScore();

                const vf = new Vex.Flow.Factory({
                    renderer: {
                        elementId: 'easy-score', height: 150, width: 300
                    }
                });
                const score = vf.EasyScore();
                const system = vf.System();

                system.addStave({
                    voices: [score.voice(score.notes(note + '/1', {clef: this.clef}))]
                }).addClef(this.clef).addTimeSignature('4/4');

                vf.draw();
            },
            drawRandomNote() {
                this.setRandomNote();
                this.drawNote(this.note);

                if(this.previousNotes.length >= 28) {
                    microModal.show('modal-1', {});
                }
            },
            chooseClef(clef) {
                this.setClef(clef);
                this.clefChosen = true;

                setTimeout(() => {
                    for(let i = 0; i <= 26; i++) {
                        this.drawRandomNote();
                    }
                }, 10);
            }
        }
    }
</script>

<style scoped>
    #score h2 {
        font-weight: 300;
        margin: 0;
        padding: 0;
        text-align: center;
    }

    #clef {
        text-align: center;
    }

    .clef-btn {
        padding: 6px;
        font-size: 14px;
        width: 100%;
        border-radius: 50px;
        margin-top: 10px;
        margin-bottom: 10px;
        outline: none;
        color: #303030;
        transition: 0.5s;
        background-color: #fdfdfd;
        border: 1px solid #d7d7d7;
    }

    .clef-btn:hover {
        background: #f5f5f5;
        cursor: pointer;
    }
</style>
