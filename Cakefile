{exec} = require "child_process"

task "build", ->
  exec "coffee -c ./", (err)->
    console.log err.stack if err
