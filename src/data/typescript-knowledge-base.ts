export type Difficulty = 'basic' | 'intermediate' | 'advanced'

export type KnowledgeCategory = {
  id: string
  title: string
  order: number
  description: string
  officialSourceUrls: string[]
}

export type GlossaryTerm = {
  id: string
  term: string
  reading?: string
  categoryId: string
  shortDefinition: string
  fullDefinition: string
  beginnerExplanation: string
  codeExample?: string
  relatedTermIds: string[]
  officialSourceUrls: string[]
  practicalSourceFiles: string[]
  reviewPerspective?: string
  difficulty: Difficulty
  tags: string[]
}

export type LearningChapter = {
  id: string
  title: string
  order: number
  description: string
}

export type LearningCard = {
  id: string
  chapterId: string
  title: string
  summary: string
  explanation: string
  codeExample?: string
  sourceFiles: string[]
  tags: string[]
  difficulty: Difficulty
}

export type QuizQuestion = {
  id: string
  cardId: string
  chapterId: string
  question: string
  codeSnippet?: string
  sourceFile?: string
  relatedTermIds?: string[]
  choices: string[]
  answer: string
  explanation: string
  difficulty: Difficulty
  type?: 'definition' | 'code-reading' | 'bug-detection' | 'review' | 'fill-blank'
}

type TermSeed = {
  term: string
  id?: string
  reading?: string
  categoryId: string
  definition: string
  codeExample?: string
  difficulty?: Difficulty
  related?: string[]
  review?: string
  tags?: string[]
  practical?: string[]
}

const officialUrls = {
  docs: 'https://www.typescriptlang.org/docs/',
  handbook: 'https://www.typescriptlang.org/docs/handbook/intro.html',
  basics: 'https://www.typescriptlang.org/docs/handbook/2/basic-types.html',
  everydayTypes: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html',
  narrowing: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html',
  functions: 'https://www.typescriptlang.org/docs/handbook/2/functions.html',
  objects: 'https://www.typescriptlang.org/docs/handbook/2/objects.html',
  generics: 'https://www.typescriptlang.org/docs/handbook/2/generics.html',
  typeManipulation: 'https://www.typescriptlang.org/docs/handbook/2/types-from-types.html',
  modules: 'https://www.typescriptlang.org/docs/handbook/2/modules.html',
  utilityTypes: 'https://www.typescriptlang.org/docs/handbook/utility-types.html',
  tsconfig: 'https://www.typescriptlang.org/tsconfig/',
}

export const knowledgeCategories: KnowledgeCategory[] = [
  {
    id: 'core',
    title: 'TypeScript Core',
    order: 1,
    description: 'TypeScriptの役割、型検査、コンパイル、設定を理解する。',
    officialSourceUrls: [officialUrls.docs, officialUrls.handbook, officialUrls.tsconfig],
  },
  {
    id: 'basic-types',
    title: 'Basic Types',
    order: 2,
    description: '日常的に使う基本型、リテラル型、Union型を理解する。',
    officialSourceUrls: [officialUrls.everydayTypes],
  },
  {
    id: 'type-declarations',
    title: 'Type Declarations',
    order: 3,
    description: 'type alias、interface、プロパティ定義を理解する。',
    officialSourceUrls: [officialUrls.objects],
  },
  {
    id: 'functions',
    title: 'Functions',
    order: 4,
    description: '関数の引数、戻り値、コールバック、overloadを理解する。',
    officialSourceUrls: [officialUrls.functions],
  },
  {
    id: 'narrowing',
    title: 'Narrowing',
    order: 5,
    description: '条件分岐で型を安全に絞り込む方法を理解する。',
    officialSourceUrls: [officialUrls.narrowing],
  },
  {
    id: 'null-safety',
    title: 'Null Safety',
    order: 6,
    description: 'null、undefined、optional chainingを安全に扱う。',
    officialSourceUrls: [officialUrls.everydayTypes],
  },
  {
    id: 'generics',
    title: 'Generics',
    order: 7,
    description: '型を引数として受け取り、再利用できる型を作る。',
    officialSourceUrls: [officialUrls.generics],
  },
  {
    id: 'type-manipulation',
    title: 'Type Manipulation',
    order: 8,
    description: '既存の型から新しい型を作る構文を理解する。',
    officialSourceUrls: [officialUrls.typeManipulation],
  },
  {
    id: 'utility-types',
    title: 'Utility Types',
    order: 9,
    description: 'TypeScript組み込みの型変換ユーティリティを使う。',
    officialSourceUrls: [officialUrls.utilityTypes],
  },
  {
    id: 'modules',
    title: 'Modules',
    order: 10,
    description: 'import、export、ファイル分割、型だけのimportを理解する。',
    officialSourceUrls: [officialUrls.modules],
  },
  {
    id: 'async-api',
    title: 'Async and API',
    order: 11,
    description: 'Promise、async/await、API境界、外部入力を理解する。',
    officialSourceUrls: [officialUrls.functions, officialUrls.everydayTypes],
  },
  {
    id: 'review-basics',
    title: 'Practical Review Basics',
    order: 12,
    description: 'コードレビューで見る型安全性、責務、境界、保守性を理解する。',
    officialSourceUrls: [officialUrls.handbook, officialUrls.tsconfig],
  },
]

const practicalFiles = [
  '学習ブランチ/AttendanceSystemForApril/src/types/attendance.ts',
  '学習ブランチ/AttendanceSystemForApril/src/services/attendanceService.ts',
  '学習ブランチ/AttendanceSystemForApril/src/services/apiClient.ts',
]

