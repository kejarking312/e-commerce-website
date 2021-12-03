import React from 'react'

const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='project-creaters-div'>
        <p className='project-creators-p'>A project by Shahrukh Hughes</p>
      </div>
      <div className='project-creators-social-media'>
        <p>
          Shahrukh Hughes{' '}
          <a target="_blank" rel="noreferrer" href="https://github.com/Shak-H"><img 
            src="https://1000logos.net/wp-content/uploads/2021/05/GitHub-logo.png" 
            width="35px"
            height="25px" /></a>
          
          <a
            target="_blank" rel="noreferrer"
            href="https://www.linkedin.com/in/shahrukh-hughes-87603232/"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              width="35px"
              height="25px"
            />
          </a>
        </p>
      </div>
    </div>
  )
}

export default Footer