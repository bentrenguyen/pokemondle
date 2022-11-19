import pokedex from "../assets/pokemon_data.json" assert { type: "json" };

var answers = ['MANKEY'];

function generate_answers_info(answers) {
  // REDO with date changes
  return pokedex[answers[0]];
}

var answers_info = generate_answers_info(answers);

var table = document.getElementById("pokemon_table_body");
var input = document.getElementById("pokemon_input");

var columns = ['name', 'pokedex_number', 'type1', 'type2', 'height', 'weight', 'generation', 'total_stats']

var already_submitted = [];

export function searchbox(use_box = true, val) {
    if (!use_box) {
      filter = val;
    } else {
      var filter = input.value.toUpperCase().trim();
    }

    if (already_submitted.includes(filter)) {
      document.getElementById('input_error').innerHTML = "Pokemon already submitted";
    } else if (pokedex[filter]) {
      // Clear Error
      document.getElementById('input_error').innerHTML = '';

      // Add to already_submitted
      already_submitted += filter;

      var row = table.insertRow(-1);
      row.classList.add('slideup');
      row.classList.add('submission');
      
      var name_cell = row.insertCell(-1);
      var name_text = document.createTextNode(filter);
      name_cell.appendChild(name_text);
      name_cell.classList.add('name');

      var type_combined = [pokedex[filter][1], pokedex[filter][2]];

      for (let i = 0; i < columns.length-1; i++) {
        var cell = row.insertCell(-1);
        var text = document.createTextNode(pokedex[filter][i]);
        cell.appendChild(text);
        cell.classList.add(columns[i+1]);

        generate_class_diff(i, pokedex[filter][i], cell);
      }
    } else {
      // ERROR: No Pokemon found
      document.getElementById("input_error").innerHTML = "Pokemon not found";
    }

}

function generate_class_diff(i, filter_val, cell) {
  var numeric_columns = [0, 3, 4, 5, 6];
  var answer_val = answers_info[i];


  if (numeric_columns.includes(i)) {
    if (filter_val < answer_val) {
      cell.classList.add('less_than');
      var up_arrow = document.createTextNode(' ↑');
      cell.appendChild(up_arrow);
    } else if (filter_val > answer_val) {
      cell.classList.add('greater_than');
      var down_arrow = document.createTextNode(' ↓');
      cell.appendChild(down_arrow);
    } else if (filter_val == answer_val){
      cell.classList.add('equal_to');
    } else {
      cell.classList.add('ERROR');
    }
  } else {
    var type_combined_answer = [answers_info[1], answers_info[2]];
    if (filter_val == "None") {
    } else if (type_combined_answer.includes(filter_val)) {
      cell.classList.add('type_match');
    } else {
      cell.classList.add('type_no_match');
    }
    
  }
}

export function reset() {
  document.getElementById("pokemon_table_body").innerHTML = "";
  already_submitted = [];
  document.getElementById("input_error").innerHTML = "";
}

export function random() {
  var num_pokemon = Object.keys(pokedex).length;
  var random_num = Math.floor(Math.random() * num_pokemon);
  var random_pokemon = Object.keys(pokedex)[random_num];
  searchbox(false, random_pokemon);
}

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("submit_button").click();
    }
  });

// TODO: ERROR on misspelling, ERROR on duplicate submission, success alert, images, hints (weak to?), reset button, random button, cull whitespace on submit, 

var date_start = 19314;

function date_check() {
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  
  var days_counter = Math.round(Date.now()/day) - date_start;
}

date_check();