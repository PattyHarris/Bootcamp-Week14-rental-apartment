import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import {
  isDaySelectable,
  addDayToRange,
  getDatesBetweenDates,
} from "lib/dates";
import { getCost } from "lib/cost";

export default function Calendar() {
  const [from, setFrom] = useState();
  const [to, setTo] = useState();

  // Handle the click from the calendar.
  const handleDayClick = (day) => {
    const range = addDayToRange(day, {
      from,
      to,
    });

    // If only one date is selected, set both the 'to' and 'from' to
    // the 'from' date (assuming it's selectable).
    if (!range.to) {
      if (!isDaySelectable(range.from)) {
        alert("This date cannot be selected");
        return;
      }
      range.to = range.from;
    }

    // Make sure the 'to' date is selectable.
    if (range.to && range.from) {
      if (!isDaySelectable(range.to)) {
        alert("The end date cannot be selected");
        return;
      }
    }

    // Make sure all the days between the 'to' and 'from' are selectable.
    const daysInBetween = getDatesBetweenDates(range.from, range.to);

    for (const dayInBetween of daysInBetween) {
      if (!isDaySelectable(dayInBetween)) {
        alert("Some days between those 2 dates cannot be selected");
        return;
      }
    }

    setFrom(range.from);
    setTo(range.to);
  };

  return (
    <div>
      <Head>
        <title>Rental Apartment</title>
        <meta name="description" content="Rental Apartment Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative overflow-hidden">
        <div className="relative">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100"></div>
          <div className="">
            <div className="relative shadow-xl  sm:overflow-hidden">
              <div className="absolute inset-0">
                <img
                  className="h-full w-full object-cover"
                  src="/img/1.jpg"
                  alt="Background image"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 mix-blend-multiply"></div>
              </div>
              <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8  bg-gray-800/80">
                <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  A Charming Old House
                  <span className="block text-gray-300">
                    on the Italian Alps
                  </span>
                </h1>
                <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                  <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-1 sm:gap-5">
                    <Link href={`/`}>
                      <a className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-blue-50 sm:px-8">
                        ⬅ Back to the house details
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-10">
          <p className="text-2xl font-bold text-center my-10">
            Availability and prices per night
          </p>

          <div className="pt-6 flex justify-center availability-calendar">
            <DayPicker
              components={{
                DayContent: (props) => (
                  <div
                    className={`relative text-right ${
                      !isDaySelectable(props.date) && "text-gray-500"
                    }`}
                  >
                    <div>{props.date.getDate()}</div>

                    {isDaySelectable(props.date) && (
                      <div className="-mt-2">
                        <span
                          className={`bg-white text-black rounded-md font-bold px-1 text-xs`}
                        >
                          ${getCost(props.date)}
                        </span>
                      </div>
                    )}
                  </div>
                ),
              }}
              mode="range"
              selected={[from, { from, to }]}
              onDayClick={handleDayClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