const terms: TermSeed[] = [
  { term: 'TypeScript', categoryId: 'core', definition: 'JavaScriptに静的型検査を加える言語。', codeExample: "const status: string = '勤務中'" },
  { term: 'JavaScript', categoryId: 'core', definition: 'ブラウザやNode.jsで実行される実行時の言語。' },
  { term: 'static type checking', reading: '静的型検査', categoryId: 'core', definition: '実行前に型の矛盾を検査する仕組み。' },
  { term: 'type annotation', reading: '型注釈', categoryId: 'core', definition: '変数、引数、戻り値などへ明示的に型を書くこと。', codeExample: 'const userId: number = 1' },
  { term: 'type inference', reading: '型推論', categoryId: 'core', definition: '明示しなくてもTypeScriptが型を推測する仕組み。', codeExample: "const userName = '佐藤'" },
  { term: 'compile', reading: 'コンパイル', categoryId: 'core', definition: 'TypeScriptをJavaScriptへ変換する工程。' },
  { term: 'runtime', reading: '実行時', categoryId: 'core', definition: 'JavaScriptとして実際に動いている時間帯。' },
  { term: 'type erasure', reading: '型消去', categoryId: 'core', definition: 'コンパイル後のJavaScriptからTypeScriptの型情報が消える性質。' },
  { term: 'tsc', categoryId: 'core', definition: 'TypeScript公式のコンパイラコマンド。', codeExample: 'npx tsc --noEmit' },
  { term: 'vue-tsc', categoryId: 'core', definition: 'Vue SFCを含むTypeScript型チェックを行うコマンド。', codeExample: 'vue-tsc --noEmit' },
  { term: 'tsconfig.json', categoryId: 'core', definition: 'TypeScriptプロジェクトのコンパイル設定ファイル。', codeExample: '{ "compilerOptions": { "strict": true } }' },
  { term: 'strict', categoryId: 'core', definition: 'TypeScriptの厳格な型チェック群を有効にする設定。', codeExample: '"strict": true' },
  { term: 'string', categoryId: 'basic-types', definition: '文字列を表す基本型。', codeExample: "const name: string = '山田'" },
  { term: 'number', categoryId: 'basic-types', definition: '整数や小数などの数値を表す基本型。', codeExample: 'const minutes: number = 60' },
  { term: 'boolean', categoryId: 'basic-types', definition: 'trueまたはfalseを表す基本型。', codeExample: 'const disabled: boolean = false' },
  { term: 'bigint', categoryId: 'basic-types', definition: '非常に大きな整数を扱う基本型。', codeExample: 'const value: bigint = 100n' },
  { term: 'symbol', categoryId: 'basic-types', definition: '一意な識別子を作る基本型。', codeExample: "const key: symbol = Symbol('key')" },
  { term: 'null', categoryId: 'basic-types', definition: '値が意図的に存在しないことを表す値。', codeExample: 'let endTime: string | null = null', practical: ['学習ブランチ/AttendanceSystemForApril/src/types/attendance.ts'] },
  { term: 'undefined', categoryId: 'basic-types', definition: '値がまだ割り当てられていないことを表す値。' },
  { term: 'object', categoryId: 'basic-types', definition: 'プリミティブではない値を表す型。' },
  { term: 'Array', reading: '配列', categoryId: 'basic-types', definition: '同種または規定された型の値を複数並べる型。', codeExample: 'const users: string[] = []' },
  { term: 'tuple', reading: 'タプル', categoryId: 'basic-types', definition: '位置ごとに型が決まっている配列型。', codeExample: 'const pair: [string, number] = ["user", 1]' },
  { term: 'literal type', reading: 'リテラル型', categoryId: 'basic-types', definition: '特定の文字列や数値そのものを型として扱う型。', codeExample: "type Status = '勤務中'" },
  { term: 'union type', reading: 'Union型', categoryId: 'basic-types', definition: '複数候補のどれかを許可する型。', codeExample: "type Status = '出勤前' | '勤務中'", practical: ['学習ブランチ/AttendanceSystemForApril/src/types/attendance.ts'] },
  { term: 'intersection type', reading: 'Intersection型', categoryId: 'basic-types', definition: '複数の型を合成してすべての性質を持つ型。', codeExample: 'type UserWithId = User & { id: number }' },
  { term: 'any', categoryId: 'basic-types', definition: '型チェックをほぼ無効にする型。使いすぎると安全性が落ちる。', codeExample: 'const value: any = response', review: 'anyが必要な境界か、unknownや具体型に置き換えられないか確認する。' },
  { term: 'unknown', categoryId: 'basic-types', definition: '型が分からない値を安全側で受け取る型。使う前に絞り込みが必要。', codeExample: 'const value: unknown = response' },
  { term: 'void', categoryId: 'basic-types', definition: '戻り値を使わない関数の戻り値型。', codeExample: 'const save = (): void => {}' },
  { term: 'never', categoryId: 'basic-types', definition: '到達しない、または値を持てないことを表す型。', codeExample: 'const fail = (): never => { throw new Error() }' },
  { term: 'type alias', categoryId: 'type-declarations', definition: '型に名前を付けて再利用する仕組み。', codeExample: 'type UserId = string' },
  { term: 'interface', categoryId: 'type-declarations', definition: 'オブジェクトの形に名前を付ける宣言。', codeExample: 'interface User { name: string }' },
  { term: 'optional property', categoryId: 'type-declarations', definition: '存在しない可能性があるプロパティを表す。', codeExample: 'type User = { nickname?: string }' },
  { term: 'readonly property', categoryId: 'type-declarations', definition: '代入後に書き換えないプロパティを表す。', codeExample: 'type User = { readonly id: string }' },
  { term: 'index signature', categoryId: 'type-declarations', definition: '任意キーを持つオブジェクトの値型を定義する。', codeExample: 'type Scores = { [name: string]: number }' },
  { term: 'excess property checks', categoryId: 'type-declarations', definition: 'オブジェクトリテラルに余計なプロパティがないか確認する検査。' },
  { term: 'structural typing', categoryId: 'type-declarations', definition: '名前ではなく構造が一致するかで型互換性を見る仕組み。' },
  { term: 'property', categoryId: 'type-declarations', definition: 'オブジェクトが持つ値の項目。', codeExample: 'user.userName' },
  { term: 'method', categoryId: 'type-declarations', definition: 'オブジェクトが持つ関数の項目。' },
  { term: 'object type', categoryId: 'type-declarations', definition: 'プロパティの集合としてオブジェクトの形を表す型。', codeExample: 'type Summary = { status: string; workedHours: string }', practical: ['学習ブランチ/AttendanceSystemForApril/src/types/attendance.ts'] },
  { term: 'property modifier', categoryId: 'type-declarations', definition: 'readonlyや?のようにプロパティの性質を変える記法。' },
  { term: 'type compatibility', categoryId: 'type-declarations', definition: 'ある型の値を別の型として扱えるかの関係。' },
  { term: 'declaration merging', categoryId: 'type-declarations', definition: '同名interfaceなどの宣言が合成されるTypeScriptの仕組み。', difficulty: 'advanced' },
  { term: 'ambient declaration', categoryId: 'type-declarations', definition: '実装は外部にある値やモジュールの型だけを宣言する仕組み。', codeExample: 'declare const APP_VERSION: string', difficulty: 'advanced' },
  { term: 'parameter type', categoryId: 'functions', definition: '関数が受け取る引数の型。', codeExample: 'const findUser = (id: number) => {}' },
  { term: 'return type', categoryId: 'functions', definition: '関数が返す値の型。', codeExample: 'const format = (): string => "00:00"' },
  { term: 'optional parameter', categoryId: 'functions', definition: '省略できる引数。', codeExample: 'const greet = (name?: string) => {}' },
  { term: 'default parameter', categoryId: 'functions', definition: '引数が省略されたときの初期値。', codeExample: 'const page = (size = 20) => size' },
  { term: 'rest parameter', categoryId: 'functions', definition: '可変長の引数を配列として受け取る記法。', codeExample: 'const sum = (...values: number[]) => values.length' },
  { term: 'callback type', categoryId: 'functions', definition: '関数に渡す関数の型。', codeExample: 'type Handler = (value: string) => void' },
  { term: 'function type expression', categoryId: 'functions', definition: '関数の型を式の形で書く記法。', codeExample: '(value: string) => number' },
  { term: 'overload', categoryId: 'functions', definition: '同じ関数に複数の呼び出し型を与える仕組み。', difficulty: 'intermediate' },
  { term: 'this parameter', categoryId: 'functions', definition: '関数内のthisの型を明示する特別な引数。', difficulty: 'advanced' },
  { term: 'generic function', categoryId: 'functions', definition: '型パラメータを持つ関数。', codeExample: 'const identity = <T>(value: T): T => value' },
  { term: 'async function', categoryId: 'functions', definition: 'Promiseを返す非同期関数。', codeExample: 'const load = async (): Promise<void> => {}' },
  { term: 'arrow function', categoryId: 'functions', definition: '=>で書く関数式。', codeExample: 'const format = (value: string) => value.trim()' },
  { term: 'function overload signature', categoryId: 'functions', definition: 'overloadで外部から見える呼び出し方を表す宣言。', difficulty: 'advanced' },
  { term: 'call signature', categoryId: 'functions', definition: 'オブジェクト型の中で呼び出し可能な型を表す記法。', difficulty: 'intermediate' },
  { term: 'narrowing', categoryId: 'narrowing', definition: '条件分岐により広い型をより具体的な型へ絞ること。', codeExample: 'if (typeof value === "string") value.toUpperCase()' },
  { term: 'type guard', categoryId: 'narrowing', definition: '型を絞り込む条件や関数。' },
  { term: 'typeof narrowing', categoryId: 'narrowing', definition: 'typeof演算子でプリミティブ型を絞ること。', codeExample: 'typeof value === "number"' },
  { term: 'instanceof narrowing', categoryId: 'narrowing', definition: 'instanceofでクラスや組み込み型を絞ること。', codeExample: 'value instanceof Date' },
  { term: 'truthiness narrowing', categoryId: 'narrowing', definition: 'if(value)のような真偽値評価で型を絞ること。' },
  { term: 'equality narrowing', categoryId: 'narrowing', definition: '===や!==で値を比較して型を絞ること。' },
  { term: 'discriminated union', categoryId: 'narrowing', definition: '共通の判別プロパティでUnion型を安全に分岐する設計。', codeExample: "type Result = { ok: true; data: string } | { ok: false; error: string }" },
  { term: 'control flow analysis', categoryId: 'narrowing', definition: '処理の流れからTypeScriptが型を追跡する仕組み。' },
  { term: 'in operator narrowing', categoryId: 'narrowing', definition: 'in演算子でプロパティの有無から型を絞ること。', codeExample: "'message' in value" },
  { term: 'custom type predicate', categoryId: 'narrowing', definition: 'value is Typeの戻り値を持つ自作型ガード。', codeExample: 'const isUser = (value: unknown): value is User => true' },
  { term: 'assertion function', categoryId: 'narrowing', definition: '条件を満たすことをTypeScriptへ伝える関数。', difficulty: 'advanced' },
  { term: 'exhaustiveness check', categoryId: 'narrowing', definition: 'Union型の全ケースを処理したか確認する考え方。', codeExample: 'const exhaustive: never = value' },
  { term: 'switch narrowing', categoryId: 'narrowing', definition: 'switch文でリテラル型や判別Unionを絞ること。' },
  { term: 'array filter narrowing', categoryId: 'narrowing', definition: 'filterと型ガードを組み合わせて配列要素を絞ること。' },
  { term: 'nullable', categoryId: 'null-safety', definition: 'nullを取り得る型や値。', codeExample: 'string | null' },
  { term: 'optional chaining', categoryId: 'null-safety', definition: '途中がnullやundefinedなら安全にundefinedを返す記法。', codeExample: 'record?.workEndDt', practical: ['学習ブランチ/AttendanceSystemForApril/src/services/attendanceService.ts'] },
  { term: 'nullish coalescing', categoryId: 'null-safety', definition: 'nullまたはundefinedのときだけ代替値を使う記法。', codeExample: 'value ?? null' },
  { term: 'non-null assertion', categoryId: 'null-safety', definition: '値がnullやundefinedではないとTypeScriptへ断言する記法。', codeExample: 'user!.id', review: '根拠のない!は実行時エラーを隠すためレビューで確認する。' },
  { term: 'strictNullChecks', categoryId: 'null-safety', definition: 'nullとundefinedを厳密に区別する設定。', codeExample: '"strictNullChecks": true' },
  { term: 'undefined check', categoryId: 'null-safety', definition: 'undefinedかどうかを確認してから値を使うこと。' },
  { term: 'null check', categoryId: 'null-safety', definition: 'nullかどうかを確認してから値を使うこと。' },
  { term: 'fallback value', categoryId: 'null-safety', definition: '値がない場合に使う代替値。', codeExample: "userName ?? 'ユーザー'" },
  { term: 'optional call', categoryId: 'null-safety', definition: '関数が存在する場合だけ呼び出すoptional chaining。', codeExample: 'onClose?.()' },
  { term: 'generics', categoryId: 'generics', definition: '型を引数として受け取り、再利用できる型や関数を作る仕組み。', codeExample: 'apiRequest<T>()', practical: ['学習ブランチ/AttendanceSystemForApril/src/services/apiClient.ts'] },
  { term: 'type parameter', categoryId: 'generics', definition: 'Genericsで受け取る型の変数。', codeExample: '<T>' },
  { term: 'generic constraint', categoryId: 'generics', definition: '型パラメータが満たすべき条件。', codeExample: 'T extends { id: string }' },
  { term: 'extends constraint', categoryId: 'generics', definition: 'extendsで型パラメータの上限を指定すること。' },
  { term: 'default type parameter', categoryId: 'generics', definition: '型パラメータに既定値を与えること。', codeExample: 'type Box<T = string> = { value: T }' },
  { term: 'generic interface', categoryId: 'generics', definition: '型パラメータを持つinterface。', codeExample: 'interface ApiResponse<T> { data: T }' },
  { term: 'generic type alias', categoryId: 'generics', definition: '型パラメータを持つtype alias。', codeExample: 'type ApiResponse<T> = { data: T }' },
  { term: 'generic class', categoryId: 'generics', definition: '型パラメータを持つclass。', difficulty: 'intermediate' },
  { term: 'type argument', categoryId: 'generics', definition: 'Genericを使うときに渡す具体的な型。', codeExample: 'apiRequest<User[]>()' },
  { term: 'type parameter inference', categoryId: 'generics', definition: 'Genericの型引数をTypeScriptが推論すること。' },
  { term: 'multiple type parameters', categoryId: 'generics', definition: '複数の型パラメータを同時に使うこと。', codeExample: 'type Pair<K, V> = { key: K; value: V }' },
  { term: 'identity function', categoryId: 'generics', definition: '受け取った値を同じ型のまま返すGeneric例。', codeExample: 'const identity = <T>(value: T): T => value' },
  { term: 'generic API response', categoryId: 'generics', definition: 'APIレスポンスの中身をGenericで表す設計。', codeExample: 'type ApiResponse<T> = { data: T }' },
  { term: 'keyof', categoryId: 'type-manipulation', definition: 'オブジェクト型のキー名のUnion型を作る演算子。', codeExample: 'type UserKey = keyof User' },
  { term: 'typeof type operator', categoryId: 'type-manipulation', definition: '値から型を取り出す型演算子。', codeExample: 'type Config = typeof config' },
  { term: 'indexed access type', categoryId: 'type-manipulation', definition: '型のプロパティ型を参照する記法。', codeExample: 'type UserName = User["name"]' },
  { term: 'conditional type', categoryId: 'type-manipulation', definition: '条件により型を分岐する型。', codeExample: 'type IsString<T> = T extends string ? true : false' },
  { term: 'mapped type', categoryId: 'type-manipulation', definition: 'キーを走査して新しいオブジェクト型を作る型。', codeExample: 'type ReadonlyUser = { readonly [K in keyof User]: User[K] }' },
  { term: 'template literal type', categoryId: 'type-manipulation', definition: '文字列リテラル型をテンプレートで組み立てる型。', codeExample: 'type EventName = `${string}Changed`' },
  { term: 'infer', categoryId: 'type-manipulation', definition: 'Conditional Typeの中で型の一部を推論して取り出す記法。', difficulty: 'advanced' },
  { term: 'distributive conditional type', categoryId: 'type-manipulation', definition: 'Union型に対してConditional Typeが分配される性質。', difficulty: 'advanced' },
  { term: 'lookup type', categoryId: 'type-manipulation', definition: 'indexed access typeの別名的な呼び方。' },
  { term: 'recursive type', categoryId: 'type-manipulation', definition: '自分自身を参照する型。', difficulty: 'advanced' },
  { term: 'const assertion', categoryId: 'type-manipulation', definition: '値をより狭いリテラル型として扱う断言。', codeExample: "const actions = ['clockIn', 'clockOut'] as const" },
  { term: 'satisfies operator', categoryId: 'type-manipulation', definition: '値が型を満たすことを確認しつつ、値側の推論を保つ演算子。', codeExample: 'const routes = {} satisfies Record<string, string>' },
  { term: 'typeof import', categoryId: 'type-manipulation', definition: 'importした値やモジュールから型を参照する考え方。', difficulty: 'intermediate' },
  { term: 'branded type', categoryId: 'type-manipulation', definition: '構造的には同じ型に識別用の印を付ける設計パターン。', difficulty: 'advanced' },
  { term: 'Partial', categoryId: 'utility-types', definition: 'すべてのプロパティをoptionalにするUtility Type。', codeExample: 'type UserPatch = Partial<User>' },
  { term: 'Required', categoryId: 'utility-types', definition: 'すべてのプロパティを必須にするUtility Type。' },
  { term: 'Readonly', categoryId: 'utility-types', definition: 'すべてのプロパティをreadonlyにするUtility Type。' },
  { term: 'Pick', categoryId: 'utility-types', definition: '指定したキーだけを取り出すUtility Type。', codeExample: "type UserName = Pick<User, 'name'>" },
  { term: 'Omit', categoryId: 'utility-types', definition: '指定したキーを除外するUtility Type。', codeExample: "type PublicUser = Omit<User, 'password'>" },
  { term: 'Record', categoryId: 'utility-types', definition: 'キー型と値型からオブジェクト型を作るUtility Type。', codeExample: 'Record<PunchAction, string>', practical: ['学習ブランチ/AttendanceSystemForApril/src/services/attendanceService.ts'] },
  { term: 'Exclude', categoryId: 'utility-types', definition: 'Union型から指定した型を除外するUtility Type。' },
  { term: 'Extract', categoryId: 'utility-types', definition: 'Union型から指定した型に合うものを取り出すUtility Type。' },
  { term: 'NonNullable', categoryId: 'utility-types', definition: 'nullとundefinedを除外するUtility Type。' },
  { term: 'ReturnType', categoryId: 'utility-types', definition: '関数型の戻り値型を取り出すUtility Type。' },
  { term: 'Parameters', categoryId: 'utility-types', definition: '関数型の引数型をtupleとして取り出すUtility Type。' },
  { term: 'Awaited', categoryId: 'utility-types', definition: 'Promiseの中身を再帰的に取り出すUtility Type。' },
  { term: 'ConstructorParameters', categoryId: 'utility-types', definition: 'constructorの引数型を取り出すUtility Type。', difficulty: 'intermediate' },
  { term: 'InstanceType', categoryId: 'utility-types', definition: 'class constructorからinstance型を取り出すUtility Type。', difficulty: 'intermediate' },
  { term: 'ThisParameterType', categoryId: 'utility-types', definition: '関数型のthis parameter型を取り出すUtility Type。', difficulty: 'advanced' },
  { term: 'OmitThisParameter', categoryId: 'utility-types', definition: '関数型からthis parameterを除いた型を作るUtility Type。', difficulty: 'advanced' },
  { term: 'ThisType', categoryId: 'utility-types', definition: 'オブジェクトリテラル内のthis型を指定するUtility Type。', difficulty: 'advanced' },
  { term: 'NoInfer', categoryId: 'utility-types', definition: '型推論を抑制して明示的な型関係を保つUtility Type。', difficulty: 'advanced' },
  { term: 'module', categoryId: 'modules', definition: 'import/exportを持つファイル単位のコード境界。' },
  { term: 'import', categoryId: 'modules', definition: '別ファイルから値や型を取り込む構文。', codeExample: "import { apiRequest } from './apiClient'" },
  { term: 'export', categoryId: 'modules', definition: '別ファイルへ値や型を公開する構文。', codeExample: 'export type AttendanceStatus = string' },
  { term: 'default export', categoryId: 'modules', definition: 'モジュールの代表値を1つ公開する構文。' },
  { term: 'named export', categoryId: 'modules', definition: '名前付きで複数の値や型を公開する構文。' },
  { term: 'type-only import', categoryId: 'modules', definition: '型だけをimportする構文。', codeExample: "import type { AttendanceUser } from '../types/attendance'" },
  { term: 'path alias', categoryId: 'modules', definition: '@などでimportパスを短くする設定。', codeExample: "import App from '@/App.vue'" },
  { term: 'module resolution', categoryId: 'modules', definition: 'import先のファイルや型定義を探す仕組み。' },
  { term: 'barrel export', categoryId: 'modules', definition: '複数のexportをindex.tsなどでまとめるパターン。' },
  { term: 'side-effect import', categoryId: 'modules', definition: '値を受け取らず副作用だけを実行するimport。', codeExample: "import './styles/reset.css'" },
  { term: 'relative import', categoryId: 'modules', definition: './や../で相対パスからimportすること。' },
  { term: 'module boundary', categoryId: 'modules', definition: 'ファイルやpackageが公開する範囲の境界。' },
  { term: 'Promise', categoryId: 'async-api', definition: '非同期処理の完了や失敗を表すオブジェクト。', codeExample: 'Promise<DashboardData>' },
  { term: 'async', categoryId: 'async-api', definition: '関数をPromiseを返す非同期関数にするキーワード。', codeExample: 'const load = async () => {}' },
  { term: 'await', categoryId: 'async-api', definition: 'Promiseの完了を待って結果を受け取るキーワード。', codeExample: 'const data = await fetchDashboardData(userId)' },
  { term: 'try', categoryId: 'async-api', definition: '例外が起き得る処理を囲む構文。' },
  { term: 'catch', categoryId: 'async-api', definition: 'try内で起きた例外を受け取る構文。' },
  { term: 'finally', categoryId: 'async-api', definition: '成功・失敗に関係なく最後に実行する構文。', practical: ['学習ブランチ/AttendanceSystemForApril/src/composables/useDashboardData.ts'] },
  { term: 'error handling', categoryId: 'async-api', definition: '失敗時にユーザーや呼び出し元へ適切に伝える処理。' },
  { term: 'fetch', categoryId: 'async-api', definition: 'HTTPリクエストを送るブラウザ標準API。', practical: ['学習ブランチ/AttendanceSystemForApril/src/services/apiClient.ts'] },
  { term: 'JSON', categoryId: 'async-api', definition: 'API通信でよく使われるデータ交換形式。' },
  { term: 'response type', categoryId: 'async-api', definition: 'APIレスポンスの形を表す型。', codeExample: 'type UsersApiResponse = { users: EmployeeApiUser[] }' },
  { term: 'runtime validation', categoryId: 'async-api', definition: '実行時に外部データの中身を検証すること。', review: 'TypeScript型だけではAPIの実データを保証できないため境界で検証を検討する。' },
  { term: 'external input', categoryId: 'async-api', definition: 'API、フォーム、URLなど外部から入る信用しすぎてはいけない値。' },
  { term: 'unsafe cast', categoryId: 'review-basics', definition: '十分な根拠なく型アサーションで型を変えること。', codeExample: 'value as User', review: 'castの根拠と実行時検証の有無を確認する。' },
  { term: 'type assertion', categoryId: 'review-basics', definition: '値を特定の型として扱うようTypeScriptへ伝える記法。', codeExample: 'responseBody as T' },
  { term: 'implicit any', categoryId: 'review-basics', definition: '型注釈や推論不足でanyになってしまう状態。' },
  { term: 'unreachable code', categoryId: 'review-basics', definition: '実行経路上到達しないコード。' },
  { term: 'dead code', categoryId: 'review-basics', definition: '実際には使われていないコード。' },
  { term: 'boundary', categoryId: 'review-basics', definition: '内部と外部、UIとServiceなど責務が切り替わる場所。' },
  { term: 'responsibility', categoryId: 'review-basics', definition: '関数やモジュールが担当する仕事の範囲。' },
  { term: 'data flow', categoryId: 'review-basics', definition: 'データがどこから来てどこへ渡るかの流れ。' },
  { term: 'side effect', categoryId: 'review-basics', definition: '戻り値以外に外部状態を変える処理。' },
  { term: 'mutation', categoryId: 'review-basics', definition: '既存の値や配列、オブジェクトを直接変更すること。' },
  { term: 'immutability', categoryId: 'review-basics', definition: '既存の値を直接変えず、新しい値を作る考え方。', codeExample: '[...records].sort(...)', practical: ['学習ブランチ/AttendanceSystemForApril/src/services/attendanceService.ts'] },
  { term: 'review comment', categoryId: 'review-basics', definition: 'コード差分に対して問題や改善案を伝えるコメント。' },
  { term: 'regression risk', categoryId: 'review-basics', definition: '変更により既存機能が壊れる危険。' },
  { term: 'edge case', categoryId: 'review-basics', definition: '通常とは少し違う境界条件や例外的な入力。' },
  { term: 'test case', categoryId: 'review-basics', definition: '期待する動作を確認するための条件と検証。' },
  { term: 'separation of concerns', categoryId: 'review-basics', definition: '表示、状態、通信などの責務を分ける設計原則。' },
]

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const categoryMap = new Map(knowledgeCategories.map((category) => [category.id, category]))

