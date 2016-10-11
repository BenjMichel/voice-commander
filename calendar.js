const google = require('googleapis');

const calendar = google.calendar('v3');

/**
 * Lists the next 10 events on the user's primary calendar.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth) {
  return new Promise((resolve, reject) =>
    calendar.events.list({
      auth,
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    }, function (err, response) {
      if (err) {
        console.log('The API returned an error: ' + err);
        reject(err);
        return;
      }
      const events = response.items;
      resolve(events);
    })
  );
}

module.exports = {
  listEvents,
};
