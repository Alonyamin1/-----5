var str="";
for(var i=1;i<38;i++){
    str+='<input onclick="check_primary(this)" class="check_me" type="button" name="primary_'+i+'" value="'+i+'">';
}

document.querySelector("#buttons > .primary").innerHTML=str;

var str="";
for(var i=1;i<8;i++){
    str+='<input onclick="check_secondary(this)" class="check_me" type="button" name="secondary_'+i+'" value="'+i+'">';
}
document.querySelector("#buttons>.secondary").innerHTML=str;

function get_primary_nodes(){
    let primaryDiv = document.querySelector('.primary');
    let primaryButtons = primaryDiv.querySelectorAll('input');
    let primaryButtonsArray = Array.from(primaryButtons);
    return primaryButtonsArray;
}

let primaryButtonsArray= get_primary_nodes();

function get_secondary_nodes(){
    let secondaryDiv = document.querySelector('.secondary');
    let secondaryButtons = secondaryDiv.querySelectorAll('input');
    let secondaryButtonsArray = Array.from(secondaryButtons);
    return secondaryButtonsArray;
}

let secondaryButtonsArray= get_secondary_nodes();

console.log(secondaryButtonsArray)
console.log(primaryButtonsArray)

function check_primary(b){
    let count_checked_buttons=0;
    
    primaryButtonsArray.forEach(element => {
        if(element.style.backgroundColor=="orange"){count_checked_buttons++}
    });
    if(count_checked_buttons>=6 && b.style.backgroundColor!="orange"){
         return;
        
    }
    
        if(b.style.backgroundColor=="orange")
            {
                b.removeAttribute('style');
            }
        else{
            b.style.backgroundColor="orange";
        }
    }

function updateBalance(win=0){
    let balance= document.getElementById('text_balance').value;
    balance=balance.replace(/\₪/g,'');
    balance-=300;
    balance+=win;
    document.getElementById('text_balance').value= balance+'₪';
    if (win===0) {
        loser();
    } else {
        winner();
    }
}

// function updateStats(primary_count,strong_count){
//     let stats = document.getElementById('stats');
//     stats.innerText = primary_count + " numbers and " + strong_count + " strong";
// }

function check_secondary(b){
let count_checked_buttons=0;

secondaryButtonsArray.forEach(element => {
    if(element.style.backgroundColor=="orange"){count_checked_buttons++}
});
if(count_checked_buttons>=1 && b.style.backgroundColor!="orange"){
     return;
    
}

    if(b.style.backgroundColor=="orange")
        {
            b.removeAttribute('style');
        }
    else{
        b.style.backgroundColor="orange";
    }
}

function generateRandomNumbers(){
    if(is_valid()){
        var primary_numbers=[];
        var secondary_numbers=[];

        min=1;
        primary_max=37;
        secondary_max=7;

        while (primary_numbers.length < 6) {
            let randomNumber = Math.floor(Math.random() * (primary_max - min + 1)) + min;
            if (!primary_numbers.includes(randomNumber)) {
                primary_numbers.push(randomNumber);
            }
        }
        secondary_numbers.push(Math.floor(Math.random()*(secondary_max-min+1)+min));
        check_winnings(primary_numbers,secondary_numbers);
        updateChosenBalls();
        reset_btn();
}
else{
    return;
}

    console.log(primary_numbers);
    console.log(secondary_numbers);

}
function is_valid(){
   let count_checked_buttons=0;
   let balance= document.getElementById('text_balance').value;
   balance=balance.replace(/\₪/g,'')
   if(balance<300){
        alert("הפסדת יותר מדי! אין מספיק כסף.")
        shutDown();
        return false;
   }
   secondaryButtonsArray.forEach(element => {
    if(element.style.backgroundColor=="orange"){count_checked_buttons++}
    });
    if(count_checked_buttons<1){
        alert("choose stong!")
        return false;}
    count_checked_buttons=0;
    primaryButtonsArray.forEach(element => {
        if(element.style.backgroundColor=="orange"){count_checked_buttons++}
    });
    if(count_checked_buttons<6){
        alert("click more primary!")
        return false;}
   return true;
}

