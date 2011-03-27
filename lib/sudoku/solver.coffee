###
answer = [
  [1,2,3,4,5,6,7,8,9],
  [4,5,6,7,8,9,1,2,3],
  [7,8,9,1,2,3,4,5,6],
  [2,3,4,5,6,7,8,9,1],
  [5,6,7,8,9,1,2,3,4],
  [8,9,1,2,3,4,5,6,7],
  [3,4,5,6,7,8,9,1,2],
  [6,7,8,9,1,2,3,4,5],
  [9,1,2,3,4,5,6,7,8]
]
###

swap = (arr, i, j) ->
  temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp

init_answer_space = ()->
  # s = answer_space
  s = []
  for i in [0..8]
    s[i] = []
    for j in [0..8]
      s[i][j] = []
      # TODO: simplfy answer space
      # s[i][j][0] = solved, 0 is not solved, 1-9 is resolved answer
      s[i][j][0] = 0
      # answers array [1..9]
      s[i][j][10] = [1..9]
      for k in [1..9]
        # s[i][j][key] = flag, key is 0-9, 
        #  flag 0 -- key can not be answer
        #  flag 1 -- key can be answer
        s[i][j][k] = 1
  return s

remove_value = (answer, row, col, value) ->
  a = answer[row][col]
  a[value] = 0
  j = a[10].indexOf(value)
  if j>=0
    a[10].splice j, 1
    if a[10].length is 1
      update_cell answer, row, col

cell_answers = (input, answer, row, col)->
  a = answer[row][col]
  if input[row][col] != 0
    a[0] = input[row][col]
    a[10] = []
    return
  for i in [0..8]
    v = input[i][col]
    remove_value answer, row, col, v if v != 0

    v = input[row][i]
    remove_value answer, row, col, v if v != 0

  x = 3 * Math.floor row/3
  y = 3 * Math.floor col/3

  for i in [x .. x+2]
    for j in [y .. y+2]
      v = input[i][j]
      remove_value answer, row, col, v if v != 0

update_cell = (answer, row, col) ->
  a = answer[row][col]
  vs = a[10]
  if vs.length is 1
    v = a[0] = vs[0]
    for i in [0..8]
      remove_value answer, i, col, v
      remove_value answer, row, i, v

    x = 3 * Math.floor row/3
    y = 3 * Math.floor col/3

    for i in [x .. x+2]
      for j in [y .. y+2]
        remove_value answer, i, j, v

init_guess = (answer) ->
  #guess format [row, col, guess, [all guess]]
  guesses = []
  for i in [0..8]
    for j in [0..8]
      a = answer[i][j]
      if a[10].length > 1
        guesses.push [i, j, 0, a[10]]
  return guesses

sort_guesses = (guesses) ->
  buckets = []
  result = []
  for guess in guesses
    (buckets[guess[3].length] or= []).push guess
  for b in buckets
    result = result.concat b if b
  return result

update_guesses = (guesses, guess) ->
  console.log 'update guesses, guess is'
  console.dir guess
  row = guess[0]
  col = guess[1]
  v = guess[2]
  x = 3 * Math.floor row/3
  y = 3 * Math.floor col/3

  #check other guesses
  for g2,i in guesses
    row2 = g2[0]
    col2 = g2[1]
    if (row2 != row or col2 != col) and
    (row2 == row or col2 == col or (x <= row2 <= x+2 and y <= col2 <= y+2))
      if g2[2] is v
        return false

      index = g2[3].indexOf(v)
      if index>=0
        # not use new array
        g2 = guesses[i] = g2.slice()
        g2[3] = g2[3].slice()
        g2[3].splice(index, 1)
        if not g2[4]
          # if is updating ,then do not update again
          if g2[3].length is 1 
            g2[2] = g2[3][0]
            g2[4] = true
            updated = update_guesses guesses, g2
            g2[4] = false
            if not updated
              return false
          # if no more avariable numbers, it fail
          else if g2[3].length is 0
            console.log 'fail to update guesses'
            console.dir g2
            return false

  #all done is success
  return true

do_guess = (guesses) ->
  guesses = sort_guesses guesses
  console.log 'do_guess , guesses are '
  console.dir guesses
  for g, i in guesses
    if not g
      console.log "guesses[#{i}] is undefined"
    if g[3].length > 1 and not g[4]
      #use copied guess ?
      g = guesses[i] # = guesses[i].slice()
      while true
        # no more avariable number means fail
        if g[3].length is 0
          return null
        #use the first avariable number as answer
        g[2] = g[3][0]
        console.log 'guessing '
        console.dir g
        # updating - remove illegale numbers
        clone = guesses.slice()
        #remove done guess
        g[3] = g[3].slice(1)
        # mark node updating
        g[4] = true
        if update_guesses clone, g
          console.log 'update complet, updated guesses are'
          console.dir clone
          result = do_guess clone
          g[4] = false
          console.log "#{g[0]},#{g[1]},#{g[2]},#{g[3]} got result #{result}"
          if result
            console.log "return it"
            return result
        else
          g[4] = false
          console.log 'fail to update guesses, try next, previous is'
          console.dir clone

  #not return means all all length is 1, means success
  return guesses

exports.start_guess = start_guess = (answer) ->
  guesses = init_guess answer 
  console.dir guesses
  guesses = do_guess guesses 
  if guesses 
    for g in guesses
      a = answer[g[0]][g[1]]
      a[0] = g[2]
      a[10] = [g[2]]
  return guesses

exports.solve = solve = (input) ->
  answer = init_answer_space()
  for i in [0..8]
    for j in [0..8]
      cell_answers(input, answer, i, j)

  return answer

