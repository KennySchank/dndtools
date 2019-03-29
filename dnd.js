var modalData = {
  "armor": {
    "index": "One",
    "name": "Armor",
    "th": ["Name", "Type", "Worth", "Weight (lb.)", "AC Bonus", "Min STR", "Stealth", "Qty."],
  },
  "gear": {
    "index": "Two",
    "name": "Adventuring Gear",
    "th": ["Name", "Worth", "Weight (lb.)", "Qty."],
  },
  "weapons": {
    "index": "Three",
    "name": "Weapons",
    "th": ["Name", "Damage", "Type", "Worth", "Weight (lb.)", "Qty."],
  }
};

function ucfirst(str) { return str.substr(0,1).toUpperCase()+str.substr(1); }

function urlParameterExists(queryParam) { return window.location.href.indexOf(`${queryParam}=`) > -1; }

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    var sParameterName;
    var i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
};

function getPage() {
  var thisPage = 1;
  if (urlParameterExists('page')) {
    thisPage = getUrlParameter('page');
  }
  return thisPage;
}

function buildUrlQueryString(page) {
  if (page != '') return `?page=${page}`;
  return '';
}

function renderCost(c) {
  var cost = c;
  var coin = "cp";
  if (c % 100 === 0) {
    cost = c / 100;
    coin = "gp";
  }
  else if (c % 10 === 0) {
    cost = c / 10;
    coin = "sp";
  }
  var html = `<input class="editable input-cost" type="number" name="cost" min="1" max="1000000" value="${cost}" /><select class="editable" name="coin">`;
  var coins = ["gp", "sp", "cp"];
  coins.forEach(el => {
    if (el === coin) html += `<option selected="selected">${el}</option>`;
    else html += `<option>${el}</option>`;
  });
  html += `</select`;
  return html;
}

function sortData(data, sortKey, dir='asc') {
  var d = data.sort((a, b) => {
    if (dir === 'asc') return (a[sortKey] > b[sortKey]) ? 1 : ((a[sortKey] < b[sortKey]) ? -1 : 0);
    else return (a[sortKey] < b[sortKey]) ? 1 : ((a[sortKey] > b[sortKey]) ? -1 : 0);
  });
  return data;
}

function addOwnerRow() {
  let tableRowHTML = `<tr id="newOwnerRow" class="owner" valign="middle"><th><input type="text" id="newOwnerName" placeholder="e.g. Conan" required /></th><td><input type="text" id="newOwnerRace" placeholder="e.g. Human" required /></td>
  <td><input type="text" id="newOwnerClass" placeholder="e.g. Barbarian" required /></td><td><input type="number" id="newOwnerLevel" min="1" max="20" placeholder="1" required /></td><td><button type="submit" id="saveOwnerChangesButton" class="btn btn-primary">Save</button><span><i class="fas fa-times fa-lg text-secondary"></i></span></td></tr>`;
  $('#ownerTable tr:last').after(tableRowHTML);
  $('#addOwnerButton').addClass('disabled');
  $('#addOwnerButton').unbind('click');
  $('.owner .fa-times').click((e) => {
    removeOwnerRow(e, 'addOwnerButton');
    $('#addOwnerButton').click(e => {
      addOwnerRow();
    });
  });
}

function addArmorRow(e) {
  const thisTable = $(e.target).closest('.armorBody').find('table');
  const tableRows = $(e.target).closest('.armorBody').find('table thead').length;
  let tableHTML = '';
  let newRowHTML = `<tr id="newArmorRow">
    <td><input type="text" name="name" placeholder="Chain mail" required /></td>
    <td><input class="input-armor-type" type="text" name="type" placeholder="Heavy" /></td>
    <td class="cost">
      <input class="input-cost" type="number" name="cost" min="1" max="1000000" placeholder="75" />
      <select name="coin" >
        <option selected="selected">gp</option>
        <option>sp</option>
        <option>cp</option>
      </select>
    </td>
    <td><input type="number" name="weight" min="0" max="9999" step=".25" placeholder="55" required /></td>
    <td><input type="text" name="ac" placeholder="16" required /></td>
    <td><input type="number" name="str" min="0" max="20" placeholder="13"/></td>
    <td><input type="text" name="stealth" placeholder="Disadvantage" /></td>
    <td><input class="input-qty" type="number" name="qty" placeholder="1" required /></td>
    <td><i class="fas fa-times fa-lg text-secondary"></i></td>
  </tr>`;
  if (tableRows == 0) {
    tableHTML += `<thead class="thead-light"><tr><th>Name</th><th>Type</th><th>Worth</th><th>Weight (lb.)</th><th>AC Bonus</th><th>Min STR</th><th>Stealth</th><th>Qty.</th><th></th></tr></thead><tbody>${newRowHTML}</tbody>`;
  }
  else tableHTML += newRowHTML;
  $(thisTable).append(tableHTML);
  $(e.target).addClass('disabled');
  $(e.target).closest('footer').find('.saveItemButton').removeClass('disabled');
  $(e.target).closest('.card-body').find('.no-rows').addClass('invisible');
  $(thisTable).find('.fa-times').click((e) => {
    removeInventoryRow(e);
  });
}

