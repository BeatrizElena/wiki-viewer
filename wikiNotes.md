# BUILD A WIKIPEDIA VIEWER

# User Stories: 

1. I can search Wikipedia entries in a search box and see the resulting Wikipedia entries.

2. I can click a button to see a random Wikipedia entry.

# Hints: 

1. URL to get a random Wikipedia article:       <https://en.wikipedia.org/wiki/Special:Random>.

2. Entry on using Wikipedia's API:              <https://www.mediawiki.org/wiki/API:Main_page>.

3. Link to experiment with Wikipedia's API: 
<https://en.wikipedia.org/wiki/Special:ApiSandbox#action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=jsonfm>

## My steps

1. Searched for search wikipedia api and eventually got URL I modified so it returned a json object but still not the right one:
<https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=puertorico&format=json>

2. Successful console log statements:
`console.log(x.query);`: Returned `search` and other objects.
`console.log(x.query.search);`: Returned search objects only.
`console.log(x.query.search[0].title);`: Returned ist document within `search` object.

3. Wrote `for loops` to cycle through the search result and return `query.search[i].title` and `query.search[j].snippet`.
WIP: Console.log statements show that for loop returning only one result, always the last search item. 

4. Explored action: 'opensearch' and search : `Puerto Rico` which came back with more helpful JSON object.

```javascript
var url = 'https://en.wikipedia.org/w/api.php';
      $.ajax({
        url: url,
        data: { action: 'opensearch', search: 'Puerto Rico', format: 'json' },
        dataType: 'jsonp',
        success: function(x){
            var searchTerm = x[1];
            var description = x[2];
            var articleUrl = x[3];
          console.log('title: ', x[0][1]); // title is the search term
          console.log('articles: ', x[2][1]); // articles is a array of articles about PR
          console.log('articles: ', x[3][1]); // articles is a array of articles about PR
        }
    });
```
    
5. Code that finally worked! (Still need to create user input, instead of my my hard-coded search term)

```javascript

$(document).ready(function() {
    var url = 'https://en.wikipedia.org/w/api.php';
    var articles = $('.article-list');
    $.ajax({
        url: url,
        data: { action: 'opensearch', search: 'Puerto Rico', format: 'json' },
        dataType: 'jsonp',
        success: function(x){
          var searchTerm = x[1];
          var description = x[2];
          var articleUrl = x[3];
          console.log('search term: ', x[1][0]); //  search term
          console.log('article snippet: ', x[2][0]); // from 'articles' array, we're getting the description for the 2nd one.
          console.log('article URL: ', x[3][0]); // rom 'articles' array, we're getting the article URL for the 2nd one.
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
```

6. Reviewed code for NYT api to see how to get results into an HTML list

```javascript
var nytHeader = $("#nytHeader")
.append('<li class="article">' +'<a href="'+article.web_url+'">'+article.headline.main+'</a>'+'<p>' + article.snippet + '</p>'+'</li>');
};
```

```html
<div class="nytimes-container">
    <h3 id="nytimes-header">New York Times Articles</h3>
    <ul id="nytimes-articles" class="article-list">Read a movie review. Enter a movie title and hit submit</ul>
</div>
```
6. Final code that worked!

```javascript

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
          console.log('search term: ', x[1][0]); //  search term
          console.log('article snippet: ', x[2][0]); // from 'articles' array, we're getting the description for the 2nd one.
          console.log('article URL: ', x[3][0]); // from 'articles' array, we're getting the article URL for the 2nd one.
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
  ```
