# Rental Apartment Website

This week's project is to create a website similar to AirBnb. Some changes for this week include:

1. There is no authentication added to the project - e.g. no dashboard
2. This is more of a front-end application

## Initial Setup

1. Initial setup of Next.js is the same as prior weeks. The completed project for reference is here: https://github.com/flaviocopes/bootcamp-2022-week-14-rental-apartment
2. Setup Prisma as before.
3. Since we're not using NextAuth.js, we need to separately install the prisma client.

```
npm install @prisma/client
```

## Create the Homepage

1.  The home page starts with a description of the rental. Below this is some images which are then followed by some "places of interest".
2.  To use similar images (e.g. Italian countryside home), these sources are listed:
    1.  https://unsplash.com/s/photos/interior-design
    2.  https://unsplash.com/s/photos/tiny-house
    3.  https://unsplash.com/s/photos/villa-bali
3.  Any images that are downloaded should be placed in an 'img' folder. Flavio uses '1.jpeg', '2.jpeg' for names of his images.
4.  Change the background to black and text to white.
5.  To get rid of the warnings about not using Image, add the following the the .eslintrc.json:

```
  "rules": {
    "@next/next/no-img-element": "off"
  }
```

6. In the "home" page, the images are setups such that when the screen is small, only the last image is shown:

```
          <div className='hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block'>
            <img
              src='/img/2.jpeg'
              className='w-full h-full object-center object-cover'
            />
          </div>

```

7. The details and reviews show in 2 columns. When the screen is small, they are shown in a single column.
8. The reviews are from static data.
9. The destination list is also from static data. The destination descriptions show in a grid that is 4 columns are a large screen, 2 on a medium screen, and 1 on a small screen.

## Define Config Data

1. The config data will reside in 'lib/config.js'.
2. Flavio uses the following code in the config file which generates a eslint warning:

```
export default {

}
```

I added the following to the top of the file - this option is better than changing the eslintrc.json file:

```
/* eslint-disable import/no-anonymous-default-export */
```

## Create a Calendar Page

1. Add the 'calendar.js' page.
2. The heading JSX in 'calendar.js' is nearly the same as with 'index.js'.
3. Install the React day picker:

```
npm install react-day-picker date-fns
```

4. Add the library and the 'style.css' file to 'calendar.js'.

## Show Available Dates in the Calendar

1. Add un-selectable dates such as the blocked dates in the config file as well as dates in the past.
2. The primary changes here are in the new file 'lib/dates.js'.
3. Start by importing 'isDaySelectable' from 'dates.js' in 'calendar.js'. Update the JSX for the calendar picker to include props from dates.js.
4. The remaining changes are to 'dates.js' to return various bits of data related information.
5. There's a major error with the current text portion of this tutorial - took me some time to figure it out since the errors are misleading. Turns out the first bit of JSX where the prop data is based to the Calendar library is wrong - it's correct in the video. It's missing back ticks among other things.
6. The day selected also cannot be more than 6 months out - e.g. 30 \* 6.

## Show Available Date Pricing

1. Add a new file 'lib/costs.js' which contains functions for returning cost information - 'getCost'.
2. Use the 'getCost' function in 'calendar.js'. The end result is that the price is listed below the date - looks a bit weird to me....

## Allow Start and End Date Selection

1. In 'calendar.js', add 'useState' to manage the start and end dates.
2. Add the 'from' and 'to' props to the DayPicker and set the mode to 'range'.
3. This section is a mess - there's a number of problems in the text portion of the explanation - shows variables and props we're not using.
4. The idea here is that we add some props to the calendar widget to allow selection of a range of dates.
5. The function 'addDayToRange' is added to 'lib/dates.js' to handle the date range selection.
6. Add 'getDatesBetweenDates()' to 'lib/data.js' which is used to verify that all the dates between 'to' and 'from' are selectable.
7. The date selection is still a bit weird - but works as expected in the lesson.

## Disable Dates

1. Here we're going to make dates that aren't selectable not selectable - meaning, currently, these dates are 'greyed', but can still be highlighted..
2. To fix this, we add an array of dates we don’t want to let people select.
3. Add 'getBlockedDates' to 'lib/dates.js' and import the function in 'calendar.js'.
4. Pass the results of this call in the 'disabled' prop to the DayPicker.
5. Add 'lib/bookings.js' with a new function 'getBookedDates' - it's good to break this out, but it's really not that much different (at this point) than the other date functions in 'dates.js'. Add the call as a prop to DayPicker.
6. Add dates from the past and the future - putting this entirely here since it's a bit weird:

```
const yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1)

const sixMonthsFromNow = new Date()
sixMonthsFromNow.setDate(sixMonthsFromNow.getDate() + 30 * 6)

//...

    <DayPicker
        disabled={[
        ...getBlockedDates(),
        ...getBookedDates(),
        {
            from: new Date("0000"),
            to: yesterday,
        },
        {
            from: sixMonthsFromNow,
            to: new Date("4000"),
        },
        ]}
  //....
/>
```

## Determine the Cost of a Stay

1. Calculate the total price for the stay period.
2. In 'calendar.js', add 2 state variables 'numberOfNights' and 'totalCost'.
3. Add JSX for these variables below 'Availability and prices per night'.
4. Refactor 'handleDayClick' to calculate their values. We need to import 'calcNumberOfNightsBetweenDates' and add the code for 'calcTotalCostOfStay'. The latter function is added to 'lib/cost.js'. Import into 'calendar.js'.
5. Add a reset button underneath the cost, so a user can clear the selection.
6. Fixed a bug where there is an exception thrown if you select a single day and then unselect that same day. In this case, the 'to' and 'from' dates are both null....handle in 'handleDayClick' in 'calendar.js'.

## Create the Data Model to Host Bookings

1. Now that we're functional with fake data, we'll add the a data model to store and retrieve the data.
2. We'll add a Booking model - note the fields that will be used with Stripe. The email will come from Stripe (as does the session ID).

## Implement Payment using Stripe

1. As before we need to install strip and raw-body.

```
npm install stripe raw-body
```

2. We also need to add the following to the .env file (which I already did):

```
STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
BASE_URL=http://localhost:3000
STRIPE_WEBHOOK_SECRET=
```

3. In the terminal, run the following - from the output, you will get the STRIPE_WEBHOOK_SECRET as well:

```
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

4. Add stripe to the calendar page - I use the same mechanism from the last project - this gets rid of some warnings:

```
import Script from "next/script";
.....
<Script src="https://js.stripe.com/v3/" />
```

5. Add a 'Book Now' button after the number of days selected (if any days have been selected). The onClick handler is like we did in Week 13 - e.g. make a POST to '/api/stripe/session'.
6. Add the endpoint handler 'api/stripe/session.js'. To fix the warnings about "Assign object to a variable before exporting as module default", add the following to eslintrc.json:

```
"import/no-anonymous-default-export": "off"
```

Or, explicitly define the export:

```
const session = async (req, res) +> {

}
export default session;
```

7. In the 'session' handler, we first calculate the cost of the stay. Then, create a request to Stripe with the data for the bookings. Assuming success, we then store the session ID along with the to and from dates. The data also stores this entry as unpaid. Lastly, as with the last lesson, we return the session ID. Note that this is all server side code....
8. In 'calendar.js', when the data is returned is received, we redirect to Stripe to handle payment.
9. As before, you can use '4242 4242 4242 4242' for the credit card. Any fake email will do as well.
10. When the payment is done, we redirect the user to the '/success' URL, which is handled in 'pages/success.js'. This page indicates to the user that an email is sent to verify the details of the stay.
11. Stripe in the meanwhile, sends us a webhook - 'pages/api/stripe/webhook.js'. Here we update the 'unpaid' status to 'paid' and clear the session ID from the database. The response back to Stripe indicates to Stripe that we have received the webhook.

## Send Confirmation Emails

1. We send 2 emails - one to the home owner and one to the user that booked the stay.
2. Install the nodemailer library:

```
npm install nodemailer
```

3. Create a 'lib/email.js' file to contain the 'sendMail' function.
4. Add 2 environment variables to .evn for 'your' email - note that we can use the mailtrap.io service for this as well:

```
   EMAIL_SERVER=smtp://YOURACCESS:YOURPASSWORD@smtp.mailtrap.io:465
   EMAIL_FROM=Your name <you@email.com>
```

5. Import this function in 'webhook.js'.
6. After the call to prisma.booking.updateMany(), we'll send the 2 emails. NOTE: in order for this whole process to work and for the emails to be sent correctly, the stripe CLI MUSTS BE RUN in the project folder. After a Mac update, my terminal was running at my root account....noticed this solution in the Discord channel.
