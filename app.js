musicApp = {};

musicApp.apikey = "1d92a926bf8e49efbd3302d84610e3b85e41365b";

var find = $("#findMe");

musicApp.init = function(){
  $(find).on("keyup", function(e){
    if(e.keyCode === 13){
    var search = $(find).val();
    console.log("You have selected " + search);
       musicApp.getTracks(search);
       // musicApp.playTrack();
    }
});
};

// url: 'http://8tracks.com/mix_sets/tags:west_coast+g-funk:recent.jsonp?include=mixes',

//get track listing
musicApp.getTracks = function(search){
  console.log(search)
  $.ajax({
    url: 'http://8tracks.com/mix_sets/tags:'+ search + '.jsonp?include=mixes',
    type: 'GET',
    data: {
      api_key: musicApp.apikey,
      format: 'jsonp',
      api_version: 3,
    },
    dataType: 'jsonp',
    success: function(result){
      console.log(result);
      // $("#artwork").empty();
      musicApp.displayTracks(result.mix_set.mixes);
      musicApp.Showtracklist();
      // if(!result.count){
      //   $("#artwork").html('<p>Image not found. Find waldo instead.</p><img class="error" src="waldo-4.jpg"/>');
      // }
    }
  });
};

 musicApp.displayTracks = function(data){

  $.each(data, function(i, piece){
      // var player = $('<audio controls>').attr('src',piece.track_file_stream_url);
      var track = $("<li>");
      var name = $('<h2>').text(piece.name);
      var musicTrack = $('<li>').attr('data-track',piece.id).addClass('track-list').append(name);
      $('.play-list').append(musicTrack);
  });
 };

 //get track and play it
 musicApp.playTrack = function(trackID) {
  console.log("Going to get the track", trackID);
  $.ajax({
    url: 'http://8tracks.com/sets/439138418/play.jsonp?',
    type: 'GET',
    data: {
      api_key: musicApp.apikey,
      format: 'jsonp',
      api_version: 3,
      mix_id: trackID,
    },
    dataType: 'jsonp',
    success: function(results){
      console.log(results);
      // $("#artwork").empty();
      musicApp.showTrack(results.set.track);
      // if(!result.count){
      //   $("#artwork").html('<p>Image not found. Find waldo instead.</p><img class="error" src="waldo-4.jpg"/>');
      // }
    }
  });
}

musicApp.showTrack = function(piece){

  // $.each(data, function(i, piece){
      var player = $('<audio controls>').attr('src', piece.track_file_stream_url);
      // var track = $("<li>");
      var name = $('<h2>').text(piece.name);
      var musicTrack = $('<li>').attr('data-src',piece.track_file_stream_url).addClass('track-players').append(name);
      $('.tracks').append(musicTrack);
  // });
 };

 musicApp.Showtracklist = function() {

      var trackID = $('ul.play-list li').each(function() {
       musicApp.playTrack($(this).data('track'));
      });

  };

$(function(){
    musicApp.init();
    
    $('ul.play-list').on('click','li',function(){
      console.log("CLICKED");
      var trackID = $(this).data('track');
      console.log(trackID + "trackid");
      musicApp.playTrack(trackID);
    });

    $('ul.tracks').on('click', 'li',function() {
      var src = $(this).data('src');
      var audio = $('audio')[0];
      audio.src = src;
      audio.play();
    });


});