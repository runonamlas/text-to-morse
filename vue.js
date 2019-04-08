  var socket = null;
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

  window.vue = new Vue({
    el: '#app',
    data: {
      welcome:true,
      ttm:false,
      mtt:false,
      text:'',
      morse:'',
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
     },
    sendText: function () {
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
      var morse='';
      for (var i = 0; i < this.text.length; i++) {
      for (var j = 0; j < 37; j++) {
        if (this.text[i].toLowerCase() == letters[j]) {
          morse += morseLetters[j];
          morse += "\xa0\xa0\xa0";
          }
        }
      }
      this.morse=morse;
      socket.emit('morse', this.morse);


    },
    sendMorse: function () {
      var letters = [ ' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
        'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
         'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0' ];
      var morseLetters = [ "\xa0\xa0\xa0\xa0", ".-", "-...","-.-.",
         "-..", ".", "..-. ", "--.", "....", "..", ".---", "-.-", ".-..",
         "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-",
         "...-", ".--", "-..-", "-.--", "--..", ".----","..---", "...--",
          "....-", ".....","-....", "--...", "---..", "----.", "-----" ];
      var text='';
      var convertText='';
      var bosluk=0;
      var char='';
      var morsee= this.morse + "    ";
      for (var k = 0; k < morsee.length; k++){
          if(morsee[k] == ' '){
            if(morsee[k+1] == ' '){
              var bosluk= k+1;

            }
            var bosluk= k;
            if (char != ''){
              for (var i = 0; i < morseLetters.length; i++) {
                if(morseLetters[i] ==char){
                  convertText += letters[i];
                }
              }

            char='';
           }
          }else{
            char += morsee[k];
          }

      }
      this.text=convertText+" ";
      socket.emit('text', this.text);
    }
    },
    created: function () {
      socket = io();
    },
    mounted: function () {
      socket.on('morse', function (morse) {
        app.push(morse);
      })
      socket.on('text', function (text) {
        app.push(text);
      })
    }
  })
