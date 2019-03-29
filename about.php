<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>D&D Tools</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
    <link rel="stylesheet" href="main.css" />
  </head>
  <body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-danger">
      <a class="navbar-brand" href=".">Dungeon Tools</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href=".">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="about.php">About</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Tools
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item" href="dnd.php">Player Inventory</a>
            </div>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" data-toggle="modal" data-target="#exampleModalCenter">Login</a>
          </li>
        </ul>
      </div>
    </nav>

    <main class="col-12 py-md-3 pl-md-5 pr-md-5">
      <div class="jumbotron">
        <h1 class="display-4">Meet this site's GMs.</h1>
        <p class="lead">Behind every RPG is a game master. We're the masters of Dungeon Tools.</p>
        <hr class="my-4">
        <p>At Dungeon Tools, we believe that immersion is an important ingredient in a fun role-playing game and that nothing breaks suspension of belief like cumbersome game mechanics and logistics. We create tools to help your game master create your game world and you to stay focused on it (not sheets, dice, or math).</p>
      </div>

      <section>
        <h2>Our Team</h2>
        <div class="row">
          <div class="col-sm-6 col-lg-4 col-xl-3">
            <div class="card">
              <img class="card-img-top" src="images/kenny.jpeg" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title"><span>Kenny Schank</span><em>Design</em></h5>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-4 col-xl-3">
            <div class="card">
              <img class="card-img-top" src="images/kenny.jpeg" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title"><span>Kenny Schank</span><em>Front-end</em></h5>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-4 col-xl-3">
            <div class="card">
              <img class="card-img-top" src="images/kenny.jpeg" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title"><span>Kenny Schank</span><em>Back-end</em></h5>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-4 col-xl-3">
            <div class="card">
              <img class="card-img-top" src="images/kenny.jpeg" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title"><span>Kenny Schank</span><em>Project Manager</em></h5>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">Enter&hellip; if you dare.</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form id="login">
                <div class="form-group">
                  <label for="username" class="col-form-label">Username</label>
                  <input type="text" class="form-control" id="username">
                </div>
                <div class="form-group">
                  <label for="password" class="col-form-label">Password</label>
                  <input type="password" class="form-control" id="password"></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary">Log in</button>
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer id="footer" class="bg-secondary">
      <span class="text-light">&copy; Dungeon Tools</span>
    </footer>

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  </body>
</html>
