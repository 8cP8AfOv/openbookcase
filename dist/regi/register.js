const myapp = {
  data() {
    return {

      // const start ------------------------------------------------------------
      kanaTable1: [
        ['ん','わ','ら','や','ま','は','な','た','さ','か','あ'],
        ['','','り','','み','ひ','に','ち','し','き','い'],                    
        ['','','る','ゆ','む','ふ','ぬ','つ','す','く','う'],
        ['','','れ','','め','へ','ね','て','せ','け','え'],
        ['','を','ろ','よ','も','ほ','の','と','そ','こ','お']
      ],
      kanaTable2: [
        ['ー','ゃ','','','ば','だ','ざ','が'],
        ['','','','','び','ぢ','じ','ぎ'],                    
        ['','ゅ','っ','','ぶ','づ','ず','ぐ'],
        ['','','','','べ','で','ぜ','げ'],
        ['','ょ','','','ぼ','ど','ぞ','ご']        
      ],
      tenKey: [
        ['7','8','9'],
        ['4','5','6'],
        ['1','2','3'],
        ['0','00','000']
      ],
      // const end ------------------------------------------------------------

      // DB start -------------------------------------------------------------------------------
      clients: [
        {'id':1, 'code':'9999', 'name':'一般のお客様', 'kanaName':''},
        {'id':2, 'code':'1111', 'name':'山田春子', 'kanaName':'やまだはるこ'},
        {'id':3, 'code':'2222', 'name':'田中夏彦', 'kanaName':'たなかなつひこ'},
        {'id':4, 'code':'3333', 'name':'佐藤秋子', 'kanaName':'さとうあきこ'},
        {'id':5, 'code':'4444', 'name':'鈴木冬彦', 'kanaName':'すずきふゆひこ'},
        {'id':6, 'code':'5555', 'name':'山本一郎', 'kanaName':'やまもといちろう'},
      ],
      receivables: [
        {'id':1, 'client_id':3, 'amount':15000, 'date':'2022-7-21', 'received_date':null, 'subject':'内装', 'detail':'詳細'},
        {'id':2, 'client_id':2, 'amount':20000, 'date':'2022-8-3', 'received_date':null, 'subject':'太陽光発電', 'detail':'詳細'},
        {'id':3, 'client_id':2, 'amount':30000, 'date':'2022-8-10', 'received_date':null, 'subject':'太陽光発電', 'detail':'詳細'},
        {'id':4, 'client_id':2, 'amount':5000, 'date':'2022-8-16', 'received_date':null, 'subject':'ガス', 'detail':'詳細'},
      ],
      products: [
        {'id':1, 'jan':'4902621004589', 'name':'バランスパワーBIG ブラックカカオ', 'maker': 'ハマダコンフェクト', 'category':'その他の食品・嗜好品', 'price':'110'},
        {'id':2, 'jan':'4549741893909', 'name':'フルーツブロック', 'maker': 'イオン', 'category':'加工食品', 'price':'98'},
      ],
      cashIncome: [
        {'id':0, 'date':'', 'client_id':'9999', 'amount':0, 'receivables_id':'0'},
      ],
      cart: [ //{'jan': '', 'category': '', 'subject': '', 'quantity': 0, 'price': 0 },
      ],
      // DB end -------------------------------------------------------------------------------


      jan: '',
      clientFinder: false,
      kanaName: '',
      selected: { name: null, id: null },
      candidates: [],
      client: {'id':1, 'code':'9999', 'name':'一般のお客様', 'kanaName':''},
      applicable_receivables: [],
      subtotal: 0,

      show_ar_list: false,
      ar_list_icon: 'mdi-triangle-small-down',
      show_tenkey: false,
      tenkey_icon: 'mdi-triangle-small-down',
      recieved_amount: '',
      rest: 0,
    };
  },
  mounted(){
    this.cilent = this.clients[0]
  },
  watch: {
    jan: 'getProduct',
    kanaName: 'getCandidates',
  },
  computed: {

  },
  methods:{
    logout() {
      window.location.href = './index.html'
    },

    clearKanaName() {
      this.kanaName = ''
      this.candidates = []
    },

    showClientFinder() {
      this.clientFinder = !this.clientFinder
    },
    inputKana(kana) {
      this.kanaName += kana
    },
    setClient(client_id) {
      this.client = this.clients.find((c) => c.id == client_id)
      this.applicable_receivables = this.receivables.filter((r) => (r.client_id == client_id) && (r.received_date == null) )
      this.clientFinder = false
      this.show_ar_list = ( this.applicable_receivables.length > 0 ) 
      //console.log(this.client.id)
      //console.log(this.applicable_receivables)
    },

    getProduct(){
      if (this.jan.length !== 13) return;
      const target = this.products.find((p) => p.jan === this.jan)

      var new_item = { 'jan': target.jan, 'category': '物販', 'subject': target.name, 'quantity': 1, 'price': target.price }
      this.cart.push(new_item)
      this.subtotal += (new_item.price * 1)

    },
    getCandidates(){
      if (this.kanaName.length <= 1) return
      this.candidates = this.clients.filter(c => c.kanaName.indexOf(this.kanaName) !== -1)
    },
    addToCart(receivable_id) {
      var target = this.applicable_receivables.find((r) => r.id == receivable_id )
      var new_item = { 'jan': '', 'category': target.subject, 'subject': '', 'quantity': 1, 'price': target.amount }
      this.cart.push(new_item)
      this.subtotal += (new_item.price * 1)
    },
    goToManage(){
      window.location.href = './manage.html'
    },


    openARList() {
      this.ar_list_icon = this.show_ar_list ? 'mdi-triangle-small-up' : 'mdi-triangle-small-down'
      this.show_ar_list = !this.show_ar_list
    },
    openTenKey(){
      this.show_tenkey = !this.show_tenkey
      this.tenkey_icon = this.show_tenkey ? 'mdi-triangle-small-up' : 'mdi-triangle-small-down'
      var ra = this.recieved_amount * 1
      if (!this.show_tenkey && ra > 0) {
        this.rest = ra - this.subtotal
      }

    },
    addDigit(digit) {
      this.recieved_amount += digit
    },
  }
}


app = Vue.createApp(myapp);
app.use(Vuetify.createVuetify());
app.mount("#app");
