<?php

function listItems($ownerId, $itemType, $itemId='') {
  $db = dbConnect();

  $itemTypeSingular = $itemType; // There's a more elegant way to do this, but this works for now
  if ($itemType === 'weapons') $itemTypeSingular = 'weapon';


  if ($itemId === '') $query = "SELECT * FROM ".$itemType." JOIN owner_".$itemType." ON ".$itemType.".ID = owner_".$itemType.".".$itemTypeSingular."_id WHERE owner_".$itemType.".owner_id = ".$ownerId." AND Quantity > 0 ORDER BY Name";
  else $query = "SELECT * FROM ".$itemType." JOIN owner_".$itemType." ON ".$itemType.".ID = owner_".$itemType.".".$itemTypeSingular."_id WHERE owner_".$itemType.".owner_id = ".$ownerId." AND ".$itemType.".ID = ".$itemId." AND Quantity > 0 ORDER BY Name";


  $getItems = mysqli_query($db, $query) or die (mysqli_error($db));
  if (mysqli_connect_error($getItems)) header("HTTP/1.1 500 Internal Server Error");
  else {
    header("HTTP/1.1 200 OK");
    if (!mysqli_num_rows($getItems)) return '[]';
    if ($itemType === 'armor') $itemJSON = getArmorJSON($getItems);
    elseif ($itemType === 'gear') $itemJSON = getGearJSON($getItems);
    elseif ($itemType === 'weapons') $itemJSON = getWeaponsJSON($getItems);

    mysqli_close($db);
    return $itemJSON;
  }
}

function getArmorJSON($getItems) {
  $item = mysqli_fetch_array($getItems);
  $itemJSON = '[';
  $itemJSON .= '{ "id": '.$item["ID"].', "name": "'.$item["Name"].'", "cost": '.$item["Cost"].', "ac": "'.$item["AC_Bonus"].'", "strength": "'.$item["Strength"].'", "stealth": "'.$item["Stealth"].'", "weight": '.$item["Weight"].', "type": "'.$item["Type"].'", "quantity": '.$item["Quantity"].' }';
  while ($item = mysqli_fetch_array($getItems)) {
    $itemJSON .= ', { "id": '.$item["ID"].', "name": "'.$item["Name"].'", "cost": '.$item["Cost"].', "ac": "'.$item["AC_Bonus"].'", "strength": "'.$item["Strength"].'", "stealth": "'.$item["Stealth"].'", "weight": '.$item["Weight"].', "type": "'.$item["Type"].'", "quantity": '.$item["Quantity"].' }';
  }
  $itemJSON .= ']';
  return $itemJSON;
}

function getGearJSON($getItems) {
  $item = mysqli_fetch_array($getItems);
  $itemJSON = '[';
  $itemJSON .= '{ "id": '.$item["ID"].', "name": "'.$item["Name"].'", "cost": '.$item["Cost"].', "weight": '.$item["Weight"].', "quantity": '.$item["Quantity"].' }';
  while ($item = mysqli_fetch_array($getItems)) {
    $itemJSON .= ', { "id": '.$item["ID"].', "name": "'.$item["Name"].'", "cost": '.$item["Cost"].', "weight": '.$item["Weight"].', "quantity": '.$item["Quantity"].' }';
  }
  $itemJSON .= ']';
  return $itemJSON;
}

function getWeaponsJSON($getItems) {
  $item = mysqli_fetch_array($getItems);
  $itemJSON = '[';
  $itemJSON .= '{ "id": '.$item["ID"].', "name": "'.$item["Name"].'", "cost": '.$item["Cost"].', "damage": "'.$item["Damage"].'", "type": "'.$item["Type"].'", "weight": '.$item["Weight"].', "quantity": '.$item["Quantity"].' }';
  while ($item = mysqli_fetch_array($getItems)) {
    $itemJSON .= ', { "id": '.$item["ID"].', "name": "'.$item["Name"].'", "cost": '.$item["Cost"].', "damage": "'.$item["Damage"].'", "type": "'.$item["Type"].'", "weight": '.$item["Weight"].', "quantity": '.$item["Quantity"].' }';
  }
  $itemJSON .= ']';
  return $itemJSON;
}

function updateItem($ownerId, $itemType, $itemId, $itemColumn, $itemValue) {
  $db = dbConnect();

  $itemTypeSingular = $itemType; // There's a more elegant way to do this, but this works for now
  if ($itemType === 'weapons') $itemTypeSingular = 'weapon';

  $column = '';
  switch($itemColumn) {
    case 'name': $column = 'Name'; break;
    case 'type': $column = 'Type'; break;
    case 'cost': $column = 'Cost'; break;
    case 'weight': $column = 'Weight'; break;
    case 'ac': $column = 'AC_Bonus'; break;
    case 'str': $column = 'Strength'; break;
    case 'stealth': $column = 'Stealth'; break;
    case 'dmg': $column = 'Damage'; break;
    case 'qty': $column = 'Quantity'; break;
  }

  $query = '';
  if ($itemColumn === "qty") {
    if ($itemType === 'armor') { $query = "UPDATE owner_".$itemType." SET ".$column."=".$itemValue." WHERE owner_id=".$ownerId." AND armor_id=".$itemId; }
    else if ($itemType === 'weapons') { $query = "UPDATE owner_".$itemType." SET ".$column."=".$itemValue." WHERE owner_id=".$ownerId." AND weapon_id=".$itemId; }
    else if ($itemType === 'gear') { $query = "UPDATE owner_".$itemType." SET ".$column."=".$itemValue." WHERE owner_id=".$ownerId." AND gear_id=".$itemId; }
  }
  else {
    $query = "UPDATE ".$itemType." SET ".$column."='".$itemValue."' WHERE ID=".$itemId;
  }

  $updateItem = mysqli_query($db, $query) or die (mysqli_error($db));
  if (mysqli_connect_error($updateItem)) header("HTTP/1.1 500 Internal Server Error");
  else header("HTTP/1.1 204 No Content");
  mysqli_close($db);
}

