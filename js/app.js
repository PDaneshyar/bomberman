// make an array for displaying the map
// 1 = <div class="empty"></div>
// 2 = <div class="breakable"></div>
// 3 = <div class="non-breakable"></div>
// 4 = <div class="player"></div>
// 5 = <div class="goal"></div>
// 6 = <div class="bomb"></div>

var map = [[4,1,0,0,0,0,0,0,0],
           [1,3,0,3,0,3,0,3,0],
           [0,0,0,0,0,0,0,0,0],
           [0,3,0,3,0,3,0,3,0],
           [0,0,0,0,0,0,0,0,0],
           [0,3,0,3,0,3,0,3,0],
           [0,0,0,0,0,0,0,0,0],
           [0,3,0,3,0,3,0,3,0],
           [0,0,0,0,0,0,0,0,5]];


$(function()
{
  drawWorld();
})

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
            $("#world").append(`<div class="empty"></div>`);
            break;
          case 2:
            $("#world").append(`<div class="breakable"></div>`);
            break;
          default:
            $("#world").append(`<div class="empty"></div>`);
        }
      }
      else if (map[i][j] === 1)
      {
        $("#world").append(`<div class="empty"></div>`);
      }
      else if (map[i][j] === 2)
      {
        $("#world").append(`<div class="breakable"></div>`);
      }
      else if (map[i][j] === 3)
      {
        $("#world").append(`<div class="non-breakable"></div>`);
      }
      else if (map[i][j] === 4)
      {
        $("#world").append(`<div class="player"></div>`);
      }
      else if (map[i][j] === 5)
      {
        $("#world").append(`<div class="goal"></div>`);
      }
      console.log(map[i][j]);
    }

    // inserts a break after every row
    // $("#world").append("<br>");
  }
}

// function to move player

// function to spawn bomb on button press
// bomb delay/blast

// function to destroy blocks nearby after explosion
