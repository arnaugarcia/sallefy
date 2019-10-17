var adonisPlayer = {},
    adonisAllPlaylists = [],
    adonisPlayerID = 'adonis_jplayer_main',
    adonisPlayerContainer = 'adonis_jp_container',
    adonisPlaylist,
    currentPlaylistId;

jQuery(document).ready(function($){
    "use strict";

    adonisPlayer.init = function(){
        adonisPlaylist = new adonisJPlayerPlaylist({
                jPlayer: '#'+adonisPlayerID,
                cssSelectorAncestor: "#"+adonisPlayerContainer
            },  [
                {
                    title:"Cro Magnon Man",
                    artist:"The Stark Palace 2{#link2}",
                    mp3:"../assets/mp3/audiojungle1.mp3",
                    poster: "../assets/images/browse/browse-overview-4.jpg"
                }
            ],
            {
                playlistOptions: {
                    enableRemoveControls: true
                },
                swfPath: "/assets/js",
                supplied: "oga, mp3",
                useStateClassSkin: true,
                autoBlur: false,
                smoothPlayBar: false,
                keyEnabled: false,
                audioFullScreen: true,
                display: false,
                autoPlay:false,
            });

        // player loaded event
        $("#"+adonisPlayerID).bind($.jPlayer.event.loadeddata, function(event) {
            var Artist = adonisExtractArtistLink($(this).data("jPlayer").status.media.artist),
                Poster = $(this).data("jPlayer").status.media.poster,
                Title = $(this).data("jPlayer").status.media.title;
            $('#'+adonisPlayerContainer + ' .current-item .song-poster img').attr('src',Poster);
            $("#"+adonisPlayerID).find('img').attr('alt','');
        });

        $(document).on('click','#adonis-playlist .playlist-item .song-poster',function(){
            $(this).parent().find('.jp-playlist-item').trigger('click');
        });

        /**
         * event play
         */
        $("#"+adonisPlayerID).bind($.jPlayer.event.play + ".jp-repeat", function(event) {

            // poster
            var poster = $(this).data("jPlayer").status.media.poster;
            $('#'+adonisPlayerContainer).find('.adonis-player .song-poster img').attr('src',poster);

            // blurred background
            $('#'+adonisPlayerContainer).find('.blurred-bg').css('background-image','url('+poster+')');


            // astist
            var artist = adonisExtractArtistLink($(this).data("jPlayer").status.media.artist);
            if(artist.name){
                $('#'+adonisPlayerContainer+' .artist-name').html('<a href="'+artist.link+'">'+artist.name+'</a>');
            }else{
                $('#'+adonisPlayerContainer+' .artist-name').html(artist.name);
            }

            // activate album
            if(typeof currentPlaylistId !== 'undefined'){
                $("[data-album-id='"+currentPlaylistId+"']").addClass('jp-playing');
            }

        });

        $('.adonis-mute-control').click(function(){
            var muteControl = $(this);

            if(muteControl.hasClass('muted')){
                var volume = muteControl.attr('data-volume');
                $("#"+adonisPlayerID).jPlayer("unmute");
                muteControl.removeClass('muted');
                $("#"+adonisPlayerID).jPlayer("volume",volume);
            }else{
                var volume = $("#"+adonisPlayerID).data("jPlayer").options.volume;
                muteControl.attr('data-volume',volume);
                $("#"+adonisPlayerID).jPlayer("mute").addClass('muted');
                muteControl.addClass('muted');
            }
        });

        /**
         * event pause
         */
        $("#"+adonisPlayerID).bind($.jPlayer.event.pause + ".jp-repeat", function(event) {
            // deactivate album
            if(typeof currentPlaylistId !== 'undefined'){
                $("[data-album-id='"+currentPlaylistId+"']").removeClass('jp-playing');
            }
        });

        /**
         * extract artist link from artist string
         * @param str e.g. "Artist name{http://artist.com}"
         * @return return object containing two key link and name
         */
        function adonisExtractArtistLink(str){
            var re  = /{(.*?\})/,
                strRe = str.replace(re,''),
                Match = str.match(re,'')
                ,Link;
            if(Match != null){
                var Link = Match[1].replace('}','');
            }
            return {link:Link,name:strRe};
        }


        /* Modern Seeking */

        var timeDrag = false; /* Drag status */

        $('.jp-progress').mousedown(function (e) {
            timeDrag = true;
            var percentage = updatePercentage(e.pageX,$(this));
            $(this).addClass('dragActive');

            updatebar(percentage);
        });

        $(document).mouseup(function (e) {
            if (timeDrag) {
                timeDrag = false;
                var percentage = updatePercentage(e.pageX,$('.jp-progress.dragActive'));
                $('.jp-progress.dragActive');
                if(percentage){
                    $('.jp-progress.dragActive').removeClass('dragActive');
                    updatebar(percentage);
                }
            }
        });

        $(document).mousemove(function (e) {
            if (timeDrag) {
                var percentage = updatePercentage(e.pageX,$('.jp-progress.dragActive'));
                updatebar(percentage);
            }
        });

        //update Progress Bar control
        var updatebar = function (percentage) {

            var maxduration = $("#"+adonisPlayerID).jPlayer.duration; //audio duration

            $('.jp-play-bar').css('width', percentage + '%');

            $("#"+adonisPlayerID).jPlayer("playHead", percentage);
            // Update progress bar and video currenttime

            $("#"+adonisPlayerID).jPlayer.currentTime = maxduration * percentage / 100;

            return false;
        };


        function updatePercentage(x,progressBar){
            var progress = progressBar;
            var maxduration = $("#"+adonisPlayerID).jPlayer.duration; //audio duration
            var position = x - progress.offset().left; //Click pos
            var percentage = 100 * position / progress.width();
            //Check within range
            if (percentage > 100) {
                percentage = 100;
            }
            if (percentage < 0) {
                percentage = 0;
            }
            return percentage;
        }


        var volumeDrag = false;
        $(document).on('mousedown','.jp-volume-bar',function (e) {
            volumeDrag = true;
            updateVolume(e.pageX);
        });

        $(document).mouseup(function (e) {
            if (volumeDrag) {
                volumeDrag = false;
                updateVolume(e.pageX);
            }
        });

        $(document).mousemove(function (e) {
            if (volumeDrag) {
                updateVolume(e.pageX);
            }
        });

        //update Progress Bar control
        var updateVolume = function (x) {
            var progress = $('.jp-volume-bar');
            var position = x - progress.offset().left; //Click pos
            var percentage = 100 * position / progress.width();

            //Check within range
            if (percentage > 100) {
                percentage = 100;
            }
            if (percentage < 0) {
                percentage = 0;
            }
            $("#"+adonisPlayerID).jPlayer("volume",(percentage/100));
        };

        // remove track item
        $(document).on('click','.remove-track-item-playlist',function(){
            var parentLi = openMenu.parents('li.item');
            adonisPlaylist.remove(parentLi.length-1);
        });

        $(document).on('click','.remove-track-item-current',function(){
            adonisPlaylist.remove(adonisPlaylist.current);
        });




        /**
         * Function to add track. add track if id not found and return index. If found it return the index
         * @param track track id
         * @returns index number of the track in the playlist
         */
        adonisPlayer.addTrack = function(track){
            var _track = tracks[track]
            var foundTrack = false;
            var _return;
            adonisPlaylist.playlist.forEach(function(value,index){
                if(value.id == track){
                    foundTrack = true;
                    _return = index;
                }
            });

            if(foundTrack === false){
                adonisPlaylist.add(_track);
                _return = adonisPlaylist.playlist.length -1;
            }
            return _return;
        }

        /**
         * function to transfer song poster and play button to a larger view. eg. homepage 3 top album listener
         * @param selector
         */
        adonisPlayer.transferAlbum = function(selector){
            $(document).on('click',selector,function(e){
                e.preventDefault();
                var PosterTarget = $(this).attr('data-poster-target'),
                    PosterImage = $(this).attr('data-poster'),
                    track = $(this).attr('data-track');

                var PosterClone = $(PosterTarget).clone();
                PosterClone.css('background-image','url('+PosterImage+')').fadeOut(0);
                PosterClone.insertAfter($(PosterTarget));

                $(PosterTarget).fadeOut('slow',function(){
                    $(this).remove();
                });
                PosterClone.fadeIn('slow');
                var Index = adonisPlayer.addTrack(track);
                adonisPlaylist.play(Index)
            });
        }
        adonisPlayer.transferAlbum('.transfer-album');

        //adonis album play button
        $(document).on('click','.adonis-album-button',function(e){
            var albumId = parseInt($(this).attr('data-album-id'));

            // set play list if not set yet
            if(albumId && typeof adonisAllPlaylists[albumId] !== 'undefined' && currentPlaylistId !== albumId){
                adonisPlaylist.setPlaylist(adonisAllPlaylists[albumId]);
                currentPlaylistId = albumId;
            }

            // play or pause
            if($('#'+adonisPlayerID).data().jPlayer.status.paused){
                setTimeout(function(){
                    adonisPlaylist.play(0);
                },700);
            }else{
                adonisPlaylist.pause();
            }

        });

        adonisPlayer.addPlaylist = function(albumId){
            if(albumId && typeof adonisAllPlaylists[albumId] !== 'undefined'){
                adonisAllPlaylists[albumId].forEach(function(_value){
                    adonisPlaylist.add(_value);
                });
            }
        }

        // init end
    }


    adonisAllPlaylists[0] = [
        {
            title:"Dat Step",
            artist:"Gunnar Olsen{#link1}",
            mp3:"../assets/mp3/audiojungle1.mp3",
            poster: "../assets/images/playlists/playlist-3.jpg",
        },
        {
            title:"Detour",
            artist:"Gunnar Olsen{#link2}",
            mp3:"../assets/mp3/Detour.mp3",
            poster: "../assets/images/browse/browse-overview-4.jpg",
        },
        {
            title:"Do It Right",
            artist:"Jingle Punks{#link2}",
            mp3:"../assets/mp3/Do_It_Right.mp3",
            poster: "../assets/images/browse/browse-overview-4.jpg"
        },
        {
            title:"You're A Mean One, Mr. Grinch",
            artist:"The Stark Palace{#link1}",
            mp3:"../assets/mp3/Detour.mp3",
            poster: "../assets/images/playlists/playlist-3.jpg"
        },
    ];

    adonisAllPlaylists[1] = [
        {
            title:"Cro Magnon Man",
            artist:"The Stark Palace 2{#link2}",
            mp3:"../assets/mp3/audiojungle1.mp3",
            poster: "../assets/images/browse/browse-overview-4.jpg"
        },
        {
            title:"Cro Magnon Man 3",
            artist:"The Stark Palace 3{#link2}",
            mp3:"../assets/mp3/Do_It_Right.mp3",
            poster: "../assets/images/browse/browse-overview-4.jpg"
        },
        {
            title:"You're A Mean One, Mr. Grinch",
            artist:"The Stark Palace{#link1}",
            mp3:"../assets/mp3/Detour.mp3",
            poster: "../assets/images/playlists/playlist-3.jpg"
        },
        {
            title:"Cro Magnon Man",
            artist:"The Stark Palace 2{#link2}",
            mp3:"../assets/mp3/Do_It_Right.mp3",
            poster: "../assets/images/browse/browse-overview-4.jpg"
        },
        {
            title:"Cro Magnon Man 3",
            artist:"The Stark Palace 3{#link2}",
            mp3:"../assets/mp3/Detour.mp3",
            poster: "../assets/images/browse/browse-overview-4.jpg"
        },
    ];


    $(window).imagesLoaded(function(){
        setTimeout(function(){
            adonisPlayer.init();

        },100);

        setTimeout(function(){
            adonisPlaylist.setPlaylist(adonisAllPlaylists[0]);
        },5000);
    });

    // jquery end
});