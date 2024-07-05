# BULL example

This is a simple nodejs (javascript) example of bull 

## prerequisite

Node environment and redis server

## build and launch
> npm i && node src/server.js

## tests

Two routes are available for testing bull consumption and production :

- curl http://localhost:3000/produce
  - produce a message to be consumed as part of a simulated process
- curl http://localhost:3000/error
  - produce an error during consumption, which will cause the message to fail and be logged 