const getCategory = (categoryId: string) => {
  const category = categoryMap.get(categoryId)

  if (!category) {
    throw new Error(`Unknown category: ${categoryId}`)
  }

  return category
}

export const glossaryTerms: GlossaryTerm[] = terms.map((seed) => {
  const category = getCategory(seed.categoryId)
  const id = seed.id ?? slugify(seed.term)
  const sourceUrls = category.officialSourceUrls
  const practicalSourceFiles = seed.practical ?? practicalFiles

  return {
    id,
    term: seed.term,
    reading: seed.reading,
    categoryId: seed.categoryId,
    shortDefinition: seed.definition,
    fullDefinition: `${seed.term}は「${category.title}」で扱う重要用語です。${seed.definition} TypeScriptの基本知識として意味を覚えたうえで、実コードの中でどの値や関数を守っているかを確認します。`,
    beginnerExplanation: `まずは「${seed.definition}」と短く言えることを目標にします。次にコード例や勤怠システム内の使用箇所を見て、用語が実装上どんな安全性を支えているかを確認します。`,
    codeExample: seed.codeExample,
    relatedTermIds: seed.related ?? [],
    officialSourceUrls: sourceUrls,
    practicalSourceFiles,
    reviewPerspective:
      seed.review ??
      `レビューでは、${seed.term}が意図した型安全性や責務を保っているか、過剰または不足していないかを確認します。`,
    difficulty: seed.difficulty ?? 'basic',
    tags: seed.tags ?? [seed.categoryId, slugify(seed.term)],
  }
})

