import { useState } from "react";
import {
  createAuthUserWithEmaiAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";


const defaultFormFields = {
  displayName: "",
  email: "",
  pass: "",
  confirmPass: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, pass, confirmPass } = formFields;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (pass !== confirmPass) {
      alert("passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmaiAndPassword(email, pass);
      console.log({ user });
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use.");
      } else {
        console.log("user creation encountered an error:", error);
      }
    }
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className="sign-up-container">
      <h2>Don't have an account.</h2>
      <span>Sign up with your email and pass.</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          inputOptions={{
            type: "text",
            required: true,
            onChange: handleChange,
            name: "displayName",
            value: displayName,
          }}
        />
        <FormInput
          label="Email"
          inputOptions={{
            type: "email",
            required: true,
            onChange: handleChange,
            name: "email",
            value: email,
          }}
        />
        <FormInput
          label="Pass"
          inputOptions={{
            type: "password",
            required: true,
            onChange: handleChange,
            name: "pass",
            value: pass,
          }}
        />
        <FormInput
          label="Confirm Pass"
          inputOptions={{
            type: "password",
            required: true,
            onChange: handleChange,
            name: "confirmPass",
            value: confirmPass,
          }}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
