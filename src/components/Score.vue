<template>
    <div id="score">

    </div>
</template>

<script>
    import Vex from 'vexflow';

    export default {
        name: "Score",
        data: function() {
            return {
                vf: null,
                score: null,
                system: null
            }
        },
        methods: {
            drawNote(note) {
                const vf = new Vex.Flow.Factory({renderer: {elementId: 'score', height: 150, width: 300}});
                const score = vf.EasyScore();
                const system = vf.System();

                system.addStave({
                    voices: [score.voice(score.notes(note+ '/1'))]
                }).addClef('treble').addTimeSignature('4/4');

                vf.draw();
            },

        },
        mounted() {
            this.drawNote('C3');
        }
    }
</script>

<style scoped>
</style>