export const learningChapters: LearningChapter[] = knowledgeCategories.map((category) => ({
  id: category.id,
  title: category.title,
  order: category.order,
  description: category.description,
}))

export const learningCards: LearningCard[] = glossaryTerms.slice(0, 120).map((term) => ({
  id: `card-${term.id}`,
  chapterId: term.categoryId,
  title: term.term,
  summary: term.shortDefinition,
  explanation: term.beginnerExplanation,
  codeExample: term.codeExample,
  sourceFiles: [...term.officialSourceUrls, ...term.practicalSourceFiles],
  tags: term.tags,
  difficulty: term.difficulty,
}))

const wrongDefinitions = [
  'CSSの色だけを変更するための用語。',
  '画像ファイルの解像度を表す用語。',
  'データベースを直接削除するための構文。',
  'HTMLタグの見た目だけを調整する設定。',
]

const normalizeChoices = (choices: string[]) => Array.from(new Set(choices)).slice(0, 4)

const createDefinitionQuiz = (card: LearningCard, index: number): QuizQuestion => ({
  id: `quiz-definition-${card.id}`,
  cardId: card.id,
  chapterId: card.chapterId,
  type: 'definition',
  question: `「${card.title}」の説明として正しいものはどれですか？`,
  choices: normalizeChoices([
    card.summary,
    wrongDefinitions[index % wrongDefinitions.length],
    wrongDefinitions[(index + 1) % wrongDefinitions.length],
    wrongDefinitions[(index + 2) % wrongDefinitions.length],
  ]),
  answer: card.summary,
  explanation: card.explanation,
  difficulty: card.difficulty,
})

