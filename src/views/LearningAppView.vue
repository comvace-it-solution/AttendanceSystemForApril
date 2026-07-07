<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  learningCards,
  learningChapters,
  quizQuestions,
  type LearningCard,
  type QuizQuestion,
} from '@/data/learning-content'

type StudyMode = 'cards' | 'quiz'

type LearningProgress = {
  studiedCardIds: string[]
  correctQuestionIds: string[]
  incorrectQuestionIds: string[]
}

const STORAGE_KEY = 'typescript-learning-progress'

const defaultProgress: LearningProgress = {
  studiedCardIds: [],
  correctQuestionIds: [],
  incorrectQuestionIds: [],
}

const loadProgress = (): LearningProgress => {
  const rawValue = localStorage.getItem(STORAGE_KEY)

  if (!rawValue) {
    return defaultProgress
  }

  try {
    const value = JSON.parse(rawValue) as Partial<LearningProgress>

    return {
      studiedCardIds: Array.isArray(value.studiedCardIds) ? value.studiedCardIds : [],
      correctQuestionIds: Array.isArray(value.correctQuestionIds) ? value.correctQuestionIds : [],
      incorrectQuestionIds: Array.isArray(value.incorrectQuestionIds)
        ? value.incorrectQuestionIds
        : [],
    }
  } catch {
    return defaultProgress
  }
}

const progress = ref<LearningProgress>(loadProgress())
const selectedChapterId = ref(learningChapters[0]?.id ?? '')
const selectedCardId = ref(learningCards[0]?.id ?? '')
const selectedQuestionId = ref(quizQuestions[0]?.id ?? '')
const selectedAnswer = ref('')
const isAnswered = ref(false)
const mode = ref<StudyMode>('cards')

watch(
  progress,
  (value) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  },
  { deep: true },
)

const selectedChapter = computed(() =>
  learningChapters.find((chapter) => chapter.id === selectedChapterId.value),
)

const chapterCards = computed(() =>
  learningCards.filter((card) => card.chapterId === selectedChapterId.value),
)

const chapterQuestions = computed(() =>
  quizQuestions.filter((question) => question.chapterId === selectedChapterId.value),
)

const selectedCard = computed<LearningCard | undefined>(() =>
  learningCards.find((card) => card.id === selectedCardId.value),
)

const selectedQuestion = computed<QuizQuestion | undefined>(() =>
  quizQuestions.find((question) => question.id === selectedQuestionId.value),
)

const studiedCardSet = computed(() => new Set(progress.value.studiedCardIds))
const correctQuestionSet = computed(() => new Set(progress.value.correctQuestionIds))
const incorrectQuestionSet = computed(() => new Set(progress.value.incorrectQuestionIds))

const studiedCount = computed(() => progress.value.studiedCardIds.length)
const answeredCount = computed(
  () => new Set([...progress.value.correctQuestionIds, ...progress.value.incorrectQuestionIds]).size,
)
const correctCount = computed(() => progress.value.correctQuestionIds.length)
const totalCards = computed(() => learningCards.length)
const totalQuestions = computed(() => quizQuestions.length)

const chapterStudiedCount = computed(
  () => chapterCards.value.filter((card) => studiedCardSet.value.has(card.id)).length,
)

const chapterCorrectCount = computed(
  () => chapterQuestions.value.filter((question) => correctQuestionSet.value.has(question.id)).length,
)

const selectedQuestionIndex = computed(() => {
  return chapterQuestions.value.findIndex((question) => question.id === selectedQuestionId.value)
})

const selectedCardIndex = computed(() => {
  return chapterCards.value.findIndex((card) => card.id === selectedCardId.value)
})

const currentQuestionStatus = computed(() => {
  if (!selectedQuestion.value || !isAnswered.value) {
    return ''
  }

  return selectedAnswer.value === selectedQuestion.value.answer ? 'correct' : 'incorrect'
})

const selectChapter = (chapterId: string) => {
  selectedChapterId.value = chapterId
  selectedCardId.value =
    learningCards.find((card) => card.chapterId === chapterId)?.id ?? learningCards[0]?.id ?? ''
  selectedQuestionId.value =
    quizQuestions.find((question) => question.chapterId === chapterId)?.id ??
    quizQuestions[0]?.id ??
    ''
  selectedAnswer.value = ''
  isAnswered.value = false
}

