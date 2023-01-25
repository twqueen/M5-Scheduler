//function will not work until everything is ready and loaded from html

$(function () {

  //save button saves user inputs into local storage
  var BtnEl = $('.saveBtn')
  var SavedEvents = []

  BtnEl.on('click', function(event) {
    event.preventDefault();

    var UserInput = $(this).prev('textarea').val();
    var InputHour = $(this).parent('div').attr('id');
    var UserSch = {
      Hour: InputHour,
      Todo: UserInput
    };

    for (var i = 0; i < SavedEvents.length; i++) {
      if (InputHour === SavedEvents[i].Hour) {
        SavedEvents.splice(i, 1);
      };
    };
    SavedEvents.push(UserSch);

    localStorage.setItem('UserSchedule', JSON.stringify(SavedEvents));
    window.alert("🌸 Event Saved 🌸 \n 🏰—ฅ/ᐠ. ̫ .ᐟ\\ฅ —🎠");
  });
  
  //call out saved stuff and renders it into page upon refresh
  function init() {
    var storedSchedule = JSON.parse(localStorage.getItem('UserSchedule'));
    if (storedSchedule !== null) {
      for (var i = 0; i < storedSchedule.length; i++) {
        SavedEvents.push(storedSchedule[i]);
        var HourChild = "#" + storedSchedule[i].Hour + " > textarea"
        $(HourChild).val(storedSchedule[i].Todo);
      };
    };
  };
  init();

  //color code past present and future time blocks in the scheduler
  function Colorcodingtime() {
    for (var i = 9; i < 18; i++) {
      var BlockHour = "#hour-" + i;
      if (i > dayjs().format('H')) {
        $(BlockHour).removeClass("present past");
        $(BlockHour).addClass('future');
      } else if (i < dayjs().format('H')) {
        $(BlockHour).removeClass("present future");
        $(BlockHour).addClass('past');
      } else {
        $(BlockHour).removeClass("future past");
        $(BlockHour).addClass('present');
      };
    };
  };

  //Time Display
  var TimeDisplayEl = $('#currentDay');

  function displayTime() {
    var Now = dayjs().format('MMM DD, YYYY [at] HH:mm:ss a');
    TimeDisplayEl.text(Now);
  };

  displayTime();
  setInterval(displayTime, 1000);
  setInterval(Colorcodingtime, 1000);
});




