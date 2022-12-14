// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var hourListEl = $('#hour-list');

function saveItem(event) {
  var btnClicked = $(event.target);
  var hourID = btnClicked.parent().parent().attr('id');
  eventText = $('#'+hourID).children('textarea').val()
  console.log(hourID)
  localStorage.setItem(hourID, JSON.stringify(eventText));
};

$(function () {

function createHourElements() {
for (var i = 9; i <= 17; i++) {
  var setTime = dayjs().hour(i).format('ha');
  var hourEl = $('<div>');
  hourEl.addClass('row time-block')
  var hourID = 'hour-'+setTime;
  hourEl.attr('id', hourID); 
  
  var hourTitle = $('<div>');
  hourTitle.text(setTime);
  hourTitle.addClass('col-2 col-md-1 hour text-center py-3');
  
  var inputBox = $('<textarea>');
  inputBox.addClass('col-8 col-md-10 description');
  
  var saveBtnEl = $('<button>');
  saveBtnEl.addClass('btn saveBtn col-2 col-md-1');

  var btnLink = $('<i>')
  btnLink.addClass('fas fa-save save')

  saveBtnEl.append(btnLink);

  hourEl.append(hourTitle);
  hourEl.append(inputBox);
  hourEl.append(saveBtnEl);

  hourListEl.append(hourEl)

  applyClasstoHourElements(i, hourID)
  loadTextFromLocalStorage(hourID)
  
  // Add event listener
  hourEl.on('click', '.save', saveItem)
  
}

  

}


  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // function saveEvent();
    



  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  function applyClasstoHourElements(i, hourID) {
    var setHour = dayjs().hour(i).format('H')
    var currentHour = dayjs().hour();
    var setHourClass = currentHour - setHour;
    
    if (setHourClass > 0) {
      $('#'+hourID).addClass('past');
    } else if (setHourClass == 0) {
      $('#'+hourID).addClass('present');
    } else if (setHourClass < 0) {
      $('#'+hourID).addClass('future');
    }
  }

function loadTextFromLocalStorage(hourID) {
  console.log(hourID)
  var oldText = JSON.parse(localStorage.getItem(hourID));
  console.log(oldText);
  textEl = $('#'+hourID).children('textarea').val(oldText);
  console.log(textEl)

  // textEl = oldText;
  // $( hourID + "textarea" ).text( "textarea" + oldText );

}

  createHourElements();

 
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  var currentDay = dayjs().format('dddd');
  $('#currentDay').text("Today is " + currentDay);
});
