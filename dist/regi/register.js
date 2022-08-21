const myapp = {
  data() {
    return {
      // DB -------------------------------------------------------------------------------
      clients: [],
      receivables: [],
      products: [],
      income: [],
      cart: [],
      // DB -------------------------------------------------------------------------------
      // common ---------------------------------------------------------------------------
      tenKey: [],
      kana_table1: [],
      kana_table2: [],
      
      // common ---------------------------------------------------------------------------



      product_code: '',
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
    // read data from local strage ----------------------------------------------
    const db = ini_strage()
    this.clients = db['clients']
    this.receivables = db['receivables']
    this.products = db['products']
    this.income = db['income']
    this.cart = db['cart']

    this.tenKey = TENKEY
    this.kana_table1 = KANATABLE1
    this.kana_table2 = KANATABLE2

  },

  watch: {
    product_code: 'getProduct',
    kanaName: 'getCandidates',
  },
  computed: {
  },
  methods:{
    //--------------------------------------------
    logout() {
      window.location.href = './index.html'
    },
    go_to_manage(){
      window.location.href = './management.html'
    },
    //--------------------------------------------


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
      if (this.product_code.length !== 6) return
      let target = this.products.find((p) => p.code == this.product_code)

      var new_item = { 'date': '2022-8-1', 'client_id': this.client.id, 'amount': target.price, 'type': 'products', 'item_id': target.id, 'category': target.category, 'detail': '(' + target.code + ')' + target.name, 'quantity': 1}
      this.cart.push(new_item)
      this.subtotal += (new_item.amount * new_item.quantity)

    },
    getCandidates(){
      if (this.kanaName.length <= 1) return
      this.candidates = this.clients.filter(c => c.kanaName.indexOf(this.kanaName) !== -1)
    },
    addToCart(receivable_id) {
      var target = this.applicable_receivables.find((r) => r.id == receivable_id )
      var new_item = { 'date': target.date, 'client_id': target.client_id, 'amount': target.amount, 'type': 'receivables', 'item_id': target.id, 'category': target.category, 'detail': target.detail, 'quantity': 1}
      this.cart.push(new_item)
      this.subtotal += (new_item.amount * new_item.quantity)
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
