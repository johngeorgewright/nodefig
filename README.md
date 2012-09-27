Config.js
=========

A very simple configuration control for Node.js applications. You can set and get... that's basically all you need.

The Getter
----------

There are 3 levels of configuration that the getter will look for. Firstly, it'll look under your project's configuration (stuff you've set with the setter). Secondly it'll look in the process environment list (this is pretty handy when placing the same code on different servers). If all else fails, it will just use whatever default value you want to give it.

### Examples

```js
// connect.js
var config = require('config.js'),
    db     = require('db');

db.connect(config.get('DB_USER', 'root'), config.get('DB_PASS', 'passpass'));
```

'Simples!' In the above example the values would be:

```
DB_USER: 'root'
DB_PASS: 'passpass'
```

That's because no config has been set. However, I could override this at an environment level:

```shell
$ DB_USER=my_user DB_PASS=my_pass node connect.js
```

Or, if you use a cloud service, like node jitsu, you can set the environment variables then restart your app.

```shell
$ jitus env set DB_USER my_user
$ jitsu env set DB_PASS my_pass
$ jitsu restart
```

Sweet! But what if I want to override the configuration at a project level? Simple, just use the setter.

```js
// app.js
var config = require('config.js');

config.set('DB_USER', 'project_user');
config.set('DB_PASS', 'project_pass');
```

```js
// connect.js
var config = require('config.js'),
    db     = require('db');

db.connect(config.get('DB_USER', 'root'), config.get('DB_PASS', 'passpass'));
```

Easy.

Using config.js with Express.js
-------------------------------

So, express already has a configuration object; the express instance itself:

```js
var express = require('express'),
    app     = express();

app.set('mung', 'face');
app.get('mung'); // 'face'
app.get('foo', 'bar'); // /bar
```

That's all good, but it doesn't take the environment variables in to consideration. So you can now use all the functionality config.js has within the express instance.

```js
var express = require('express'),
    config  = require('config.js'),
    app     = express();

config.use(app);

config.set('view engine', 'jade');
config.get('view engine');         // 'jade'
app.get('view engine');            // jade'
app.get('DB_USER');                // 'my_user'
```

As you can see, you can continue the the `app` variable and it will update the `config`'s properties too.

You can also use the `use` method more than once to add the several of your ready made config objects.

```js
var express           = require('express'),
    somethingExpressy = require('otherExpress'),
    config            = require('config.js');

config.use(express());
config.use(somethingExpressy());

config.get('static directory'); // Will search through all objects before using the default behaviour.
```

