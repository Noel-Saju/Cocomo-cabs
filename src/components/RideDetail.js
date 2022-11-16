// import useContext.
import { useContext } from 'react';
// import firebase authentication.
import { realTimeDb } from "../firebase";
// import Context
import Context from '../Context';
// import react router. 
import { useHistory } from 'react-router-dom';

function RideDetail(props) { 
  const { user, isDriver, requestRide, currentRide, toggleModal } = props;

  const { setCurrentRide, setIsLoading } = useContext(Context);

  const history = useHistory();

  /**
   * remove ride from storage and context
   */
  const removeRideFromStorageAndContext = () => {
    // remove localStorage.
    localStorage.removeItem('currentRide');
    // remove data from context.
    setCurrentRide(null);
    // reload window 
    window.location.reload();
  }

  const updateRide = (ride) => { 
    // show loading indicator.
    setIsLoading(true);
    // update data on Firebase.
    realTimeDb.ref(`rides/${ride.rideUuid}`).set(ride).then(() => {
      setIsLoading(false);
      removeRideFromStorageAndContext();
    }).catch(() => {
      setIsLoading(false);
    });
  }

  /**
   * cancel ride
   */
  const cancelRide = () => {
    const isCancel = window.confirm('Do you want to cancel this ride?');
    if (isCancel) {
      // update data on Firebase.
      currentRide.status = -1;
    //  return (
    //     <div className="request-ride">
    //       <div className="request-ride__content">
    //         <div className="request-ride__container">
    //           <div className="request-ride__title">Cancel Ride</div>
    //           <div className="request-ride__close">
    //             <img
    //               alt="close"
    //               onClick={() => toggleModal(false)}
    //               src="https://www.flaticon.com/free-icon-font/cross_3917759?related_id=3917759"//https://static.xx.fbcdn.net/rsrc.php/v3/y2/r/__geKiQnSG-.png"
    //             />
    //           </div>
    //         </div>
    //         <div className="request-ride__subtitle"></div>
    //         <div className="request-ride__form">
    //           <p>
    //             Do you want to cancel ride now ?
    //           </p>
    //           <button className="request-ride__btn request-ride__change-btn" onClick={() => toggleModal(false)}>
    //             Change
    //           </button>
    //           <button className="request-ride__btn" onClick={updateRide(currentRide)}>
    //             cancel ride
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   );
    
      updateRide(currentRide);
    }
  
  };
 


  /**
   * finish ride
   */
  const finishRide = () => {
    const isFinish = window.confirm('Do you want to finish this ride?');
    if (isFinish) {
      // update data on Firebase.
      currentRide.status = 2;
      updateRide(currentRide);
    }
  };

  /**
   * talk to user
   */
  const talkToUser = () => {
    history.push('/chat');
  };

  return (
    <div className="ride-detail">
      <div className="ride-detail__user-avatar">
        <img src={user.avatar} alt={user.email} />
      </div>
      <p className="ride-detail__user-info">{user.email} - {user.phone}</p>
      <div className="ride-detail__actions">
        <p className="ride-detail__result-label"><span>From: </span>{currentRide.pickup && currentRide.pickup.label ? currentRide.pickup.label : ''}</p>
        <p className="ride-detail__result-label"><span>To: </span>{currentRide.destination && currentRide.destination.label ? currentRide.destination.label : ''}</p>
        <button className="ride-detail__btn" onClick={talkToUser}>{isDriver ? 'Talk to User' : 'Talk to Driver'}</button>
        <button className="ride-detail__btn" onClick={cancelRide}>Cancel the Ride</button>
        {isDriver && <button className="ride-detail__btn" onClick={finishRide}>Finish the Ride</button>}
      </div>
    </div>
  );
}

export default RideDetail;