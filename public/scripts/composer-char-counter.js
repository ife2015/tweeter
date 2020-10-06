$(document).ready(function() {
  $('#tweet-text').on('keyup',function(event) {
    if(this.value.length <= 140) {  
      const valueChange = 140 - this.value.length;
      $('.counter').text(valueChange);
    } else {
      $('.counter').css('color','red');
      const negValChange = 140 - this.value.length;
      $('.counter').text(negValChange);
    }
  })
})