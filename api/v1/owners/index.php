<?php
require_once "ownersDao.php";
require_once "itemsDao.php";

function getPath() {
  $url = $_SERVER['REQUEST_URI'];
  $path = explode("index.php/", $url);
  $ownerPath = str_replace($path[0], "", $url);
  $path = explode("/", $ownerPath);
  return $path;
}

/*
$path[1] => owner ID
$path[2] => inventory category (i.e. "armor", "gear", or "weapons")
$path[3] => item ID
 */
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $path = getPath();
  parse_str(file_get_contents("php://input"),$_PUT);

  if (sizeof($path) > 1) {
    $ownerId = $path[1];
    $inventoryCategory = $path[2];
    echo createItem($ownerId, $inventoryCategory, $_PUT);
  }
  elseif (sizeof($path === 1)) {
    echo createOwner($_POST['name'], $_POST['race'], $_POST['class'], $_POST['level']);
  }
}

elseif ($_SERVER["REQUEST_METHOD"] === "GET") {
  $path = getPath();
  // GET all owners
  if (sizeof($path) === 1) echo listOwners();

  // GET single owner by ID
  elseif (sizeof($path) === 2) echo listOwners($path[1]);

  // GET a single owner's complete inventory by category
  elseif (sizeof($path) === 3) echo listItems($path[1], $path[2]);

  // GET a single owner's single item
  elseif (sizeof($path) === 4) echo listItems($path[1], $path[2], $path[3]);
}
elseif ($_SERVER["REQUEST_METHOD"] === "PUT") {
  $path = getPath();
  parse_str(file_get_contents("php://input"),$_PUT);
  if (sizeof($path) > 1) {
    $ownerId = $path[1];

    // Update a single owner
    if (sizeof($path) === 2) {
      $updatedOwnerName = (isset($_PUT['updatedOwnerName']) ? $_PUT['updatedOwnerName'] : NULL);
      $updatedOwnerRace = (isset($_PUT['updatedOwnerRace']) ? $_PUT['updatedOwnerRace'] : NULL);
      $updatedOwnerClass = (isset($_PUT['updatedOwnerClass']) ? $_PUT['updatedOwnerClass'] : NULL);
      $updatedOwnerLevel = (isset($_PUT['updatedOwnerLevel']) ? $_PUT['updatedOwnerLevel'] : NULL);
      echo updateOwner($ownerId, $updatedOwnerName, $updatedOwnerRace, $updatedOwnerClass, $updatedOwnerLevel);
    }

    // Update a single item
    elseif (sizeof($path) === 4) {
      $category = $path[2];
      $itemId = $path[3];

      class Keys {
        function Keys() {
          $this->armor = array('name', 'type', 'cost', 'weight', 'ac', 'str', 'stealth', 'qty');
          $this->gear = array('name', 'cost', 'weight', 'qty');
          $this->weapons = array('name', 'dmg', 'type', 'cost', 'weight', 'qty');
        }
      }

      $keys = new Keys();
      $keyList = $keys->$category;
      for ($i = 0; $i < sizeof($keyList); $i++) {
        if (isset($_PUT[$keyList[$i]])) {
          echo updateItem($ownerId, $category, $itemId, $keyList[$i], $_PUT[$keyList[$i]]);
          break;
        }
      }
    }
  }
}
elseif ($_SERVER["REQUEST_METHOD"] === "DELETE") {
  $path = getPath();
  parse_str(file_get_contents("php://input"),$_DELETE);
  print_r($path);
  if (sizeof($path) > 1) {
    $ownerId = $path[1];

    // Delete a single owner
    if (sizeof($path) === 2) echo deleteOwner($ownerId);

    // Delete a single item
    elseif (sizeof($path) === 4) {
      $category = $path[2];
      $itemId = $path[3];
      echo deleteItem($ownerId, $category, $itemId);
    }
  }
}
else {
    echo "You sent an unknown ".$_SERVER["REQUEST_METHOD"];
}
?>
