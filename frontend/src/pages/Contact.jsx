import React from 'react'
import Layout from '../components/Layout/Layout'
import SendIcon from '@mui/icons-material/Send';
import CallIcon from '@mui/icons-material/Call';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const Contact = () => {
  return (
    <Layout>
      <div className='row contactus'>
        <div className='col-md-6'>
            <img src="/images/contactus.jpeg" alt="contactus" style={{width:"100%"}}></img>
        </div>
        <div className='col-md-4'>
          <h1 className='bg-dark p-2 text-white text-center'>CONTACT US</h1>
          <p className='text-justify mt-2'>
            any query and info about product feel free to call anytime we are available 24*7
          </p>
          <p className="mt-3">
            <SendIcon/> : www.help@simplify.com
          </p>
          <p className="mt-3">
            <CallIcon/> : 9138128198
          </p>
          <p className="mt-3">
            <HelpOutlineIcon/> : 9138128198
          </p>

        </div>
      </div>
    </Layout>
  )
}

export default Contact
