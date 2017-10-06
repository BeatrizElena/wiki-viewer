
$(document).ready(function() {
    var url = 'https://en.wikipedia.org/w/api.php';
    var articles = $('.article-list');
    
    $('button').click(function() {
      var submit = $('#search').val();
      $.ajax({
        url: url,
        data: { action: 'opensearch', search: submit, format: 'json' },
        dataType: 'jsonp',
        success: function(x){
          var searchTerm = x[1];
          var description = x[2];
          var articleUrl = x[3];
          articles.empty();
          for(var i = 0; i < x[2].length; i++){
            var searchTerm = x[1][i];
            var description = x[2][i];
            var articleUrl = x[3][i];

            articles.append (
              '<li class="article">' +
              '<a href="'+x[3][i]+'">' + articleUrl + '</a>'+
              '<p>' + description + '</p>'+
              '</li>'
            )
          }
        }
    });      
    });
  });

  // added comment
   