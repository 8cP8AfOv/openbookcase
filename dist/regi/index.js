
/*
vuetify = Vuetify.createVuetify({
  theme: {
    //defaultTheme: 'dark'
    dark: false,
    colors: {
      background: '#AAAAAA',
      surface: '#FFFFFF',
      primary: '#FF7043',
      error: '#B00020',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FB8C00',
    }
  }
});
*/

const myapp = {
  data() {
    return {
      pw: '',
      msg: true,
      show_pass: false,

      tenKey: [
        ['7','8','9'],
        ['4','5','6'],
        ['1','2','3'],
        ['0','00','000']
      ],      
    };
  },
  watch: {
    pw: 'checkPW'
  },
  methods:{
    inputDigit(digit){
      this.pw += digit
    },
    checkPW(){
      if (this.pw.length === 4) {
        if (this.pw === '2345') {
          location.href='./register.html'
        } else {
          this.msg = false
          this.pw = ''
        }
      }
    }
  }
};

app = Vue.createApp(myapp);
app.use(Vuetify.createVuetify({
  theme: {
    //defaultTheme: 'dark',
    themes: {
      light: {
        background: '#6200EE'
      },
      dark: {
        background: '#6200EE'
      }
    }
  }
}));
app.mount("#app");
