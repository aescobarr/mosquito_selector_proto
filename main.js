if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

function selected_sp_ids(){
  var retval = [];
  var rc = row_count();
  for(var i = 0; i < rc; i++){
    retval.push($('#main_' + (i+1)).val());
  }
  return retval;
}

function row_count(){
  return $("div[id*='row_']").length;
}

function remove_row(row_id){
  $('#row_' + row_id).remove();
  if(row_count()==0){
    $("#add_row").prop('disabled', false);
    $('#result').empty();
  }
}

function change_main(row_id){
  $('#result').empty();
  $('#second_' + row_id + ' option[value=-1]').prop('selected', true);
  var selected_val = $('#main_' + row_id).val();
  if( selected_val == '6' || selected_val == '7' ){
    $('#second_' + row_id).prop('disabled', 'disabled');
    $("#add_row").prop('disabled', 'disabled');
    $('#result').html('Result is - ' + $('#main_' + row_id + ' option:selected').html());
  }else{
    $('#second_' + row_id).prop('disabled', false);
  }
}

function change_second(row_id){
  var selected_val = $('#second_' + row_id).val();
  if( selected_val == '1' ){
    $("#add_row").prop('disabled', 'disabled');
    $('#result').html('Result is - Definitely ' + $('#main_' + row_id + ' option:selected').html());
  }else{
    $("#add_row").prop('disabled', false);
    $('#result').empty();
  }
}

function generate_row_template(exclude_ids,remove_probably){
  var especies = [
        '<option value="1">Albopictus</option>',
        '<option value="2">Aegypti</option>',
        '<option value="3">Japonicus</option>',
        '<option value="4">Japonicus or Koreicus</option>',
        '<option value="5">Koreicus</option>'
  ];
  var retval = "";
  retval += '<div id="row_{0}" class="row">';
  retval += '<div class="col-md-4">';
  retval += '<select id="main_{0}" onChange="javascript:change_main({0});">';  
  retval += '<option value="-1">...Selecciona especie...</option>';
  for(var i = 0; i < 5; i++){
    var key = i+1;
    if( exclude_ids.indexOf(key.toString()) < 0 ){
      retval += especies[i];
    }
  }
  if(exclude_ids.length == 0){
    retval += '<option value="6">Other species</option>';
    retval += '<option value="7">Non identifiable</option>';
  }
  retval += '</select>';
  retval += '</div>';
  retval += '<div class="col-md-4">';
  retval += '<select id="second_{0}" onchange="javascript:change_second({0});">';
  retval += '<option value="-1">...Selecciona certesa...</option>';
  if(remove_probably==false){
    retval += '<option value="1">Definitely</option>';
  }
  retval += '<option value="2">Probably</option>';
  retval += '</select>';
  retval += '</div>';
  retval += '<div class="col-md-4">';
  retval += '<button id="remove_{0}" onClick="javascript:remove_row({0});">X</button>';
  retval += '</div>';
  retval += '</div>';
  return retval;
}

$( document ).ready(function() {
  /*
  var row_template = 
   '<div id="row_{0}" class="row">' +
    '<div class="col-md-2">' +
      '<select id="main_{0}" onChange="javascript:change_main({0});">' +
        '<option value="-1">...Selecciona especie...</option>' +
        '<option value="1">Albopictus</option>' + 
        '<option value="2">Aegypti</option>' +
        '<option value="3">Japonicus</option>' +
        '<option value="4">Japonicus or Koreicus</option>' +
        '<option value="5">Koreicus</option>' +
        '<option value="6">Other species</option>' +
        '<option value="7">Non identifiable</option>' +
      '</select>' +
    '</div>' +
    '<div class="col-md-2">' +
      '<select id="second_{0}" onchange="javascript:change_second({0});">' +
        '<option value="-1">...Selecciona certesa...</option>' +
        '<option value="1">Definitely</option>' +
        '<option value="2">Probably</option>' +
      '</select>' +
    '</div>' +
    '<div class="col-md-2">' +
      '<button id="remove_{0}" onClick="javascript:remove_row({0});">X</button>' +
    '</div>' +
  '</div>';
  */  
  $("#add_row").click(function(){
    var index = row_count() + 1;
    var selected_ids = selected_sp_ids();
    var row_template = '';
    if(index == 1){
     row_template = generate_row_template(selected_ids,false); 
    }else{
     row_template = generate_row_template(selected_ids,true);
    }    
    $('#rowset').append(row_template.format(index));
  });

});