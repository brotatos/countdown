$(document).ready(function() {
   if (document.cookie && document.cookie.match('countdown')) {
      var date = document.cookie.match(/(^|;)countdown=([^;]+)/)[2];
      $(document.getElementById('dateChooser')).remove();
      InitClock('clock', date);
      AppendEndDate(date);
   } else {
      var self = this;
      var submit = self.getElementById("submit");

      submit.addEventListener("click", function() {
         var date = self.getElementById("date").value;

         document.cookie = "countdown=" + date + '; path=/;';

         InitClock('clock', self.getElementById("date").value);
         $(self.getElementById('dateChooser')).fadeOut(300, function() {
            $(this).remove();
         });
         AppendEndDate(date);
      });
   }
});

function AppendEndDate(date) {
   $('body').append("<div class='white-text' id='end'>Until " + date + "</div>");
}

// @param t is time in ms.
function formatTime(t) {
   t /= 1000; // ms => s
   return {
      'total': t,
      'day': Math.floor(t / (60 * 60 * 24)),
      'hour': Math.floor((t / (60 * 60)) % 24),
      'min': Math.floor((t / 60) % 60),
      'sec': Math.floor((t) % 60)
   };
}

function getTimeLeft(end) {
   return formatTime(Date.parse(end) - Date.parse(new Date()));
}

function AddLeadingZero(t) {
   return ('0' + t).slice(-2);
}

function InitClock(id, end) {
   var self = this;
   var clock = document.getElementById(id);

   self.day = clock.querySelector('.day');
   self.hour = clock.querySelector('.hour');
   self.min = clock.querySelector('.min');
   self.sec = clock.querySelector('.sec');

   function UpdateTime() {
    var t = getTimeLeft(end);

    self.day.innerHTML  = AddLeadingZero(t.day);
    self.hour.innerHTML = AddLeadingZero(t.hour);
    self.min.innerHTML  = AddLeadingZero(t.min);
    self.sec.innerHTML  = AddLeadingZero(t.sec);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

   UpdateTime();
   var timeInterval = setInterval(UpdateTime, 1000);
}
