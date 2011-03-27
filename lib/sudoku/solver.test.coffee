{solve, start_guess} = require './solver'
console.log solve
console.log start_guess
###
input = [
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

input = [
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

make_input = (full_input) ->
  for i in [0..8]
    for j in [0..8]
      if Math.random() < 0.8
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
console.log 'input is'
show_input(input)
answer = solve(input)
console.log 'answer is'
show_anwser(answer)
start_guess(answer)
show_anwser(answer)
###
for i in [0..8]
  check_row answer, i
console.log 'checked row answer is'
show_anwser(answer)
for i in [0..8]
  check_col answer, i
console.log 'checked col answer is'
show_anwser(answer)
for i in [0..2]
  for j in [0..2]
    check_rect answer, i, j
console.log 'checked rect answer is'
show_anwser(answer)
###