function addWeaponRow(e) {
  const thisTable = $(e.target).closest('.card-body').find('.table[data-inventory-category="weapons"]');
  const tableRows = $(thisTable).find('tbody').length;
  let tableHTML = '';
  let newRowHTML = `<tr id="newWeaponRow">
  <td><input type="text" name="name" placeholder="Club" required /></td>
  <td><input type="text" name="dmg" placeholder="1d4"/></td>
  <td><input class="input-weapon-type" type="text" name="type" placeholder="bludgeoning" /></td>
  <td class="cost">
  <input class="input-cost" type="number" name="cost" min="1" max="1000000" placeholder="1" required />
  <select name="coin">
  <option>gp</option>
  <option selected="selected">sp</option>
  <option>cp</option>
  </select>
  </td>
  <td><input type="number" name="weight" min="0" max="9999" step=".25" placeholder="2" required /></td>
  <td><input class="input-qty" type="number" name="qty" placeholder="1" required /></td>
  <td><i class="fas fa-times fa-lg text-secondary"></i></td>
  </tr>`;
  if (tableRows == 0) {
    $(e.target).closest('.card-Body').find('p').remove();
    tableHTML += `<thead class="thead-light"><tr><th>Name</th><th>Damage</th><th>Type</th><th>Worth</th><th>Weight (lb.)</th><th>Qty.</th><th></th></tr></thead><tbody>${newRowHTML}</tbody>`;
  }
  else tableHTML += newRowHTML;
  $(thisTable).append(tableHTML);
  $(e.target).addClass('disabled');
  $(e.target).closest('footer').find('.saveItemButton').removeClass('disabled');
  $(e.target).closest('.card-body').find('.no-rows').addClass('invisible');
  $(thisTable).find('.fa-times').click((e) => {
    removeInventoryRow(e);
  });
}

function addGearRow(e) {
  const thisTable = $(e.target).closest('.gearBody').find('table');
  const tableRows = $(e.target).closest('.gearBody').find('table thead').length;
  let tableHTML = '';
  let newRowHTML = `<tr id="newGearRow">
  <td><input type="text" name="name" placeholder="Backpack" required /></td>
  <td class="cost">
    <input class="input-cost" type="number" name="cost" min="1" max="1000000" placeholder="2" required />
    <select name="coin">
    <option selected="selected">gp</option>
    <option>sp</option>
    <option>cp</option>
    </select>
  </td>
  <td><input type="number" name="weight" min="0" max="9999" step=".25" placeholder="5" required /></td>
  <td><input class="input-qty" type="number" name="qty" placeholder="1" required /></td>
  <td><i class="fas fa-times fa-lg text-secondary"></i></td>
  </tr>`;
  if (tableRows == 0) {
    $(e.target).closest('.gearBody').find('p').remove();
    tableHTML += `<thead class="thead-light"><tr><th>Name</th><th>Worth</th><th>Weight (lb.)</th><th>Qty.</th><th></th></tr></thead><tbody>${newRowHTML}</tbody>`;
  }
  else tableHTML += newRowHTML;
  $(thisTable).append(tableHTML);
  $(e.target).addClass('disabled');
  $(e.target).closest('footer').find('.saveItemButton').removeClass('disabled');
  $(e.target).closest('.card-body').find('.no-rows').addClass('invisible');
  $(thisTable).find('.fa-times').click((e) => {
    removeInventoryRow(e);
  });
}

