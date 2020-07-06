document.addEventListener("DOMContentLoaded", function(event) {
    // Your code to run since DOM is loaded and ready
    tableCreate(16, 16);
    updateSliderThumbColor(180);

    const selectElement = document.getElementById('rainbowBar');
    if(selectElement){
      selectElement.addEventListener('input', (event) => {
        updateSliderThumbColor(event.target.value);
      });
    }

    var tableRow = document.getElementById("tableRow");
    if(tableRow){
      tableRow.addEventListener('input', (event) => {
        tableCreate(event.target.value, tableColumn.value);
      });
    }

    var tableColumn = document.getElementById("tableColumn");
    if(tableColumn){
      tableColumn.addEventListener('input', (event) => {
        tableCreate(tableRow.value, event.target.value);
      });
    }

    var table = document.getElementById("colorTable");
    if(table){
      table.addEventListener('click', (event) => {
        var td = event.target

        if (td.tagName !== 'TD') {
          return
        }

        td.style.backgroundColor = document.getElementById('pick').value;
      });
    }
});

function tableCreate(row, column) {
  var row_num = eval(row);
  var col_num = eval(column);

  var tds = '<td>\n'.repeat(row_num);
  var trs = ('<tr>\n'+tds).repeat(col_num);

  document.getElementById('colorTable').innerHTML = trs;
}

function updateSliderThumbColor(hue) {
    var style = document.createElement('style');
    var hslcolor = "hsl(" + hue + ", 100%, 50%)";
	  style.textContent = ".rainbow::-webkit-slider-thumb { background: " + hslcolor + "; }";
    var hexCode = HSLToHex(hue, "100", "50");

    document.getElementById('pick').value = hexCode;
    document.getElementById('pick').style.backgroundColor = hexCode;
    document.body.appendChild(style);
}

function HSLToHex(h,s,l) {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r = 0,
      g = 0,
      b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}
