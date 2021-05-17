import "./App.css";
import "antd/dist/antd.css";
import React from "react";
import { useState, createRef } from "react";
import FormContact from "./components/FormContact";
import { Button, message, Steps } from "antd";
import FormSkills from "./components/FormSkills";
import FormEducation from "./components/FormEducation";
import FormExpirence from "./components/FormExpirence";
import CVContent from "./components/CVContent";
import Languages from "./components/Languages";
import ReactToPdf from "react-to-pdf";
import {
  PDFViewer,
  PDFDownloadLink,
  Document,
  Page,
} from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";
import Quixote from "./components/Quixote";
import Recaptcha from "react-recaptcha";
import { jsPDF } from "jspdf";
import FormOther from "./components/FormOther";
import { DownloadOutlined } from "@ant-design/icons";
// import Steps from './components/Steps';

const { Step } = Steps;

function App() {
  const [current, setCurrent] = useState(0);
  const [contact, setContact] = useState({});
  const [isShowForm, setIsShowForm] = useState(false);
  const [position, setPosition] = useState("");
  const [steps, setSteps] = useState([
    {
      title: "Contact",
      content: <FormContact />,
      isDelete: false,
    },
    {
      title: "Skills",
      content: <FormSkills />,
      isDelete: false,
    },
    {
      title: "Education",
      content: <FormEducation />,
      isDelete: false,
    },
    {
      title: "Expirence",
      content: <FormExpirence />,
      isDelete: false,
    },
  ]);
  const [listInfo, setListInfo] = useState([
    {
      name: "EXPERIENCE",
      isDelete: false,
    },
    {
      name: "EDUCATION",
      isDelete: false,
    },
  ]);
  const ref = createRef();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  console.log(steps);
  console.log(contact, "contact");
  const recaptchaCallback = () => {
    console.log("reacpcah sucess loaded");
  };
  const verifyCallback = (res) => {
    if (res) {
      console.log("verify susscess");
    }
  };
  const closeModal = () => {
    setIsShowForm(false);
    document.removeEventListener("click", closeModal);
  };
  const onHandleClick = (e) => {
    if (isShowForm) {
      closeModal();
      return;
    }
    setIsShowForm(!isShowForm);
    e.stopPropagation();
    document.addEventListener("click", closeModal);
  };

  const onHandleFormClick = (e) => {
    setSteps([...steps, { title: e, content: "", isDelete: true }]);
    setListInfo([...listInfo, { name: e, isDelete: true }]);
  };
  console.log(listInfo);
  const onChange = (current) => {
    console.log("onChange:", steps[current].title);
    setCurrent(current);
  };
  const onClickDeleteForm = (title) => {
    if (steps[current].isDelete) {
      console.log(title, "title");
      const removedArr = [...steps].filter((step) => step.title !== title);
      const removedCV = [...listInfo].filter((item) => item.name !== title);
      setSteps(removedArr);
      setListInfo(removedCV);
      setCurrent(current - 1);
    }
  };
  return (
    <div>
      <Languages />
      <div className="main-content container">
        <div className="steps">
          <div className="content-steps">
            <h3>Content</h3>
            <Button onClick={onHandleClick}>+</Button>
          </div>
          <Steps
            direction="vertical"
            current={current}
            className="Steps"
            responsive="true"
            onChange={onChange}
            percent="20"
          >
            {steps.map((item) => (
              <Step
                className="step-style"
                key={item.title}
                title={item.title}
              />
            ))}
          </Steps>

          {steps.length > 4 ? (
            <div
              className={
                steps[current].isDelete
                  ? "steps-delete"
                  : "steps-delete-opacity"
              }
            >
              <i
                onClick={() => onClickDeleteForm(steps[current].title)}
                class="fas fa-trash-alt"
              ></i>
            </div>
          ) : (
            ""
          )}

          {isShowForm ? (
            <FormOther onHandleFormClick={onHandleFormClick} />
          ) : (
            ""
          )}
        </div>
        <div className="form-content">
          <div className="form-content-item">
            <FormContact
              setContact={setContact}
              setPosition={setPosition}
              contact={contact}
            />
          </div>
          <div className="steps-action">
            {current < steps.length - 1 && (
              <Button type="primary" size="large" onClick={() => next()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                size="large"
                // onClick={(token) => onHandleCapcha(token)}
              >
                Done
              </Button>
            )}
            {current > 0 && (
              <Button
                size="large"
                style={{ margin: "0 8px" }}
                onClick={() => prev()}
              >
                Previous
              </Button>
            )}
            {current === steps.length - 1 && (
              <ReactToPdf targetRef={ref} filename="CV.pdf">
                {({ toPdf }) => (
                  <Button
                    size="large"
                    icon={<DownloadOutlined />}
                    type="primary"
                    onClick={toPdf}
                  >
                    Export PDF
                  </Button>
                )}
              </ReactToPdf>
            )}
            {/* <Recaptcha
                sitekey="6Lcuc9QaAAAAACbiIrV_5CwZ7PHntCli9A8epXMl"
                render="explicit"
                onloadCallback={recaptchaCallback()}
                verifyCallback={verifyCallback}
            /> */}
          </div>
        </div>

        <div className="cv-content" ref={ref}>
          <CVContent
            listInfo={listInfo}
            fullname={contact.fullname}
            position={position}
            date_of_birth={contact.date_of_birth}
            email={contact.email}
            address={contact.address}
            phone={contact.phone}
            github = {contact.github}
            facebook={contact.facebook}
            linkein={contact.linkein}
          ></CVContent>
        </div>
      </div>
      <div>

      </div>
    </div>
  );
}

export default App;
