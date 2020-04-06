# 05 Third-Party APIs: Work Day Scheduler

Create a simple calendar application that allows the user to save events for each hour of the day. This app will run in the browser and feature dynamically updated HTML and CSS powered by jQuery.

You'll need to use the [Moment.js](https://momentjs.com/) library to work with date and time. Be sure to read the documentation carefully and concentrate on using Moment.js in the browser.

## Approach
I tried to make my code simple
I'm not stoing any data in html tags intentionally
I'm using jQuery to get the selected time value to use it to update my localStorage because I know my html layout will always look the same as far as the time-block goes.
I'm getting the textarea value by looking at the parent then child of the saveBtn clicked.
I'm looping through the saved or initial notes array to and matching the subarray for index to update that specific array with data i want to save whih we get from the textarea