const selectCard = (cardId: string) => {
  selectedCardId.value = cardId
  mode.value = 'cards'
}

const selectQuestion = (questionId: string) => {
  selectedQuestionId.value = questionId
  selectedAnswer.value = ''
  isAnswered.value = false
  mode.value = 'quiz'
}

const markStudied = () => {
  if (!selectedCard.value || studiedCardSet.value.has(selectedCard.value.id)) {
    return
  }

  progress.value.studiedCardIds = [...progress.value.studiedCardIds, selectedCard.value.id]
}

const answerQuestion = (choice: string) => {
  if (!selectedQuestion.value || isAnswered.value) {
    return
  }

  selectedAnswer.value = choice
  isAnswered.value = true

  const isCorrect = choice === selectedQuestion.value.answer
  const questionId = selectedQuestion.value.id

  progress.value.correctQuestionIds = progress.value.correctQuestionIds.filter((id) => id !== questionId)
  progress.value.incorrectQuestionIds = progress.value.incorrectQuestionIds.filter(
    (id) => id !== questionId,
  )

  if (isCorrect) {
    progress.value.correctQuestionIds = [...progress.value.correctQuestionIds, questionId]
    return
  }

  progress.value.incorrectQuestionIds = [...progress.value.incorrectQuestionIds, questionId]
}

const resetQuestion = () => {
  selectedAnswer.value = ''
  isAnswered.value = false
}

const resetProgress = () => {
  progress.value = {
    studiedCardIds: [],
    correctQuestionIds: [],
    incorrectQuestionIds: [],
  }
  resetQuestion()
}

const getQuestionListTitle = (question: QuizQuestion) => {
  const quoted = question.question.match(/「([^」]+)」/)

  return quoted?.[1] ?? question.question
}

const getQuestionTypeLabel = (question: QuizQuestion) => {
  if (question.type === 'code-reading') {
    return '読解'
  }

  if (question.type === 'review') {
    return 'レビュー'
  }

  if (question.type === 'bug-detection') {
    return 'バグ検出'
  }

  if (question.type === 'fill-blank') {
    return '穴埋め'
  }

  return '定義'
}
</script>

