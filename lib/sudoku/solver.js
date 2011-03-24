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
  */  var answer, cell_answers, init_answer_space, input, make_input, show_anwser, show_input, solve;
  init_answer_space = function() {
    var i, j, k, s;
    s = [];
    for (i = 0; i <= 8; i++) {
      s[i] = [];
      for (j = 0; j <= 8; j++) {
        s[i][j] = [];
        s[i][j][0] = 0;
        s[i][j][10] = 9;
        for (k = 1; k <= 9; k++) {
          s[i][j][k] = 1;
        }
      }
    }
    return s;
  };
  cell_answers = function(input, answer, row, col) {
    var i, j, v, x, y, _ref, _results;
    if (input[row][col] !== 0) {
      answer[row][col][0] = input[row][col];
      answer[row][col][10] = 1;
      return;
    }
    for (i = 0; i <= 8; i++) {
      v = input[i][col];
      if (v !== 0) {
        answer[row][col][v] = 0;
      }
    }
    for (i = 0; i <= 8; i++) {
      v = input[row][i];
      if (v !== 0) {
        answer[row][col][v] = 0;
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
          _results.push(v !== 0 ? answer[row][col][v] = 0 : void 0);
        }
        return _results;
      })());
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
  show_input(input);
  answer = solve(input);
  show_anwser(answer);
}).call(this);
