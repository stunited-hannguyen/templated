import React from 'react';
import PropTypes from 'prop-types';
import avatar from "./../assets/image/han.jpg"
import { useState } from 'react';

CVContent.propTypes = {
  
};

function CVContent(props) {
  const {listInfo,fullname,position,date_of_birth,email,address,phone ,github ,facebook ,linkein} = props ;
  const [workExperience, setWorkExperience] = useState([
     {  
              id : "1",
              name_of_project :"React js",
              start_day : "10/10/2021",
              end_day : "24/12/2021",
              describe_project : "Todolist",
              role : "dev",
              technology_used : "react js , PHP", 
    }
  ]);
  console.log(workExperience);

  return (
    <>
    <div className="CV-details-content">
     <div className="CV-header">
      <img src={avatar}></img>
    
     
     </div>

     <div className="CV-main">
        <div className="CV-main-left">
            <div className="info-user">
              <h1><strong>{fullname}</strong></h1>
                <h3>{position}</h3>
            </div>

            <div className="contact-details">
              <h3><strong>CONTACT</strong></h3>
              <ul>
                <li><i className="far fa-envelope"></i><span>{email}</span></li>
                <li><i className="fas fa-birthday-cake"></i><span>{date_of_birth}</span></li>
                <li><i className="fas fa-phone"></i><span>{phone}</span></li>
                <li><i className="fas fa-map-marker-alt"></i><span>{address}</span></li>
                <li><i className="fab fa-github"></i><span>{github}</span></li>
                <li><i className="fab fa-facebook"></i><span>{facebook}</span></li>
                <li><i className="fab fa-linkedin"></i><span>{linkein}</span></li>
              </ul>
            </div>
            <div className="skills-details">
            <h3><strong>SKILLS</strong></h3>
              <ul>
                <li>
                  <div className="skills-details-items">
                    <span>React js</span>
                    <div className="skills-details-steps"></div>
                  </div>
                  <div className="skills-details-items">
                    <span>Angular js</span>
                    <div className="skills-details-steps"></div>
                  </div>
                  <div className="skills-details-items">
                    <span>Vue js</span>
                    <div className="skills-details-steps"></div>
                  </div>
                </li>
              </ul>
            </div>
            

         </div>
        <div className="CV-main-right">
            { listInfo.map((item,index)=>(
                      <div className="CV-main-right-item">
              <div>
                <div className="label">
                <i className="fas fa-suitcase"></i> 
                <span>{item.name}</span>
                </div>
                <div className="boder">
                    <div className="info">
                    <h4>From {item.start_day} to {item.end_day}</h4>
                    <h4>{item.role}</h4>
                    <h5>Comopany name</h5>
                    <h5>{item.describe_project}</h5>
                    </div>
                </div>
                </div>
            </div>
            ))}
            {/* <div className="CV-main-right-item">
              <div>
                <div className="label">
                <i className="fas fa-graduation-cap"></i>
                <span>EDUCATION</span>
                </div>
                <div className="boder">
                    <div className="info">
                    <h4>From Jun 2018 to July 2020</h4>
                    <h4>Major</h4>
                    <h5>Schools name</h5>
                    </div>
                </div>
                </div>
            </div> */}
        </div>
      </div>
      
    </div>
    <div className="CV-main">
      <div className="CV-main-education">

        
      </div>
    </div>
    </>

  );
}

export default CVContent;