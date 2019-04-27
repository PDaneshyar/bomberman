// make an array for displaying the map
// 1 = <div class="empty"></div>
// 2 = <div class="breakable"></div>
// 3 = <div class="non-breakable"></div>
// 4 = <div class="player1"></div>
// 5 = <div class="player2"></div>
// 6 = <div class="bomb"></div>
// 7 = <div class="flame"></div>
// 8 = <div class="bombUpgrade"></div>

var map = [[4,1,0,0,0,0,0,0,0],
           [1,3,0,3,0,3,0,3,0],
           [0,0,0,0,0,0,0,0,0],
           [0,3,0,3,0,3,0,3,0],
           [0,0,0,0,0,0,0,0,0],
           [0,3,0,3,0,3,0,3,0],
           [0,0,0,0,0,0,0,0,0],
           [0,3,0,3,0,3,0,3,1],
           [0,0,0,0,0,0,0,1,5]];

let player1 = new Player("Player1", 4, 2, 1, 0, 0, 0);
let player2 = new Player("Player2", 5, 2, 1, 8, 8, 0);

var pause = false;

// main program
$(function()
{
  $("#p1-submit").click(function()
  {
    event.preventDefault();
    if($("#p1name").val().length > 0)
    {
      var p1name = $("#p1name").val();
      $("#p1").html(p1name);
      $(".p1-nameInput").hide();
      $("#p1").show();
    }
  })

  $("#p2-submit").click(function()
  {
    event.preventDefault();
    if($("#p2name").val().length > 0)
    {
      var p2name = $("#p2name").val();
      $("#p2").html(p2name);
      $(".p2-nameInput").hide();
      $("#p2").show();
    }
  })

  $("#pause").hide();

  // displays the initial scoreboard
  $("#p1lives").html(`Lives: ${player1.lives}`);
  $("#p2lives").html(`Lives: ${player2.lives}`);

  // lowering the sound of the bomb explosion
  $("audio#sound-effects")[1].volume = 0.2;

  // game startsonce someone hits enter
  document.onkeyup = function(e)
  {
    if (e.keyCode === 13)
    {
      audio(0);
      drawWorld();

      player1Control();
      player2Control();
    }
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
        $(`#world`).append(`<div class="bomb" id="a${i}${j}"></div>`);
        absolutePositions(i,j);
      }
      else if (map[i][j] === 7)
      {
        $("#world").append(`<div class="flame" id="a${i}${j}"></div>`);
        absolutePositions(i,j);
      }
      else if (map[i][j] === 8)
      {
        $("#world").append(`<div class="bombUpgrade" id="a${i}${j}"></div>`);
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
    // if the player is alive and the game is not paused
    if (player1.lives >= 0 && !pause)
    {
      switch (e.keyCode)
      {
        // left
        case 37:
        // if the space you want to move to is free
        if (map[player1.y][player1.x - 1] === 1 ||
           map[player1.y][player1.x - 1] === 8)
        {
          // if the space you move to is a powerup
          if (map[player1.y][player1.x - 1] === 8)
          {
            player1.bombs++;
          }
          // tile will remain a bomb after moving
          else if (map[player1.y][player1.x] === 6)
          {
            player1.x--;
            map[player1.y][player1.x] = 4;
            break;
          }

          map[player1.y][player1.x] = 1;
          player1.x--;
          map[player1.y][player1.x] = 4;
        }
        break;
        // up
        case 38:
        if (player1.y !== 0)
        {
          if(map[player1.y - 1][player1.x] === 1 ||
            map[player1.y - 1][player1.x] === 8 )
          {
            if (map[player1.y - 1][player1.x] === 8)
            {
              player1.bombs++;
            }
            else if (map[player1.y][player1.x] === 6)
            {
              player1.y--;
              map[player1.y][player1.x] = 4;
              break;
            }

            map[player1.y][player1.x] = 1;
            player1.y--;
            map[player1.y][player1.x] = 4;
          }
        }
        break;
        // right
        case 39:
        if (map[player1.y][player1.x + 1] === 1 ||
            map[player1.y][player1.x + 1] === 8)
        {
          if (map[player1.y][player1.x + 1] === 8)
          {
            player1.bombs++;
          }
          else if (map[player1.y][player1.x] === 6)
          {
            player1.x++;
            map[player1.y][player1.x] = 4;
            break;
          }

          map[player1.y][player1.x] = 1;
          player1.x++;
          map[player1.y][player1.x] = 4;
        }
        break;
        // down
        case 40:
        if (player1.y !== 8)
        {
          if (map[player1.y + 1][player1.x] === 1 ||
            map[player1.y + 1][player1.x] === 8)
          {
            if (map[player1.y + 1][player1.x] === 8)
            {
              player1.bombs++;
            }
            else if (map[player1.y][player1.x] === 6)
            {
              player1.y++;
              map[player1.y][player1.x] = 4;
              break;
            }

            map[player1.y][player1.x] = 1;
            player1.y++;
            map[player1.y][player1.x] = 4;
          }
        }
        break;
        case 32:
        if (map[player1.y][player1.x] !== 6 && player1.bombs > 0)
        {
          player1.bombs--;
          map[player1.y][player1.x] = 6;
          Bomb(player1, player2, player1.y, player1.x);
        }
        break;
        default:
        drawWorld();
      }
      drawWorld();
    }

    // pause button can be pressed at anytime
    if (e.keyCode === 80)
    {
      pauseGame();
    }
  }
}

// function to control player2 with wasd keys
function player2Control()
{
  document.onkeyup = function(e)
  {
    if (player2.lives >= 0 && !pause)
    {
      switch (e.keyCode)
      {
        // left
        case 65:
        // if the space you want to move to is free
        if (map[player2.y][player2.x - 1] === 1 ||
          map[player2.y][player2.x - 1] === 8)
        {
          // if its a powerup then increase bombs
          if (map[player2.y][player2.x - 1] === 8)
          {
            player2.bombs++;
          }
          // if a bomb has been dropped then tile will remain a bomb
          // will break out of the switch statement
          else if (map[player2.y][player2.x] === 6)
          {
            player2.x--;
            map[player2.y][player2.x] = 5;
            break;
          }

          map[player2.y][player2.x] = 1;
          player2.x--;
          map[player2.y][player2.x] = 5;
        }
        break;
        // up
        case 87:
        if (player2.y !== 0)
        {
          if(map[player2.y - 1][player2.x] === 1 ||
            map[player2.y - 1][player2.x] === 8)
          {
            if (map[player2.y - 1][player2.x] === 8)
            {
              player2.bombs++;
            }
            else if (map[player2.y][player2.x] === 6)
            {
              player2.y--;
              map[player2.y][player2.x] = 5;
              break;
            }

            map[player2.y][player2.x] = 1;
            player2.y--;
            map[player2.y][player2.x] = 5;

          }
        }
        break;
        // right
        case 68:
        if (map[player2.y][player2.x + 1] === 1 ||
          map[player2.y][player2.x + 1] === 8)
        {
          if (map[player2.y][player2.x + 1] === 8)
          {
            player2.bombs++;
          }
          else if (map[player2.y][player2.x] === 6)
          {
            player2.x++;
            map[player2.y][player2.x] = 5;
            break;
          }

          map[player2.y][player2.x] = 1;
          player2.x++;
          map[player2.y][player2.x] = 5;

        }
        break;
        // down
        case 83:
        if (player2.y !== 8)
        {
          if (map[player2.y + 1][player2.x] === 1 ||
            map[player2.y + 1][player2.x] === 8)
          {
            if (map[player2.y + 1][player2.x] === 8)
            {
              player2.bombs++;
            }
            else if (map[player2.y][player2.x] === 6)
            {
              player2.y++;
              map[player2.y][player2.x] = 5;
              break;
            }

            map[player2.y][player2.x] = 1;
            player2.y++;
            map[player2.y][player2.x] = 5;

          }
        }
        break;
        case 81:
        if (map[player2.y][player2.x] !== 6)
        {
          player2.bombs--;
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

// bomb delay/blast effect
function Bomb(player1, player2, bombPosY, bombPosX)
{

  setTimeout(function()
  {
    // explodes space above
    if (bombPosY != 0)
    {
      // checks if space is an undestroyable block
      if (map[bombPosY-1][bombPosX] !== 3)
      {
        // random chance of a drop item
        if (map[bombPosY - 1][bombPosX] === 2 &&
          Math.floor(Math.random() * 8) === 7)
        {
          // plays audio as bomb explodes
          audio(1);
          map[bombPosY - 1][bombPosX] = 7;
          drawWorld();
          setTimeout(function()
          {
            map[bombPosY - 1][bombPosX] = 8;
            drawWorld();
          }, 600)
        }
        // if no drop item just make space an empty tile
        else
        {
          audio(1);
          map[bombPosY - 1][bombPosX] = 7;
          drawWorld();
          setTimeout(function()
          {
            map[bombPosY - 1][bombPosX] = 1;
            drawWorld();
          }, 600)
        }
      }
    }

    // explodes space to the right
    if (bombPosX != 8)
    {
      if (map[bombPosY][bombPosX+1] !== 3)
      {
        if (map[bombPosY][bombPosX+1] === 2 &&
          Math.floor(Math.random() * 8) === 7)
        {
          audio(1);
          map[bombPosY][bombPosX+1] = 7;
          drawWorld();
          setTimeout(function()
          {
            map[bombPosY][bombPosX+1] = 8;
            drawWorld();
          }, 600)
        }
        else
        {
          audio(1);
          map[bombPosY][bombPosX+1] = 7;
          drawWorld();
          setTimeout(function()
          {
            map[bombPosY][bombPosX+1] = 1;
            drawWorld();
          }, 600)
        }
      }
    }

    // explodes space to the left
    if (bombPosX != 0)
    {
      if (map[bombPosY][bombPosX-1] !== 3)
      {
        if (map[bombPosY][bombPosX-1] === 2 &&
          Math.floor(Math.random() * 8) === 7)
        {
          audio(1);
          map[bombPosY][bombPosX-1] = 7;
          drawWorld();
          setTimeout(function()
          {
            map[bombPosY][bombPosX-1] = 8;
            drawWorld();
          }, 600)
        }
        else
        {
          audio(1);
          map[bombPosY][bombPosX-1] = 7;
          drawWorld();
          setTimeout(function()
          {
            map[bombPosY][bombPosX-1] = 1;
            drawWorld();
          }, 600)
        }
      }
    }

    // explodes space below
    if (bombPosY != 8)
    {
      if (map[bombPosY+1][bombPosX] !== 3)
      {
        if (map[bombPosY + 1][bombPosX] === 2 &&
          Math.floor(Math.random() * 8) === 7)
        {
          audio(1);
          map[bombPosY + 1][bombPosX] = 7;
          drawWorld();
          setTimeout(function()
          {
            map[bombPosY + 1][bombPosX] = 8;
            drawWorld();
          }, 600)
        }
        else
        {
          audio(1);
          map[bombPosY + 1][bombPosX] = 7;
          drawWorld();
          setTimeout(function()
          {
            map[bombPosY + 1][bombPosX] = 1;
            drawWorld();
          }, 600)
        }
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
  if (player.name === "Player1")
  {
    if (player1.lives > 0 && playerDead(player))
    {
      audio(2);
      map[0][0] = 4;
      player.x = 0;
      player.y = 0;
      player1.lives--;
      $("#p1lives").html(`Lives: ${player1.lives}`);
      drawWorld();
    }
    else if (player1.lives === 0 && playerDead(player))
    {
      audio(3);
      $("#p1lives").html("GAME OVER!!");
      $("#p2lives").html("Player 2 is the WINNER!!");
      player1.lives--;
      setTimeout(() => {playAgain(player2)}, 300);
    }
    player1.bombs++;
  }
  else if (player.name === "Player2")
  {
    if (player2.lives > 0 && playerDead(player))
    {
      audio(2);
      map[8][8] = 5;
      player.x = 8;
      player.y = 8;
      player2.lives--;
      $("#p2lives").html(`Lives: ${player2.lives}`);
      drawWorld();
    }
    else if (player2.lives === 0 && playerDead(player))
    {
      audio(3);
      $("#p2lives").html("GAME OVER!!");
      $("#p1lives").html("Player 1 is the WINNER");
      player2.lives--;
      setTimeout(() => {playAgain(player1)}, 300);
    }
    player2.bombs++;
  }
}

// checks if player is dead
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

// returns the correct audio clip to play
function audio(index)
{
  $("audio#sound-effects")[index].play();
}

// checks if player wants to play again
function playAgain(winner)
{
  // prevents players from moving
  player1.lives = -1;
  player2.lives = -1;

  // hides the game world and displays a play again button
  $("#world").hide();
  $("body").append(`<button type="button" id="play-again" name="button"> Play Again</button>`)

  $(`#play-again`).click(function()
  {
    // deletes the play again button
    $("#play-again").remove();

    // resets the array to it's default values
    map = [[4,1,0,0,0,0,0,0,0],
    [1,3,0,3,0,3,0,3,0],
    [0,0,0,0,0,0,0,0,0],
    [0,3,0,3,0,3,0,3,0],
    [0,0,0,0,0,0,0,0,0],
    [0,3,0,3,0,3,0,3,0],
    [0,0,0,0,0,0,0,0,0],
    [0,3,0,3,0,3,0,3,1],
    [0,0,0,0,0,0,0,1,5]];

    // increases the winners win property value
    if (winner.name === "Player1")
    {
      player1.wins++;
      let wins = player1.wins;
      player1 = new Player("Player1", 4, 2, 1, 0, 0, wins);
      player2 = new Player("Player2", 5, 2, 1, 8, 8, 0);
    }
    else
    {
      player2.wins++;
      let wins = player2.wins;
      player1 = new Player("Player1", 4, 2, 1, 0, 0, 0);
      player2 = new Player("Player2", 5, 2, 1, 8, 8, wins);
    }

    drawWorld();
    $("#world").show();
    audio(0);

    // adds a new victories score to the display
    $("#p1lives").html(`Player 1 Lives: ${player1.lives}`);
    $("#p1wins").html(`Victories: ${player1.wins}`)
    $("#p2lives").html(`Player 2 Lives: ${player2.lives}`);
    $("#p2wins").html(`Victories: ${player2.wins}`)
  })
}

// function to generate a player object
function Player(name, indicator, lives, bombs, x, y, wins)
{
  this.name = name;
  this.indicator = indicator;
  this.lives = lives;
  this.bombs = bombs;
  this.range = 1;
  this.x = x;
  this.y = y;
  this.wins = wins;
}

// pauses the game and hides the map
function pauseGame()
{

  if (pause === false)
  {
    $("#world").hide();
    $("#pause").show();
    pause = true;
  }
  else if (pause === true)
  {
    $("#pause").hide();
    $("#world").show();
    pause = false;
  }
}
