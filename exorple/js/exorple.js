

var cellWidth  = 10;
var cellHeight = 10;
var maxRows = 50
var maxCols = 50
var colors = ["#FF0000","#00FF00","#0000FF"]

function generateColorMap() {
  var colorMap = []
  for (var i = 0; i < maxCols; i++) {
    colorMap[i] = []
    for (var j = 0; j < maxRows; j++) {
        var idx = Math.floor(Math.random()*colors.length)
        var color = getNewColor(i, j, colorMap);
        colorMap[i][j] = color
    }
  }
  return colorMap
}
function getNewColor(i,j,colorMap) {
  if(Math.random() > 0.1) {
    var leftI = i-1
    if(leftI >= 0) {
      var topI = j-1
      if (topI >= 0) {
        return colorMap[leftI][topI]
      } else {
        return colorMap[leftI][j]
      }
    }
  }
  var idx = Math.floor(Math.random()*colors.length)
  return colors[idx]
}
function drawCells(colorMap, ctx) {
  for (var i = 0; i < colorMap.length; i++) {
    var col = colorMap[i]
    for (var j = 0; j < col.length; j++) {
        var color = colorMap[i][j]
        drawCell(i, j, color, ctx)
    }
  }
}
function drawCell(i, j, color, ctx) {
  ctx.beginPath();
  ctx.fillStyle = color
  ctx.fillRect(i*cellWidth, j*cellHeight, cellWidth, cellHeight);
  ctx.stroke();
}

function init() {
  var colorMap = generateColorMap()
  var ctx = canvas.getContext("2d");
  drawCells(colorMap, ctx)
}