function removeOwnerRow(e, id) {
  e.target.closest('tr').remove();
  $('#' + id).removeClass('disabled');
}

function removeInventoryRow(e) {
  const cardBody = $(e.target).closest('.card-body');
  const table = $(e.target).closest('table');
  cardBody.find('.disabled').removeClass('disabled');
  cardBody.find('.saveItemButton').addClass('disabled');
  table.find('tr:last').remove();
  if (table.find('tbody tr').length == 0) {
    table.find('thead').remove();
    cardBody.find('.no-rows').removeClass('invisible');
  }
}

function resetFilters() {
  $('input[name="name"]').val('');
  $('input[name="race"]').val('');
  $('input[name="class"]').val('');
  $('input[name="level"]').val('');
}

function createOwnerTable(ownerDataStr, page=1, sortKey='', sortDir='asc', filterObj='') {
  var thisPage = page;
  var backPage = thisPage - 1;
  var nextPage = thisPage + 1;
  var backPageStyle = '';
  if (thisPage === 1) backPageStyle = 'disabled';
  var orderBy = 'Name';
  var owners = JSON.parse(ownerDataStr);

  // Filter data
  owners = owners.filter(ownerObj => {
    var nameExistsInFilterObj = Boolean('name' in filterObj);
    var raceExistsInFilterObj = Boolean('race' in filterObj);
    var classExistsInFilterObj = Boolean('class' in filterObj);
    var levelExistsInFilterObj = Boolean('level' in filterObj);

    var nameMatch = Boolean(!nameExistsInFilterObj || ownerObj['name'].toLowerCase().startsWith(filterObj['name'].toLowerCase()));
    var raceMatch = Boolean(!raceExistsInFilterObj || ownerObj['race'].toLowerCase().startsWith(filterObj['race'].toLowerCase()));
    var classMatch = Boolean(!classExistsInFilterObj || ownerObj['class'].toLowerCase().startsWith(filterObj['class'].toLowerCase()));
    var levelMatch = Boolean(!levelExistsInFilterObj || ownerObj['level'] == filterObj['level']);
    return nameMatch && raceMatch && classMatch && levelMatch;
  });


  // Sort data
  if (sortKey !== '') owners = sortData(owners, sortKey, sortDir);
  else owners = sortData(owners, 'name');

  var newOrderDir = 'asc';
  var faArrowSuffix;
  var orderDir = sortDir;
  if (orderDir === 'asc') {
    newOrderDir = 'desc';
    faArrowSuffix = '-up';
  }
  else if (orderDir === 'desc') {
    newOrderDir = 'asc';
    faArrowSuffix = '-down';
  }

  var html = '<div id="ownerTableWrapper"><form><table id="ownerTable" class="table"><thead class="thead-dark"><tr>';
  var columns = ["name", "race", "class", "level"];
  columns.forEach((el) => {
    var symbolHTML = `<i class="fas fa-sort" data-sort-key="${el}"></i>`;
    if (sortKey == el) {
      symbolHTML = `<i class="fas fa-sort${faArrowSuffix}" data-sort-key="${el}"></i>`;
    }
    html += `<th><a class="sort" data-sort-key="${el}">${ucfirst(el)} ${symbolHTML}</a></th>`;
  });
  html += '<th></th></tr></thead><tbody>';

  const ownersPerPage = 3;

  for (var i = ownersPerPage * (thisPage - 1); i < ownersPerPage * thisPage && i < owners.length; i++) {
    html += `<tr class="owner" valign="middle" data-owner-id="${owners[i]['id']}">
    <th><input type="text" class="editable" name="ownerName" value="${owners[i]['name']}" /></th>
    <td><input type="text" class="editable" name="ownerRace" value="${owners[i]['race']}" /></td>
    <td><input type="text" class="editable" name="ownerClass" value="${owners[i]['class']}" /></td>
    <td><input type="number" class="editable" min="1" max="20" name="ownerLevel" value="${owners[i]['level']}" /></td>
    <td><button type="button" class="btn btn-danger" data-toggle="modal" data-target="#owner${owners[i]['id']}Inventory" data-owner-id="${owners[i]['id']}">Inventory</button>
      <span class="deleteOwner"><i class="fas fa-trash-alt fa-lg text-secondary"></i></span></td>
    </tr>`;
  }

  html += '</tbody></table></form>';
  html += `<footer><a id="addOwnerButton" class="btn btn-secondary">Add Owner</a></footer></div>
          <nav>
            <ul class="pagination justify-content-center">
              <li class="page-item ${backPageStyle}" id="pag-back">
                <a class="page-link paginate" data-page="${backPage}">&lt;<span class="sr-only">Previous</span>
                </a>
              </li>`;
  var j = 1;
  for (var i = 0; i < owners.length; i += ownersPerPage, j++) {
    var style = '';
    if (thisPage == j) style = 'active';
    html += `<li class="page-item ${style}" id="pag-${j}"><a class="page-link paginate" data-page="${j}">${j}</a></li>`;
  }

  var nextPageStyle = '';
  if (thisPage == j - 1) nextPageStyle = 'disabled';
  html += `   <li class="page-item ${nextPageStyle}" id="pag-next">
                <a class="page-link paginate" data-page="${nextPage}">&gt;<span class="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>`;

  $('#owners').html(html);
  $('#modals').html('');
  for (var i = ownersPerPage * (thisPage - 1); i < ownersPerPage * thisPage && i < owners.length; i++) {
    renderModal(owners[i]['id']);
  }
}

