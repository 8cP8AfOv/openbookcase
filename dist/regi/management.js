const myapp = {
  components: { Datepicker: VueDatePicker },
  
  data() {
    return {
      // DB -------------------------------------------------------------------------------
      clients: [],
      receivables: [],
      products: [],
      income: [],
      cart: [],
      // DB -------------------------------------------------------------------------------

      tab: null,
      picker: '',
      //ref: null,

      categories: ['食品', '飲料', '衣類', '雑貨'],

      //-------------------------------
      code: '',
      category: '',
      maker: '',
      name: '',
      price: '',
      //-------------------------------


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

  },
  watch: {

  },
  methods:{
    //--------------------------------------------
    logout() {
      window.location.href = './index.html'
    },
    go_to_register(){
      window.location.href = './register.html'
    },
    //--------------------------------------------

    add_product(){
      let new_id = this.products.reduce((a, b) => a > b.id ? a : b.id, 0) + 1

      let new_item = {'id':new_id, 'code':this.code, 'name':this.name, 'maker':this.maker, 'category':this.category, 'price':this.price*1 }
      this.products.push(new_item)

      save_products(this.products)
    },

  }
};

app = Vue.createApp(myapp);
app.use(Vuetify.createVuetify());
app.mount("#app");
