import pokedex from "../assets/pokemon_data.json" assert { type: "json" };
import answers from "../assets/pokemon_answers.json" assert { type: "json" };

function generate_answers_info(answers) {
  // REDO with date changes
  return pokedex[answers[date_check()]];
  // return pokedex[answers[0]];
}

var answers_info = generate_answers_info(answers);
console.log(answers[19]);

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
      already_submitted.push(filter);

      var row = table.insertRow(0);
      //row.classList.add('slideup');
      row.classList.add('submission');
      
      var name_cell = row.insertCell(-1);
      var name_text = document.createTextNode(filter);
      name_cell.style.textAlign = 'center';
      name_cell.appendChild(name_text);
      
      name_cell.classList.add('name');

      // success clause
      var answer = answers[date_check()];
      if (answer.includes(filter)) {
        var success_box = document.getElementById("success_box");
        success_box.style.display = "block";
        var num_guesses = already_submitted.length;
        var success_text = document.createTextNode("You guessed " + answer + " in " + num_guesses + " turns.");
        success_box.appendChild(success_text);
      }

      var flip_card_inner_ids = [];

      for (let i = 0; i < columns.length-1; i++) {
        var cell = row.insertCell(-1);


        var flip_card = document.createElement("div");
        flip_card.classList.add('flip-card');
        var flip_card_inner = document.createElement("div");
        flip_card_inner.classList.add('flip-card-inner');
        flip_card_inner.id = "flip_card_inner_"+ i;
        flip_card_inner_ids.push("flip_card_inner_"+ i);
        flip_card.appendChild(flip_card_inner);
        var flip_card_front = document.createElement("div");
        flip_card_front.classList.add('flip-card-front');
        // insert color of flip_card_front
        flip_card_inner.appendChild(flip_card_front);
        var flip_card_back = document.createElement("div");
        flip_card_back.classList.add('flip-card-back');
        


        var text = document.createTextNode(pokedex[filter][i]);
        flip_card_back.appendChild(text);

        flip_card_inner.appendChild(flip_card_back);

        cell.appendChild(flip_card);
        //cell.appendChild(text);
        cell.classList.add(columns[i+1]);

        var numeric_columns = [0, 3, 4, 5, 6];
        var answer_val = answers_info[i];

        var filter_val = pokedex[filter][i];
        
        if (numeric_columns.includes(i)) {
          if (filter_val < answer_val) {
            flip_card_back.classList.add('less_than');
            var up_arrow = document.createTextNode(' ↑');
            flip_card_back.appendChild(up_arrow);
          } else if (filter_val > answer_val) {
            flip_card_back.classList.add('greater_than');
            var down_arrow = document.createTextNode(' ↓');
            flip_card_back.appendChild(down_arrow);
          } else if (filter_val == answer_val){
            flip_card_back.classList.add('equal_to');
          } else {
            flip_card_back.classList.add('ERROR');
          }
        } else {
          var type_combined_answer = [answers_info[1], answers_info[2]];
          if (type_combined_answer.includes(filter_val)) {
            flip_card_back.classList.add('type_match');
          } else {
            flip_card_back.classList.add('type_no_match');
          }
          
        }
      }


      // generate flips and delays
      for (let j = 0; j < flip_card_inner_ids.length; j++) {
        setTimeout(function() {
          var flip_card_id = flip_card_inner_ids[j];
          var flip_card_inner = document.getElementById(flip_card_id);
          flip_card_inner.classList.add('flip');
        }, 300*j);
        
        
      }

      // remove from list
      var list_item_id = filter + "_li";
      document.getElementById(list_item_id).remove();

      // remove from input box
      document.getElementById("pokemon_input").value = '';

    } else {
      // ERROR: No Pokemon found
      document.getElementById("input_error").innerHTML = "Pokemon not found";
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



function date_check() {
  var date_start = 19314;
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  
  var days_counter = Math.round(Date.now()/day) - date_start;

  return days_counter;
}



export function filter_searchbox() {
  var input, filter, div, li, i, txtValue;
  input = document.getElementById("pokemon_input");
  filter = input.value.toUpperCase();
  div = document.getElementById("pokemon_list_dropdown");
  li = div.getElementsByTagName("li");

  for (i = 0; i < li.length; i++) {
    txtValue = li[i].textContent || li[i].innerText;
    if (filter.length > 0 && txtValue.toUpperCase().indexOf(filter) > -1) {
      var dropdowns = document.getElementById("pokemon_list");
      dropdowns.style.display = "block";
      li[i].style.display = "block";
    } else {
      li[i].style.display = "none";

    }
  }
}

function populate_pokemon_list() {
  var num_pokemon = Object.keys(pokedex).length;
  var pokemon_list = document.getElementById("pokemon_list");
  for (var i = 0; i < num_pokemon; i++) {
    var curr_pokemon = Object.keys(pokedex)[i];
    var list_elem = document.createElement('li');
    list_elem.classList.add('pokemon_list_item');
    var pokemon_list_id = curr_pokemon + "_li";
    list_elem.id = pokemon_list_id;
    list_elem.style.display = "none";
    list_elem.appendChild(document.createTextNode(curr_pokemon));
    pokemon_list.appendChild(list_elem);
  }
}

populate_pokemon_list();


window.onclick = function(event) {
  // Close the dropdown menu if the user clicks outside of it
  var dropdowns = document.getElementById("pokemon_list");
  var input = document.getElementById("pokemon_input");
  var filter = input.value.toUpperCase();
  if (!event.target.matches('#pokemon_input')) {
    if (dropdowns.style.display!='none' && !document.activeElement.matches('#pokemon_input')) {
      dropdowns.style.display = "none";
    } 
  } else if (filter.length > 0){
    dropdowns.style.display = "block";
  }

  // Selected pokemon from dropdown
  if (event.target.matches('.pokemon_list_item')) {
    var selected_pokemon = event.target.innerHTML;
    document.getElementById("pokemon_input").value = selected_pokemon;
  }
}