function renderOwnersTable(page=1, sortKey='name', sortDir='asc', filters={}) {
  $(document).ready(() => {
    $.get('api/v1/owners', response => {
      createOwnerTable(response, page, sortKey, sortDir, filters);
      $('.deleteOwner').click(e => deleteOwner(e));
      $('.owner .editable').change(e => updateOwner(e));
      $('#addOwnerButton').click(() => addOwnerRow());
      $('body').off('click', '#saveOwnerChangesButton', addOwner);
      $('body').on('click', '#saveOwnerChangesButton', addOwner);
      $('body').off('click', '.paginate');
      $('body').on('click', '.paginate', e => {
        renderOwnersTable($(e.target).data('page'), sortKey, sortDir);
      });
      $('body').off('click', '.sort');
      $('body').on('click', '.sort', e => {
        var newSortDir = '';
        if (sortDir === 'asc') newSortDir = 'desc';
        else if (sortDir === 'desc') newSortDir = 'asc';
        renderOwnersTable(page, $(e.target).data('sort-key'), newSortDir);
      });
      renderFilters(filters);
      $('body').off('click', '#clearFilters');
      $('body').on('click', '#clearFilters', () => {
        renderOwnersTable(page, sortKey, sortDir, {});
      });
      $('body').off('click', '#applyFilters');
      $('body').on('click', '#applyFilters', () => {
        var nameFilter = $('#filters input[name="name"]')[0].value;
        var raceFilter = $('#filters input[name="race"]')[0].value;
        var classFilter = $('#filters input[name="class"]')[0].value;
        var levelFilter = $('#filters input[name="level"]')[0].value;
        var filterObj = {};
        if (nameFilter !== '') filterObj['name'] = nameFilter;
        if (raceFilter !== '') filterObj['race'] = raceFilter;
        if (classFilter !== '') filterObj['class'] = classFilter;
        if (levelFilter !== '') filterObj['level'] = levelFilter;
        renderOwnersTable(page, sortKey, sortDir, filterObj);
      });
    });
  });
}

function addOwner(e) {
  e.preventDefault();
  var payload = {
    'name': ucfirst($('#newOwnerName')[0].value),
    'race': ucfirst($('#newOwnerRace')[0].value),
    'class': ucfirst($('#newOwnerClass')[0].value),
    'level': $('#newOwnerLevel')[0].value
  };
  $.post('api/v1/owners/', payload);
  renderOwnersTable();
}

function updateInventoryWeight(ownerId) {
  $.get(`api/v1/owners/index.php/${ownerId}`, response => {
    var owner = JSON.parse(response);
    $(`#owner${ownerId}Inventory .total-weight`).html(`Total Weight: ${owner["inventoryWeight"]} lb.`);
  });
}

