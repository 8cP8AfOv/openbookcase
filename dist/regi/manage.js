const myapp = {
  components: { Datepicker: VueDatePicker },
  data() {
    return {

      // DB start -------------------------------------------------------------------------------
      clients: [
        {'id':1, 'code':'9999', 'name':'一般のお客様', 'kanaName':'いっぱんのおきゃくさま'},
        {'id':2, 'code':'1111', 'name':'山田春子', 'kanaName':'やまだはるこ'},
        {'id':3, 'code':'2222', 'name':'田中夏彦', 'kanaName':'たなかなつひこ'},
        {'id':4, 'code':'3333', 'name':'佐藤秋子', 'kanaName':'さとうあきこ'},
        {'id':5, 'code':'4444', 'name':'鈴木冬彦', 'kanaName':'すずきふゆひこ'},
        {'id':6, 'code':'5555', 'name':'山本一郎', 'kanaName':'やまもといちろう'},
      ],
      receivables: [
        {'id':1, 'client_id':1, 'amount':15000, 'date':'2022-7-21', 'received_date':null, 'subject':'内装', 'detail':'詳細'},
        {'id':2, 'client_id':2, 'amount':20000, 'date':'2022-8-3', 'received_date':null, 'subject':'太陽光発電', 'detail':'詳細'},
        {'id':3, 'client_id':2, 'amount':30000, 'date':'2022-8-10', 'received_date':null, 'subject':'太陽光発電', 'detail':'詳細'},
        {'id':4, 'client_id':2, 'amount':5000, 'date':'2022-8-16', 'received_date':null, 'subject':'ガス', 'detail':'詳細'},
      ],
      products: [
        {'id':1, 'jan':'4902621004589', 'name':'バランスパワーBIG ブラックカカオ', 'maker': 'ハマダコンフェクト', 'category':'その他の食品・嗜好品', 'price':'110'},
        {'id':2, 'jan':'4549741893909', 'name':'フルーツブロック', 'maker': '	イオン', 'category':'	加工食品', 'price':'98'},
      ],
      cashIncome: [
        {'id':0, 'date':'', 'client_id':'9999', 'amount':0, 'receivables_id':'0'},
      ],
      // DB end -------------------------------------------------------------------------------

      tab: null,
      picker: '',
      //ref: null,

    };
  },
  mounted(){
  
  },
  watch: {

  },
  methods:{
    logout() {
      window.location.href = './index.html'
    },
    goToRegister() {
      window.location.href = './register.html'
    },

  }
};


app = Vue.createApp(myapp);
app.use(Vuetify.createVuetify());
app.mount("#app");
