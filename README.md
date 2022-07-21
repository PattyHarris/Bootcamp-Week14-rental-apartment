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
