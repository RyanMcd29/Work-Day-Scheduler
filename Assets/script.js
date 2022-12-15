
var hourListEl = $('#hour-list');

$(function () {

// Create hour list
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
  hourEl.on('click', '.saveBtn', saveItem)
  
  }
});

  // Set classes for elements to ID if past, present or future
  function applyClasstoHourElements(i, hourID) {
    var setHour = dayjs().hour(i).format('H')
    var currentHour = dayjs().hour();
    var setHourClass = currentHour - setHour;
    
    console.log(currentHour)
    if (setHourClass > 0) {
      $('#'+hourID).addClass('past');
    } else if (setHourClass == 0) {
      $('#'+hourID).addClass('present');
    } else if (setHourClass < 0) {
      $('#'+hourID).addClass('future');
    }
  }

// Load events from local storage on page load
function loadTextFromLocalStorage(hourID) {
  console.log(hourID)
  var oldText = JSON.parse(localStorage.getItem(hourID));
  console.log(oldText);
  textEl = $('#'+hourID).children('textarea').val(oldText);
  console.log(textEl)
}

  
// Save new items on click on save button
function saveItem(event) {
  var btnClicked = $(event.target);
  var hourID = btnClicked.parent().parent().attr('id');
  eventText = $('#'+hourID).children('textarea').val()
  console.log(hourID)
  localStorage.setItem(hourID, JSON.stringify(eventText));
};

// Set current day above list
var currentDay = dayjs().format('dddd');
$('#currentDay').text("Today is " + currentDay);

