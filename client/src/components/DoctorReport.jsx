import { useEffect, useState } from "react";
import { EditDoctorReport, useAuthDispatch, useAuthState } from "../Context";
import { doctorReport } from "../Context";
import { Navigation } from "./Navigation";
const DoctorReport = (props) => {
  const initialState = {
    dateCreated: "",
    lastModified: "",
    name: "",
    dateofbirth: "",
    sex: "",
    blood_group: "",
    consultant: "",
    complications: "",
    consultantWord: "",
    allergies: "",
    medicines: "",
    errMessage: "",
    successMessage: "",
    allocateBed: false,
    bedAllocated: 0,
  };
  const dispatch = useAuthDispatch(),
    { token, loading } = useAuthState();
  const [state, setState] = useState(initialState);

  const update = async () => {
    const data = await EditDoctorReport(dispatch, {
      token: "doctor " + token,
      patientId: localStorage.getItem("patientId"),
      consultantWord: state.consultantWord,
      medicines: state.medicines,
      bedAllocated: state.allocateBed,
    });
    if (data && data.success) {
      setState({
        ...state,
        successMessage: "Report Updated Successfully!",
        errorMessage: "",
      });
      window.location.reload(false);
    } else {
      setState({
        ...state,
        errorMessage: "Something went wrong!" || data.msg,
        successMessage: "",
      });
    }
  };
  useEffect(async () => {
    const patientId = localStorage.getItem("patientId");
    if (Boolean(patientId)) {
      const data = await doctorReport(dispatch, {
        token: "doctor " + token,
        patientId: patientId,
      });
      if (data && data.success) {
        setState(data.report);
      }
    } else {
      props.history.push("/patientlist");
    }
  }, []);
  const handleOnChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
      successMessage: "",
      errMessage: "",
      allocateBed:
        event.target.name === "allocateBed"
          ? !state.allocateBed
          : state.allocateBed,
    });
  };
  if (!loading && state.name === "") {
    return (
      <div>
        <Navigation homelink="/doctor" active="report" />
        <div className="container">
          <div className="row mt-5"></div>
          <div className="row mt-5"></div>
          <div className="row mt-md-5"></div>
          <div className="row mt-md-5"></div>
          <div className="row m-2">
            <div className="col-md-6 offset-md-3 visit-card p-5">
              <div className="row">
                <div className="col-md-8 offset-md-2"></div>
              </div>
              <div className="row">
                <div className="col-md-8 offset-md-2 text-bold">
                  No Report Created Yet 😊
                </div>
              </div>
              <div className="row">
                <div className="col-md-8 offset-md-2"></div>
              </div>
            </div>
          </div>
          <div className="row mt-5"></div>
          <div className="row mt-5"></div>
          <div className="row mt-md-5"></div>
          <div className="row mt-md-5"></div>
        </div>
      </div>
    );
  } else
    return (
      <div>
        <Navigation homelink="/doctor" active="report" />
        <div className="container">
          <div className="row m-2 m-md-5">
            <div className="offset-md-2 col-md-8 report p-5 section-to-print">
              <div className="row">
                <div className="col-md-5 hospitalname display-3">HMS</div>
                <div className="col-md-5 offset-md-2">
                  <div className="row mt-3">
                    <div className="col-12 createdon">
                      Date Created: {state.dateCreated.split("T")[0]}
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-12 lastmodified">
                      Last Modified: {state.lastModified.split("T")[0]}
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row mt-3">
                <div className="col-5">{state.name}</div>
                <div className="col-4">
                  DOB: {state.dateofbirth.split("T")[0]}
                </div>
                <div className="col-3">{state.sex}</div>
              </div>

              <hr />
              <div className="row mt-3">
                <div className="col-6">
                  <strong>Blood Group:</strong> {state.blood_group}
                </div>
                <div className="col-6">
                  <strong>Consultant:</strong> {state.consultant}
                </div>
              </div>
              <div className="row">
                <div className="col-12 text-justify mt-4">
                  <strong>Complications: </strong> {state.complications}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 text-justify mt-4">
                  <div className="form-group">
                    <label htmlFor="consultantWord">
                      <strong>Consultats's Word: </strong>
                    </label>
                    <textarea
                      className="form-control"
                      id="consultantWord"
                      name="consultantWord"
                      rows="3"
                      onChange={handleOnChange}
                      value={state.consultantWord}
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-6 text-justify mt-4">
                  <div className="form-group">
                    <label htmlFor="medicines">
                      <strong>Medicines: </strong>
                    </label>
                    <textarea
                      className="form-control"
                      id="medicines"
                      name="medicines"
                      rows="3"
                      onChange={handleOnChange}
                      value={state.medicines}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-8">
                  <strong>Allergies:</strong> {state.allergies}
                </div>
                <div className="col-md-4">
                  <input
                    type="checkbox"
                    name="allocateBed"
                    id="allocateBed"
                    className="m-2"
                    checked={state.allocateBed}
                    onChange={handleOnChange}
                  />
                  <label htmlFor="allocateBed">
                    {state.bedAllocated > 0
                      ? "Allocated Bed " + state.bedAllocated
                      : "Allocate Bed"}
                  </label>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-9">
                  <small className="text-danger">{state.errorMessage}</small>
                  <small className="text-success">{state.successMessage}</small>
                </div>
                <div className="col-md-3">
                  <button className="btn btn-primary" onClick={update}>
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default DoctorReport;
