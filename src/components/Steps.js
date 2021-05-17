import React from "react";
import PropTypes from "prop-types";

Steps.propTypes = {};

function Steps(props) {
  return (
    <div className="steps-main">
      <ul>
        <li>
          <div className="steps-main-item">
            <i class="fas fa-step-forward"></i>
            <span>Contact</span>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Steps;
