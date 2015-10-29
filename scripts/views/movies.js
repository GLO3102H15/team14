/**
 * Created by Sebastien on 2015-10-26.
 */
MovieView = Backbone.View.extend({
    el: "#movies-lists",
    render: function(options){
        var that = this;
        if(options.id) {
            var v_trackId= options.id;
            var movie = new MovieModel({trackId: v_trackId});
            movie.urlRoot += "/" + v_trackId;
            movie.fetch({beforeSend: setHeader,
                success: function (data) {
                    var film = data.toJSON();
                    var result = film.results[0];
                    result =  changeFilmStatsFormat(result);
                    var template = _.template($("#movie-template").html());
                    that.$el.html(template({movie: result}));
                }
            })

        /*
        $.ajax({
            url : "https://umovie.herokuapp.com/login",
            type: "POST",
            data : formData,
            success: function(data, textStatus, jqXHR)
            {
                var securityToken = data.token;

                var movie = new MovieModel({trackId: v_trackId});
                movie.urlRoot += "/" +id;
                movie.fetch({headers: {
                    'Authorization': securityToken} ,
                    success: function (data) {
                        var film = data.toJSON();
                        var result = film.results[0];
                        result =  changeFilmStatsFormat(result);
                        var template = _.template($("#movie-template").html());
                        that.$el.html(template({movie: result}));
                    }
                })


            }});
    */
    }
}});


var changeFilmStatsFormat = function(filmArray){
    var date =  filmArray.releaseDate;
    filmArray.releaseDate = date.slice(0,10);
    var filmTime = filmArray.trackTimeMillis;
    var millisInMinute = 60000;
    filmTime = (filmTime /millisInMinute);
    filmArray.trackTimeMillis = Math.round(filmTime);
    return filmArray;
};
