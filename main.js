
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
  }else if( selected_val == '2' ){
    $("#add_row").prop('disabled', 'disabled');
    $('#result').html('Result is - Probably ' + $('#main_' + row_id + ' option:selected').html());
  }else{
    $('#result').empty();
  }
}

