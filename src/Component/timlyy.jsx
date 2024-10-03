import React, { useState } from 'react';
import { Clock, Calendar, AlarmClock } from 'lucide-react';



const TimeStampCalculator = () => {
    const [time, setTime] = useState([]);
    const [inputValue,setInputValue] = useState("")
    const [calculatedTimes, setCalculatedTimes] = useState([]);
    const [totalTime, setTotalTime] = useState('');
    const [timeCompletedPercentage, setTimeCompletedPercentage] = useState(0);

    const FULL_TIME = 450; // Full time for pie chart (7.5 hours = 450 minutes)

    // Function to format time strings into 24-hour format
    const timeamtopm = (timeArray) => {
        return timeArray.map(t => {
            t = t.trim();
            const [timePart, period] = t.split(" ");
            let [hours, minutes] = timePart.split(":");
            hours = parseInt(hours);
            if (period.toLowerCase() === "pm" && hours !== 12) {
                hours += 12;
            } else if (period.toLowerCase() === "am" && hours === 12) {
                hours = 0;
            }
            const formattedHours = hours < 10 ? `0${hours}` : hours.toString();
            return `${formattedHours}:${minutes}`;
        });
    };

    // Function to get the current time in 24-hour format
    const getCurrentTime = () => {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        hours = hours < 10 ? `0${hours}` : hours;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${hours}:${minutes}`;
    };

    // Function to calculate time difference between two times
    const calculatortime = (startTime, endTime) => {
        let start = new Date(`2024-10-03T${startTime}:00`);
        let end = new Date(`2024-10-03T${endTime}:00`);
        let diffInMs = end - start;
        let diffInMinutes = Math.floor(diffInMs / 1000 / 60);
        let hours = Math.floor(diffInMinutes / 60);
        let minutes = diffInMinutes % 60;
        return { hours, minutes, totalMinutes: diffInMinutes };
    };

    // Function to sum the total time
    const sumTotalTime = (times) => {
        let totalHours = 0;
        let totalMinutes = 0;
        times.forEach(({ hours, minutes }) => {
            totalHours += hours;
            totalMinutes += minutes;
        });
        totalHours += Math.floor(totalMinutes / 60);
        totalMinutes = totalMinutes % 60;
        const totalTimeInMinutes = totalHours * 60 + totalMinutes;
        const percentageCompleted = (totalTimeInMinutes / FULL_TIME) * 100;
        setTimeCompletedPercentage(Math.min(percentageCompleted, 100));
        return `${totalHours} hours ${totalMinutes} minutes`;
    };

    // Function to process the input and calculate times
    const time_list = (value) => {
        let timeArray = value.split(",");
        let formattedTimeArray = timeamtopm(timeArray);
        const currentTime = getCurrentTime();
        formattedTimeArray.push(currentTime);
        let calculated = [];
        for (let i = 0; i < formattedTimeArray.length - 1; i += 2) {
            const difference = calculatortime(formattedTimeArray[i], formattedTimeArray[i + 1]);
            calculated.push(difference);
        }
        const total = sumTotalTime(calculated);
        setTime(formattedTimeArray);
        setCalculatedTimes(calculated);
        setTotalTime(total);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Time Stamp Calculator</h1>
                    <Clock className="w-10 h-10" />
                </div>
                
                <div className="p-6 space-y-6">
                    
                    <div className="mb-6">
                                <label htmlFor="timeInput" className="block text-sm font-medium text-gray-700 mb-2">
                                    Enter times (e.g., 9:00 am, 12:30 pm, 2:15 pm)
                                </label>
                                <input 
                                    id="timeInput"
                                    type='text' 
                                    placeholder='Enter times separated by commas' 
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)} // Use state to store the input
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    onClick={() => time_list(inputValue)} // Call the function on submit
                                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Submit
                                </button>
                            </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {time.length > 0 && (
                            <div className="bg-gray-100 rounded-lg p-4 shadow">
                                <h2 className="font-semibold text-lg mb-2 flex items-center">
                                    <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                                    Formatted Times:
                                </h2>
                                <p className="text-gray-700">{time.join(", ")}</p>
                            </div>
                        )}

                        {calculatedTimes.length > 0 && (
                            <div className="bg-gray-100 rounded-lg p-4 shadow">
                                <h2 className="font-semibold text-lg mb-2 flex items-center">
                                    <AlarmClock className="w-5 h-5 mr-2 text-blue-600" />
                                    Time Differences:
                                </h2>
                                <p className="text-gray-700">
                                    {calculatedTimes.map(({ hours, minutes }, index) => (
                                        <span key={index} className="mr-2">
                                            {hours}h {minutes}m{index < calculatedTimes.length - 1 ? "," : ""}
                                        </span>
                                    ))}
                                </p>
                            </div>
                        )}
                    </div>

                    {totalTime && (
                        <div className="bg-blue-100 rounded-lg p-4 shadow">
                            <h2 className="font-semibold text-lg mb-2 flex items-center">
                                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                                Total Time:
                            </h2>
                            <p className="text-blue-800 text-xl font-bold">{totalTime}</p>
                        </div>
                    )}

                    <div className="flex items-center justify-center mt-8">
                        <div className="relative w-64 h-64">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                <circle 
                                    className="text-gray-200" 
                                    strokeWidth="8"
                                    stroke="currentColor" 
                                    fill="transparent" 
                                    r="45" 
                                    cx="50" 
                                    cy="50"
                                />
                                <circle 
                                    className="text-blue-600" 
                                    strokeWidth="8"
                                    strokeDasharray={`${timeCompletedPercentage * 2.83}, 283`}
                                    strokeLinecap="round" 
                                    stroke="currentColor" 
                                    fill="transparent" 
                                    r="45" 
                                    cx="50" 
                                    cy="50"
                                />
                            </svg>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                <Clock className="w-12 h-12 mx-auto mb-2 text-blue-600" />
                                <span className="text-4xl font-bold text-gray-800">
                                    {Math.round(timeCompletedPercentage)}%
                                </span>
                                <p className="text-sm text-gray-600 mt-1">Time Completed</p>
                            </div>
                        </div>
                    </div>
                </div>

               
            </div>
        </div>
    );
};

export default TimeStampCalculator;