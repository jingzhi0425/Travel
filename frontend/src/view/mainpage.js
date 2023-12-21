import React from "react";
import { useState, useEffect } from "react";
import ItineraryService from "../services/itineraryService";
import DatePicker from "./datepicker";
import Itinerary from "./itinerary";
import Loader from './loader';
import DestinationField from "./destinationfield";
import CalenderExport from "./calenderexport";
import UserPrefs from "./userPrefs";


import NavBar from "./NavBar";
import '../styles/mainPage.css'

const MainPage = () => {
  const [placeName, setplaceName] = useState("");
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [routes, setroutes] = useState([]);
  const [isLoaded, setisLoaded] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  // const [preferencesList, setPreferencesList] = useState([]);
  // const preferences = ["None", "Museum", "Cultural", "Religious", "Nature", "Indoor Places", "Walkable", "Avoid Typical Tourist Places", "Shopping"];
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [updatePreferences, setUpdatePreferences] = useState([]);


  
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(startDate)
    if (startDate > endDate) {
      console.log("End date can not be before the start date!")
      return
    }

    setisLoading(true);
    const selectedPreferencesArray = Object.entries(selectedPreferences)
    .filter(([_, isSelected]) => isSelected)
    .map(([preference, _]) => preference);
    ItineraryService.getItinerary(placeName, startDate, endDate, localStorage.getItem('email'), selectedPreferencesArray)
      .then((data) => {
        setroutes(data);
        console.log("HERE!", routes);
        localStorage.setItem('placeName', placeName)
        // localStorage.setItem('preferencesList', preferencesList)
        localStorage.setItem('endDate', endDate)
        localStorage.setItem('startDate', startDate)
        localStorage.setItem('selectedPreferences', JSON.stringify(selectedPreferences))
      })
      .catch((err) => console.log(err))
      // .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setisLoading(false);
    setisLoaded(true);
  }, [routes]);

  useEffect(() => {
    setisLoading(false);
    setisLoaded(false);
  }, []);

  // const [preferencesList, setPreferencesList] = useState([]);


  return (
    
    <div className="grid-container">

      <NavBar></NavBar>

      {!isLoaded && !isLoading && (<section className="main-area">
        <section className="tagline">
          Discover Your Life, 
          <br/>  Travel Where You Want!
        </section>

        <section className="mainform-outer">
          <div className="mainform-inner">
            <div className="destinationfield">
            <label className="searchLabel">
              Location
              </label>
              <br />
              <DestinationField setplaceName={setplaceName} placeName={placeName}></DestinationField>

              {/* <input type="text" placeholder="Where are you going?" className="destinationfield" /> */}
            </div>
            {/* </section> */}

              <div className="date-picker-outer">
                {/* <DatePicker state={startDate} newState={setstartDate}></DatePicker> */}
                <label className="searchLabel">
                  Start Date
                </label>
                <br/>
                <DatePicker value={startDate} state={startDate} newState={setstartDate}></DatePicker>
                {/* <input type="date" name="" id="" className="datepicker-inner"/> */}
              </div>

              <div className="date-picker-outer">
                <label className="searchLabel">

                  End Date
                </label>
                <br />
                <DatePicker state={endDate} newState={setendDate}></DatePicker>
                {/* <input type="date" name="" id="" className="datepicker-inner"/> */}
              </div>
              <div className= "preferences-dropdown">
              <label className="searchLabel">
                Preferences
              </label>
               <br />
               <UserPrefs selectedPreferences={selectedPreferences} setSelectedPreferences={setSelectedPreferences}/> 
            </div>
            <div>
              <button className="searchicon" disabled={(placeName && endDate && startDate && selectedPreferences && startDate <= endDate) ? false : true}
                    onClick={(e) => handleSubmit(e)}>GO!</button>
            </div>
          </div>

        </section>
      </section>
    )}
      {/* <section className="main-footer">
        <img src={require('../assets/carimage.jpg')} className="footer-image" alt="" srcset="" />
      </section> */}
      
      {/* <img className='footer' src={require("../assets/carimage.jpg")} alt="LOGO NOT WORKING" srcset="" />  */}

      
      {isLoading && !isLoaded && <Loader></Loader>}
      {isLoaded && !isLoading && (
        <>
          <Itinerary routes={routes}></Itinerary>
          <CalenderExport routes={routes}></CalenderExport>
        </>
      )}
    </div>
  );
};
export default MainPage;