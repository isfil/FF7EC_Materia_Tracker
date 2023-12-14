
$(document).ready(function() {
    var table = $('#myTable').DataTable({
    "bPaginate": false,
    "info": false,
    select: {
        style: 'multi'
    },
    });

    $('<div class="dt-buttons"><button class="dt-button buttons-create" tabindex="0" aria-controls="example" type="button"><span>New</span></button><button class="dt-button buttons-create" tabindex="0" aria-controls="example" type="button"><span>Clear</span></button></div>').insertBefore("#myTable_filter")
    $(".sorting").last().removeClass("sorting")
});



console.log("Hello World");
