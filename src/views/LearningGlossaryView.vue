<script setup lang="ts">
import { computed, ref } from 'vue'
import { glossaryTerms, knowledgeCategories, knowledgeBaseStats } from '@/data/learning-content'

const searchText = ref('')
const selectedCategoryId = ref('all')
const selectedDifficulty = ref('all')
const selectedTermId = ref(glossaryTerms[0]?.id ?? '')

const normalizedSearchText = computed(() => searchText.value.trim().toLowerCase())

const filteredTerms = computed(() => {
  return glossaryTerms.filter((term) => {
    const categoryMatched =
      selectedCategoryId.value === 'all' || term.categoryId === selectedCategoryId.value
    const difficultyMatched =
      selectedDifficulty.value === 'all' || term.difficulty === selectedDifficulty.value
    const haystack = [
      term.term,
      term.reading,
      term.shortDefinition,
      term.fullDefinition,
      term.beginnerExplanation,
      term.tags.join(' '),
      term.relatedTermIds.join(' '),
      term.practicalSourceFiles.join(' '),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return categoryMatched && difficultyMatched && haystack.includes(normalizedSearchText.value)
  })
})

const selectedTerm = computed(
  () =>
    glossaryTerms.find((term) => term.id === selectedTermId.value) ??
    filteredTerms.value[0] ??
    glossaryTerms[0],
)

const selectedCategory = computed(() =>
  selectedTerm.value
    ? knowledgeCategories.find((category) => category.id === selectedTerm.value.categoryId)
    : undefined,
)

const relatedTerms = computed(() => {
  if (!selectedTerm.value) {
    return []
  }

  return glossaryTerms.filter((term) => selectedTerm.value?.relatedTermIds.includes(term.id))
})

const selectTerm = (termId: string) => {
  selectedTermId.value = termId
}
</script>

<template>
  <main class="glossary-page">
    <header class="glossary-topbar">
      <div>
        <p class="glossary-kicker">TypeScript Knowledge Base</p>
        <h1>用語集</h1>
      </div>
      <nav class="glossary-nav" aria-label="学習ナビゲーション">
        <RouterLink :to="{ name: 'Learning' }" class="nav-link">学ぶ・解く</RouterLink>
        <RouterLink :to="{ name: 'LearningGlossary' }" class="nav-link active">用語集</RouterLink>
      </nav>
    </header>

    <section class="glossary-toolbar">
      <div>
        <h2>調べる</h2>
        <p>公式知識を軸に、勤怠システム内の実践例へ接続して調べられます。</p>
      </div>
      <div class="glossary-stats" aria-label="知識ベース統計">
        <div>
          <span>{{ knowledgeBaseStats.categories }}</span>
          <small>カテゴリ</small>
        </div>
        <div>
          <span>{{ knowledgeBaseStats.glossaryTerms }}</span>
          <small>用語</small>
        </div>
        <div>
          <span>{{ knowledgeBaseStats.learningCards }}</span>
          <small>カード</small>
        </div>
        <div>
          <span>{{ knowledgeBaseStats.quizQuestions }}</span>
          <small>クイズ</small>
        </div>
      </div>
    </section>

    <section class="glossary-controls" aria-label="用語検索">
      <label>
        <span>検索</span>
        <input v-model="searchText" type="search" placeholder="例: union, null, Record" />
      </label>
      <label>
        <span>カテゴリ</span>
        <select v-model="selectedCategoryId">
          <option value="all">すべて</option>
          <option v-for="category in knowledgeCategories" :key="category.id" :value="category.id">
            {{ category.title }}
          </option>
        </select>
      </label>
      <label>
        <span>難易度</span>
        <select v-model="selectedDifficulty">
          <option value="all">すべて</option>
          <option value="basic">basic</option>
          <option value="intermediate">intermediate</option>
          <option value="advanced">advanced</option>
        </select>
      </label>
      <div class="result-count">
        <strong>{{ filteredTerms.length }}</strong>
        <span>件</span>
      </div>
    </section>

    <section class="glossary-layout">
      <aside class="term-list" aria-label="用語一覧">
        <button
          v-for="term in filteredTerms"
          :key="term.id"
          type="button"
          class="term-button"
          :class="{ active: term.id === selectedTerm?.id }"
          @click="selectTerm(term.id)"
        >
          <span>{{ term.term }}</span>
          <small>{{ term.shortDefinition }}</small>
        </button>
        <p v-if="filteredTerms.length === 0" class="empty-text">該当する用語がありません。</p>
      </aside>

      <article v-if="selectedTerm" class="term-detail">
        <div class="term-header">
          <div>
            <p class="glossary-kicker">{{ selectedCategory?.title }} / {{ selectedTerm.difficulty }}</p>
            <h2>{{ selectedTerm.term }}</h2>
            <p v-if="selectedTerm.reading" class="reading">{{ selectedTerm.reading }}</p>
          </div>
        </div>

        <section>
          <h3>一文定義</h3>
          <p>{{ selectedTerm.shortDefinition }}</p>
        </section>

        <section>
          <h3>詳しい説明</h3>
          <p>{{ selectedTerm.fullDefinition }}</p>
        </section>

        <section>
          <h3>初学者向け説明</h3>
          <p>{{ selectedTerm.beginnerExplanation }}</p>
        </section>

        <section v-if="selectedTerm.codeExample">
          <h3>コード例</h3>
          <pre><code>{{ selectedTerm.codeExample }}</code></pre>
        </section>

        <section>
          <h3>レビュー観点</h3>
          <p>{{ selectedTerm.reviewPerspective }}</p>
        </section>

        <section v-if="relatedTerms.length > 0">
          <h3>関連用語</h3>
          <div class="tag-row">
            <button
              v-for="term in relatedTerms"
              :key="term.id"
              type="button"
              @click="selectTerm(term.id)"
            >
              {{ term.term }}
            </button>
          </div>
        </section>

        <section>
          <h3>公式ソース</h3>
          <ul>
            <li v-for="url in selectedTerm.officialSourceUrls" :key="url">
              <a :href="url" target="_blank" rel="noreferrer">{{ url }}</a>
            </li>
          </ul>
        </section>

        <section>
          <h3>勤怠システム内の接続</h3>
          <ul>
            <li v-for="file in selectedTerm.practicalSourceFiles" :key="file">{{ file }}</li>
          </ul>
        </section>
      </article>
    </section>
  </main>
</template>

<style scoped>
.glossary-page {
  min-height: 100vh;
  padding: 16px;
  background: #f6f8fb;
  color: #172033;
}

.glossary-topbar,
.glossary-toolbar,
.glossary-controls,
.glossary-layout,
.term-detail {
  border: 1px solid #d8deea;
  border-radius: 8px;
  background: #ffffff;
}

.glossary-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 64px;
  padding: 12px 16px;
}

