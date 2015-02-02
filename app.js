musicApp = {};

musicApp.apikey = "1d92a926bf8e49efbd3302d84610e3b85e41365b";

var find = $("#findMe");
var search = $(find).val();
var mood = $("#mood").val();
var genre = $("#genre").val();
var activity = $("#activity").val();

musicApp.init = function(){

	// $('.container input').on('change',musicApp.getTracks);

  var noName = function(){
      setTimeout(function(){
        if($('ul.tracks li').length == 0){
          console.log("too specific")
          $('#tooSpecific').append('<h2>Too Specific, Try Again</h2>');
        }
      },2000);
  };

  
  var moodSelect = $('#mood').on("change", function(){
      var mood = $(this).val();
      var mood_name = $(this).find(':selected').text();
      console.log("You have selected " + mood);
      musicApp.getTracks();
      noName();
  });

  var genreSelect = $('#genre').on("change", function(){
      var genre = $(this).val();
      var genre_name = $(this).find(':selected').text();
      console.log("You have selected " + genre);
      musicApp.getTracks();
      noName();
  });

  var activitySelect = $('#activity').on("change", function(){
      var activity = $(this).val();
      var activity_name = $(this).find(':selected').text();
      console.log("You have selected " + activity);
      musicApp.getTracks();
      noName();
  });


  // $(find).on("keyup", function(e){
  //   if(e.keyCode === 13){
  //   var search = $(find).val();
  //   console.log("You have selected " + search);
  //      musicApp.getTracks();
  //      // musicApp.playTrack();
  //   }
  // });

};

// url: 'http://8tracks.com/mix_sets/tags:west_coast+g-funk:recent.jsonp?include=mixes',

//get track listing
musicApp.getTracks = function(){

  var activity = $("#activity").val();
  var mood = $("#mood").val();
  var genre = $("#genre").val();

  var searchTags = [];
  if(activity) { searchTags.push(activity); }
  if(mood) { searchTags.push(mood); }
  if(genre) { searchTags.push(genre); }
  var searchTagsString = searchTags.join("+");

  console.log(searchTagsString);
  $.ajax({
    url: 'http://8tracks.com/mix_sets/tags:' + searchTagsString + '.jsonp?include=mixes+pagination&page=2&per_page=25',
    type: 'GET', 
    data: {
      api_key: musicApp.apikey,
      format: 'jsonp',
      api_version: 3,
    },
    dataType: 'jsonp',
    error : function(err){
    	console.log("There was an error",err);
    },
    success: function(result){
      console.log(result);
      $("ul").empty();
      $("#tooSpecific").empty();
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
    url: 'http://8tracks.com/sets/439138418/next.jsonp?',
    type: 'GET',
    data: {
      api_key: musicApp.apikey,
      format: 'jsonp',
      api_version: 3,
      mix_id: trackID,
    },
    dataType: 'jsonp',
    error : function(err){
      console.log("There was an error",err);
    },
    success: function(results){
      console.log(results, "results");
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
      var name = $('<h3>').text(piece.name);
      var musicTrack = $('<li>').attr('data-src',piece.track_file_stream_url).addClass('track-players').append(name);
      $('.tracks').append(musicTrack);
      
      // musicApp.noTracks();
  // });
 };

 musicApp.Showtracklist = function() {
      var trackID = $('ul.play-list li').each(function() {
       musicApp.playTrack($(this).data('track'));
      });
  };

$(function(){
    musicApp.init();
    
    // $('ul.play-list').on('click','li',function(){
    //   console.log("CLICKED");
    //   var trackID = $(this).data('track');
    //   console.log(trackID + "trackid");
    //   musicApp.playTrack(trackID);
    // });

    $('ul.tracks').on('click', 'li',function() {
      $(this).css("color", "white")
      var src = $(this).data('src');
      var audio = $('audio')[0];
      audio.src = src;
      audio.play();
    });

      var src = $(this).data('src');
      var audio = $('audio')[0];
      audio.src = src;
      audio.play();

});