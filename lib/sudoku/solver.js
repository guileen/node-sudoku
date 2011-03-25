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
  */  var answer, cell_answers, init_answer_space, input, make_input, remove_value, show_anwser, show_input, solve, update_cell;
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
  input = [[1, 2, 3, 4, 5, 6, 7, 8, 9], [4, 5, 6, 7, 8, 9, 1, 2, 3], [7, 8, 9, 1, 2, 3, 4, 5, 6], [2, 3, 4, 5, 6, 7, 8, 9, 1], [5, 6, 7, 8, 9, 1, 2, 3, 4], [8, 9, 1, 2, 3, 4, 5, 6, 7], [3, 4, 5, 6, 7, 8, 9, 1, 2], [6, 7, 8, 9, 1, 2, 3, 4, 5], [9, 1, 2, 3, 4, 5, 6, 7, 8]];
  make_input = function(full_input) {
    var i, j;
    for (i = 0; i <= 8; i++) {
      for (j = 0; j <= 8; j++) {
        if (Math.random() < 0.5) {
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
}).call(this);
