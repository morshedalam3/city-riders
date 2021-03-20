import React, { useState } from 'react';
import fakeData from '../../fakeData/vehiclesInfo.json';
import { useParams } from 'react-router';


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
            <label for="inputsm">Pick from</label>
            <input className="form-control" onBlur={handleBlur} type="search" name="from" placeholder="search" />
            <label for="inputsm">Pick to</label>
            <input className="form-control" onBlur={handleBlur} type="search" name="to" placeholder="search" /> <br />
            <input className="form-control bg-success" type="submit" value="submit" />
          </form>

            : <div style={{ marginLeft: '20px' }}>
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
          {/* when i use iframe ,the whole destination page is hide. thats why i comment this map */}

          {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58403.62358099772!2d90.32726120109498!3d23.81054442362165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0c1c61277db%3A0xc7d18838730e2e59!2sMirpur%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1616244828418!5m2!1sen!2sbd" width="400" height="300" style="border:0;" allowfullscreen></iframe> */}
        </div>

      </div>
    </div>


  );
};

export default Destination;

