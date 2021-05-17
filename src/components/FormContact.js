import React, { useState, useEffect } from "react";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";

import {
  Button,
  Form,
  Input,
  Select,
  Cascader,
  DatePicker,
  Rate,
  InputNumber,
  TreeSelect,
  Switch,
  AutoComplete,
  Upload,
  Modal,
  Progress
} from "antd";
import axios from "axios";
const { Option } = Select;
const config = {
  rules: [{ type: "object", required: true, message: "Please select time!" }],
};
const normFile = (e) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

function FormContact({ setContact, setPosition }) {
  const [autoCompleteResult, setAutoCompleteResult] = useState();
  const [fullname, setFullname] = useState("");
  const [dateOfBirth, setDayOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [github, setGithub] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkein, setLinkein] = useState("");



  const [defaultFileList, setDefaultFileList] = useState([]);
  const [progress, setProgress] = useState(0);

  const uploadImage = async options => {
    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: event => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      }
    };
    fmData.append("image", file);
    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        fmData,
        config
      );

      onSuccess("Ok");
      console.log("server res: ", res);
    } catch (err) {
      console.log("Eroor: ", err);
      const error = new Error("Some error");
      onError({ err });
    }
  };

  const handleOnChange = ({ file, fileList, event }) => {
    // console.log(file, fileList, event);
    //Using Hooks to update the state to the current filelist
    setDefaultFileList(fileList);
    //filelist - [{uid: "-1",url:'Some url to image'}]
  };

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };

  useEffect(() => {
    setContact({
      fullname: fullname,
      date_of_birth: dateOfBirth,
      email: email,
      address: address,
      phone:phone,
      github : github ,
      facebook : facebook ,
      linkein : linkein,
    });
  }, [fullname, dateOfBirth, email, address,phone,github,facebook,linkein]);

  const handleChange = (e) => {
    setPosition(e);
  };


 

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="84">+84</Option>
        <Option value="86">+86</Option>
      </Select>
    </Form.Item>
  );

  return (
    <>
      <div className="form-title">
        <i class="far fa-address-card"></i>
        <span>CONTACT</span>
      </div>

      <Form
        className="form-des"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 18 }}
        labelAlign="left"
        size="large"
      >
        <Form.Item
          name="username"
          label="Full name"
          rules={[
            {
              required: true,
              message: "Please input your full name",
            },
          ]}
        >
          <Input
            placeholder="Please input your full name"
            onChange={(e) => {
              setFullname(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="select"
          label="Select"
          hasFeedback
          rules={[{ required: true, message: "Please select your position!" }]}
        >
          <Select
            placeholder="Please select a position"
            onChange={(e) => handleChange(e)}
          >
            <Option value="InternShip">InternShip</Option>
            <Option value="Fresher PHP">Fresher PHP</Option>
            <Option value="Hr">Hr Manager</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Date of birth"
          name="Dateofbirth"
          rules={[
            {
              required: true,
              message: "Please input your birthday",
            },
          ]}
        >
          <Input
            placeholder="Please input your birthday"
            onChange={(e) => setDayOfBirth(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="Address"
          label="Address"
          rules={[
            {
              required: true,
              message: "Please input your address",
            },
          ]}
        >
          <Input
            placeholder="Please input your address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="upload"
          label="Avatar"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            name="logo"
            action="/upload.do"
            listType="picture"
            customRequest={uploadImage}
            onChange={handleOnChange}
            defaultFileList={defaultFileList}
            // onPreview={handlePreview}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
          {progress > 0 ? <Progress percent={progress} /> : null}
     
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input  style={{ width: "100%" }}  onChange={(e)=>setPhone(e.target.value)}/>
        </Form.Item>
        <Form.Item
          name="Link-github"
          label="Link github"
          rules={[{ required: true, message: "Please input link github!" }]}
        >
          <AutoComplete onChange={onWebsiteChange} placeholder="">
            <Input  maxLength="30" onChange={(e)=>setGithub(e.target.value)}/>
          </AutoComplete>
        </Form.Item>{" "}
        <Form.Item
          label="Link facebook"
          rules={[{ required: true, message: "Please input link facebook!" }]}
        >
          <AutoComplete onChange={onWebsiteChange} placeholder="">
            <Input onChange={(e)=>setFacebook(e.target.value)}/>
          </AutoComplete>
        </Form.Item>
        <Form.Item
          label="Link Linkein"
          rules={[{ required: true, message: "Please input link Linkein!" }]}
        >
          <AutoComplete onChange={onWebsiteChange} placeholder="">
            <Input onChange={(e)=>setLinkein(e.target.value)}/>
          </AutoComplete>
        </Form.Item>
      </Form>
    </>
  );
}

export default FormContact;
