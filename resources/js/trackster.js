$( document ).ready(function() {
var Trackster = {};
/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {
	 for(var i = 0; i < tracks.length; i++){
	 var mediumAlbumArt = tracks[i].image[1]["#text"];
	 var totalListeners = numeral(tracks[i].listeners).format('0,0');
	 var artistResults = '<div class="song-row">\
       <ul class="song-item">\
      <li class="col-xs-offset-1 col-xs-1"><a href="' + tracks[i].url + '"><i class="fa fa-play-circle-o fa-2x" aria-hidden="true"></i></a></li>\
      <li class="col-xs-3">' + tracks[i].name + '</li>\
       <li class="col-xs-2">' + tracks[i].artist + '</li>\
       <li class="col-xs-2"><img src=' +  mediumAlbumArt + '/></li>\
       <li class="col-xs-1">' + totalListeners + '</li>\
       <li class="col-xs-1"></li>\
       </ul>\
     </div>'
     $('#song-list').append(artistResults);
	 }

};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
	$.ajax({
	url: "https://ws.audioscrobbler.com/2.0/?method=track.search&track=" + title + "&api_key="+ API_KEY + "&format=json",
	datatype: 'jsonp',
	success: function(data){
		Trackster.renderTracks(data.results.trackmatches.track);
	}
});
};

/*
	Adding some interativity to the button
 */
$('#search-button').click(function(){
	var $item = $('.music-search').val();
	//This deletes the previous search results
	$('#song-list').empty();
	Trackster.searchTracksByTitle($item);
})
/*
	To detect if the user presses the enter key
 */
$('.music-search').keypress(function(event){
	if(event.which == 13){
	var $item = $('.music-search').val();
	//This deletes the previous search results
	$('#song-list').empty();
	Trackster.searchTracksByTitle($item);
	}
})
const API_KEY = 'c5c83bce364f8f016a2400e48b06f348';
});
