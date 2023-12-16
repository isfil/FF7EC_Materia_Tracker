var data;


$(document).ready(function() {
    var table = $('#myTable').DataTable({
    "bPaginate": false,
    "info": false,
    fixedHeader: true,
    select: true
    });

    $('<div class="dt-buttons"><button class="dt-button buttons-create" tabindex="0" aria-controls="example" type="button"><span>New</span></button><button class="dt-button buttons-edit hidden" tabindex="0" aria-controls="example" type="button"><span>Edit</span></button></div>').insertBefore("#myTable_filter")
    //$(".sorting").last().removeClass("sorting")
    $( ".buttons-create" ).on( "click", function() {
        create(table)
    })

    $( ".buttons-edit").on( "click", function() {
        edit(table)
    })

    table.on( 'select', function ( e, dt, type, indexes ) {
        if ( type === 'row' ) {
            data = dt.data();
            $('.buttons-edit').removeClass("hidden");
        }
    } );

    table.on( 'deselect', function ( e, dt, type, indexes ) {
        if ( type === 'row' ) {  
            $('.buttons-edit').addClass("hidden");
            cleanForm()
        }
    } );

    
});

function create (table){
    cleanForm()
    //table.row.add(["Hello","Foo","Bar","Cenas","Batata", 1,1,1,1,1,1]).draw(false)
    $("#ex1").modal({
        fadeDuration: 100
    });
}

function edit (table){
    $('#data_form').find(':input').each(function(index){
        $(this).val(data[index]);
      });
    $("#ex1").modal({
        fadeDuration: 100
    });

}

function cleanForm(){
    $('#data_form').get(0).reset();
}

console.log("Hello World");