<template>
  <main class="learning-page">
    <header class="learning-topbar">
      <div>
        <p class="learning-kicker">TypeScript Knowledge Base</p>
        <h1>学習ワークスペース</h1>
      </div>
      <nav class="learning-nav" aria-label="学習ナビゲーション">
        <RouterLink :to="{ name: 'Learning' }" class="nav-link active">学ぶ・解く</RouterLink>
        <RouterLink :to="{ name: 'LearningGlossary' }" class="nav-link">用語集</RouterLink>
      </nav>
    </header>

    <section class="learning-toolbar" aria-label="学習状況">
      <div>
        <h2>暗記とクイズ</h2>
        <p>公式知識を覚え、勤怠システムの実践コードへつなげます。</p>
      </div>
      <div class="learning-stats" aria-label="全体進捗">
        <div>
          <span>{{ studiedCount }} / {{ totalCards }}</span>
          <small>暗記済み</small>
        </div>
        <div>
          <span>{{ correctCount }} / {{ totalQuestions }}</span>
          <small>正解</small>
        </div>
        <div>
          <span>{{ answeredCount }}</span>
          <small>回答済み</small>
        </div>
      </div>
    </section>

    <section class="learning-layout">
      <aside class="learning-sidebar" aria-label="章一覧">
        <button
          v-for="chapter in learningChapters"
          :key="chapter.id"
          class="chapter-button"
          :class="{ active: chapter.id === selectedChapterId }"
          type="button"
          @click="selectChapter(chapter.id)"
        >
          <span>{{ chapter.order }}. {{ chapter.title }}</span>
          <small>
            暗記
            {{ learningCards.filter((card) => card.chapterId === chapter.id && studiedCardSet.has(card.id)).length }}
            / {{ learningCards.filter((card) => card.chapterId === chapter.id).length }}
          </small>
        </button>
      </aside>

      <div class="learning-main">
        <div class="chapter-header">
          <div>
            <p class="learning-kicker">Chapter {{ selectedChapter?.order }}</p>
            <h2>{{ selectedChapter?.title }}</h2>
            <p>{{ selectedChapter?.description }}</p>
          </div>
          <div class="chapter-progress">
            <span>暗記 {{ chapterStudiedCount }} / {{ chapterCards.length }}</span>
            <span>正解 {{ chapterCorrectCount }} / {{ chapterQuestions.length }}</span>
            <span v-if="mode === 'quiz' && selectedQuestionIndex >= 0">
              問題 {{ selectedQuestionIndex + 1 }} / {{ chapterQuestions.length }}
            </span>
            <span v-if="mode === 'cards' && selectedCardIndex >= 0">
              カード {{ selectedCardIndex + 1 }} / {{ chapterCards.length }}
            </span>
          </div>
        </div>

        <div class="mode-tabs" role="tablist" aria-label="学習モード">
          <button
            type="button"
            :class="{ active: mode === 'cards' }"
            @click="mode = 'cards'"
          >
            暗記
          </button>
          <button
            type="button"
            :class="{ active: mode === 'quiz' }"
            @click="mode = 'quiz'"
          >
            クイズ
          </button>
        </div>

        <section v-if="mode === 'cards'" class="study-grid">
          <nav class="item-list" aria-label="暗記カード一覧">
            <button
              v-for="card in chapterCards"
              :key="card.id"
              class="list-button"
              :class="{ active: card.id === selectedCardId }"
              type="button"
              @click="selectCard(card.id)"
            >
              <span>{{ card.title }}</span>
              <small>
                <b>{{ studiedCardSet.has(card.id) ? '学習済み' : '未学習' }}</b>
                {{ card.difficulty }}
              </small>
            </button>
          </nav>

          <article v-if="selectedCard" class="content-panel">
            <div class="content-heading">
              <div>
                <p class="learning-kicker">{{ selectedCard.difficulty }}</p>
                <h3>{{ selectedCard.title }}</h3>
              </div>
              <button type="button" class="primary-button" @click="markStudied">
                {{ studiedCardSet.has(selectedCard.id) ? '学習済み' : '学習済みにする' }}
              </button>
            </div>
            <p class="summary-text">{{ selectedCard.summary }}</p>
            <p class="explanation-text">{{ selectedCard.explanation }}</p>
            <pre v-if="selectedCard.codeExample"><code>{{ selectedCard.codeExample }}</code></pre>
            <div class="tag-row">
              <span v-for="tag in selectedCard.tags" :key="tag">{{ tag }}</span>
            </div>
          </article>
        </section>

        <section v-else class="study-grid">
          <nav class="item-list" aria-label="クイズ一覧">
            <button
              v-for="question in chapterQuestions"
              :key="question.id"
              class="list-button"
              :class="{ active: question.id === selectedQuestionId }"
              type="button"
              @click="selectQuestion(question.id)"
            >
              <span>
                <em>{{ getQuestionTypeLabel(question) }}</em>
                {{ getQuestionListTitle(question) }}
              </span>
              <small>
                <b v-if="correctQuestionSet.has(question.id)">正解済み</b>
                <b v-else-if="incorrectQuestionSet.has(question.id)">復習</b>
                <b v-else>未回答</b>
                {{ question.difficulty }}
              </small>
            </button>
          </nav>

          <article v-if="selectedQuestion" class="content-panel quiz-panel">
            <div class="content-heading">
              <div>
                <p class="learning-kicker">
                  {{ getQuestionTypeLabel(selectedQuestion) }} / {{ selectedQuestion.difficulty }}
                </p>
                <h3>{{ selectedQuestion.question }}</h3>
              </div>
              <button type="button" class="secondary-button" @click="resetQuestion">
                もう一度
              </button>
            </div>

            <pre v-if="selectedQuestion.codeSnippet" class="quiz-code"><code>{{ selectedQuestion.codeSnippet }}</code></pre>

            <div class="choice-list">
              <button
                v-for="choice in selectedQuestion.choices"
                :key="choice"
                class="choice-button"
                :class="{
                  selected: choice === selectedAnswer,
                  correct: isAnswered && choice === selectedQuestion.answer,
                  incorrect:
                    isAnswered && choice === selectedAnswer && choice !== selectedQuestion.answer,
                }"
                type="button"
                :disabled="isAnswered"
                @click="answerQuestion(choice)"
              >
                {{ choice }}
              </button>
            </div>

            <div
              v-if="isAnswered"
              class="answer-result"
              :class="currentQuestionStatus"
              role="status"
            >
              <strong>{{ currentQuestionStatus === 'correct' ? '正解' : '不正解' }}</strong>
              <p>{{ selectedQuestion.explanation }}</p>
              <p v-if="selectedQuestion.sourceFile" class="source-file">
                参照: {{ selectedQuestion.sourceFile }}
              </p>
            </div>
          </article>
        </section>
      </div>
    </section>

    <div class="learning-footer-actions">
      <button type="button" class="secondary-button" @click="resetProgress">進捗をリセット</button>
    </div>
  </main>
