import React, { useContext } from 'react'
import { Button} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../Context';
const Home = () => {
const {state,logout}=useContext(AuthContext)
const router=useNavigate()

const handleExit=()=>{
  logout()
  router('/login')
  }
  return (
    <div className='home' >
    <h1 className='home-text'>Online Lecture Schedulling</h1>
    <ul className='home-list'>
      <li>Lecture Schedulling</li>
      <li>Aligned Schedules</li>
    </ul>
    {
      state?.user ?
    <Button mt={5} mr={10} colorScheme='pink' onClick={handleExit}>Logout</Button>:
    <Button mt={5} mr={10} colorScheme='pink' onClick={()=>{router('/login')}}>Login/Register</Button>
    }
    </div>
  )
}

export default Home
