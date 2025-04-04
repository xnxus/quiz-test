import React, { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import styles from "./Registration.module.css";

interface Answer {
  question: string;
  answer: string;
}

interface RegistrationProps {
  answers: Answer[];
}

const Registration: React.FC<RegistrationProps> = ({ answers }) => {
  const [surveyCompleted, setSurveyCompleted] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    answers: answers,
  });
  const [errors, setErrors] = useState({ name: "", email: "", phone: "" });

  const validate = () => {
    let valid = true;
    let newErrors = { name: "", email: "", phone: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (phone: string) => {
    setFormData((prev) => ({ ...prev, phone }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      console.log("Submitting data:", formData);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Registration successful (mocked)!");
      } else {
        alert("Failed to register. Try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      {surveyCompleted ? (
        <form onSubmit={handleSubmit} className={styles.registrationBox}>
          <h2 className={styles.registrationTitle}>Registration</h2>
          <label>
            <h3 className={styles.registrationSubTitle}>Name:</h3>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.inputField}
            />
            {errors.name && <p className={styles.errorText}>{errors.name}</p>}
          </label>
          <label>
            <h3 className={styles.registrationSubTitle}> Email:</h3>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.inputField}
            />
            {errors.email && <p className={styles.errorText}>{errors.email}</p>}
          </label>
          <label>
            <h3 className={styles.registrationSubTitle}> Phone:</h3>
            <PhoneInput
              defaultCountry="UA"
              value={formData.phone}
              onChange={handlePhoneChange}
              className={styles.inputField}
            />
            {errors.phone && <p className={styles.errorText}>{errors.phone}</p>}
          </label>
          <button type="submit" className={styles.submitButton}>
            Register
          </button>
        </form>
      ) : (
        <div className={styles.surveyBox}>
          <h2 className={styles.surveyTitle}>Complete the Survey</h2>
          <button
            onClick={() => setSurveyCompleted(true)}
            className={styles.surveyButton}
          >
            Finish Survey
          </button>
        </div>
      )}
    </div>
  );
};

export default Registration;
