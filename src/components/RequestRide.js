// import useContext.
import { useContext } from 'react';
// import realtime database from Firebase.
import { realTimeDb } from "../firebase";
// import uuid to generate id for users.
import { v4 as uuidv4 } from "uuid";
// import Context
import Context from '../Context';

import haversine from "haversine-distance"

import {GrClose} from "react-icons/gr"

function RequestRide(props) {
  // get toggleModal functin from higher order components.
  const { toggleModal } = props;

  const { user, selectedFrom, selectedTo, setRideRequest, setIsLoading } = useContext(Context);

  /**
   * request a ride
   */
  const requestRide = () => {
    if (user && selectedFrom && selectedTo) {
      // close the modal.
      toggleModal(false);
      console.log("selected from",selectedFrom, "selected to", selectedTo)
      // show loading indicator. 
      setIsLoading(true);
      // create object.
      const rideUuid = uuidv4();
      const ride = {
        "rideUuid": rideUuid,
        "requestor": user,
        "pickup": selectedFrom,
        "destination": selectedTo,
        "status": 0
      }
      // insert to Firebase realtime database.
      realTimeDb.ref(`rides/${rideUuid}`).set(ride).then(() => {
        setRideRequest(ride);
        setIsLoading(false);
      }).catch(() => {
        setIsLoading(false);
      });
    }
  };

  return (
    <div className="request-ride">
      <div className="request-ride__content">
        <div className="request-ride__container">
          <div className="request-ride__title">Requesting a Ride</div>
          <div className="request-ride__close">
            <GrClose
              // alt="close"
              onClick={() => toggleModal(false)}
              // src="https://www.flaticon.com/free-icon-font/cross_3917759?related_id=3917759"//"https://static.xx.fbcdn.net/rsrc.php/v3/y2/r/__geKiQnSG-.png"
            />
          </div>
        </div>
        <div className="request-ride__subtitle"></div>
        <div className="request-ride__form">
          <p>
            You entered the pickup location successfully. Do you want to request a ride now ?
          </p>
          <p>Estimated cost: Rs.{Math.floor(haversine({latitude: selectedFrom.x, longitude: selectedFrom.y}, {latitude: selectedTo.x, longitude: selectedTo.y})/1000)*15}</p>
          <button className="request-ride__btn request-ride__change-btn" onClick={() => toggleModal(false)}>
            Change
          </button>
          <button className="request-ride__btn" onClick={requestRide}>
            Request now
          </button>
        </div>
      </div>
    </div>
  );
}

export default RequestRide;
