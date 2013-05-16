var http = require('http')
  , env = process.env
  , redis;

if( env.REDISTOGO_URL )
  ( function( config ) {
    var pass = config[ 1 ]
      , host = config[ 2 ]
      , port = config[ 3 ];

    redis = require( 'redis' ).createClient( port, host );
    redis.auth( pass );
  }
  ( /:(.+)@(.+):([0-9]+)/.exec( process.env.REDISTOGO_URL ) ) );

http.createServer(function (req, res) {
  console.log( req.url );
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello Initlab!\n');

  if( redis )
    return redis.INCR( 'pageviews', function( err, count ) {
      res.end(count + ' pageviews and counting!\n');
    });

  res.end('btw no redis here.\n');

}).listen( env.PORT || 8000 );

console.log('Server running at http://127.0.0.1:1337/');