function addArmor(e) {
  e.preventDefault();
  var payload = {
    'name': $('#newArmorRow [name="name"]')[0].value,
    'type': $('#newArmorRow [name="type"]')[0].value,
    'cost': calculateCost($('#newArmorRow [name="cost"]')[0].value, $('#newArmorRow [name="coin"]')[0].value),
    'weight': $('#newArmorRow [name="weight"]')[0].value,
    'ac': $('#newArmorRow [name="ac"]')[0].value,
    'str': $('#newArmorRow [name="str"]')[0].value,
    'stealth': $('#newArmorRow [name="stealth"]')[0].value,
    'qty': $('#newArmorRow [name="qty"]')[0].value,
  };
  var table = $(e.target).closest('.card-body').find('.table');
  var ownerId = $(table).data('owner-id');
  var ownerName = $(`#modalOwnerName${ownerId}`);
  $.when(
    $.post(`api/v1/owners/index.php/${ownerId}/armor`, payload)
  ).then(() => {
    $.when(
      $.get(`api/v1/owners/index.php/${ownerId}/armor`)
    ).then(response => {
      table.html(renderModalTable(ownerId, ownerName, 'armor', JSON.parse(response)));
      $('.deleteItemButton').click(e => deleteItem(e));
      $(e.target).closest('footer').find('.addItemButton').removeClass('disabled');
      $(e.target).addClass('disabled');
    });
  });
}

function addWeapon(e) {
  e.preventDefault();
  var payload = {
    'name': $('#newWeaponRow [name="name"]')[0].value,
    'dmg': $('#newWeaponRow [name="dmg"]')[0].value,
    'type': $('#newWeaponRow [name="type"]')[0].value,
    'cost': calculateCost($('#newWeaponRow [name="cost"]')[0].value, $('#newWeaponRow [name="coin"]')[0].value),
    'weight': $('#newWeaponRow [name="weight"]')[0].value,
    'qty': $('#newWeaponRow [name="qty"]')[0].value,
  };
  var table = $(e.target).closest('.card-body').find('.table');
  var ownerId = $(table).data('owner-id');
  var ownerName = $(`#modalOwnerName${ownerId}`);
  $.when(
    $.post(`api/v1/owners/index.php/${ownerId}/weapons`, payload)
  ).then(() => {
    $.when(
      $.get(`api/v1/owners/index.php/${ownerId}/weapons`)
    ).then((response) => {
      table.html(renderModalTable(ownerId, ownerName, 'weapons', JSON.parse(response)));
      $('.deleteItemButton').click(e => deleteItem(e));
      $(e.target).closest('footer').find('.addItemButton').removeClass('disabled');
      $(e.target).addClass('disabled');
    });
  });
}

function addGear(e) {
  e.preventDefault();
  var payload = {
    'name': $('#newGearRow [name="name"]')[0].value,
    'cost': calculateCost($('#newGearRow [name="cost"]')[0].value, $('#newGearRow [name="coin"]')[0].value),
    'weight': $('#newGearRow [name="weight"]')[0].value,
    'qty': $('#newGearRow [name="qty"]')[0].value,
  };
  var table = $(e.target).closest('.card-body').find('.table');
  var ownerId = $(table).data('owner-id');
  var ownerName = $(`#modalOwnerName${ownerId}`);
  $.when(
    $.post(`api/v1/owners/index.php/${ownerId}/gear`, payload)
  ).then(() => {
    $.when(
      $.get(`api/v1/owners/index.php/${ownerId}/gear`)
    ).then((response) => {
      table.html(renderModalTable(ownerId, ownerName, 'gear', JSON.parse(response)));
      $('.deleteItemButton').click(e => deleteItem(e));
      $(e.target).closest('footer').find('.addItemButton').removeClass('disabled');
      $(e.target).addClass('disabled');
    });
  });
}

function updateOwner(e) {
  var thisOwner = $(e.target);
  var updatedOwnerId = thisOwner.closest('.owner').data('ownerId');
  var payload = {};
  payload[`updated${ucfirst(thisOwner[0].name)}`] = thisOwner[0].value;

  $.ajax({
    url: `api/v1/owners/index.php/${updatedOwnerId}`,
    type: 'PUT',
    data: payload
  });
}

function deleteOwner(e) {
  var ownerId = $(e.target).closest('.owner').data('owner-id');
  $.ajax({
    url: `api/v1/owners/index.php/${ownerId}`,
    type: 'DELETE'
  }).done(() => {
    renderOwnersTable();
  });
}

