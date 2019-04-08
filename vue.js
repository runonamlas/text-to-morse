window.addEventListener('load', () => {
  Vue.component('VueHeader', {
    template:`
      <header>
        <a href="/index.html"><img id="logo" src="images/logo.png"></a>
        <a id="header_text">Welcome Text to Morse</a>
      </header>
    `
  });
  Vue.component('VueFooter', {
    template:`
    <footer>
      <a style="font-size: 18px;">@2019 Onur Salman <a style="text-decoration:none; font-size:18px; color:#000;" href="">www.onursalman.com</a></a>
    </footer>
    `
  });
  Vue.component('VuePage', {
    props: {
      title: {type: String, required: true},
      /*vmodel: {type: String, required: true},
      placeholder:{type: String, required: true},
      convert: {type: String,required:true},*/
    },
    methods: {
      convertMorse: function(){
        var letters = [ ' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
        'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
         'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0' ];
        var morseLetters = [ "\xa0\xa0\xa0\xa0", ".-", "-...", "-.-.",
         "-..", ".", "..- .", "--.", "....", "..", ".---",
         "-.-", ".-..",  "--", "-.", "---", ".--.",
         "--.-", ".-.", "...", "-", "..-", "...-", ".--",
          "-..-", "-.--", "--..", ".----",
          "..---", "...--", "....-", ".....", "-...."
          , "--...", "---..", "----.",
           "-----" ];

        for (var i = 0; i < this.inputText.length; i++) {
          for (var j = 0; j < 37; j++) {
            if (this.inputText[i].toLowerCase() == letters[j]) {
              this.outputMorse += morseLetters[j];
              this.outputMorse += "\xa0\xa0\xa0";
              break;
            }
          }
        }
        this.$nextTick(function (){console.log(this.outputMorse)});
        console.log(this.outputMorse);
        return this.outputMorse;
      }
    },
    data: function () {
      return {
        outputMorse: ''
      }
    },
    template: `
      <div id="pageinterface">
        <h1>{{title}}</h1>
        <div id="textBox">
          <textarea v-model="inputText" name="text" placeholder="placeholder"></textarea>
          <p>Message is: {{ this.outputMorse }}</p>
          </div>
          <div align="center" v-on:click="convertMorse" style="margin:0 auto;" class="option">
          <a href="#" class="option_text">{{title}}</a>
          </div>
          <a href="index.html">Back to Home Page</a>
          </div>
    `
  })
  window.vue = new Vue({
    el: '#app',
    name: 'app',
    data: {
      welcome:true,
      ttm:false,
      mtt:false,
      inputText:'',
      outputMorse:'',
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
