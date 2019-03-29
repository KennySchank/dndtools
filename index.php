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
      <a class="navbar-brand" href="">Dungeon Tools</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
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
            <a class="nav-link" data-toggle="modal" data-target="#exampleModalCenter">Log in</a>
          </li>
        </ul>
      </div>
    </nav>
    <main class="col-12 py-md-3 pl-md-5 pr-md-5">
      <div class="jumbotron">
        <h1 class="display-4"><s>Welcome</s> Hail and well met, adventurers!</h1>
        <p class="lead">Critical success! You've discovered the best online collection of tools for <em>Dungeons & Dragons</em> and other tabletop role-playing games!</p>
        <hr class="my-4">
        <p>Check us out and learn more about our developers.</p>
        <p class="lead">
          <a class="btn btn-danger btn-lg" href="about.php" role="button">About us</a>
        </p>
      </div>
      <section>
        <h2>Tools</h2>
        <div class="row">
          <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"><span>Organize your inventory.</span><span class="badge badge-primary">New!</span></h5>
                <p class="card-text">Looting is a big part of RPGs, but inventory management can be about as fun as hugging a mimic. No need to worry—use this tool to focus on your adventure, not on logistics. View your characters and keep track of all your treasure.</p>
                <a href="dnd.php" class="btn btn-danger">Player Inventory</a>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"><span>Create monsters.</span><span class="badge badge-secondary">Coming Soon!</span></h5>
                <p class="card-text">What's an RPG without monsters? Use this tool to make your own monsters, customize well-known creatures, or adjust their challenge ratings to better fit your adventuring party's capabilities (assuming you don't want a TPK on your hands).</p>
                <a href="#" class="btn btn-danger disabled">Monster Factory</a>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"><span>Roll dice.</span><span class="badge badge-secondary">Coming Soon!</span></h5>
                <p class="card-text">Never roll your dice off of the table again. This tool lets you roll any variety of polyhedral dice you fancy. Set up custom dice rolls to speed up gameplay. If you don't like math, we've got your back—just roll and we'll give you the result.</p>
                <a href="#" class="btn btn-danger disabled">Dice Roller</a>
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
