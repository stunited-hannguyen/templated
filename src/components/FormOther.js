import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react/cjs/react.development';

FormOther.propTypes = {
    onHandleFormClick : PropTypes.func,
};

function FormOther({onHandleFormClick}) {
  const [formOrther, setFormOrther]= useState([
      {
        name : "Activities",
        icon : <i class="fas fa-snowboarding"></i>
      },
      {
        name : "Certifications",
        icon :<i class="fas fa-book-open"></i>
      },
      {
        name : "Honors & awards",
        icon : <i class="fas fa-award"></i>
      },
      {
        name : "References",
        icon : <i class="fas fa-asterisk"></i> 
      },
      {
        name : "Interest",
        icon :<i class="far fa-futbol"></i> 
      },

  ])

  return (
    <div className="form-orther-popup">
        <div className="label-form-orther"><span>Choose form other</span></div>
        <div id="form-orther">   
           <ul>
             {formOrther.map(form=>( <li onClick={()=>onHandleFormClick(form.name)}> {form.icon} <div className="item"><span>{form.name}</span><h5>Activities</h5></div></li>
            ))}
         
          </ul>
        </div>
    </div>
  );
}

export default FormOther;
