import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


const Vehicle = ({vehicle}) => {
    const history = useHistory()
    const handleBook = (name) => {
        history.push(`/destination/${name}`);
    }
    

    return (
        
        <div className="text-center my-3 mx-3">
        <Card className="justify-content-center" style={{ width: '15rem' }}>
                <Card.Img variant="top" src={vehicle.imagUrl} />
                <Card.Body>
                    <Card.Title></Card.Title>
                    <Button  onClick={() => handleBook(vehicle.name)} className="text-center" variant="primary">{vehicle.name}</Button>
                </Card.Body>
            </Card>
            </div>
    );
  }
export default Vehicle;