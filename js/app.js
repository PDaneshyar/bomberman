// make an array for displaying the map
// 1 = <div class="empty"></div>
// 2 = <div class="breakable"></div>
// 3 = <div class="non-breakable"></div>
// 4 = <div class="player"></div>
// 5 = <div class="goal"></div>
// 6 = <div class="bomb"></div>

// array symbolises the game board
var map = [[4,1,0,0,0,0,0,0,0],
           [1,3,0,3,0,3,0,3,0],
           [0,0,0,0,0,0,0,0,0],
           [0,3,0,3,0,3,0,3,0],
           [0,0,0,0,0,0,0,0,0],
           [0,3,0,3,0,3,0,3,0],
           [0,0,0,0,0,0,0,0,0],
           [0,3,0,3,0,3,0,3,0],
           [0,0,0,0,0,0,0,0,5]];

var player = {x: 0, y: 0};
var lives = 2;

$(function()
{
  $("#lives").html(`Lives: ${lives}`);

  drawWorld();
  if (lives > 0)
  {
    playerControl();
  }
})

// draws the world with all the required tiles based on the map array
function drawWorld()
{
  $("#world").html("");

  for (var i = 0; i < map.length; i++)
  {
    for (var j = 0; j < map.length; j++)
    {
      // will randomly fill certain tiles with destroyable blocks on the
      // initial loadup of the game
      if (map[i][j] === 0)
      {
        // generates either 1 or 2 randomly
        var random = Math.floor(Math.random() * 2) + 1;
        switch (random)
        {
          case 1:
            $("#world").append(`<div class="empty" id="a${i}${j}"></div>`);
            absolutePositions(i,j);
            map[i][j] = 1;
            break;
          case 2:
            $("#world").append(`<div class="breakable" id="a${i}${j}"></div>`);
            absolutePositions(i,j);
            map[i][j] = 2
            break;
          default:
            $("#world").append(`<div class="empty" id="a${i}${j}"></div>`);
            absolutePositions(i,j);
            map[i][j] = 1;
        }
      }
      else if (map[i][j] === 1)
      {
        $("#world").append(`<div class="empty" id="a${i}${j}"></div>`);
        absolutePositions(i,j);
      }
      else if (map[i][j] === 2)
      {
        $("#world").append(`<div class="breakable" id="a${i}${j}"></div>`);
        absolutePositions(i,j);
      }
      else if (map[i][j] === 3)
      {
        $("#world").append(`<div class="non-breakable"id="a${i}${j}"></div>`);
        absolutePositions(i,j)
      }
      else if (map[i][j] === 4)
      {
        $("#world").append(`<div class="player" id="a${i}${j}"></div>`);
        absolutePositions(i,j);
      }
      else if (map[i][j] === 5)
      {
        $("#world").append(`<div class="goal" id="a${i}${j}"></div>`);
        absolutePositions(i,j);
      }
      else if (map[i][j] === 6)
      {
        $(`#world`).append(`<img class="bomb">`);
        absolutePositions(i,j);
      }
    }
  }
}

// function to control player
function playerControl()
{
  document.onkeydown = function(e)
  {
    if (lives >= 0)
    {
      switch (e.keyCode)
      {
        // left
        case 37:
        // if the space you want to move to is free
        if (map[player.y][player.x - 1] === 1)
        {
          // if a bomb has been dropped then tile will remain a bomb
          if (map[player.y][player.x] === 6)
          {
            player.x--;
            map[player.y][player.x] = 4;
          }
          // if no bomb placed tile you move from will be empty
          else
          {
            map[player.y][player.x] = 1;
            player.x--;
            map[player.y][player.x] = 4;
          }
        }
        break;
        // up
        case 38:
        if(map[player.y - 1][player.x] === 1)
        {
          if (map[player.y][player.x] === 6)
          {
            player.y--;
            map[player.y][player.x] = 4;
          }
          else
          {
            map[player.y][player.x] = 1;
            player.y--;
            map[player.y][player.x] = 4;
          }
        }
        break;
        // right
        case 39:
        if (map[player.y][player.x + 1] === 1)
        {
          if (map[player.y][player.x] === 6)
          {
            player.x++;
            map[player.y][player.x] = 4;
          }
          else
          {
            map[player.y][player.x] = 1;
            player.x++;
            map[player.y][player.x] = 4;
          }
        }
        break;
        // down
        case 40:
        if (map[player.y + 1][player.x] === 1)
        {
          if (map[player.y][player.x] === 6)
          {
            player.y++;
            map[player.y][player.x] = 4;
          }
          else
          {
            map[player.y][player.x] = 1;
            player.y++;
            map[player.y][player.x] = 4;
          }
        }
        break;
        case 32:
        if (map[player.y][player.x] !== 6)
        {
          map[player.y][player.x] = 6;
          Bomb(player.y, player.x);
        }
        break;
        default:
        drawWorld();
      }
      drawWorld();
    }

  }
}

// function to spawn bomb on button press
// bomb delay/blast
function Bomb(bombPosY, bombPosX)
{
  setTimeout(function()
  {
    // destroys blocks/player to the right
    if (bombPosY != 0)
    {
      // explodes space above
      if (map[bombPosY -1][bombPosX] === 2 || map[bombPosY -1][bombPosX] === 4)
      {
        map[bombPosY - 1][bombPosX] = 1;
      }
    }

    if (bombPosX != 8)
    {
      if (map[bombPosY][bombPosX+1] === 2 || map[bombPosY][bombPosX+1] === 4)
      {
        map[bombPosY][bombPosX + 1] = 1;
      }
    }

    // explodes space to the left
    if (bombPosX != 0)
    {
      if (map[bombPosY][bombPosX-1] === 2 || map[bombPosY][bombPosX-1] === 4)
      {
        map[bombPosY][bombPosX - 1] = 1;
      }
    }

    // explodes space below
    if (bombPosY != 8)
    {
      if (map[bombPosY +1][bombPosX] === 2 || map[bombPosY +1][bombPosX] === 4)
      {
        map[bombPosY + 1][bombPosX] = 1;
      }
    }

    map[bombPosY][bombPosX] = 1;
    drawWorld();

    if (playerDead() && lives > 0)
    {
      map[0][0] = 4;
      player.x = 0;
      player.y = 0;
      lives--;
      $("#lives").html(`Lives: ${lives}`);
      drawWorld();
    }
    else if (playerDead() && lives === 0)
    {
      $("#lives").html("GAME OVER!!");
      lives--;
    }
  }, 1000);
}

// checks if player is dead
function playerDead()
{
  var dead = true;

  for (var i = 0; i < map.length; i++)
  {
    if (map[i].includes(4))
    {
      dead = false;
    }
  }

  return dead;
}

// sets the top and left positions of each tile
function absolutePositions(i, j)
{
  $(`#a${i}${j}`).css(
    {'left': `${j * 60}px`,
     'top': `${i * 60}px`
   });
}
