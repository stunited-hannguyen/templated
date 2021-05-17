import React from 'react';
import PropTypes from 'prop-types';
import {Button} from "antd";
import vn from "./../assets/image/vn.png"
import gb from "./../assets/image/gb.png"


Languages.propTypes = {
  
};

function Languages(props) {
  return (
    <div className="languages-button">
      <img className="logo" src="https://stunited.vn/wp-content/uploads/2019/09/stunited-e15650013362301.png"></img>
      <div>
      <button><img src={vn}></img></button>
      <button><img src={gb}></img></button>
      </div>
    </div>
  );
}

export default Languages;