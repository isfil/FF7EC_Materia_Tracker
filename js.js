
var icons= '<span class="material-symbols-outlined">edit</span><span class="material-symbols-outlined">remove</span><span class="material-symbols-outlined">save</span>'

$(document).ready(function() {
    var table = $('#myTable').DataTable({
    "bPaginate": false,
    "info": false,
    select: true
    });

    $('<div class="dt-buttons"><button class="dt-button buttons-create" tabindex="0" aria-controls="example" type="button"><span>New</span></button><button class="dt-button buttons-edit" tabindex="0" aria-controls="example" type="button"><span>Edit</span></button></div>').insertBefore("#myTable_filter")
    //$(".sorting").last().removeClass("sorting")
    $( ".buttons-create" ).on( "click", function() {
        create(table)
    })

    $( ".buttons-edit").on( "click", function() {
        edit(table)
    })

    
});

function create (table){
    table.row.add(["Hello","Foo","Bar","Cenas","Batata", 1,1,1,1,1,1]).draw(false)
}

function edit (table){
    $("#ex1").modal({
        fadeDuration: 100
      });

}

console.log("Hello World");
