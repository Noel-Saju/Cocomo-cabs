
import { useRef, useContext ,useState,useEffect} from "react";
// import Context to get shared data from React context.
import Context from "../Context";
// import firebase authentication and real time database.
import { auth, realTimeDb, } from "../firebase";
// import validator to validate user's credentials.

function PreviousRides() {
  const { user, setUser } = useContext(Context);

  let rides;
  let keys;
    // if(user){
    //   realTimeDb.ref().child(`rides`).on("value", function(snapshot) {
    //       const val = snapshot.val();
    //       if (val) {
    //          keys = Object.values(val);
    //         console.log(keys,"rides");
    //       }});
    //      rides=keys.filter((obj)=>{
    //         if(obj.requestor.email===user.email){
    //           return true;
    //         }
    //         return false;
    //       })
        
    //     console.log(rides,"filtered rides");
    //     }


  return ( 
  <div>
  </div> );
}

 export default PreviousRides;