function calculateCost(cost, coin) {
  var multiplier = 1;
  if (coin === 'sp') multiplier = 10;
  else if (coin === 'gp') multiplier = 100;
  return cost * multiplier;
}

function updateItem(e, ownerId) {
  var thisItem = $(e.target);
  var parentTable = thisItem.closest('.table');
  var ownerId = parentTable.data("ownerId");
  var inventoryCategory = parentTable.data("inventoryCategory");
  var itemId = thisItem.closest('tr.inventoryItem').data('id');
  var payload = { };
  if (thisItem[0].name === 'coin') {
    payload['cost'] = calculateCost($(thisItem).closest('td.cost').find('[name="cost"]')[0].value, thisItem[0].value).toString();
  }
  else if (thisItem[0].name === 'cost') {
    payload['cost'] = calculateCost(thisItem[0].value, $(thisItem).closest('td.cost').find('[name="coin"]')[0].value).toString();
  }
  else payload[thisItem[0].name] = thisItem[0].value;
  $.when(
    $.ajax({
      url: `api/v1/owners/index.php/${ownerId}/${inventoryCategory}/${itemId}`,
      type: 'PUT',
      data: payload
    })
  ).then((e) => {
    updateInventoryWeight(ownerId);
  });
}

function deleteItem(e) {
  var ownerId = $(e.target).closest('.table[data-owner-id]').data('owner-id');
  var itemCategory = $(e.target).closest('.table[data-inventory-category]').data('inventory-category');
  var itemId = $(e.target).closest('.inventoryItem[data-id]').data('id');
  var table = $(e.target).closest('.table');
  var ownerName = $(e.target).closest('.modal-content').find('.modal-title').text();
  var itemObjs = {};
  $.when(
    $.ajax({
      url: `api/v1/owners/index.php/${ownerId}/${itemCategory}/${itemId}`,
      type: 'DELETE'
    })
  ).then(() => {
    $.when(
      $.get(`api/v1/owners/index.php/${ownerId}/${itemCategory}`, response => { itemObjs = JSON.parse(response) })
    ).then(() => {
      table.html(renderModalTable(ownerId, ownerName, itemCategory, itemObjs));
      $('.deleteItemButton').click(e => deleteItem(e));
    });
  });
}