.glossary-toolbar {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 12px;
  padding: 14px 16px;
}

.glossary-kicker {
  margin: 0 0 6px;
  color: #6e3bb8;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  margin: 0;
  font-size: 22px;
  letter-spacing: 0;
}

h2 {
  margin: 0 0 4px;
  font-size: 22px;
  letter-spacing: 0;
}

.glossary-toolbar p {
  margin: 0;
  color: #4f5b70;
}

.glossary-nav {
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

.glossary-stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(82px, 1fr));
  gap: 8px;
}

.glossary-stats div {
  min-height: 56px;
  padding: 8px 10px;
  border: 1px solid #d8deea;
  border-radius: 8px;
  background: #f9fbff;
}

.glossary-stats span {
  display: block;
  font-size: 18px;
  font-weight: 800;
}

.glossary-stats small {
  color: #657187;
}

.glossary-controls {
  display: grid;
  grid-template-columns: minmax(260px, 1fr) 220px 180px 82px;
  gap: 12px;
  align-items: end;
  margin-top: 12px;
  padding: 12px;
}

label span {
  display: block;
  margin-bottom: 6px;
  font-size: 12px;
  font-weight: 700;
  color: #48566c;
}

input,
select {
  width: 100%;
  min-height: 42px;
  padding: 0 12px;
  border: 1px solid #b9c4d6;
  border-radius: 8px;
  background: #ffffff;
  color: #172033;
  font: inherit;
}

.result-count {
  min-height: 42px;
  padding: 6px 10px;
  border: 1px solid #d8deea;
  border-radius: 8px;
  background: #f9fbff;
  text-align: center;
}

.result-count strong {
  display: block;
  font-size: 18px;
  line-height: 1;
}

.result-count span {
  color: #657187;
  font-size: 12px;
}

.glossary-layout {
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
  gap: 0;
  margin-top: 12px;
  overflow: hidden;
}

.term-list {
  max-height: calc(100vh - 238px);
  overflow: auto;
  padding: 8px;
  border-right: 1px solid #d8deea;
  background: #eef3f8;
}

.term-button {
  width: 100%;
  min-height: 0;
  margin-bottom: 6px;
  padding: 9px 10px;
  border: 1px solid #d8deea;
  border-radius: 8px;
  background: #ffffff;
  color: #172033;
  text-align: left;
  cursor: pointer;
  font: inherit;
}

.term-button.active,
.term-button:hover {
  border-color: #91b4e8;
}

.term-button span {
  display: block;
  font-weight: 800;
  line-height: 1.25;
}

.term-button small {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-top: 4px;
  color: #657187;
  line-height: 1.4;
}

.term-detail {
  min-width: 0;
  max-height: calc(100vh - 238px);
  overflow: auto;
  padding: 18px;
  border: 0;
  border-radius: 0;
}

.term-detail section {
  margin-top: 16px;
}

.term-detail h2 {
  margin-bottom: 4px;
  font-size: 28px;
}

.term-detail h3 {
  margin-bottom: 8px;
  font-size: 16px;
}

.term-detail p,
.term-detail li {
  color: #3c485c;
  line-height: 1.7;
}

.reading {
  color: #657187;
  font-weight: 700;
}

pre {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
  border-radius: 8px;
  background: #111827;
  color: #eef2ff;
  line-height: 1.6;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-row button {
  min-height: 34px;
  padding: 0 10px;
  border: 1px solid #b9c4d6;
  border-radius: 999px;
  background: #e8f0ff;
  color: #254a84;
  cursor: pointer;
  font-weight: 700;
}

.empty-text {
  margin: 12px;
  color: #657187;
}

@media (max-width: 980px) {
  .glossary-page {
    padding: 12px;
  }

  .glossary-toolbar,
  .glossary-controls,
  .glossary-layout {
    grid-template-columns: 1fr;
  }

  .glossary-toolbar {
    flex-direction: column;
  }

  .glossary-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .term-list {
    max-height: 360px;
    border-right: 0;
    border-bottom: 1px solid #d8deea;
  }
}
</style>
