var data;

$(document).ready(function() {
    var table = $('#myTable').DataTable({
    "bPaginate": false,
    "info": false,
    data: JSON.parse(localStorage.getItem('data')),
    fixedHeader: true,
    select: true
    });

    $('<div class="dt-buttons crud_buttons"><button class="dt-button buttons-create" tabindex="0" aria-controls="example" type="button"><span>New</span></button><button class="dt-button buttons-edit hidden" tabindex="0" aria-controls="example" type="button"><span>Edit</span></button><button class="dt-button buttons-remove hidden" tabindex="0" aria-controls="example" type="button"><span>Delete</span></button></div>').insertBefore("#myTable_filter")
    $( ".buttons-create" ).on( "click", function() {
        create(table)
    })

    $( ".buttons-edit").on( "click", function() {
        edit(table)
    })

    $( ".buttons-remove").on( "click", function() {
        remove(table);
    })

    $(".buttons-save").on( "click", function(e) {
        e.preventDefault()
        save(table)
    })

    $(".buttons-import").on( "click", function(e) {
        e.preventDefault()
        $('#import_file').click();
    })

    $('#import_file').change(function(){
        var jsonFile = this.files[0];

        var reader = new FileReader();
        reader.onload = function() {
            var fileContent = JSON.parse(reader.result);
            if(isJsonValid(fileContent)){
                table.clear().rows.add(fileContent).draw();
                localStorage.setItem("data", JSON.stringify(table.rows().data().toArray()));      
            }
        };
        reader.readAsText(jsonFile);
    });

    $(".buttons-export").on( "click", function() {
        var json = JSON.stringify(table.rows().data().toArray());
        var blob = new Blob([json], { type: 'application/json' });
    
        var url = URL.createObjectURL(blob);
    
        var link = document.createElement('a');
        link.setAttribute('download', "data.json");
    
        link.href = url;
    
        document.body.appendChild(link);
        link.click();
    
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    })

    table.on( 'select', function ( e, dt, type, indexes ) {
        if ( type === 'row' ) {
            data = dt.data();
            $('.buttons-create').addClass("hidden")
            $('.buttons-edit').removeClass("hidden")
            $('.buttons-remove').removeClass("hidden");
        }
    } );

    table.on( 'deselect', function ( e, dt, type, indexes ) {
        if ( type === 'row' ) { 
            $('.buttons-create').removeClass("hidden"); 
            $('.buttons-edit').addClass("hidden");
            $('.buttons-remove').addClass("hidden");
            cleanForm()
        }
    } );

    
});

function isJsonValid(json) {
    json.every(element => {
        if(element.length !== 12) {
            return false
        } 
    });
    return true;
}

function create (table){
    cleanForm()
    $("#dialog").modal({
        fadeDuration: 100
    });
}

function edit (table){
    $('#data_form').addClass("edit")
    $('#data_form').find(':input').each(function(index){
        $(this).val(data[index]);
      });
    $("#dialog").modal({
        fadeDuration: 100
    });

}

function remove(table){
    table.rows( '.selected' ).remove().draw();
    localStorage.setItem("data", JSON.stringify(table.rows().data().toArray()));
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
    
    localStorage.setItem("data", JSON.stringify(table.rows().data().toArray()));
    
    $("#dialog .close-modal").click()
}