function renderModalTable(ownerId, ownerName, tableName, itemObjs) {
  var html = '';
  if (itemObjs.length > 0) {
    if (tableName === 'armor') html += `<thead class="thead-light"><tr><th>Name</th><th>Type</th><th>Worth</th><th>Weight (lb.)</th><th>AC Bonus</th><th>Min STR</th><th>Stealth</th><th>Qty.</th><th></th></tr></thead><tbody>`;
    else if (tableName === 'gear') html += `<thead class="thead-light"><tr><th>Name</th><th>Worth</th><th>Weight (lb.)</th><th>Qty.</th><th></th></tr></thead><tbody>`;
    else if (tableName === 'weapons') html += `<thead class="thead-light"><tr><th>Name</th><th>Damage</th><th>Type</th><th>Worth</th><th>Weight (lb.)</th><th>Qty.</th><th></th></tr></thead><tbody>`;
    itemObjs.forEach(el => {
      if (tableName === 'armor') html += `<tr class="inventoryItem" data-id="${el["id"]}">
                              <td><input class="editable" type="text" name="name" value="${ucfirst(el["name"])}" /></td>
                              <td><input class="editable input-armor-type" type="text" name="type" value="${ucfirst(el["type"])}" /></td>
                              <td class="cost">${renderCost(el["cost"])}</td>
                              <td><input class="editable" type="number" name="weight" min="0" max="9999" step=".25" value="${el["weight"]}" /></td>
                              <td><input class="editable" type="text" name="ac" value="${el["ac"]}" /></td>
                              <td><input class="editable" type="number" name="str" min="0" max="20" value="${el["strength"]}" /></td>
                              <td><input class="editable" type="text" name="stealth" value="${ucfirst(el["stealth"])}" /></td>
                              <td><input class="editable input-qty" type="number" name="qty" value="${el["quantity"]}" /></td>
                              <td><span class="deleteItemButton"><i class="fas fa-trash-alt fa-lg text-secondary"></i></span></td>
                            </tr>
                          `;
      else if (tableName === 'gear') html += `<tr class="inventoryItem" data-id="${el["id"]}">
          <td><input class="editable" type="text" name="name" value="${ucfirst(el["name"])}" /></td>
          <td class="cost">${renderCost(el["cost"])}</td>
          <td><input class="editable" type="number" name="weight" min="0" max="9999" step=".25" value="${el["weight"]}" /></td>
          <td><input class="editable input-qty" type="number" name="qty" value="${el["quantity"]}" /></td>
          <td><span class="deleteItemButton"><i class="fas fa-trash-alt fa-lg text-secondary"></i></span></td>
          </tr>`;
      else if (tableName === 'weapons') html += `<tr class="inventoryItem" data-id="${el["id"]}">
          <td><input class="editable" type="text" name="name" value="${ucfirst(el["name"])}" /></td>
          <td><input class="editable" type="text" name="dmg" value="${el["damage"]}" /></td>
          <td><input class="editable" type="text" name="type" value="${ucfirst(el["type"])}" /></td>
          <td class="cost">${renderCost(el["cost"])}</td>
          <td><input class="editable" type="number" name="weight" min="0" max="9999" step=".25" value="${el["weight"]}" /></td>
          <td><input class="editable input-qty" type="number" name="qty" value="${el["quantity"]}" /></td>
          <td><span class="deleteItemButton"><i class="fas fa-trash-alt fa-lg text-secondary"></i></span></td>
          </tr>`;
    });
    html += `</tbody>`;
  }
  else {
    if (tableName === 'armor') html += `<p class="no-rows">${ownerName} doesn't have any armor.</p>`;
    else if (tableName === 'gear') html += `<p class="no-rows">${ownerName} doesn't have any gear.</p>`;
    else if (tableName === 'weapons') html += `<p class="no-rows">${ownerName} doesn't have any weapons.</p>`;
  }
  updateInventoryWeight(ownerId);
  return html;
}