function deleteItem($ownerId, $itemTable, $itemId) {
  $db = dbConnect();
  $itemTableSingular = $itemTable;
  if ($itemTable === 'weapons') $itemTableSingular = 'weapon';
  $query = "DELETE FROM owner_".$itemTable." WHERE owner_id=".$ownerId." AND ".$itemTableSingular."_id=".$itemId." ";
  $deleteItem = mysqli_query($db, $query) or die (mysqli_error($db));
  if (mysqli_connect_error($deleteItem)) header("HTTP/1.1 500 Internal Server Error");
  else header("HTTP/1.1 204 No Content");
  mysqli_close($db);
}

function createItem($ownerId, $itemTable, $item) {
  $db = dbConnect();
  if ($itemTable === 'armor') return createArmor($ownerId, $item);
  elseif ($itemTable === 'weapons') return createWeapon($ownerId, $item);
  elseif ($itemTable === 'gear') return createGear($ownerId, $item);


}

function createArmor($ownerId, $item) {
  $db = dbConnect();

  if ($item['name'] === '') $item['name'] = 'Generic armor';
  if ($item['cost'] === '') $item['cost'] = 0;
  if ($item['weight'] === '') $item['weight'] = 0;
  if ($item['str'] === '') $item['str'] = NULL;
  if ($item['qty'] === '') $item['qty'] = 1;

  $query = "INSERT IGNORE INTO armor(Name, Cost, AC_Bonus, Strength, Stealth, Weight, Type) VALUES ('".$item['name']."', ".$item['cost'].", '".$item['ac']."', '".$item['str']."', '".$item['stealth']."', ".$item['weight'].", '".$item['type']."')";

  $createItem = mysqli_query($db, $query) or die (mysqli_error($db));

  if (mysqli_connect_error($createItem)) header("HTTP/1.1 500 Internal Server Error");
  else header("Status: 201 CREATED");

  $newItemId = mysqli_insert_id($db);

  $query = "INSERT IGNORE INTO owner_armor(owner_id, armor_id, Quantity) VALUES (".$ownerId.", ".$newItemId.", ".$item['qty'].")";
  $assignItem = mysqli_query($db, $query) or die (mysqli_error($db));

  if (mysqli_connect_error($assignItem)) header("HTTP/1.1 500 Internal Server Error");
  else header("Status: 201 CREATED");

  mysqli_close($db);
  return $newItemId;
}

function createWeapon($ownerId, $item) {
  $db = dbConnect();

  if ($item['name'] === '') $item['name'] = 'Generic weapon';
  if ($item['cost'] === '') $item['cost'] = 0;
  if ($item['weight'] === '') $item['weight'] = 0;
  if ($item['qty'] === '') $item['qty'] = 1;

  $query = "INSERT IGNORE INTO weapons(Name, Cost, Damage, Type, Weight) VALUES ('".$item['name']."', ".$item['cost'].", '".$item['dmg']."', '".$item['type']."', ".$item['weight'].")";

  $createItem = mysqli_query($db, $query) or die (mysqli_error($db));

  if (mysqli_connect_error($createItem)) header("HTTP/1.1 500 Internal Server Error");
  else header("Status: 201 CREATED");

  $newItemId = mysqli_insert_id($db);

  $query = "INSERT IGNORE INTO owner_weapons(owner_id, weapon_id, Quantity) VALUES (".$ownerId.", ".$newItemId.", ".$item['qty'].")";
  $assignItem = mysqli_query($db, $query) or die (mysqli_error($db));

  if (mysqli_connect_error($assignItem)) header("HTTP/1.1 500 Internal Server Error");
  else header("Status: 201 CREATED");

  mysqli_close($db);
  return $newItemId;
}

function createGear($ownerId, $item) {
  $db = dbConnect();

  if ($item['name'] === '') $item['name'] = 'Generic gear';
  if ($item['cost'] === '') $item['cost'] = 0;
  if ($item['weight'] === '') $item['weight'] = 0;
  if ($item['qty'] === '') $item['qty'] = 1;

  $query = "INSERT IGNORE INTO gear(Name, Cost, Weight) VALUES ('".$item['name']."', ".$item['cost'].", ".$item['weight'].")";

  $createItem = mysqli_query($db, $query) or die (mysqli_error($db));

  if (mysqli_connect_error($createItem)) header("HTTP/1.1 500 Internal Server Error");
  else header("Status: 201 CREATED");

  $newItemId = mysqli_insert_id($db);

  $query = "INSERT IGNORE INTO owner_gear(owner_id, gear_id, Quantity) VALUES (".$ownerId.", ".$newItemId.", ".$item['qty'].")";
  $assignItem = mysqli_query($db, $query) or die (mysqli_error($db));

  if (mysqli_connect_error($assignItem)) header("HTTP/1.1 500 Internal Server Error");
  else header("Status: 201 CREATED");

  mysqli_close($db);
  return $newItemId;
}


// function createOwner($name, $race, $class, $level) {
//   $db = dbConnect();
//   $query = "INSERT INTO owners(Name, Race, Class, Level) VALUES ('".$name."', '".$race."', '".$class."', '".$level."')";

//   $createOwner = mysqli_query($db, $query) or die (mysqli_error($db));

//   if (mysqli_connect_error($createOwner)) header("HTTP/1.1 500 Internal Server Error");
//   else header("Status: 201 CREATED");

//   $newOwnerId = mysqli_insert_id($db);
//   mysqli_close($db);
//   return $newOwnerId;
// }
?>
