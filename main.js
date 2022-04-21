// import firebase from 'firebase'
[
    { "id": 1, "priority": 0, "projectName": "プロ1", "description": "説明1", "state": 0 },
    { "id": 2, "priority": 0, "projectName": "プロ2", "description": "説明2", "state": 0 }
]
const app = new Vue({
    el: '#app',
    data: {
      // 使用するデータ
      todos: [],
      options: [
        { value: -1, label: 'すべて' },
        { value: 0,  label: '作業中' },
        { value: 1,  label: '完了' }
      ],
      // 選択している options の value を記憶するためのデータ
      // 初期値を「-1」つまり「すべて」にする
      current: -1,
      //優先度のselect
      selectedItem: [],
    },
    methods: {
      // 使用するメソッド
        // ToDo 追加の処理
        doAdd: function(event, value) {
            // ref で名前を付けておいた要素を参照
            var priority = this.$refs.priority
            var projectName = this.$refs.projectName
            var description = this.$refs.description
            // 入力がなければ何もしないで return
            if (!projectName.value.length || !description.value.length) {
              return
            }
            // { 新しいID, 優先度, project名, 説明, 作業状態 }
            // というオブジェクトを現在の todos リストへ push
            // 作業状態「state」はデフォルト「作業中=0」で作成
            this.todos.push({
              id: todoStorage.uid++,
              priority: priority.value,
              projectName: projectName.value,
              description: description.value,
              state: 0
            })
            // フォーム要素を空にする
            priority.value = 
            projectName.value = ''
            description.value = ''
        },
        // 状態変更の処理
        doChangeState: function(item) {
            item.state = item.state ? 0 : 1
        },
        // 削除の処理
        doRemove: function(item) {
            var index = this.todos.indexOf(item)
            this.todos.splice(index, 1)
        }
    },
    // https://jp.vuejs.org/v2/examples/todomvc.html
    var :STORAGE_KEY = 'todos-vuejs-demo',
    var :todoStorage = {
        fetch: function() {
            var todos = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || '[]'
            )
            todos.forEach(function(todo, index) {
            todo.id = index
            })
            todoStorage.uid = todos.length
            return todos
        },
        save: function(todos) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
        }
    },
    watch: {
        // オプションを使う場合はオブジェクト形式にする
        todos: {
          // 引数はウォッチしているプロパティの変更後の値
          handler: function(todos) {
            todoStorage.save(todos)
          },
          // deep オプションでネストしているデータも監視できる
          deep: true
        },
        //フォームを空にする
        selectedItem(value) {
          if (!value) {
            this.priority = "";
          }
        },
    },
    created() {
        // インスタンス作成時に自動的に fetch() する
        this.todos = todoStorage.fetch()
    },
    computed: {
        computedTodos: function() {
          // データ current が -1 ならすべて
          // それ以外なら current と state が一致するものだけに絞り込む
          return this.todos.filter(function(el) {
            return this.current < 0 ? true : this.current === el.state
          }, this)
        },
        //radioButton
        labels() {
            return this.options.reduce(function(a, b) {
              return Object.assign(a, { [b.value]: b.label })
            }, {})
            // キーから見つけやすいように、次のように加工したデータを作成
            // {0: '作業中', 1: '完了', -1: 'すべて'}
        }
      }
})