var savebtnEl = $('.saveBtn');

var description;
var wholebox = $('.container-lg').children('.row');
var worktime = 9;


$(function () {
   
 
  var timenow = dayjs().format('HH');
  console.log(timenow);
  var today = dayjs();
  $('#currentDay').text(today.format('dddd, D MMMM YYYY'));
  
 
  description = JSON.parse(window.localStorage.getItem("description")) || [];
  
  if(description.length>0){
    for (var i = 0 ; i < description.length ; i++){
      wholebox.eq(i).children('textarea').val(description[i].task);
      console.log( wholebox.eq(i).children('textarea').val(description[i].task));
 
  
    }
  }

  
  for (var i = 0 ; i < worktime ; i++){
    var setTime = i+9;
    wholebox.eq(i).children('.hour').val(dayjs().hour(setTime).format('HH'));
  }
  
  for (var i = 0 ; i < description.length ; i++){
    if (timenow > wholebox.eq(i).children('.hour').val()) {
      wholebox.eq(i).addClass('past');    
    } else if (timenow < wholebox.eq(i).children('.hour').val()){
      wholebox.eq(i).addClass('future');
    } else {
      wholebox.eq(i).addClass('present');
    }
  } 
});

savebtnEl.on('click', function () {
  for (var i = 0 ; i < worktime ; i++){
    description.pop();
  }
  
  for (var i = 0 ; i < worktime ; i++){
    var scheditem = {
      time: wholebox.eq(i).children('.hour').text(),
      task: wholebox.eq(i).children('textarea').val(),
   };
   console.log(wholebox.eq(i).children('textarea').val());

   description.push(scheditem);


  }
  window.localStorage.setItem('description', JSON.stringify(description));
  console.log(description.length);   console.log(description.length);

});





// AS AN employee with a busy schedule
// I WANT to add important events to a daily planner
// SO THAT I can manage my time effectively

// Acceptance Criteria
// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
// WHEN I scroll down
// THEN I am presented with timeblocks for standard business hours
// WHEN I view the timeblocks for that day
// THEN each timeblock is color coded to indicate whether it is in the past, present, or future
// WHEN I click into a timeblock
// THEN I can enter an event
// WHEN I click the save button for that timeblock
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist