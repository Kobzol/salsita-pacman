window.onload = function()
{
  function isValid(x, y, width, height)
  {
    return x >= 0 && x < height && y >= 0 && y < width;
  }
  function hash(x, y)
  {
    return x.toString() + "_" + y.toString();
  }
  
  function findIter(maze, startX, startY)
  {
    var stack = [];
    var visited = {};
    
    for (var i = maze.length - 1; i >= 0; i--)
    {
      for (var j = 0; j < maze[i].length; j++)
      {
        stack.push({ x: i, y: j});
      }
    }
    
    function getNeighbourPaths(pos)
    {
       if (isValid(pos.x, pos.y, maze[0].length, maze.length) && maze[pos.x][pos.y] == ' ')
       {
          var hash = pos.x.toString() + "_" + pos.y.toString();
          if (visited.hasOwnProperty(hash))
          {
                return visited[hash];
          }
       }
       
       return 0;
    }
    
    stack.pop(); // remove final spot
    visited[hash(0, maze[0].length - 1)] = 1;
    
    while (stack.length > 0)
    {
      var pos = stack.pop();
      var right = { x: pos.x, y: pos.y + 1 };
      var up = { x: pos.x - 1, y: pos.y };
      
      var pathsRight = getNeighbourPaths(right);
      var pathsUp = getNeighbourPaths(up);
      
      visited[hash(pos.x, pos.y)] = pathsRight + pathsUp;
    }
    
    return visited[hash(startX, startY)];
  }
  
  var startTime = window.performance.now();
  var paths = findIter(maze, maze.length - 1, 0);
  var time = window.performance.now() - startTime;
  
  console.log("Unique paths: " + paths);
  console.log("Time: " + time + " ms");
}