(function() {
  var check_col, check_rect, check_row, reverse_check;
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
}).call(this);
