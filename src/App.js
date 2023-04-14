import React, {useState, useRef, useEffect, ChangeEvent} from 'react';
import Tilt, {OnMoveParams} from 'react-parallax-tilt';
import './App.css';

function App() {

    const [tiltData,
        setTiltData] = useState({
        tiltAngleX: 0,
        tiltAngleY: 0,
        tiltAngleXPercentage: 0,
        tiltAngleYPercentage: 0,
        glareAngle: 0,
        glareOpacity: 0
    })

    const [eventDescription,
        setEventDescription] = useState('')

    const [selectedEvents,
        setSelectedEvents] = useState({trackOnMove: true, trackOnEnter: true, trackOnLeave: true})
    const tiltRef = useRef(null);

    const onMove = ({
        eventType,
        ...restEventParams
    }) => {
        if (JSON.stringify(restEventParams) === JSON.stringify(tiltData)) {
            return;
        }

        if (selectedEvents.trackOnMove) {
            setEventDescription(`Event 'onMove' triggered by '${eventType}' event type.`);
        }

        setTiltData(restEventParams);
    }

    const onEnter = (eventType) => {
        if (selectedEvents.trackOnEnter) {
            setEventDescription(`Event 'onEnter' triggered by '${eventType}' event type.`);
        }
    };

    const onLeave = (eventType) => {
        if (selectedEvents.trackOnLeave) {
            setEventDescription(`Event 'onLeave' triggered by '${eventType}' event type.`);
        }
    };

    const toggleCheck = (event) => {
        const {name, checked} = event.target;

        setEvenDescription(null);
        setSelectedEvents((selectedEvents) => ({
            ...selectedEvents,
            [name]: checked
        }));
    };

    return (
      <>
        <div className='header'>
            <h1>React Tilt Animation </h1>
            <h4>Yarden Ish-Shalom</h4>
        </div>
        <div className="App">
            <Tilt
                className='tilt-object'
                onMove={onMove}
                onEnter={onEnter}
                onLeave={onLeave}
                glareEnable={true}
                glareMaxOpacity={0.2}
                glareColor="gray"
                gyroscope={true}>
                <div className="change-content">

                   <div className="data-item">
                      <div>Angle:</div>
                      <div className='item-value'>{tiltData.glareAngle.toFixed(2)}° </div>
                   </div>
                   <div className="data-item">
                        <div>Precent X</div>
                        <div className='item-value'>  {tiltData.tiltAngleXPercentage.toFixed(2)}%</div>
                   </div>
                   <div className="data-item">
                        <div>Precent Y</div>
                        <div className='item-value'>  {tiltData.tiltAngleYPercentage.toFixed(2)}%</div>
                    </div>
                    <div className="data-item">
                        <div>Tilt X:</div>
                        <div className='item-value'> {tiltData.tiltAngleX.toFixed(2)} </div>
                    </div>
                    <div className="data-item">
                        <div>Tilt Y:</div>
                        <div className='item-value'>{tiltData.glareOpacity.toFixed(2)}</div>
                    </div>
                </div>
            </Tilt>

        </div>
      </>
    );
}

export default App;

const tiltStyle = {
    height: 350,
    width: 450,
    border: 'dotted 5px white',
    borderRadius: '32px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}