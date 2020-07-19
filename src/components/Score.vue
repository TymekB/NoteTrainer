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
            {{this.answers}}
            <Notes v-on:next-note="drawRandomNote"></Notes>
        </div>

        <Summary></Summary>
    </div>
</template>

<script>
    import Vex from 'vexflow';
    import Notes from "./Notes";
    import {mapGetters, mapActions} from 'vuex';
    import $ from 'jquery';
    import microModal from 'micromodal';
    import Summary from "./Summary";

    export default {
        name: "Score",
        components: {Summary, Notes},
        data: function () {
            return {
                clefChosen: false
            }
        },
        computed: mapGetters(['note', 'previousNotes', 'clef', 'answers']),
        methods: {
            ...mapActions(['setRandomNote', 'setClef', 'reset']),
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

                if (this.previousNotes.length >= 28) {
                    microModal.show('modal-1', {
                        onClose: this.restart
                    });
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
            },
            restart() {
                this.reset();
                this.clefChosen = false;
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
