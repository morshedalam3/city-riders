import React, { useEffect, useState } from 'react';
import dsImg from '../../images/Map.png';
import fakeData from '../../fakeData/vehiclesInfo.json';
import { useParams } from 'react-router';

const Destination = () => {
  const[isShow, setShow] = useState(false);
  const[search, setSearch] = useState()
  const {name} = useParams();

  const vehicle = fakeData.find(pd => pd.name === name);

    const style = {
        backgroundImage:`url(${ dsImg})`,
        minHeight: '100vh',
        backgroundRepeat: 'no-repeat'
    }

const handleSearch = (e) => {
  if(isShow.from && isShow.to){
    setShow(true);
  }

  e.preventDefault();
} 
    return (
        <div className="row">
       <div className="col-md-4">
       <form onSubmit={handleSearch} className="container">
       <label for="inputsm">Pick from</label>
       <input className="form-control" type="search" name="from" id="" placeholder="search"/>
         <label for="inputsm">Pick to</label>
         <input className="form-control" type="search" name="to" id="" placeholder="search"/> 
         
          { isShow &&
           <div className="p-3 border row mt-5">
             <img src={vehicle.imagUrl} style={{width:'15%'}}/>
             <h3 className="ms-5 p-3">{vehicle.name}</h3>
             <div className=" row ms-5 p-3">
               <img src={vehicle.icon}style={{width:'40%'}} alt=""/>
               <h3>{vehicle.seat}</h3>
             </div>
            
              <h4 className="ms-5 p-3"> {vehicle.rent}$</h4>
             </div>
           
           }
         
         <button onClick={() =>setShow(!isShow)}>search</button>
       </form>
       </div>
       <div className="col-md-8 justify-content end" style ={style}>
           

       </div>
      </div>
    
       
    );
};

export default Destination;