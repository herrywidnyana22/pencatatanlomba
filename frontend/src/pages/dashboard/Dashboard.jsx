import React, {useEffect} from 'react'
import { Header, Card, DataContent, Footer } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { aboutMe } from '../../features/authSlice'


const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {isError} = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(aboutMe())
  }, [dispatch])

  useEffect(() => {
    if(isError){
      navigate('/')
    }
  }, [isError, navigate])

  return (
    <div className='container' id='container'>
    <Header/>
    <div className='content'>
      <div className="main-content">
          <Card/>
          <DataContent/>
      </div>
    </div>
    <Footer />
</div>
  )
}

export default Dashboard