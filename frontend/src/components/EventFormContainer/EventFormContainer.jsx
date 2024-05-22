import { useState } from 'react';
import EventForm from './EventForm/EventForm';
import Styles from './EventFormContainer.module.css'

const EventFormContainer = () => {

    const themes = {
        violet: {
            backgroundColor: 'rgb(199, 159, 236)',
            buttonColor: {
                backgroundColor: 'blueviolet',
                borderColor: 'blueviolet'
            }
        },
        pink: {
            backgroundColor: 'rgb(255,192,203)',
            buttonColor: {
                backgroundColor: 'rgb(255, 0, 208)',
                borderColor: 'rgb(255, 0, 208)'
            }
        },
        gold: {
            backgroundColor: 'rgb(242, 217, 75)',
            buttonColor: {
                backgroundColor: 'brown',
                borderColor: 'brown'
            }
        },
        orange: {
            backgroundColor: 'rgb(216, 118, 82)',
            buttonColor: {
                backgroundColor: 'orangered',
                borderColor: 'orangered'
            }
        },
        green: {
            backgroundColor: 'rgb(156, 216, 82)',
            buttonColor: {
                backgroundColor: 'green',
                borderColor: 'green'
            }
        }
            
        }
    
    const [backgroundColor, setBackgroundColor] = useState('rgb(199, 159, 236)');
    const [buttonColor, setButtonColor] = useState(themes.violet.buttonColor)

    const handleColorChange = (color) => {
        setBackgroundColor(themes[color].backgroundColor);
        setButtonColor(themes[color].buttonColor)
    };

    return (
        <div className={Styles.container} style={{ backgroundColor }}>
            <EventForm
                onColorChange={handleColorChange}
                backgroundColor={backgroundColor}
                buttonColor={buttonColor}
            />
        </div>
    )
}
export default EventFormContainer;