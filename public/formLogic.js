var option1 = document.getElementById("option1")
var option2 = document.getElementById("option2")
var option3 = document.getElementById("option3")
var submit = document.getElementById("submit")

var form = document.getElementById("formID")

form.action= window.location.pathname

const array = [option1, option2, option3]

option1.addEventListener("click", function(){
    submit.value = option1.value
    for (i in array){
        if (array[i] == option1){
            option1.style.border="4px solid #FFFFFF";
            
        }
        else{
            array[i].style.border= "1px solid #8C8C8C";
            
        }
    }
    
});

option2.addEventListener("click", function(){
    submit.value = option2.value
    for (i in array){
        if (array[i] == option2){
            option2.style.border="4px solid #FFFFFF";
        }
        else{
            array[i].style.border= "1px solid #8C8C8C";
            
        }
    }
    
});

option3.addEventListener("click", function(){
    submit.value = option3.value
    for (i in array){
        if (array[i] == option3){
            option3.style.border="4px solid #FFFFFF";
        }
        else{
            array[i].style.border= "1px solid #8C8C8C";
        }
    }
    
});