function get_primary_checked_nodes_list() {
    let checked_primary_list =[];
    let primary_nodes=get_primary_nodes();
    primary_nodes.forEach(element=>{
        if(element.style.backgroundColor === "orange"){
            checked_primary_list.push(element);
        }
    });
    
    return checked_primary_list;
}
function get_secondary_checked_nodes_list() {
    let checked_secondary_list =[];
    let secondary_nodes=get_secondary_nodes();
    secondary_nodes.forEach(element=>{
        if(element.style.backgroundColor === "orange"){
            checked_secondary_list.push(element);
        }
    });
    
    return checked_secondary_list;
}
function updateWinningBalls(winners_primary,winners_strong){

    for(let i=1;i<7;i++){
        document.getElementById('l'+i).innerText=winners_primary[i-1];
    }
    document.getElementById('l7').innerText=winners_strong[0];
}

function check_winnings(winners_primary,winners_strong){
     // Get the list of checked primary and secondary numbers
     let checked_primary = get_primary_checked_nodes_list();
     let checked_secondary = get_secondary_checked_nodes_list();
 
     // Initialize counters for primary and strong matches
     let primary_count = 0;
     let strong_count = 0;
 
     // Count primary matches
     checked_primary.forEach(element => {
         let i = parseInt(element.value.trim(), 10);
         if (winners_primary.includes(i)) {
             primary_count++;
         }
     });
 
     // Check for strong match
     let i = parseInt(checked_secondary[0].value.trim(), 10);
     if (winners_strong.includes(i)) {
         strong_count++;
     }
     
     // Log relevant information for debugging
    //  console.log("Checked Primary:", checked_primary);
    //  console.log("Checked Secondary:", checked_secondary);
    //  console.log("Winning Primary:", winners_primary);
    //  console.log("Winning Strong:", winners_strong);
    //  console.log("Primary Count:", primary_count);
    //  console.log("Strong Count:", strong_count);

     updateWinningBalls(winners_primary,winners_strong);   

     if((primary_count==4 || primary_count==5) && strong_count==1){
        updateBalance(400);
        return;
     }
     if(primary_count==6 && strong_count==0)
     {
        updateBalance(600);
        return;
     }
     if(primary_count==6 && strong_count==1){
        updateBalance(1000);
        return;
     }
 
     
    //  updateStats(primary_count,strong_count);
     updateBalance();
     
     
     
     return;
    }
    
function loser(){
    addLoser();
    setTimeout(removeLoser, 1500);       
}

function winner(){
    addWinner();
    setTimeout(removeWinner, 1500);       
}

function addLoser(){
    document.querySelector("body").classList.add('siren');
    document.querySelector(".loser").style.display = "flex";
}

function removeLoser(){
    document.querySelector(".loser").style.display = "none";
    document.querySelector("body").classList.remove('siren');
    return;
}

function addWinner(){
    document.querySelector("body").classList.add('winnersiren');
    document.querySelector(".winner").style.display = "flex";
}

function removeWinner(){
    document.querySelector(".winner").style.display = "none";
    document.querySelector("body").classList.remove('winnersiren');
    return;
}

function shutDown(){
    document.getElementById('check_btn').disabled=true;
    primaryButtonsArray.forEach(element=>{
       element.disabled=true; 
    })
    secondaryButtonsArray.forEach(element=>{
        element.disabled=true;
    })
    document.getElementById('end_btn').style.backgroundColor='red';
}
function reset_btn(){
    primaryButtonsArray.forEach(element=>{
        element.removeAttribute('style');
    })
    secondaryButtonsArray.forEach(element=>{
        element.removeAttribute('style');
    })
}

function spr(){
    let totalwinnings = parseInt(document.getElementById('text_balance').value.slice(0,-1))-1000;
    let is_winner = totalwinnings >= 0;
    let enddiv = is_winner ? document.querySelector(".winner"):document.querySelector(".loser");
    let congrats = is_winner ? "Congrats, ":"Sadly, ";
    let wonlost = is_winner ? "won ":"lost ";
    let exclamation = is_winner ? "!!!!":"";

    let endmsg = congrats+"you've "+ wonlost + Math.abs(totalwinnings) + "₪" + exclamation;
    enddiv.style.fontSize = "110px";

    document.querySelectorAll("input, button").forEach(e => {
        e.setAttribute("disabled","disabled");
    });
    enddiv.innerHTML = endmsg;
    is_winner ? addWinner():addLoser();
}

function updateChosenBalls(){
    // document.getElementById("chosen_balls").classList.remove("hidden");
    let checked_primary = get_primary_checked_nodes_list();
    let checked_secondary = get_secondary_checked_nodes_list();
    let i=1;
    checked_primary.forEach(element => {
        document.getElementById("c"+i).innerText=element.value;
        i++;
    });
    document.getElementById("c7").innerText=checked_secondary[0].value;
}
