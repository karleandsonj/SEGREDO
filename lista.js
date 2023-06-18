$(document).ready(function() {
  $("#removerPresente").click(function() {
    var selectedValue = $("#listaPresentes").val();
    $("#listaPresentes option[value='" + selectedValue + "']").remove();
  });
});