const createCategoryQuiz = (card: LearningCard, index: number): QuizQuestion => {
  const category = getCategory(card.chapterId)
  const otherCategories = knowledgeCategories.filter((item) => item.id !== card.chapterId)

  return {
    id: `quiz-category-${card.id}`,
    cardId: card.id,
    chapterId: card.chapterId,
    type: 'definition',
    question: `「${card.title}」が属する知識カテゴリはどれですか？`,
    choices: normalizeChoices([
      category.title,
      otherCategories[(index + 1) % otherCategories.length].title,
      otherCategories[(index + 2) % otherCategories.length].title,
      otherCategories[(index + 3) % otherCategories.length].title,
    ]),
    answer: category.title,
    explanation: `「${card.title}」は「${category.title}」で扱う用語です。${category.description}`,
    difficulty: 'basic',
  }
}

const createReviewQuiz = (card: LearningCard): QuizQuestion => {
  const term = glossaryTerms.find((item) => `card-${item.id}` === card.id)

  return {
    id: `quiz-review-${card.id}`,
    cardId: card.id,
    chapterId: card.chapterId,
    type: 'review',
    question: `レビューで「${card.title}」を見るとき、最も近い観点はどれですか？`,
    choices: normalizeChoices([
      term?.reviewPerspective ?? '型安全性と責務が保たれているかを確認する。',
      'ロゴ画像の余白だけを確認する。',
      'ソースコードを読まずにファイル名だけで判断する。',
      '型エラーが出ても必ず無視する。',
    ]),
    answer: term?.reviewPerspective ?? '型安全性と責務が保たれているかを確認する。',
    explanation: term?.reviewPerspective ?? card.explanation,
    difficulty: card.difficulty,
  }
}

