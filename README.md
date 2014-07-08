ethkit
======

ethkit is a simple API for Ethereum command line tools

Installation
======

node and npm are required for ethkit. serpent-cpp is required for the serpent functionality.

After installing these, use npm to install the other dependencies.
```
npm install
```

Then run the server:
```
node server.js
```

Or for auto-reloading and debugging, use node-inspector and node-supervisor: 
```
node-inspector & node-supervisor --debug server.js 
```

Finally visit the server in your browser and view the API docs! It will be at http://localhost:3000/ by default.
