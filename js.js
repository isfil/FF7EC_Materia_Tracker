var data;


var fields = [
    [
        "Aero",
        "5",
        "10",
        "N/A",
        "N/A",
        "N/A",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1"
    ],
    [
        "Cura",
        "5",
        "10",
        "N/A",
        "N/A",
        "N/A",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1"
    ]
]


$(document).ready(function() {
    var table = $('#myTable').DataTable({
    "bPaginate": false,
    "info": false,
    data: fields,
    fixedHeader: true,
    select: true
    });

    $('<div class="dt-buttons"><button class="dt-button buttons-create" tabindex="0" aria-controls="example" type="button"><span>New</span></button><button class="dt-button buttons-edit hidden" tabindex="0" aria-controls="example" type="button"><span>Edit</span></button></div>').insertBefore("#myTable_filter")
    $( ".buttons-create" ).on( "click", function() {
        create(table)
    })

    $( ".buttons-edit").on( "click", function() {
        edit(table)
    })

    $(".buttons-save").on( "click", function(e) {
        e.preventDefault()
        save(table)
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
    $('#data_form').addClass("edit")
    $('#data_form').find(':input').each(function(index){
        $(this).val(data[index]);
      });
    $("#ex1").modal({
        fadeDuration: 100
    });

}

function cleanForm(){
    $('#data_form').removeClass("edit");
    $('#data_form').get(0).reset();
}

function save(table) {
    var newdata = $('#data_form').find(':input').map(function(){return $(this).val();}).get();
    if($('#data_form').hasClass('edit')){
        table.row($('#myTable .selected').index()).data(newdata).draw();
    } else {
        table.row.add(newdata).draw(false)
    }
    
    $("#ex1 .close-modal").click()
}