import React, { useEffect, useState } from 'react';
import bgImage from '../../images/Bg.png';
import Vehicle from '../Vehicle/Vehicle';
import vehicleInfo from '../../fakeData/vehiclesInfo.json';

const Home = () => {
    const [vehicles, setVehicles] = useState([])
    useEffect(() =>{
        setVehicles(vehicleInfo)
    },[])
    const styles = {
        display: 'flex',
        minHeight: '100vh',
        width:'100%',
        backgroundImage:`url(${ bgImage})`,
        backgroundSize: 'cover',
        backgroundRepeat:'noRepeat',
        
    }
    
    return (
        <div style={styles} className="justify-content-center">
            <div style={{marginTop:'200px'}} className="row">
            {
               vehicles.map(vehicle => <Vehicle key={vehicle.name} vehicle={vehicle}></Vehicle>)
           }
            </div>
          
        </div>
        
    );
};

export default Home;