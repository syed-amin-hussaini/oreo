import React, { useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

function App() {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const phoneInputRef = useRef(null);
  useEffect(() => {
    // Focus the input element when the component mounts
    if (phoneInputRef.current) {
      phoneInputRef.current.focus();
    }
  }, []);
  const onSubmit = (data) => {
    // Handle form submission here
    console.log(data);
  };

  const phoneNumberRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/; // Adjust the regex pattern as needed

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Other form fields can be added here */}
      <div>
        <label>Phone Number</label>
        <Controller
          name="phoneNumber"
          control={control}
          defaultValue=""
          rules={{
            validate: (value) => {
              if (!value) {
                return 'Phone number is required'; // Custom error message
              }
              if (!phoneNumberRegex.test(value)) {
                return 'Invalid phone number format'; // Custom error message
              }
              return true;
            },
          }}
          render={({ field }) => (
            <>
              <PhoneInput
                {...field}
                inputProps={{
                  name: 'phoneNumber',
                  ref: phoneInputRef,
                }}
              />
              {errors.phoneNumber && (
                <span className="error">{errors.phoneNumber.message}</span>
              )}
            </>
          )}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
