<?php

function dbConnect() {
  $db = mysqli_connect('localhost', 'kennysc1_demo', 'dem0!', 'kennysc1_demo') or die(mysqli_error($db));
  return $db;
}

function createOwner($name, $race, $class, $level) {
  $db = dbConnect();
  $query = "INSERT INTO owners(Name, Race, Class, Level) VALUES ('".$name."', '".$race."', '".$class."', '".$level."')";

  $createOwner = mysqli_query($db, $query) or die (mysqli_error($db));

  if (mysqli_connect_error($createOwner)) header("HTTP/1.1 500 Internal Server Error");
  else header("Status: 201 CREATED");

  $newOwnerId = mysqli_insert_id($db);
  mysqli_close($db);
  return $newOwnerId;
}

function updateOwner($id, $name, $race, $class, $level) {
  $db = dbConnect();

  $setQuery = '';
  if     (!is_null($name)) $setQuery = "Name='".$name."' ";
  elseif (!is_null($race)) $setQuery = "Race='".$race."' ";
  elseif (!is_null($class)) $setQuery = "Class='".$class."' ";
  elseif (!is_null($level)) $setQuery = "Level=".$level." ";

  $query = "UPDATE owners SET ".$setQuery."WHERE ID=".$id;
  $updateOwner = mysqli_query($db, $query) or die (mysqli_error($db));
  if (mysqli_connect_error($updateOwner)) header("HTTP/1.1 500 Internal Server Error");
  else header("HTTP/1.1 204 No Content");
  mysqli_close($db);
}

function deleteOwner($id) {
  $db = dbConnect();
  $query = "DELETE FROM owners WHERE ID=".$id;
  $deleteOwner = mysqli_query($db, $query) or die (mysqli_error($db));
  if (mysqli_connect_error($deleteOwner)) header("HTTP/1.1 500 Internal Server Error");
  else header("HTTP/1.1 204 No Content");
  mysqli_close($db);
}

function getTotalWeight($ownerName) {
  $db = dbConnect();
  $query = "SELECT SUM(Total_Weight) AS 'Total_Weight'
            FROM (
                SELECT *
                FROM (
                    SELECT o.Name, a.Name AS Item, oa.Quantity, a.Weight, (oa.Quantity * a.Weight) AS Total_Weight FROM owners o
                    JOIN owner_armor oa
                        ON o.ID = oa.owner_id
                    JOIN armor a
                        ON oa.armor_id = a.ID
                    WHERE o.Name = '".$ownerName."'
                ) armor
                UNION
                SELECT *
                FROM (
                    SELECT o.Name, w.Name AS Item, ow.Quantity, w.Weight, (ow.Quantity * w.Weight) AS Total_Weight FROM owners o
                    JOIN owner_weapons ow
                        ON o.ID = ow.owner_id
                    JOIN weapons w
                        ON ow.weapon_id = w.ID
                    WHERE o.Name = '".$ownerName."'
                ) weapons
                UNION
                SELECT *
                FROM (
                    SELECT o.Name, g.Name AS Item, og.Quantity, g.Weight, (og.Quantity * g.Weight) AS Total_Weight FROM owners o
                    JOIN owner_gear og
                        ON o.ID = og.owner_id
                    JOIN gear g
                        ON og.gear_id = g.ID
                    WHERE o.Name = '".$ownerName."'
                ) gear
            ) totalWeight";
  $getTotalWeight = mysqli_query($db, $query) or die (mysqli_error($db));
  $totalWeight = mysqli_fetch_array($getTotalWeight);
  if (is_null($totalWeight['Total_Weight'])) { return 0; }
  else { return $totalWeight['Total_Weight']; }
}

function listOwners($id='') {
  $db = dbConnect();
  // 1. create SQL query that reads ALL rows
  if ($id === '') $query = 'SELECT * FROM owners';
  else $query = 'SELECT * FROM owners WHERE ID = '.$id;
  // 2. execute the query on MySQL
  $getOwners = mysqli_query($db, $query) or die (mysqli_error($db));

  // 3. if successful return 200 (default)
  if (mysqli_connect_error($getOwners)) header("HTTP/1.1 500 Internal Server Error");
  else {
    header("HTTP/1.1 200 OK");
    if (!mysqli_num_rows($getOwners)) return '[]';
    $owner = mysqli_fetch_array($getOwners);
    getTotalWeight($owner["Name"]);
    $ownerJSON = '';
    if (mysqli_num_rows($getOwners) > 1) $ownerJSON .= '[';
    $ownerJSON .= '{ "id": '.$owner["ID"].', "name": "'.$owner["Name"].'", "race": "'.$owner["Race"].'", "class": "'.$owner["Class"].'", "level": '.$owner["Level"].', "inventoryWeight": '.getTotalWeight($owner["Name"]).' }';
    while ($owner = mysqli_fetch_array($getOwners)) {
      $ownerJSON .= ', { "id": '.$owner["ID"].', "name": "'.$owner["Name"].'", "race": "'.$owner["Race"].'", "class": "'.$owner["Class"].'", "level": '.$owner["Level"].', "inventoryWeight": '.getTotalWeight($owner["Name"]).' }';
    }
    if (mysqli_num_rows($getOwners) > 1) $ownerJSON .= ']';
    mysqli_close($db);
    return $ownerJSON;
  }
}
?>
