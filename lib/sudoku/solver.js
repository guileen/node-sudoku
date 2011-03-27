(function() {
  /*
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
  */  var answer, cell_answers, check_col, check_rect, check_row, do_guess, init_answer_space, init_guess, input, make_input, remove_value, reverse_check, show_anwser, show_input, solve, sort_guesses, start_guess, swap, update_cell, update_guesses;
  swap = function(arr, i, j) {
    var temp;
    temp = arr[i];
    arr[i] = arr[j];
    return arr[j] = temp;
  };
  init_answer_space = function() {
    var i, j, k, s;
    s = [];
    for (i = 0; i <= 8; i++) {
      s[i] = [];
      for (j = 0; j <= 8; j++) {
        s[i][j] = [];
        s[i][j][0] = 0;
        s[i][j][10] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (k = 1; k <= 9; k++) {
          s[i][j][k] = 1;
        }
      }
    }
    return s;
  };
  remove_value = function(answer, row, col, value) {
    var a, j;
    a = answer[row][col];
    a[value] = 0;
    j = a[10].indexOf(value);
    if (j >= 0) {
      a[10].splice(j, 1);
      if (a[10].length === 1) {
        return update_cell(answer, row, col);
      }
    }
  };
  cell_answers = function(input, answer, row, col) {
    var a, i, j, v, x, y, _ref, _results;
    a = answer[row][col];
    if (input[row][col] !== 0) {
      a[0] = input[row][col];
      a[10] = [];
      return;
    }
    for (i = 0; i <= 8; i++) {
      v = input[i][col];
      if (v !== 0) {
        remove_value(answer, row, col, v);
      }
      v = input[row][i];
      if (v !== 0) {
        remove_value(answer, row, col, v);
      }
    }
    x = 3 * Math.floor(row / 3);
    y = 3 * Math.floor(col / 3);
    _results = [];
    for (i = x, _ref = x + 2; (x <= _ref ? i <= _ref : i >= _ref); (x <= _ref ? i += 1 : i -= 1)) {
      _results.push((function() {
        var _ref, _results;
        _results = [];
        for (j = y, _ref = y + 2; (y <= _ref ? j <= _ref : j >= _ref); (y <= _ref ? j += 1 : j -= 1)) {
          v = input[i][j];
          _results.push(v !== 0 ? remove_value(answer, row, col, v) : void 0);
        }
        return _results;
      })());
    }
    return _results;
  };
  update_cell = function(answer, row, col) {
    var a, i, j, v, vs, x, y, _ref, _results;
    a = answer[row][col];
    vs = a[10];
    if (vs.length === 1) {
      v = a[0] = vs[0];
      for (i = 0; i <= 8; i++) {
        remove_value(answer, i, col, v);
        remove_value(answer, row, i, v);
      }
      x = 3 * Math.floor(row / 3);
      y = 3 * Math.floor(col / 3);
      _results = [];
      for (i = x, _ref = x + 2; (x <= _ref ? i <= _ref : i >= _ref); (x <= _ref ? i += 1 : i -= 1)) {
        _results.push((function() {
          var _ref, _results;
          _results = [];
          for (j = y, _ref = y + 2; (y <= _ref ? j <= _ref : j >= _ref); (y <= _ref ? j += 1 : j -= 1)) {
            _results.push(remove_value(answer, i, j, v));
          }
          return _results;
        })());
      }
      return _results;
    }
  };
  init_guess = function(answer) {
    var a, guesses, i, j;
    guesses = [];
    for (i = 0; i <= 8; i++) {
      for (j = 0; j <= 8; j++) {
        a = answer[i][j];
        if (a[10].length > 1) {
          guesses.push([i, j, 0, a[10]]);
        }
      }
    }
    return guesses;
  };
  sort_guesses = function(guesses) {
    var b, buckets, guess, result, _i, _j, _len, _len2, _name;
    buckets = [];
    result = [];
    for (_i = 0, _len = guesses.length; _i < _len; _i++) {
      guess = guesses[_i];
      (buckets[_name = guess[3].length] || (buckets[_name] = [])).push(guess);
    }
    for (_j = 0, _len2 = buckets.length; _j < _len2; _j++) {
      b = buckets[_j];
      if (b) {
        result = result.concat(b);
      }
    }
    return result;
  };
  update_guesses = function(guesses, guess) {
    var col, col2, g2, i, index, row, row2, updated, v, x, y, _len;
    console.log('update guesses, guess is');
    console.dir(guess);
    row = guess[0];
    col = guess[1];
    v = guess[2];
    x = 3 * Math.floor(row / 3);
    y = 3 * Math.floor(col / 3);
    for (i = 0, _len = guesses.length; i < _len; i++) {
      g2 = guesses[i];
      row2 = g2[0];
      col2 = g2[1];
      if ((row2 !== row || col2 !== col) && (row2 === row || col2 === col || ((x <= row2 && row2 <= x + 2) && (y <= col2 && col2 <= y + 2)))) {
        if (g2[2] === v) {
          return false;
        }
        index = g2[3].indexOf(v);
        if (index >= 0) {
          g2 = guesses[i] = g2.slice();
          g2[3] = g2[3].slice();
          g2[3].splice(index, 1);
          if (!g2[4]) {
            if (g2[3].length === 1) {
              g2[2] = g2[3][0];
              g2[4] = true;
              updated = update_guesses(guesses, g2);
              g2[4] = false;
              if (!updated) {
                return false;
              }
            } else if (g2[3].length === 0) {
              console.log('fail to update guesses');
              console.dir(g2);
              return false;
            }
          }
        }
      }
    }
    return true;
  };
  do_guess = function(guesses) {
    var clone, g, i, result, _len;
    guesses = sort_guesses(guesses);
    console.log('do_guess , guesses are ');
    console.dir(guesses);
    for (i = 0, _len = guesses.length; i < _len; i++) {
      g = guesses[i];
      if (!g) {
        console.log("guesses[" + i + "] is undefined");
      }
      if (g[3].length > 1 && !g[4]) {
        g = guesses[i];
        while (true) {
          if (g[3].length === 0) {
            return null;
          }
          g[2] = g[3][0];
          console.log('guessing ');
          console.dir(g);
          clone = guesses.slice();
          g[3] = g[3].slice(1);
          g[4] = true;
          if (update_guesses(clone, g)) {
            console.log('update complet, updated guesses are');
            console.dir(clone);
            result = do_guess(clone);
            g[4] = false;
            console.log("" + g[0] + "," + g[1] + "," + g[2] + "," + g[3] + " got result " + result);
            if (result) {
              console.log("return it");
              return result;
            }
          } else {
            g[4] = false;
            console.log('fail to update guesses, try next, previous is');
            console.dir(clone);
          }
        }
      }
    }
    return guesses;
  };
  start_guess = function(answer) {
    var a, g, guesses, _i, _len;
    guesses = init_guess(answer);
    console.dir(guesses);
    guesses = do_guess(guesses);
    if (guesses) {
      for (_i = 0, _len = guesses.length; _i < _len; _i++) {
        g = guesses[_i];
        a = answer[g[0]][g[1]];
        a[0] = g[2];
        a[10] = [g[2]];
      }
    }
    return guesses;
  };
  check_row = function(answer, row) {
    var a, c, i, last_i, v;
    for (v = 1; v <= 9; v++) {
      c = 0;
      for (i = 0; i <= 8; i++) {
        last_i = 0;
        if (answer[row][i].indexOf(v) >= 0) {
          c++;
          last_i = i;
        }
      }
      if (c === 1) {
        a = answer[row][last_i];
        a[0] = v;
        a[10] = [v];
        update_cell(answer, row, last_i);
      }
      return answer;
    }
  };
  check_col = function(answer, col) {
    var a, c, i, last_i, v;
    for (v = 1; v <= 9; v++) {
      c = 0;
      for (i = 0; i <= 8; i++) {
        last_i = 0;
        if (answer[i][col].indexOf(v) >= 0) {
          c++;
          last_i = i;
        }
      }
      if (c === 1) {
        a = answer[last_i][col];
        a[0] = v;
        a[10] = [v];
        update_cell(answer, last_i, col);
      }
      return answer;
    }
  };
  check_rect = function(answer, x, y) {
    var a, c, i, j, last_i, last_j, v, _ref, _ref2, _results;
    _results = [];
    for (v = 1; v <= 9; v++) {
      c = 0;
      for (i = x, _ref = x + 2; (x <= _ref ? i <= _ref : i >= _ref); (x <= _ref ? i += 1 : i -= 1)) {
        for (j = y, _ref2 = y + 2; (y <= _ref2 ? j <= _ref2 : j >= _ref2); (y <= _ref2 ? j += 1 : j -= 1)) {
          if (answer[i][j].indexOf(v) >= 0) {
            c++;
            last_i = i;
            last_j = j;
          }
        }
      }
      _results.push(c === 1 ? (a = answer[last_i][last_j], a[0] = v, a[10] = [v], update_cell(answer, last_i, last_j)) : void 0);
    }
    return _results;
  };
  reverse_check = function(answer, row, col) {
    var a, c, i, j, last, last_i, last_j, v, x, y, _ref, _ref2, _results;
    x = 3 * Math.floor(row / 3);
    y = 3 * Math.floor(col / 3);
    _results = [];
    for (v = 1; v <= 9; v++) {
      c = 0;
      for (i = 0; i <= 8; i++) {
        last_i = 0;
        if (answer[row][i].indexOf(v) >= 0) {
          c++;
          last_i = i;
        }
      }
      if (c === 1) {
        a = answer[row][last_i];
        a[0] = a[10] = [v];
        update_cell(answer, row, last_i);
      }
      c = 0;
      for (i = 0; i <= 8; i++) {
        last = 0;
        if (answer[i][col].indexOf(v) >= 0) {
          c++;
          last = i;
        }
      }
      if (c === 1) {
        a = answer[last_i][col];
        a[0] = a[10] = [v];
        update_cell(answer, last_i, col);
      }
      c = 0;
      for (i = x, _ref = x + 2; (x <= _ref ? i <= _ref : i >= _ref); (x <= _ref ? i += 1 : i -= 1)) {
        for (j = y, _ref2 = y + 2; (y <= _ref2 ? j <= _ref2 : j >= _ref2); (y <= _ref2 ? j += 1 : j -= 1)) {
          if (answer[i][j].indexOf(v) >= 0) {
            c++;
            last_i = 0;
            last_j = j;
          }
        }
      }
      _results.push(c === 1 ? (a = answer[last_i][last_j], a[0] = a[10] = [v], update_cell(answer, last_i, last_j)) : void 0);
    }
    return _results;
  };
  solve = function(input) {
    var answer, i, j;
    answer = init_answer_space();
    for (i = 0; i <= 8; i++) {
      for (j = 0; j <= 8; j++) {
        cell_answers(input, answer, i, j);
      }
    }
    return answer;
  };
  /*
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
  */
  input = [[1, 2, 3, 4, 5, 6, 7, 8, 9], [4, 5, 6, 7, 8, 9, 1, 2, 3], [7, 8, 9, 1, 2, 3, 4, 5, 6], [2, 3, 4, 5, 6, 7, 8, 9, 1], [5, 6, 7, 8, 9, 1, 2, 3, 4], [8, 9, 1, 2, 3, 4, 5, 6, 7], [3, 4, 5, 6, 7, 8, 9, 1, 2], [6, 7, 8, 9, 1, 2, 3, 4, 5], [9, 1, 2, 3, 4, 5, 6, 7, 8]];
  make_input = function(full_input) {
    var i, j;
    for (i = 0; i <= 8; i++) {
      for (j = 0; j <= 8; j++) {
        if (Math.random() < 0.8) {
          full_input[i][j] = 0;
        }
      }
    }
    return full_input;
  };
  show_input = function(input) {
    var i, j, line, _results;
    _results = [];
    for (i = 0; i <= 8; i++) {
      line = '';
      for (j = 0; j <= 8; j++) {
        line += input[i][j];
        line += ',';
      }
      _results.push(console.log(line));
    }
    return _results;
  };
  show_anwser = function(answer) {
    var a, i, j, k, line, _results;
    _results = [];
    for (i = 0; i <= 8; i++) {
      line = '';
      for (j = 0; j <= 8; j++) {
        a = answer[i][j];
        if (a[0] === 0) {
          line += '[';
          for (k = 1; k <= 9; k++) {
            if (a[k] === 1) {
              line += k;
            }
          }
          line += ']';
        } else {
          line += a[0];
        }
        line += ',';
      }
      _results.push(console.log(line));
    }
    return _results;
  };
  input = make_input(input);
  console.log('input is');
  show_input(input);
  answer = solve(input);
  console.log('answer is');
  show_anwser(answer);
  start_guess(answer);
  show_anwser(answer);
  /*
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
  */
}).call(this);
