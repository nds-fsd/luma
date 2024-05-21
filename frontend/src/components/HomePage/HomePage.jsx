import NavBar from '../home/NavBar/NavBar'
import Footer from '../home/Footer/Footer'
// import MyEvent from './MyEvent/MyEvent'
import EditEventFormContainer from './EditEventFormContainer/EditEventFormContainer'


const HomePage = () => {
    return (
        <div>
<NavBar />
{/* <MyEvent/> */}
<EditEventFormContainer/>
<Footer/>

        </div>
    )
}
export default HomePage;
