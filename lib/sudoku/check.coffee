
check_row = (answer, row) ->
  for v in [1..9]
    #check row
    c = 0
    for i in [0..8]
      last_i = 0
      if answer[row][i].indexOf(v) >= 0
        c++
        last_i = i
    #if only 1 cell fit the number v, then this cell should be v
    if c is 1
      a = answer[row][last_i]
      a[0] = v
      a[10] = [v]
      update_cell answer, row, last_i
    return answer

check_col = (answer, col) ->
  for v in [1..9]
    #check col
    c = 0
    for i in [0..8]
      last_i = 0
      if answer[i][col].indexOf(v) >= 0
        c++
        last_i = i
    #if only 1 cell fit the number v, then this cell should be v
    if c is 1
      a = answer[last_i][col]
      a[0] = v
      a[10] = [v]
      update_cell answer, last_i, col
    return answer

check_rect = (answer, x, y) ->
  for v in [1..9]
    c = 0
    for i in [x .. x+2]
      for j in [y .. y+2]
        if answer[i][j].indexOf(v) >= 0
          c++
          last_i = i
          last_j = j
    if c is 1
      a = answer[last_i][last_j]
      a[0] = v
      a[10] = [v]
      update_cell answer, last_i, last_j


reverse_check = (answer, row, col)->

  x = 3 * Math.floor row/3
  y = 3 * Math.floor col/3

  for v in [1..9]
    #check row
    c = 0
    for i in [0..8]
      last_i = 0
      if answer[row][i].indexOf(v) >= 0
        c++
        last_i = i
    #if only 1 cell fit the number v, then this cell should be v
    if c is 1
      a = answer[row][last_i]
      a[0] = a[10] = [v]
      update_cell answer, row, last_i

    #check col
    c = 0
    for i in [0..8]
      last = 0
      if answer[i][col].indexOf(v) >= 0
        c++
        last = i
    if c is 1
      a = answer[last_i][col]
      a[0] = a[10] = [v]
      update_cell answer, last_i, col

    #check rect
    c = 0
    for i in [x .. x+2]
      for j in [y .. y+2]
        if answer[i][j].indexOf(v) >= 0
          c++
          last_i = 0
          last_j = j
    if c is 1
      a = answer[last_i][last_j]
      a[0] = a[10] = [v]
      update_cell answer, last_i, last_j


