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

init_answer_space = ()->
  # s = answer_space
  s = []
  for i in [0..8]
    s[i] = []
    for j in [0..8]
      s[i][j] = []
      # s[i][j][0] = solved, 0 is not solved, 1-9 is resolved answer
      s[i][j][0] = 0
      # answers size
      s[i][j][10] = 9 
      for k in [1..9]
        # s[i][j][key] = flag, key is 0-9, 
        #  flag 0 -- key can not be answer
        #  flag 1 -- key can be answer
        s[i][j][k] = 1
  return s

cell_answers = (input, answer, row, col)->
  if input[row][col] != 0
    answer[row][col][0] = input[row][col]
    answer[row][col][10] = 1
    return
  for i in [0..8]
    v = input[i][col]
    if v != 0
      answer[row][col][v] = 0

  for i in [0..8]
    v = input[row][i]
    if v != 0
      answer[row][col][v] = 0

  x = 3 * Math.floor row/3
  y = 3 * Math.floor col/3

  for i in [x .. x+2]
    for j in [y .. y+2]
      v = input[i][j]
      if v != 0
        answer[row][col][v] = 0

solve = (input) ->
  answer = init_answer_space()
  for i in [0..8]
    for j in [0..8]
      cell_answers(input, answer, i, j)

  return answer

input = [
  [1,2,3,4,5,6,7,8,9],
  [4,5,6,7,8,9,1,2,3],
  [7,8,9,1,2,3,4,5,6],
  [2,3,4,5,6,7,8,9,1],
  [5,6,7,8,9,1,2,3,4],
  [8,9,1,2,3,4,5,6,7],
  [3,4,5,6,7,8,9,1,2],
  [6,7,8,9,1,2,3,4,5],
  [9,1,2,3,4,5,6,7,8],
]

make_input = (full_input) ->
  for i in [0..8]
    for j in [0..8]
      if Math.random() < 0.5
        full_input[i][j] = 0
  return full_input

show_input = (input) ->
  for i in [0..8]
    line = ''
    for j in [0..8]
      line += input[i][j]
      line += ','
    console.log line

show_anwser = (answer) ->
  for i in [0..8]
    line = ''
    for j in [0..8]
      a = answer[i][j]
      if a[0] == 0
        line += '['
        for k in [1..9]
          if a[k] == 1
            line += k
        line += ']'
      else
        line += a[0]
      line += ','
    console.log line

input = make_input(input)
show_input(input)
answer = solve(input)
show_anwser(answer)
