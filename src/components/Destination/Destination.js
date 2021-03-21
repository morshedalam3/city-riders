import React, { useState } from 'react';
import fakeData from '../../fakeData/vehiclesInfo.json';
import { useParams } from 'react-router-dom';
import MyComponent from './MyComponent';




const Destination = () => {

  const [clicked, setClicked] = useState(true);

  const [place, setPlace] = useState({
    from: '',
    to: '',
  });

  const { name } = useParams();

  const vehicle = fakeData.find(pd => pd.name === name);

  const handleBlur = (event) => {
    const newField = { ...place };
    newField[event.target.name] = event.target.value;
    setPlace(newField);
  }

  const handleSubmit = (e) => {

    setClicked(!clicked)

    e.preventDefault();
  }
  return (

    <div className="row">
      <div className="col-md-4">

        {
          clicked ? <form className="container" onSubmit={handleSubmit}>
            <label for="date">Date</label>
            <input onBlur={handleBlur} type="date" id="birthday" name="date"></input> <br/>
            <label for="inputsm">Pick from</label>
            <input className="form-control" onBlur={handleBlur} type="search" name="from" placeholder="search" />
            <label for="inputsm">Pick to</label>
            <input className="form-control" onBlur={handleBlur} type="search" name="to" placeholder="search" /> <br />
            <input className="form-control bg-success" type="submit" value="submit" />
          </form>

            : <div style={{ marginLeft: '20px' }}>
              <p>Date: {place.date}</p>
              <p>From: {place.from}</p>
              <p> To: {place.to}</p>

              <div className="p-3 border row mt-5">
                <img src={vehicle.imagUrl} style={{ width: '15%' }} />
                <h3 className="ms-5 p-3">{vehicle.name}</h3>
                <div className=" row ms-5 p-3">
                  <img src={vehicle.icon} style={{ width: '40%' }} alt="" />
                  <h3>{vehicle.seat}</h3>
                </div>
                <h4 className="ms-5 p-3"> {vehicle.rent}$</h4>
              </div>
            </div>
        }
      </div>
      <div className="col-md-8">
        <div>
        <MyComponent/>
        </div>

      </div>
    </div>


  );
};

export default Destination;