const codeReadingQuizzes: QuizQuestion[] = learningCards.slice(0, 80).map((card) => ({
  id: `quiz-code-${card.id}`,
  cardId: card.id,
  chapterId: card.chapterId,
  type: 'code-reading',
  question: `次のコード例を読むとき、主に確認するべきことはどれですか？\n${
    card.codeExample ?? `// ${card.title}: ${card.summary}`
  }`,
  choices: normalizeChoices([
    `「${card.title}」の意味がコード上でどう表れているか`,
    '画像の縦横比だけが正しいか',
    'CSSの背景色が青かどうか',
    'package-lock.jsonだけが更新されているか',
  ]),
  answer: `「${card.title}」の意味がコード上でどう表れているか`,
  explanation: `このコード例は「${card.title}」を理解するための実例です。定義だけでなく、コード上の役割を結びつけて覚えます。`,
  difficulty: card.difficulty,
}))

const sourceCodeQuizzes: QuizQuestion[] = [
  {
    id: 'source-attendance-status-restricts-values',
    cardId: 'card-union-type',
    chapterId: 'basic-types',
    type: 'code-reading',
    question: 'この型定義が主に防いでいるミスはどれですか？',
    codeSnippet: `export type AttendanceStatus =
  | '出勤前'
  | '勤務中'
  | '休憩中'
  | '退勤済み'`,
    sourceFile: '学習ブランチ/AttendanceSystemForApril/src/types/attendance.ts',
    relatedTermIds: ['union-type', 'literal-type'],
    choices: [
      '勤怠状態に未定義の文字列を入れてしまうミス',
      'CSSの色指定を間違えるミス',
      '画像ファイルの読み込みに失敗するミス',
      'DBを自動作成できないミス',
    ],
    answer: '勤怠状態に未定義の文字列を入れてしまうミス',
    explanation:
      '文字列リテラルのUnion型により、状態は4種類に限定されます。`外出中`のような未定義状態は型エラーで気づきやすくなります。',
    difficulty: 'basic',
  },
  {
    id: 'source-punch-action-endpoint-map',
    cardId: 'card-record',
    chapterId: 'utility-types',
    type: 'code-reading',
    question: '`Record<PunchAction, string>`を使う利点はどれですか？',
    codeSnippet: `const endpointMap: Record<PunchAction, string> = {
  clockIn: '/attendance/start',
  breakStart: '/attendance/break/start',
  breakEnd: '/attendance/break/end',
  clockOut: '/attendance/end',
}`,
    sourceFile: '学習ブランチ/AttendanceSystemForApril/src/services/attendanceService.ts',
    relatedTermIds: ['record', 'union-type'],
    choices: [
      'すべての打刻操作に対応するエンドポイントを持たせやすい',
      'APIキーを自動生成できる',
      'CSSクラスを自動で圧縮できる',
      '配列を必ず昇順にできる',
    ],
    answer: 'すべての打刻操作に対応するエンドポイントを持たせやすい',
    explanation:
      '`PunchAction`の各値をキーとして要求できるため、対応漏れがあるとTypeScriptが検知しやすくなります。',
    difficulty: 'intermediate',
  },
  {
    id: 'source-attendance-summary-object',
    cardId: 'card-object-type',
    chapterId: 'type-declarations',
    type: 'code-reading',
    question: 'このオブジェクト型が表しているものはどれですか？',
    codeSnippet: `export type AttendanceSummary = {
  status: AttendanceStatus
  workedHours: string
  breakDuration: string
}`,
    sourceFile: '学習ブランチ/AttendanceSystemForApril/src/types/attendance.ts',
    relatedTermIds: ['object-type', 'property'],
    choices: [
      '勤怠サマリーに必要な3つの表示項目',
      'ログインフォームの入力項目',
      'CSSのカラーパレット',
      'ルーティングのURL一覧',
    ],
    answer: '勤怠サマリーに必要な3つの表示項目',
    explanation:
      '`status`、`workedHours`、`breakDuration`の3項目を必須として、画面表示に必要な形を定義しています。',
    difficulty: 'basic',
  },
  {
    id: 'source-nullable-clock-out-time',
    cardId: 'card-nullable',
    chapterId: 'null-safety',
    type: 'code-reading',
    question: '`clockOutTime: string | null`の`null`が表す状態はどれですか？',
    codeSnippet: `export type AttendanceUser = {
  userId: string
  userName: string
  clockOutTime: string | null
}`,
    sourceFile: '学習ブランチ/AttendanceSystemForApril/src/types/attendance.ts',
    relatedTermIds: ['nullable', 'null', 'union-type'],
    choices: [
      'まだ退勤時刻が存在しない状態',
      '退勤時刻が必ず空文字で入る状態',
      '退勤時刻が必ず数値で入る状態',
      '退勤時刻をCSSで隠す状態',
    ],
    answer: 'まだ退勤時刻が存在しない状態',
    explanation:
      '未打刻のように値がまだないケースを`null`で明示しています。空文字と区別できる点が重要です。',
    difficulty: 'basic',
  },
  {
    id: 'source-api-request-generic-return',
    cardId: 'card-generics',
    chapterId: 'generics',
    type: 'code-reading',
    question: '`apiRequest<T>`の`T`が表しているものはどれですか？',
    codeSnippet: `export const apiRequest = async <T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> => {
  // ...
  return responseBody as T
}`,
    sourceFile: '学習ブランチ/AttendanceSystemForApril/src/services/apiClient.ts',
    relatedTermIds: ['generics', 'type-parameter', 'promise'],
    choices: [
      '呼び出し側が期待するAPIレスポンスの型',
      'HTTPステータスコードだけの型',
      'CSSファイル名の型',
      'ユーザーのパスワードの型',
    ],
    answer: '呼び出し側が期待するAPIレスポンスの型',
    explanation:
      '共通API関数はレスポンスの中身を固定できないため、呼び出し側が`UsersApiResponse`などを型引数として渡します。',
    difficulty: 'intermediate',
  },
  {
    id: 'source-response-body-as-t-risk',
    cardId: 'card-type-assertion',
    chapterId: 'review-basics',
    type: 'review',
    question: '`responseBody as T`をレビューするときの注意点はどれですか？',
    codeSnippet: `return (hasDataProperty(responseBody)
  ? responseBody.data
  : responseBody) as T`,
    sourceFile: '学習ブランチ/AttendanceSystemForApril/src/services/apiClient.ts',
    relatedTermIds: ['type-assertion', 'runtime-validation', 'external-input'],
    choices: [
      'TypeScript型だけでは実際のAPIレスポンス形状を保証できない',
      '必ずCSSの読み込みが失敗する',
      '配列の順番が自動で逆になる',
      'Vueコンポーネントが必ず再描画されない',
    ],
    answer: 'TypeScript型だけでは実際のAPIレスポンス形状を保証できない',
    explanation:
      '型アサーションは「そう扱う」と伝えるだけで、実行時検証ではありません。外部入力ではRuntime Validationを検討します。',
    difficulty: 'intermediate',
  },
  {
    id: 'source-has-data-property-unknown',
    cardId: 'card-unknown',
    chapterId: 'basic-types',
    type: 'code-reading',
    question: '`value is { data: unknown }`の役割として正しいものはどれですか？',
    codeSnippet: `const hasDataProperty = (value: unknown): value is { data: unknown } => {
  return typeof value === 'object' && value !== null && 'data' in value
}`,
    sourceFile: '学習ブランチ/AttendanceSystemForApril/src/services/apiClient.ts',
    relatedTermIds: ['unknown', 'custom-type-predicate', 'in-operator-narrowing'],
    choices: [
      '条件を満たした後に`data`プロパティを安全に扱えるようにする',
      '常にAPI通信を成功させる',
      'nullを文字列へ変換する',
      '配列を必ず空にする',
    ],
    answer: '条件を満たした後に`data`プロパティを安全に扱えるようにする',
    explanation:
      '`value is ...`はカスタム型ガードです。条件がtrueなら、その後の分岐で`data`プロパティを持つ型として扱えます。',
    difficulty: 'advanced',
  },
  {
    id: 'source-get-error-message-record',
    cardId: 'card-record',
    chapterId: 'utility-types',
    type: 'code-reading',
    question: '`Record<string, unknown>`を使っている理由として近いものはどれですか？',
    codeSnippet: `const body = value as Record<string, unknown>

if (typeof body.message === 'string') {
  return body.message
}`,
    sourceFile: '学習ブランチ/AttendanceSystemForApril/src/services/apiClient.ts',
    relatedTermIds: ['record', 'unknown', 'type-assertion'],
    choices: [
      '任意キーのオブジェクトとして扱い、値はまだ不明として検査するため',
      'すべての値をstringとして無条件に信用するため',
      'CSSの変数一覧を作るため',
      '配列だけを受け取るため',
    ],
    answer: '任意キーのオブジェクトとして扱い、値はまだ不明として検査するため',
    explanation:
      '`unknown`の値をすぐ信用せず、`typeof body.message === string`で中身を確認してから使っています。',
    difficulty: 'intermediate',
  },
  {
    id: 'source-fetch-employees-map',
    cardId: 'card-array',
    chapterId: 'basic-types',
    type: 'code-reading',
    question: 'この`map`が行っている変換はどれですか？',
    codeSnippet: `return users.map((user) => ({
  userId: String(user.id),
  userName: user.userName,
}))`,
    sourceFile: '学習ブランチ/AttendanceSystemForApril/src/services/attendanceService.ts',
    relatedTermIds: ['array', 'arrow-function', 'return-type'],
    choices: [
      'APIのユーザー配列を画面用の従業員配列へ変換している',
      '勤怠状態をCSSへ変換している',
      'ユーザーをDBから削除している',
      '全ユーザーをnullへ変換している',
    ],
    answer: 'APIのユーザー配列を画面用の従業員配列へ変換している',
    explanation:
      '`id`を文字列化し、画面側で使う`userId`と`userName`の形へ変換しています。',
    difficulty: 'basic',
  },
  {
    id: 'source-effective-user-find',
    cardId: 'card-array',
    chapterId: 'basic-types',
    type: 'code-reading',
    question: '`find`の戻り値をチェックする必要がある理由はどれですか？',
    codeSnippet: `const effectiveUser = users.find((user) => user.id === userId)

if (!effectiveUser) {
  throw new Error('表示できる従業員データがありません。')
}`,
    sourceFile: '学習ブランチ/AttendanceSystemForApril/src/services/attendanceService.ts',
    relatedTermIds: ['array', 'narrowing', 'undefined'],
    choices: [
      '`find`は条件に合う要素がないとundefinedを返すため',
      '`find`は必ず配列を削除するため',
      '`find`はCSSだけを返すため',
      '`find`はPromiseしか返せないため',
    ],
    answer: '`find`は条件に合う要素がないとundefinedを返すため',
    explanation:
      '見つからない可能性を考慮し、存在チェック後に処理を進めています。これはnull/undefined安全性のレビュー観点にもなります。',
    difficulty: 'basic',
  },
  {
    id: 'source-breaks-reduce-total',
    cardId: 'card-array',
    chapterId: 'basic-types',
    type: 'code-reading',
    question: 'この`reduce`の目的はどれですか？',
    codeSnippet: `return breaks.reduce((total, row) => {
  if (row.breakEndDt) {
    return total + getDiffMinutes(row.breakStartDt, row.breakEndDt)
  }

  return total
}, 0)`,
    sourceFile: '学習ブランチ/AttendanceSystemForApril/src/services/attendanceService.ts',
    relatedTermIds: ['array', 'return-type', 'null-check'],
    choices: [
      '複数の休憩時間を合計分数へ集約する',
      '休憩データをすべて削除する',
      'ユーザー名だけを抽出する',
      'APIキーを生成する',
    ],
    answer: '複数の休憩時間を合計分数へ集約する',
    explanation:
      '`reduce`は配列を1つの値へまとめる処理に向いています。ここでは休憩時間の合計を作っています。',
    difficulty: 'basic',
  },
  {
    id: 'source-spread-sort-latest',
    cardId: 'card-immutability',
    chapterId: 'review-basics',
    type: 'review',
    question: '`[...records].sort(...)`のレビュー観点として正しいものはどれですか？',
    codeSnippet: `const getLatestRecord = (records: AttendanceApiRecord[]) => {
  return [...records].sort((a, b) => b.id - a.id)[0] ?? null
}`,
    sourceFile: '学習ブランチ/AttendanceSystemForApril/src/services/attendanceService.ts',
    relatedTermIds: ['immutability', 'mutation', 'array'],
    choices: [
      '`sort`による元配列の破壊的変更を避けている',
      '必ずAPI通信を並列化している',
      '型チェックを無効化している',
      'Dateを文字列へ戻している',
    ],
    answer: '`sort`による元配列の破壊的変更を避けている',
    explanation:
      '`sort`は元配列を変更します。Spreadでコピーしてから並べ替えることで、呼び出し元の配列を守っています。',
    difficulty: 'intermediate',
  },
  {
    id: 'source-promise-all-dashboard',
    cardId: 'card-promise',
    chapterId: 'async-api',
    type: 'code-reading',
    question: '`Promise.all`を使う理由として近いものはどれですか？',
    codeSnippet: `const [attendanceUsers, currentUserRecords] = await Promise.all([
  buildAttendanceUsers(users),
  fetchAttendanceRecords(effectiveUser.id),
])`,
    sourceFile: '学習ブランチ/AttendanceSystemForApril/src/services/attendanceService.ts',
    relatedTermIds: ['promise', 'async', 'await'],
    choices: [
      '互いに待つ必要がない非同期処理を並行して進めるため',
      '配列を必ず1件にするため',
      'CSSを遅延読み込みするため',
      '型エラーを無視するため',
    ],
    answer: '互いに待つ必要がない非同期処理を並行して進めるため',
    explanation:
      '勤怠ユーザー一覧と対象ユーザーの勤怠記録は並行取得できます。`Promise.all`により完了をまとめて待てます。',
    difficulty: 'intermediate',
  },
  {
    id: 'source-current-attendance-state-literal',
    cardId: 'card-literal-type',
    chapterId: 'basic-types',
    type: 'code-reading',
    question: '`1 | 2 | null`が表しているものとして近いものはどれですか？',
    codeSnippet: `type EmployeeApiUser = {
  currentAttendanceState: 1 | 2 | null
  currentAttendanceId: number | null
}`,
    sourceFile: '学習ブランチ/AttendanceSystemForApril/src/services/attendanceService.ts',
    relatedTermIds: ['literal-type', 'union-type', 'nullable'],
    choices: [
      'API上の勤怠状態コードが1、2、または未設定であること',
      '従業員名が1文字か2文字であること',
      'CSSの余白が1pxか2pxであること',
      'APIが必ず2回呼ばれること',
    ],
    answer: 'API上の勤怠状態コードが1、2、または未設定であること',
    explanation:
      '数値リテラル型と`null`のUnionです。取り得るコード値を限定し、未設定も表現しています。',
    difficulty: 'basic',
  },
  {
    id: 'source-computed-current-user-id',
    cardId: 'card-narrowing',
    chapterId: 'narrowing',
    type: 'code-reading',
    question: '`Number.isFinite`で確認してから返している理由はどれですか？',
    codeSnippet: `const currentUserId = computed(() => {
  const userId = authStore.user?.userId
  const numericUserId = Number(userId)

  return Number.isFinite(numericUserId) ? numericUserId : null
})`,
    sourceFile: '学習ブランチ/AttendanceSystemForApril/src/composables/useDashboardData.ts',
    relatedTermIds: ['narrowing', 'nullable', 'optional-chaining'],
    choices: [
      '数値として扱えるユーザーIDだけを返し、不正ならnullにするため',
      'ユーザー名を必ず大文字にするため',
      'APIレスポンスをHTMLへ変換するため',
      'Loadingを必ずtrueにするため',
    ],
    answer: '数値として扱えるユーザーIDだけを返し、不正ならnullにするため',
    explanation:
      '文字列IDを数値化したあと、有限な数値か確認しています。失敗時は`null`にして後続処理で扱いやすくしています。',
    difficulty: 'intermediate',
  },
  {
    id: 'source-load-dashboard-finally',
    cardId: 'card-finally',
    chapterId: 'async-api',
    type: 'code-reading',
    question: '`finally`でLoadingを解除する理由はどれですか？',
    codeSnippet: `dashboardStore.setAttendanceLoading(true)

try {
  const dashboardData = await fetchDashboardData(currentUserId.value)
  dashboardStore.setSummary(dashboardData.summary)
} finally {
  dashboardStore.setAttendanceLoading(false)
}`,
    sourceFile: '学習ブランチ/AttendanceSystemForApril/src/composables/useDashboardData.ts',
    relatedTermIds: ['finally', 'async', 'error-handling'],
    choices: [
      '成功しても失敗してもLoadingを止めるため',
      'APIレスポンス型を自動生成するため',
      '配列をコピーするため',
      'CSSを削除するため',
    ],
    answer: '成功しても失敗してもLoadingを止めるため',
    explanation:
      '`finally`は例外があっても実行されます。Loading表示が残り続ける不具合を避けるレビュー観点になります。',
    difficulty: 'basic',
  },
  {
    id: 'source-dashboard-data-shape',
    cardId: 'card-object-type',
    chapterId: 'type-declarations',
    type: 'code-reading',
    question: '`DashboardData`がまとめているものはどれですか？',
    codeSnippet: `export type DashboardData = {
  summary: AttendanceSummary
  attendanceUsers: AttendanceUser[]
  hasBreakEnded: boolean
}`,
    sourceFile: '学習ブランチ/AttendanceSystemForApril/src/types/attendance.ts',
    relatedTermIds: ['object-type', 'array', 'boolean'],
    choices: [
      'ダッシュボード表示に必要なサマリー、一覧、休憩終了状態',
      'ログイン画面のCSSだけ',
      'APIキーとパスワードだけ',
      '画像アセットの一覧だけ',
    ],
    answer: 'ダッシュボード表示に必要なサマリー、一覧、休憩終了状態',
    explanation:
      '画面が必要とするデータ一式を1つの型にまとめています。データフローを追う入口になります。',
    difficulty: 'basic',
  },
  {
    id: 'source-fetch-attendance-response',
    cardId: 'card-response-type',
    chapterId: 'async-api',
    type: 'code-reading',
    question: 'このレスポンス型が表しているものはどれですか？',
    codeSnippet: `export type FetchAttendanceListResponse = {
  attendanceList: AttendanceListItem[]
}`,
    sourceFile: '学習ブランチ/AttendanceSystemForApril/src/types/attendance.ts',
    relatedTermIds: ['response-type', 'array', 'object-type'],
    choices: [
      '勤怠一覧API相当の戻り値が`attendanceList`配列を持つこと',
      '勤怠一覧が必ず文字列1つだけで返ること',
      'CSSファイルが配列で返ること',
      'ログイン状態が常にtrueであること',
    ],
    answer: '勤怠一覧API相当の戻り値が`attendanceList`配列を持つこと',
    explanation:
      'レスポンス型を定義することで、ServiceからViewへ渡るデータ形状を読みやすくしています。',
    difficulty: 'basic',
  },
  {
    id: 'source-api-options-method-union',
    cardId: 'card-union-type',
    chapterId: 'basic-types',
    type: 'code-reading',
    question: '`method?: "GET" | "POST" | ...`が防ぐミスはどれですか？',
    codeSnippet: `type ApiRequestOptions = {
  body?: unknown
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
}`,
    sourceFile: '学習ブランチ/AttendanceSystemForApril/src/services/apiClient.ts',
    relatedTermIds: ['optional-property', 'union-type', 'unknown'],
    choices: [
      'HTTPメソッド名の打ち間違いや未対応メソッドの指定',
      'ユーザー名の重複登録',
      '画像の縦横比の不一致',
      'ブラウザのズーム倍率変更',
    ],
    answer: 'HTTPメソッド名の打ち間違いや未対応メソッドの指定',
    explanation:
      'methodは省略可能で、指定する場合は5種類に限定されます。`POSST`のような誤字に気づきやすくなります。',
    difficulty: 'basic',
  },
  {
    id: 'source-api-body-unknown',
    cardId: 'card-unknown',
    chapterId: 'basic-types',
    type: 'review',
    question: '`body?: unknown`のレビュー観点として近いものはどれですか？',
    codeSnippet: `type ApiRequestOptions = {
  body?: unknown
}`,
    sourceFile: '学習ブランチ/AttendanceSystemForApril/src/services/apiClient.ts',
    relatedTermIds: ['unknown', 'optional-property', 'external-input'],
    choices: [
      '共通API関数なのでbodyの形を固定しすぎず、送信前の扱いを確認する',
      'bodyは必ずCSS文字列であると決める',
      'bodyが必ず存在すると断言する',
      'bodyを画像として読み込む',
    ],
    answer: '共通API関数なのでbodyの形を固定しすぎず、送信前の扱いを確認する',
    explanation:
      '共通関数では様々なbodyを受けるため`unknown`にしています。実装ではJSON.stringifyへ渡す前提が妥当か確認します。',
    difficulty: 'intermediate',
  },
  {
    id: 'source-format-time-null-return',
    cardId: 'card-nullable',
    chapterId: 'null-safety',
    type: 'code-reading',
    question: '`if (!value) return null`の役割はどれですか？',
    codeSnippet: `const formatTime = (value: string | null) => {
  if (!value) {
    return null
  }

  return new Intl.DateTimeFormat('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}`,
    sourceFile: '学習ブランチ/AttendanceSystemForApril/src/services/attendanceService.ts',
    relatedTermIds: ['nullable', 'truthiness-narrowing', 'return-type'],
    choices: [
      '時刻がない場合にDate変換せずnullとして返すため',
      '時刻を必ず0時にするため',
      'ユーザーIDを文字列へ変換するため',
      'API通信を中断するため',
    ],
    answer: '時刻がない場合にDate変換せずnullとして返すため',
    explanation:
      'nullや空値をDateへ渡す前に止めています。未打刻データを安全に扱うための分岐です。',
    difficulty: 'basic',
  },
  {
    id: 'source-calculate-worked-minutes-end-reference',
    cardId: 'card-nullish-coalescing',
    chapterId: 'null-safety',
    type: 'code-reading',
    question: '`record.workEndDt ?? ...`の意味として正しいものはどれですか？',
    codeSnippet: `const endReference =
  record.workEndDt ??
  (currentAttendanceState === 1 || currentAttendanceState === 2
    ? new Date().toISOString()
    : null)`,
    sourceFile: '学習ブランチ/AttendanceSystemForApril/src/services/attendanceService.ts',
    relatedTermIds: ['nullish-coalescing', 'nullable', 'literal-type'],
    choices: [
      '退勤時刻があればそれを使い、勤務中なら現在時刻を代わりに使う',
      '退勤時刻を必ず削除する',
      '勤務状態をCSSクラスに変換する',
      '常にnullを返す',
    ],
    answer: '退勤時刻があればそれを使い、勤務中なら現在時刻を代わりに使う',
    explanation:
      '`??`は左がnull/undefinedのときだけ右側を使います。未退勤だが勤務中なら現在時刻を計算基準にしています。',
    difficulty: 'intermediate',
  },
  {
    id: 'source-has-break-ended-some',
    cardId: 'card-array',
    chapterId: 'basic-types',
    type: 'code-reading',
    question: 'この`some`が判定していることはどれですか？',
    codeSnippet: `hasBreakEnded: (todayRecord?.breaks ?? []).some(
  (row) => row.breakEndDt !== null,
)`,
    sourceFile: '学習ブランチ/AttendanceSystemForApril/src/services/attendanceService.ts',
    relatedTermIds: ['array', 'optional-chaining', 'nullish-coalescing'],
    choices: [
      '今日の休憩の中に終了済みのものが1件でもあるか',
      '全休憩が必ず未終了か',
      '休憩が必ず0件か',
      'ユーザー名が空かどうか',
    ],
    answer: '今日の休憩の中に終了済みのものが1件でもあるか',
    explanation:
      '`some`は条件を満たす要素が1つでもあればtrueです。`?.`と`?? []`でレコードなしにも備えています。',
    difficulty: 'basic',
  },
  {
    id: 'source-type-only-import',
    cardId: 'card-type-only-import',
    chapterId: 'modules',
    type: 'code-reading',
    question: '`import type`を使う理由として正しいものはどれですか？',
    codeSnippet: `import type {
  AttendanceStatus,
  AttendanceUser,
  DashboardData,
  PunchAction,
} from '../types/attendance'`,
    sourceFile: '学習ブランチ/AttendanceSystemForApril/src/services/attendanceService.ts',
    relatedTermIds: ['type-only-import', 'import', 'module'],
    choices: [
      '型だけを取り込むことを明示し、実行時の値importと区別するため',
      'CSSだけを取り込むため',
      'APIを自動実行するため',
      '画像をBase64に変換するため',
    ],
    answer: '型だけを取り込むことを明示し、実行時の値importと区別するため',
    explanation:
      '`AttendanceStatus`などは型としてだけ使われます。`import type`により、実行時コードとの境界が明確になります。',
    difficulty: 'basic',
  },
  {
    id: 'source-api-error-response-ok',
    cardId: 'card-error-handling',
    chapterId: 'async-api',
    type: 'review',
    question: '`if (!response.ok)`のレビュー観点として正しいものはどれですか？',
    codeSnippet: `if (!response.ok) {
  throw new Error(
    getErrorMessage(responseBody, \`API request failed: HTTP \${response.status}\`),
  )
}`,
    sourceFile: '学習ブランチ/AttendanceSystemForApril/src/services/apiClient.ts',
    relatedTermIds: ['error-handling', 'fetch', 'external-input'],
    choices: [
      'HTTPエラー時に呼び出し元へ失敗を伝えられているか',
      '画像サイズを変更できるか',
      'CSSの色を青にできるか',
      '配列を必ず昇順にできるか',
    ],
    answer: 'HTTPエラー時に呼び出し元へ失敗を伝えられているか',
    explanation:
      'HTTPエラーを握りつぶさず例外にしています。レビューでは、呼び出し元で表示や復旧ができるかも合わせて確認します。',
    difficulty: 'intermediate',
  },
  {
    id: 'source-build-api-url-trim-slashes',
    cardId: 'card-edge-case',
    chapterId: 'review-basics',
    type: 'review',
    question: 'このURL生成で考慮しているedge caseはどれですか？',
    codeSnippet: `return \`\${API_BASE_URL.replace(/\\/$/, '')}/\${path.replace(/^\\//, '')}\``,
    sourceFile: '学習ブランチ/AttendanceSystemForApril/src/services/apiClient.ts',
    relatedTermIds: ['edge-case', 'runtime', 'string'],
    choices: [
      'base URL末尾とpath先頭のスラッシュ重複',
      'ユーザー名の漢字変換',
      '画像の透明度',
      '配列の要素数が必ず2であること',
    ],
    answer: 'base URL末尾とpath先頭のスラッシュ重複',
    explanation:
      '末尾と先頭のスラッシュを整えることで、`//attendance`のようなURL崩れを避けています。',
    difficulty: 'intermediate',
  },
  {
    id: 'source-is-same-local-date-null',
    cardId: 'card-null-check',
    chapterId: 'null-safety',
    type: 'code-reading',
    question: '`if (!value) return false`が必要な理由はどれですか？',
    codeSnippet: `const isSameLocalDate = (value: string | null, baseDate: Date) => {
  if (!value) {
    return false
  }

  const date = new Date(value)
  return date.getFullYear() === baseDate.getFullYear()
}`,
    sourceFile: '学習ブランチ/AttendanceSystemForApril/src/services/attendanceService.ts',
    relatedTermIds: ['null-check', 'nullable', 'narrowing'],
    choices: [
      '日時がない場合にDate変換せず、同日ではないと判定するため',
      '必ず同日と判定するため',
      'baseDateを削除するため',
      'API通信を開始するため',
    ],
    answer: '日時がない場合にDate変換せず、同日ではないと判定するため',
    explanation:
      'nullableな日時を扱うため、値がない場合の分岐を先に置いています。Date処理の安全性を上げる書き方です。',
    difficulty: 'basic',
  },
  {
    id: 'source-attendance-list-item-view-model',
    cardId: 'card-object-type',
    chapterId: 'type-declarations',
    type: 'code-reading',
    question: '`AttendanceListItem`の役割として近いものはどれですか？',
    codeSnippet: `export type AttendanceListItem = {
  userId: string
  status: AttendanceStatus
  clockInTime: string | null
  breakStartTime: string | null
  breakEndTime: string | null
  clockOutTime: string | null
}`,
    sourceFile: '学習ブランチ/AttendanceSystemForApril/src/types/attendance.ts',
    relatedTermIds: ['object-type', 'nullable', 'union-type'],
    choices: [
      '画面へ渡す勤怠一覧1行分の形を定義している',
      'DB接続文字列を定義している',
      'ログインパスワードだけを保持している',
      'CSSアニメーションを定義している',
    ],
    answer: '画面へ渡す勤怠一覧1行分の形を定義している',
    explanation:
      '従業員ごとの状態と各打刻時刻をまとめた画面向けの型です。未打刻の時刻は`null`で表します。',
    difficulty: 'basic',
  },
  {
    id: 'source-fetch-attendance-records-urlsearchparams',
    cardId: 'card-string',
    chapterId: 'basic-types',
    type: 'code-reading',
    question: '`URLSearchParams`へ`String(userId)`を渡す理由として近いものはどれですか？',
    codeSnippet: `const query = new URLSearchParams({
  userId: String(userId),
  targetMonth: getTargetMonth(),
})`,
    sourceFile: '学習ブランチ/AttendanceSystemForApril/src/services/attendanceService.ts',
    relatedTermIds: ['string', 'parameter-type', 'external-input'],
    choices: [
      'URLクエリは文字列として表現するため',
      'userIdを必ずnullにするため',
      'targetMonthを数値配列にするため',
      'API通信を止めるため',
    ],
    answer: 'URLクエリは文字列として表現するため',
    explanation:
      'URLSearchParamsの値は文字列として扱われます。数値IDをクエリへ入れる前に文字列化しています。',
    difficulty: 'basic',
  },
  {
    id: 'source-dashboard-display-user-name-fallback',
    cardId: 'card-fallback-value',
    chapterId: 'null-safety',
    type: 'code-reading',
    question: '`apiUserName.value || "ユーザー"`が行っていることはどれですか？',
    codeSnippet: `const displayUserName = computed(() => apiUserName.value || 'ユーザー')`,
    sourceFile: '学習ブランチ/AttendanceSystemForApril/src/composables/useDashboardData.ts',
    relatedTermIds: ['fallback-value', 'truthiness-narrowing', 'computed'],
    choices: [
      'API上の名前が空の場合に表示用の代替名を使う',
      'ユーザー名を必ず削除する',
      'APIレスポンスを配列にする',
      'Loadingを解除する',
    ],
    answer: 'API上の名前が空の場合に表示用の代替名を使う',
    explanation:
      '表示名が空のときでも画面に何も出ない状態を避けるため、`ユーザー`をfallbackとして使っています。',
    difficulty: 'basic',
  },
  {
    id: 'source-fetch-users-return-shape',
    cardId: 'card-response-type',
    chapterId: 'async-api',
    type: 'code-reading',
    question: '`return response.users`で呼び出し元へ返しているものはどれですか？',
    codeSnippet: `const fetchUsers = async () => {
  const response = await apiRequest<UsersApiResponse>('/users')

  return response.users
}`,
    sourceFile: '学習ブランチ/AttendanceSystemForApril/src/services/attendanceService.ts',
    relatedTermIds: ['generics', 'response-type', 'await'],
    choices: [
      '`UsersApiResponse`の中にあるユーザー配列',
      'HTTPステータスコードだけ',
      'CSSファイル名だけ',
      'ログイン画面のHTMLだけ',
    ],
    answer: '`UsersApiResponse`の中にあるユーザー配列',
    explanation:
      'Genericでレスポンス型を指定し、その中の`users`配列を取り出して返しています。',
    difficulty: 'basic',
  },
]

export const quizQuestions: QuizQuestion[] = [
  ...sourceCodeQuizzes,
  ...learningCards.map(createDefinitionQuiz),
  ...learningCards.map(createCategoryQuiz),
  ...learningCards.slice(0, 80).map(createReviewQuiz),
  ...codeReadingQuizzes,
].slice(0, 360)

export const knowledgeBaseStats = {
  categories: knowledgeCategories.length,
  glossaryTerms: glossaryTerms.length,
  learningCards: learningCards.length,
  quizQuestions: quizQuestions.length,
  codeReadingQuizzes:
    codeReadingQuizzes.length + sourceCodeQuizzes.filter((quiz) => quiz.type === 'code-reading').length,
  sourceCodeQuizzes: sourceCodeQuizzes.length,
}
