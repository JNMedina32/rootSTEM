import React, { useState, useContext } from "react";
import { UserContext } from "../App";
import { fetchPostHook } from "../assets/hooks/fetchPostHook";
import {
  FormComp,
  learnerDefinitions,
} from "../assets/styles/react-bootstrap.js";
import { useNavigate } from "react-router";

export default function UserAppSettings() {
  const { user, dispatch, ACTIONS } = useContext(UserContext);
  const { preferences, learner } = user;
  const { Form, Button } = FormComp;
  const [filterSettings, setFilterSettings] = useState(() => {
    return Object.keys(preferences).map((key) => {
      return { name: key, value: preferences[key] };
    });
  });
  const [learnerSetting, setLearnerSetting] = useState(learner);
  const navigate = useNavigate();


  const handleChange = (index) => {
    const settingsChange = [...filterSettings];
    settingsChange[index].value = !settingsChange[index].value;
    setFilterSettings(settingsChange);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSettings = filterSettings.map((pref) => {
      return { name: pref.name, value: pref.value };
    });
    const body = {
      preferences: newSettings,
      learner: learnerSetting,
    };
    console.log("from UserAppSettings body:", body);
    fetchPostHook(ACTIONS, dispatch, "/userAccount/app-settings", body);
    navigate("/");
  };

  //console.log("from UserAppSettings filterSettings:", filterSettings);
  //console.log("from UserAppSettings learnerSetting:", learnerSetting);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Label>
        <h4>STEM Fields:</h4>
        <p>Select from which categories you would like to see videos</p>
        <p>All unchecked is the same as all checked</p>
      </Form.Label>
      <div key={`inline-checkbox`} className="mb-3">
        {filterSettings.map((pref, index) => (
          <Form.Check
            inline
            key={index}
            label={pref.name.charAt(0).toUpperCase() + pref.name.slice(1)}
            name={pref.name}
            type="switch"
            id={`inline-switch-${index}`}
            checked={pref.value}
            value={pref.value}
            onChange={() => handleChange(index)}
          />
        ))}
      </div>
      <Form.Label>
        <h4>rootS Learner Type:</h4>
      </Form.Label>

      <div className="">
        <Form.Select
          aria-label="rootS Learner Type"
          name="learner"
          value={learnerSetting}
          onChange={(e) => setLearnerSetting(e.target.value)}
        >
          <option value="Seedling">Seedling</option>
          <option value="Sprout">Sprout</option>
          <option value="Sapling">Sapling</option>
          <option value="Branching">Branching</option>
          <option value="Full Bloom">Full Bloom</option>
        </Form.Select>
      </div>
      <div className="col">{learnerDefinitions(learnerSetting)}</div>
      <Button variant="primary" type="submit">
        Change Settings
      </Button>
    </Form>
  );
}
