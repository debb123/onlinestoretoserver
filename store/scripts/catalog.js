
var items = [];
var serverURL= "http://restclass.azurewebsites.net/API/";

function fetchCatalog() {

    // get items from server
    $.ajax({
        url:serverURL + "points",
        type:"GET",
        success: function(response){
            console.log("response",response);

            // solve,show only My items
            // travel response array
            // get each item on the array
            // if the item.user == "Sergio"
            // then,push item into items array

            for(var i=0; i<response.length; i++){
                var item = response[i];
                if(item.user == "Debbie"){
                    items.push(item);
                }
            }
             //for all the items to show
            //items = response;

            displayCatalog();

        },

        error:function(errorDetails){
            console.log("Error:", errorDetails);
        }
    });


    items = [
        {
            "code": "1234",
            "description": "This is the first item of the store",
            "price": 200.65,
            "image": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSgInA3npir2y4N3E_u5TEdZXo-FqKiJaYF3PVK2f5yYrmO1lHW-CTJjpSRF2UhWDKpmhb5fJLTTmbCqiDnOIEFEi9DDhTIJbsAI142P9NttJVionlXkNlhGKU&usqp=CAc",
            "category": "Accessories",
            "stock": 10,
            "deliveryDays": 2
        },
        {
            "code": "3782",
            "description": "watch",
            "price": 115.65,
            "image": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQWQtZrz-F9gCOWabTlJ1s7JFk7WJcNbRNT4Czvu-YIenWBiZqiRFWqcLGrKStMJ_wOpJY1VMU4eK4rkNiaQmCsBRqIegKyN1fRMaFwTxajk-G2q8Ecchxc&usqp=CAc",
            "category": "Accessories",
            "stock": 8,
            "deliveryDays": 2
        },
        {
            "code": "9870",
            "description": "Hoops Earings",
            "price": 310.65,
            "image": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSI5_4CsIot9B-Yc3gwrWZK9aPcbe9ZKbG2XHD4f1gnNa_Npq-zTrufioxwIXfCwuA-4T5HFHdm9hKz4WZLzB8t9mfa2nVrpSzFIUyaNnmw6rTmOem478-XfA&usqp=CAc",
            "category": "Accessories",
            "stock": 6,
            "deliveryDays": 2
        },
        {
            "code": "1234",
            "description": "Black Gloves",
            "price": 52.65,
            "image": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSgInA3npir2y4N3E_u5TEdZXo-FqKiJaYF3PVK2f5yYrmO1lHW-CTJjpSRF2UhWDKpmhb5fJLTTmbCqiDnOIEFEi9DDhTIJbsAI142P9NttJVionlXkNlhGKU&usqp=CAc",
            "category": "Accessories",
            "stock": 12,
            "deliveryDays": 2
        }
    ];
}

function displayCatalog() {
    //travel the array
    for (var i = 0; i < items.length; i++) {
        //get the item
        var item = items[i];
        //draw the item on the DOM (html)
        drawItem(item);
    }

}

function drawItem(item) {
    //create the syntax


    var sntx =
        `<div class='item'> 
            <img src='${item.image}'>
            <label class='code'>${item.code}</label> 
            <label class='cat'>${item.category}</label>

            <label class='desc'>${item.description}</label>

            <label class='price'>${item.price}</label>
            <button class='btn btn-sm btn-info'> + </button>

            </div>`;


    //get the element from the screen
    var container = $("#catalog");

    //append the syntax to the element
    container.append(sntx);
}

function search() {
   
    var text = $("#txtSearch").val().toLowerCase(); //get the text    
    //console.log(text);

    //clear previous results
    $("#catalog").html("");

    //travel the array and show only items that contains the text
    for(var i=0; i<items.length; i++){
        var item = items[i];

        //if the description contains the text, 
        //OR the category contains the text
        //OR the code is equal to the text
        //or the price is equal to the text
        //then show the item on the screen

        if(item.description.toLowerCase().includes(text)
            || item.category.toLowerCase().includes(text)
            || item.code == text
            || item.price == text
        
        ){
            drawItem(item);
        }
    }
}

function init() {
    console.log("This is the catalog page");

    //get data
    fetchCatalog();
    displayCatalog();

    //hook events
    $("#btnSearch").click(search); 
    $("#txtSearch").keypress(function (e){

        /* if(e.key == "Enter"){
            search();
        } */
       
        if(e.keyCode == 13){
            search();
        }
    });    
        
    $("#catalog").on("click", "item", function(){
        
        // $(this).toggleClass("selected");

          // get the image of the clicked element
          var img = $(this).find('img').clone();
 
          $(".modal-body").html(img);
          $("#modal").modal();
  

    });
    

}


window.onload = init;
