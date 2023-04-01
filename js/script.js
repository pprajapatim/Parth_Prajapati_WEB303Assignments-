let characters, aToM, nToZ;

$(document).ready(function() {
  loadJSON();
});

function loadJSON() {
  $.ajax({
    type: "GET",
    url: "Data.json",
    data: { get_param: "value" },
    dataType: "json",
    success: function(data) {
      characters = data.characters;
      processData();
    },
    error: function() {
      alert("Error loading data.");
    }
  });
}

function processData() {
  sortCharacters();
  populateTable(characters);
}

function sortCharacters() {
  characters.sort(function(a, b) {
    return a.last_name.localeCompare(b.last_name);
  });
  aToM = characters.filter(function(character) {
    return character.last_name.charAt(0).toUpperCase() >= "A" && character.last_name.charAt(0).toUpperCase() <= "M";
  });
  nToZ = characters.filter(function(character) {
    return character.last_name.charAt(0).toUpperCase() >= "N" && character.last_name.charAt(0).toUpperCase() <= "Z";
  });
  updateFilterButtons();
}

function populateTable(data) {
  let rows = "";
  $.each(data, function(key, value) {
    rows += `<tr>
              <td>${value.first_name}</td>
              <td>${value.last_name}</td>
              <td>${value.occupation}</td>
              <td>${value.age}</td>
              <td>${value.gender}</td>
            </tr>`;
  });
  $("#tableBody").empty().append(rows);
}

function updateFilterButtons() {
  $("#sortAM").text(`A-M (${aToM.length})`);
  $("#sortNZ").text(`N-Z (${nToZ.length})`);
}

$("#search").on("keyup", function() {
  const value = $(this).val().toLowerCase();
  if (value) {
    $("#tableBody tr").filter(function() {
      const $thisTr = $(this)[0];
      if ($thisTr.firstElementChild.textContent.toLowerCase().indexOf(value) > -1) {
        $($thisTr).addClass("searchMatched");
      } else {
        $($thisTr).removeClass("searchMatched");
      }
    });
  } else {
    $("#tableBody tr").removeClass("searchMatched");
  }
});

$("button").on("click", function() {
  let id = $(this).attr("id");
  if (id == "sortAM") {
    populateTable(aToM);
  } else if (id == "sortNZ") {
    populateTable(nToZ);
  } else if (id == "all") {
    populateTable(characters);
  }
});
