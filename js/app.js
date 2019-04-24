// make an array for displaying the map
// 1 = <div class="empty"></div>
// 2 = <div class="breakable"></div>
// 3 = <div class="non-breakable"></div>
// 4 = <div class="player1"></div>
// 5 = <div class="player2"></div>
// 6 = <div class="bomb"></div>

// array symbolises the game board
var map = [[4,1,0,0,0,0,0,0,0],
           [1,3,0,3,0,3,0,3,0],
           [0,0,0,0,0,0,0,0,0],
           [0,3,0,3,0,3,0,3,0],
           [0,0,0,0,0,0,0,0,0],
           [0,3,0,3,0,3,0,3,0],
           [0,0,0,0,0,0,0,0,0],
           [0,3,0,3,0,3,0,3,1],
           [0,0,0,0,0,0,0,1,5]];

var player1 = {name: "Player1", indicator: 4, lives: 2, x: 0, y: 0};
var player2 = {name: "Player2", indicator: 5, lives: 2, x: 8, y: 8};

$(function()
{
  $("#p1lives").html(`Player 1 Lives: ${player1.lives}`);
  $("#p2lives").html(`Player 2 Lives: ${player2.lives}`);

  drawWorld();

  player1Control();
  player2Control();
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
        $("#world").append(`<div class="player1" id="a${i}${j}"></div>`);
        absolutePositions(i,j);
      }
      else if (map[i][j] === 5)
      {
        $("#world").append(`<div class="player2" id="a${i}${j}"></div>`);
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

// function to control player1 with arrow keys
function player1Control()
{
  document.onkeydown = function(e)
  {
    if (player1.lives >= 0)
    {
      switch (e.keyCode)
      {
        // left
        case 37:
        // if the space you want to move to is free
        if (map[player1.y][player1.x - 1] === 1)
        {
          // if a bomb has been dropped then tile will remain a bomb
          if (map[player1.y][player1.x] === 6)
          {
            player1.x--;
            map[player1.y][player1.x] = 4;
          }
          // if no bomb placed tile you move from will be empty
          else
          {
            map[player1.y][player1.x] = 1;
            player1.x--;
            map[player1.y][player1.x] = 4;
          }
        }
        break;
        // up
        case 38:
        if (player1.y !== 0)
        {
          if(map[player1.y - 1][player1.x] === 1)
          {
            if (map[player1.y][player1.x] === 6)
            {
              player1.y--;
              map[player1.y][player1.x] = 4;
            }
            else
            {
              map[player1.y][player1.x] = 1;
              player1.y--;
              map[player1.y][player1.x] = 4;
            }
          }
        }
        break;
        // right
        case 39:
        if (map[player1.y][player1.x + 1] === 1)
        {
          if (map[player1.y][player1.x] === 6)
          {
            player1.x++;
            map[player1.y][player1.x] = 4;
          }
          else
          {
            map[player1.y][player1.x] = 1;
            player1.x++;
            map[player1.y][player1.x] = 4;
          }
        }
        break;
        // down
        case 40:
        if (player1.y !== 8)
        {
          if (map[player1.y + 1][player1.x] === 1)
          {
            if (map[player1.y][player1.x] === 6)
            {
              player1.y++;
              map[player1.y][player1.x] = 4;
            }
            else
            {
              map[player1.y][player1.x] = 1;
              player1.y++;
              map[player1.y][player1.x] = 4;
            }
          }
        }
        break;
        case 32:
        if (map[player1.y][player1.x] !== 6)
        {
          map[player1.y][player1.x] = 6;
          Bomb(player1, player2, player1.y, player1.x);
        }
        break;
        default:
        drawWorld();
      }
      drawWorld();
    }
  }
}

// function to control player2 with
function player2Control()
{
  document.onkeyup = function(e)
  {
    if (player2.lives >= 0)
    {
      switch (e.keyCode)
      {
        // left
        case 65:
        // if the space you want to move to is free
        if (map[player2.y][player2.x - 1] === 1)
        {
          // if a bomb has been dropped then tile will remain a bomb
          if (map[player2.y][player2.x] === 6)
          {
            player2.x--;
            map[player2.y][player2.x] = 5;
          }
          // if no bomb placed tile you move from will be empty
          else
          {
            map[player2.y][player2.x] = 1;
            player2.x--;
            map[player2.y][player2.x] = 5;
          }
        }
        break;
        // up
        case 87:
        if (player2.y !== 0)
        {
          if(map[player2.y - 1][player2.x] === 1)
          {
            if (map[player2.y][player2.x] === 6)
            {
              player2.y--;
              map[player2.y][player2.x] = 5;
            }
            else
            {
              map[player2.y][player2.x] = 1;
              player2.y--;
              map[player2.y][player2.x] = 5;
            }
          }
        }
        break;
        // right
        case 68:
        if (map[player2.y][player2.x + 1] === 1)
        {
          if (map[player2.y][player2.x] === 6)
          {
            player2.x++;
            map[player2.y][player2.x] = 5;
          }
          else
          {
            map[player2.y][player2.x] = 1;
            player2.x++;
            map[player2.y][player2.x] = 5;
          }
        }
        break;
        // down
        case 83:
        if (player2.y !== 8) 
        {
          if (map[player2.y + 1][player2.x] === 1)
          {
            if (map[player2.y][player2.x] === 6)
            {
              player2.y++;
              map[player2.y][player2.x] = 5;
            }
            else
            {
              map[player2.y][player2.x] = 1;
              player2.y++;
              map[player2.y][player2.x] = 5;
            }
          }
        }
        break;
        case 82:
        if (map[player2.y][player2.x] !== 6)
        {
          map[player2.y][player2.x] = 6;
          Bomb(player1, player2, player2.y, player2.x);
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
// bomb delay/blast effect
function Bomb(player1, player2, bombPosY, bombPosX)
{
  setTimeout(function()
  {
    if (bombPosY != 0)
    {
      // explodes space above
      if (map[bombPosY - 1][bombPosX] === 2 || map[bombPosY - 1][bombPosX] === 4 || map[bombPosY - 1][bombPosX] === 5)
      {
        map[bombPosY - 1][bombPosX] = 1;
      }
    }

    // explodes space to the right
    if (bombPosX != 8)
    {
      if (map[bombPosY][bombPosX + 1] === 2 || map[bombPosY][bombPosX + 1] === 4 || map[bombPosY][bombPosX + 1] === 5)
      {
        map[bombPosY][bombPosX + 1] = 1;
      }
    }

    // explodes space to the left
    if (bombPosX != 0)
    {
      if (map[bombPosY][bombPosX - 1] === 2 || map[bombPosY][bombPosX - 1] === 4   || map[bombPosY][bombPosX - 1] === 5)
      {
        map[bombPosY][bombPosX - 1] = 1;
      }
    }

    // explodes space below
    if (bombPosY != 8)
    {
      if (map[bombPosY + 1][bombPosX] === 2 || map[bombPosY + 1][bombPosX] === 4 || map[bombPosY + 1][bombPosX] === 5)
      {
        map[bombPosY + 1][bombPosX] = 1;
      }
    }

    map[bombPosY][bombPosX] = 1;
    drawWorld();
    LivesCount(player1);
    LivesCount(player2);

  }, 1000);
}

// decrements lives and alters score display
function LivesCount(player)
{
  if (player.name === "Player1" && playerDead(player))
  {
    if (player1.lives > 0)
    {
      map[0][0] = 4;
      player.x = 0;
      player.y = 0;
      player1.lives--;
      $("#p1lives").html(`Player 1 Lives: ${player1.lives}`);
      drawWorld();
    }
    else if (player1.lives === 0)
    {
      $("#p1lives").html("GAME OVER!!");
      $("#p2lives").html("WINNER!!");
      player1.lives--;
    }
  }
  else if (player.name === "Player2" && playerDead(player))
  {
    if (player2.lives > 0)
    {
      map[8][8] = 5;
      player.x = 8;
      player.y = 8;
      player2.lives--;
      $("#p2lives").html(`Player 2 Lives: ${player2.lives}`);
      drawWorld();
    }
    else if (player2.lives === 0)
    {
      $("#p2lives").html("GAME OVER!!");
      $("#p1lives").html("WINNER");
      player2.lives--;
    }
  }
}

// checks if player1 is dead
function playerDead(player)
{
  var dead = true;

  for (var i = 0; i < map.length; i++)
  {
    if (map[i].includes(player.indicator))
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
