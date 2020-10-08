/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const createTweetElement = function(tweetObject) {

  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  let $tweet = `
  <article class="tweet-box">
    <header class="post-header">
      <div class="handle">
        <img src=${tweetObject.user.avatars} alt="prof image here">
        <span>${tweetObject.user.name}</span>
      </div>
      <div class="hide-handle-name">${tweetObject.user.handle}</div>
    </header>
    <p class="post-text">${escape(tweetObject.content.text)}</p>
    <footer class="post-footer">
      <span> ${Math.floor(((new Date()).getTime() - tweetObject.created_at)/(8640000))} days ago</span>
      <span class="icons">
        <i class="fas fa-heart"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-flag"></i>
      </span>
    </footer>
  </article>`

  return $tweet;
};


$(document).ready(function() {

  const renderTweets = function(tweets) {
    $('.tweets-container').empty();
    tweets.reverse().forEach(tweet => {
      $('.tweets-container').append(createTweetElement(tweet));
    });
  }

  const loadTweets = function() {
    $('.error-message').empty();
    $.getJSON('/tweets')
      .then(renderTweets)
  }

  const $form = $('.tweet-form');
  $form.on("submit", function(event) {
    event.preventDefault();
    if (+$('.counter').val() < 0) {
      $('.error-message').text("⚠️⚠️⚠️⚠️ Max characters exceeded! ⚠️⚠️⚠️⚠️");
      $('.error-message').show(5000);
    } else if (!$('#tweet-text').val()) {
      $('.error-message').text("⚠️⚠️⚠️⚠️ Please Hum Something! ⚠️⚠️⚠️⚠️")
      $('.error-message').show(1000);
    } else {
      $.post('/tweets', $(this).serialize())
        .then(function() {
          loadTweets();
        })
    }
  });

  loadTweets();
});