</template>

<style scoped>
.learning-page {
  min-height: 100vh;
  background: #f6f8fb;
  color: #172033;
  padding: 16px;
}

.learning-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 64px;
  padding: 12px 16px;
  border: 1px solid #d8deea;
  border-radius: 8px;
  background: #ffffff;
}

.learning-topbar h1 {
  margin: 0;
  font-size: 22px;
  letter-spacing: 0;
}

.learning-nav {
  display: inline-flex;
  gap: 6px;
  padding: 4px;
  border: 1px solid #d8deea;
  border-radius: 8px;
  background: #eef3f8;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  padding: 0 14px;
  border-radius: 6px;
  color: #48566c;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
}

.nav-link.active,
.nav-link.router-link-active {
  background: #ffffff;
  color: #172033;
  box-shadow: 0 1px 4px rgba(23, 32, 51, 0.12);
}

.learning-toolbar,
.learning-layout,
.chapter-header,
.content-panel {
  border: 1px solid #d8deea;
  background: #ffffff;
}

.learning-toolbar {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  margin-top: 12px;
  padding: 14px 16px;
  border-radius: 8px;
}

.learning-kicker {
  margin: 0 0 6px;
  color: #6e3bb8;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
}

.learning-toolbar h1,
.chapter-header h2,
.content-panel h3 {
  margin: 0;
  letter-spacing: 0;
}

.learning-toolbar h2 {
  margin: 0;
  font-size: 22px;
  letter-spacing: 0;
}

.learning-toolbar p {
  margin: 4px 0 0;
  color: #4f5b70;
}

.learning-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(92px, 1fr));
  gap: 8px;
}

.learning-stats div {
  min-height: 56px;
  padding: 8px 10px;
  border: 1px solid #d8deea;
  border-radius: 8px;
  background: #f9fbff;
}

.learning-stats span {
  display: block;
  font-size: 18px;
  font-weight: 800;
}

.learning-stats small,
.chapter-progress span,
.list-button small {
  color: #657187;
}

.learning-layout {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 0;
  margin-top: 12px;
  border-radius: 8px;
  overflow: hidden;
}

.learning-sidebar {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: calc(100vh - 174px);
  overflow: auto;
  padding: 10px;
  border-right: 1px solid #d8deea;
  background: #eef3f8;
}

.chapter-button,
.list-button,
.mode-tabs button,
.choice-button,
.primary-button,
.secondary-button {
  font: inherit;
}

.chapter-button,
.list-button {
  width: 100%;
  min-height: 58px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: transparent;
  color: #172033;
  text-align: left;
  cursor: pointer;
}

.chapter-button {
  padding: 10px;
}

.chapter-button span,
.list-button span {
  display: block;
  font-weight: 700;
  line-height: 1.35;
}

.chapter-button small,
.list-button small {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 3px;
  line-height: 1.35;
  font-size: 12px;
}

.list-button small b {
  color: #0d2b81;
}

.chapter-button.active,
.chapter-button:hover,
.list-button.active,
.list-button:hover {
  border-color: #91b4e8;
  background: #ffffff;
}

.learning-main {
  min-width: 0;
  padding: 12px;
}

.chapter-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 16px;
  border-radius: 8px;
}

.chapter-header p {
  margin: 4px 0 0;
  color: #4f5b70;
}

