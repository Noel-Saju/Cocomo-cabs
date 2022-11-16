import { useRef, useContext, useState, useEffect } from "react";
// import Context to get shared data from React context.
import Context from "../Context";
// import firebase authentication and real time database.
import { auth, realTimeDb } from "../firebase";
// import validator to validate user's credentials.
import Header from "./Header";

import haversine from "haversine-distance";

function PreviousRides() {
  const { user, setUser } = useContext(Context);
  const [prevRide, setPrevRide] = useState([]);
  let rides;
  let keys;
  useEffect(() => {
    if (user) {
      realTimeDb
        .ref()
        .child(`rides`)
        .on("value", function (snapshot) {
          const val = snapshot.val();
          if (val) {
            keys = Object.values(val);
            console.log(keys, "rides");
          }
        });
      rides = keys?.filter((obj) => {
        if (obj.requestor.email === user.email) {
          return true;
        }
        return false;
      });
      if (rides) {
        setPrevRide(rides);
        console.log(prevRide, "filtered rides");
      }
    }
  }, []);

  return (
    <>
      <Header />
      <div>
        <div
          style={{
            margin: "20px",
            marginRight: "300px",
            marginLeft: "325px",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          Previous Rides
        </div>
        {prevRide.map((obj, i) => {
          return (
            <div
              style={{
                border: "1px solid black ",
                padding: "15px",
                margin: "20px",
                marginRight: "300px",
                marginLeft: "300px",
              }}
            >
              <div style={{ display: "flex" }}>
                <span style={{ marginTop: "10px", fontWeight: "bold" }}>
                  Driver-
                </span>{" "}
                <div style={{ margin: "10px" }}>{obj.driver.email}</div>
              </div>
              <div style={{ display: "flex" }}>
                <span style={{ marginTop: "10px", fontWeight: "bold" }}>
                  Driver Phone No-
                </span>{" "}
                <div style={{ margin: "10px" }}>{obj.driver.phone}</div>
              </div>
              <div style={{ display: "flex" }}>
                <span style={{ marginTop: "10px", fontWeight: "bold" }}>
                  Pickup location-
                </span>{" "}
                <div style={{ margin: "10px" }}>{obj.pickup.label}</div>
              </div>
              <div style={{ display: "flex" }}>
                <span style={{ marginTop: "10px", fontWeight: "bold" }}>
                  Destination location-
                </span>{" "}
                <div style={{ margin: "10px" }}>{obj.destination.label}</div>
              </div>
              <div style={{ display: "flex" }}>
                <span style={{ marginTop: "10px", fontWeight: "bold" }}>
                  Passenger -
                </span>{" "}
                <div style={{ margin: "10px" }}>{obj.requestor.email}</div>
              </div>
              <div style={{ display: "flex" }}>
                <span style={{ marginTop: "10px", fontWeight: "bold" }}>
                  Passenger Phone No-
                </span>{" "}
                <div style={{ margin: "10px" }}>{obj.requestor.phone}</div>
              </div>
              <div style={{ display: "flex" }}>
                <span style={{ marginTop: "10px", fontWeight: "bold" }}>
                  Fare Details-
                </span>{" "}
                <div style={{ margin: "10px" }}>
                  <p>
                    Rs.
                    {Math.floor(
                      haversine(
                        {
                          latitude: obj.destination.x,
                          longitude: obj.destination.y,
                        },
                        { latitude: obj.pickup.x, longitude: obj.pickup.y }
                      ) / 1000
                    ) * 15}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default PreviousRides;
