<template>
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
                        <span class="success">Correct answers:</span>
                        {{this.answers.correct.length}}
                        ({{correctAnswersPercentage}}%)
                        <br>
                        <template v-for="(note, index) in this.answers.correct">
                            {{note}}
                            <span v-if="answers.correct.length-1 !== index" v-bind:key="index">,</span>
                        </template>
                    </p>
                    <p>
                        <span class="danger">Wrong answers:</span>
                        {{this.answers.wrong.length}}
                        ({{wrongAnswersPercentage}}%)
                        <br>
                        <template v-for="(note, index) in this.answers.wrong">
                            {{note}}
                            <span v-if="answers.wrong.length-1 !== index" v-bind:key="index">,</span>
                        </template>
                    </p>
                    <p>
                        Time: {{timeInSeconds}} s <br>
                        <b v-if="bestScore">Best score: </b>{{bestScore}} s
                    </p>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import SecureLS from 'secure-ls';

    export default {
        name: "Summary",
        props: ['time'],
        data: function() {
            return {
                bestScore: null
            }
        },
        computed: {
            ...mapGetters(['answers']),
            timeInSeconds: function () {
                return (this.time / 1000).toFixed(2);
            },
            answersSum: function () {
                return this.answers.correct.length + this.answers.wrong.length;
            },
            correctAnswersPercentage: function () {
                return Math.round((this.answers.correct.length / (this.answersSum)) * 100);
            },
            wrongAnswersPercentage: function () {
                return Math.round((this.answers.wrong.length / (this.answersSum)) * 100);
            }
        },
        methods: {
            setBestScore() {
                const ls =  new SecureLS();
                const previousScore = ls.get('bestScore');

                if(previousScore == false || this.timeInSeconds < parseInt(previousScore)) {
                    this.bestScore = this.timeInSeconds;
                    ls.set('bestScore', this.timeInSeconds);
                } else {
                    this.bestScore = previousScore;
                }
            }
        },
        mounted() {
            this.setBestScore();
        }
    }
</script>

<style scoped>

</style>