.chapter-progress {
  display: grid;
  grid-template-columns: repeat(2, minmax(104px, 1fr));
  gap: 6px;
  min-width: 220px;
  font-weight: 700;
}

.chapter-progress span {
  padding: 6px 8px;
  border: 1px solid #d8deea;
  border-radius: 6px;
  background: #f9fbff;
}

.mode-tabs {
  display: inline-flex;
  gap: 4px;
  margin: 12px 0;
  padding: 4px;
  border: 1px solid #d8deea;
  border-radius: 8px;
  background: #eef3f8;
}

.mode-tabs button {
  min-width: 96px;
  min-height: 40px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #48566c;
  cursor: pointer;
  font-weight: 700;
}

.mode-tabs button.active {
  background: #ffffff;
  color: #172033;
  box-shadow: 0 1px 4px rgba(23, 32, 51, 0.12);
}

.study-grid {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 12px;
}

.item-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: calc(100vh - 324px);
  overflow: auto;
}

.list-button {
  padding: 10px 12px;
  border-color: #d8deea;
  background: #ffffff;
}

.list-button span {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.35;
}

.list-button span em {
  display: inline-flex;
  align-items: center;
  min-height: 20px;
  margin-right: 6px;
  padding: 0 6px;
  border-radius: 999px;
  background: #e8f0ff;
  color: #254a84;
  font-size: 11px;
  font-style: normal;
  font-weight: 800;
  vertical-align: 1px;
}

.content-panel {
  min-width: 0;
  padding: 18px;
  border-radius: 8px;
}

.content-heading {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
}

.content-panel h3 {
  font-size: 22px;
  line-height: 1.3;
}

.summary-text {
  margin: 16px 0 0;
  color: #172033;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.7;
}

.explanation-text {
  margin: 14px 0 0;
  color: #3c485c;
  line-height: 1.8;
}

pre {
  margin: 20px 0 0;
  padding: 16px;
  overflow-x: auto;
  border-radius: 8px;
  background: #111827;
  color: #eef2ff;
  line-height: 1.6;
}

.quiz-code {
  margin-top: 16px;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
}

.tag-row span {
  padding: 6px 10px;
  border-radius: 999px;
  background: #e8f0ff;
  color: #254a84;
  font-size: 12px;
  font-weight: 700;
}

.primary-button,
.secondary-button {
  min-height: 40px;
  padding: 0 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  white-space: nowrap;
}

.primary-button {
  border: 1px solid #0d2b81;
  background: #0d2b81;
  color: #ffffff;
}

.secondary-button {
  border: 1px solid #b9c4d6;
  background: #ffffff;
  color: #25324a;
}

.choice-list {
  display: grid;
  gap: 8px;
  margin-top: 18px;
}

.choice-button {
  min-height: 48px;
  padding: 12px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: #ffffff;
  color: #172033;
  text-align: left;
  cursor: pointer;
}

.choice-button:hover:not(:disabled),
.choice-button.selected {
  border-color: #0d2b81;
}

.choice-button.correct {
  border-color: #2f8f55;
  background: #effaf3;
}

.choice-button.incorrect {
  border-color: #c64646;
  background: #fff1f1;
}

.choice-button:disabled {
  cursor: default;
}

.answer-result {
  margin-top: 18px;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #d8deea;
}

.answer-result p {
  margin: 8px 0 0;
  line-height: 1.7;
}

.source-file {
  color: #657187;
  font-size: 13px;
  overflow-wrap: anywhere;
}

.answer-result.correct {
  border-color: #86c99f;
  background: #effaf3;
}

.answer-result.incorrect {
  border-color: #e4a1a1;
  background: #fff1f1;
}

.learning-footer-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

@media (max-width: 920px) {
  .learning-page {
    padding: 12px;
  }

  .learning-toolbar,
  .chapter-header {
    flex-direction: column;
    align-items: stretch;
  }

  .learning-layout,
  .study-grid {
    grid-template-columns: 1fr;
  }

  .learning-sidebar {
    border-right: 0;
    border-bottom: 1px solid #d8deea;
  }

  .learning-stats {
    grid-template-columns: 1fr;
  }

  .content-heading {
    flex-direction: column;
  }

  .primary-button,
  .secondary-button {
    width: 100%;
  }
}
</style>
