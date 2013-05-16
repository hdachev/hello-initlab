var http = require('http')
  , env = process.env
  , redis;

if( env.REDISTOGO_URL )
  ( function( config ) {
    var pass = config[ 1 ]
      , host = config[ 2 ]
      , port = config[ 3 ];

    console.log('Connecting to redis as\n%s@%s:%s'
              , pass, host, port);

    redis = require( 'redis' ).createClient( port, host );
    redis.auth( pass );
  }
  ( /.*:(.+)@(.+):([0-9]+)/.exec( env.REDISTOGO_URL ) ) );

http.createServer(function (req, res) {
  console.log( req.url );
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('hello initlab!\n');

  if( redis )
    return redis.INCR( 'hits', function( err, count ) {
      res.end(count + ' hits and counting!\n');
    });

  res.end('btw no redis here.\n');

}).listen( env.PORT || 8000 );

console.log('Server running at http://127.0.0.1:1337/');
