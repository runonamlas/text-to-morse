window.addEventListener('load', () => {
  var welcomeInterface = window.vue = new Vue({
    el: '#app',
    name: 'app',
    data: {
      welcome:true,
      ttm:false,
      mtt:false,
      message: '',
    },
    methods: {
      ttmbutton(){
        this.welcome=false;
        this.ttm = true;
        this.mtt = false
      },
      mttbutton(){
        this.welcome=false;
        this.ttm = false;
        this.mtt = true;
      }
    }
  });

})
