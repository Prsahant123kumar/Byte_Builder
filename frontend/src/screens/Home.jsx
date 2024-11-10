import React from 'react'
import { useNavigate,Link } from 'react-router-dom'
const Home = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const ChangeLogout = () => {
    localStorage.clear();
    navigate('/');
  }
  return (
    <>
        <Link className='header'>
          {auth ? <>
            {auth ? (<><Link onClick={ChangeLogout} to="/"><ul className='h'>Logout</ul></Link><Link to="/CreateContest" >CreateContest</Link> <Link to="/Participants">Participate</Link> </>) : (<> <Link to="/SignUp"><ul className='h'>Sign up</ul></Link><Link to="/Login"><ul className='h'>Login</ul></Link> </>)}
          </> : <> <Link to="/SignUp"><ul className='h'>Sign up</ul></Link><Link to="/Login"><ul className='h'>Login</ul></Link> </>}
          
        </Link>
      
    </>

  )
}

export default Home