function renderModal(ownerId) {
  var owner = {};
  var armor = {};
  var gear = {};
  var weapons = {};
  $.when(
    $.get(`api/v1/owners/index.php/${ownerId}`, response => { owner = JSON.parse(response) }),
    $.get(`api/v1/owners/index.php/${ownerId}/armor`, response => { armor = JSON.parse(response) }),
    $.get(`api/v1/owners/index.php/${ownerId}/gear`, response => { gear = JSON.parse(response) }),
    $.get(`api/v1/owners/index.php/${ownerId}/weapons`, response => { weapons = JSON.parse(response) }),
  ).then(() => {
    var html = `<div class="modal modal-wide fade" id="owner${ownerId}Inventory" data-owner-id="${ownerId}" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalOwnerName${ownerId}">${owner["name"]}</h5>
              <div>
                <span class="total-weight">Total Weight: ${owner["inventoryWeight"]} lb.</span>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
            <div class="modal-body">`;

    // Build armor section
    html += ` <div class="accordion" id="armorAccordion">
                <div class="card">
                  <div class="card-header" id="armorHeading" data-toggle="collapse" data-target=".armorCollapse">
                    <h5 class="mb-0">Armor</h5>
                  </div>
                  <div class="collapse armorCollapse" data-parent="#armorAccordion">
                    <div class="card-body armorBody">
                      <p class="no-rows"></p>
                      <table class="table" data-owner-id="${owner['id']}" data-inventory-category="armor">`;
    html += renderModalTable(owner['id'], owner['name'], 'armor', armor);
    html += `         </table>
                      <footer>
                        <a class="btn btn-secondary addItemButton addArmorButton">Add Armor</a>
                        <a class="btn btn-primary saveItemButton saveArmorChangesButton disabled">Save Changes</a>
                      </footer>
                    </div>
                  </div>
                </div>
              </div>`;

    // Build weapons section
    html += `<div class="accordion" id="weaponsAccordion">
        <div class="card">
        <div class="card-header" id="weaponsHeading" data-toggle="collapse" data-target=".weaponsCollapse">
        <h5 class="mb-0">Weapons</h5>
        </div>
        <div class="collapse weaponsCollapse" data-parent="#weaponsAccordion">
        <div class="card-body weaponsBody">
        <table class="table" data-owner-id="${owner['id']}" data-inventory-category="weapons">`;
    html += renderModalTable(owner['id'], owner["name"], 'weapons', weapons);
    html += `</table><footer>
            <a class="btn btn-secondary addItemButton addWeaponButton">Add Weapon</a>
            <a class="btn btn-primary saveItemButton saveWeaponChangesButton disabled">Save Changes</a>
          </footer>
        </div>
      </div>
    </div>`;

    // Build gear section
    html += `
        <div class="accordion" id="gearAccordion">
        <div class="card">
        <div class="card-header" id="gearHeading" data-toggle="collapse" data-target=".gearCollapse">
        <h5 class="mb-0">Adventuring Gear</h5>
        </div>
        <div class="collapse gearCollapse" data-parent="#gearAccordion">
        <div class="card-body gearBody"><table class="table" data-owner-id="${owner['id']}" data-inventory-category="gear">`;
    html += renderModalTable(owner['id'], owner["name"], 'gear', gear);
    html += `</table><footer>
            <a class="btn btn-secondary addItemButton addGearButton">Add Gear</a>
            <a class="btn btn-primary saveItemButton saveGearChangesButton disabled">Save Changes</a>
          </footer>
        </div>
      </div>
    </div>`;

    html += `</div></div></div></div></div>`;
    $.when(
      $('#modals').append(html)
    ).then(() => {
      $(`.table[data-owner-id="${ownerId}"] .inventoryItem .editable`).change(e => {
        updateItem(e, ownerId);
      });
      $('body').off('click', `.modal[data-owner-id="${ownerId}"] .addArmorButton`, addArmorRow);
      $('body').on('click', `.modal[data-owner-id="${ownerId}"] .addArmorButton`, addArmorRow);
      $('body').on('click', `.modal[data-owner-id="${ownerId}"] .saveArmorChangesButton`, addArmor);
      $('body').off('click', `.modal[data-owner-id="${ownerId}"] .addWeaponButton`, addWeaponRow);
      $('body').on('click', `.modal[data-owner-id="${ownerId}"] .addWeaponButton`, addWeaponRow);
      $('body').on('click', `.modal[data-owner-id="${ownerId}"] .saveWeaponChangesButton`, addWeapon);
      $('body').off('click', `.modal[data-owner-id="${ownerId}"] .addGearButton`, addGearRow);
      $('body').on('click', `.modal[data-owner-id="${ownerId}"] .addGearButton`, addGearRow);
      $('body').on('click', `.modal[data-owner-id="${ownerId}"] .saveGearChangesButton`, addGear);
      $('.deleteItemButton').click(e => deleteItem(e));
    });
  });
}

function renderFilters(filterObj) {
  $('#filters').html(`
        <div class="form-row">
          <div class="form-group col">
            <label for="name">Name</label>
            <input type="text" class="form-control" name="name" value="${('name' in filterObj) ? filterObj['name'] : ''}" />
          </div>
          <div class="form-group col">
            <label for="race">Race</label>
            <input type="text" class="form-control" name="race" value="${('race' in filterObj) ? filterObj['race'] : ''}" />
          </div>
          <div class="form-group col">
            <label for="class">Class</label>
            <input type="text" class="form-control" name="class" value="${('class' in filterObj) ? filterObj['class'] : ''}" />
          </div>
          <div class="form-group col">
            <label for="level">Level</label>
            <input type="number" class="form-control" name="level" value="${('level' in filterObj) ? filterObj['level'] : ''}" />
          </div>
          <div class="form-group form-button">
            <button type="submit" class="btn btn-primary" id="applyFilters">Filter</button>
          </div>
          <div class="form-group form-button">
            <button class="btn btn-secondary" id="clearFilters">Clear All</button>
          </div>
        </div>`);
}

function sortOwners(sortKey, sortDir='asc') {
  renderOwnersTable(sortKey, sortDir);
}

(function () {
  $(document).ready(() => {
    renderOwnersTable();
    $('#openFilterOptions').click(() => { $('#owners').toggleClass('visible');});
    $('#clearFilters').click(() => resetFilters());
    $('.deleteOwner').click(e => deleteOwner(e));
    $('.owner .editable').change(e => updateOwner(e));
  });
}());
