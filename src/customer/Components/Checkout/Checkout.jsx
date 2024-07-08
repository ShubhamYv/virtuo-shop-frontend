import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddDeliveryAddressForm from "./AddAddress";
import { useLocation, useNavigate } from "react-router-dom";
import OrderSummary from "./OrderSummary";

const steps = [
  "Login",
  "Delivery Address",
  "Order Summary",
  "Payment",
];

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const step = parseInt(queryParams.get('step')) || activeStep;

  React.useEffect(() => {
    setActiveStep(step);
  }, [step]);

  const handleNext = () => {
    navigate(`/checkout?step=${activeStep + 1}`);
  };

  const handleBack = () => {
    navigate(`/checkout?step=${activeStep - 1}`);
  };

  const handleReset = () => {
    navigate(`/checkout?step=0`);
  };

  const handlePayment = () => {
    console.log("handle payment");
  };

  return (
    <Box className="px-5 lg:px-32" sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you're finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {activeStep === steps.length - 1 ? (
              <Button onClick={handlePayment}>Pay</Button>
            ) : (
              <Button onClick={handleNext}>
                {activeStep === steps.length - 2 ? 'Finish' : 'Next'}
              </Button>
            )}
          </Box>
          <Box className="my-5">
            {activeStep === 1 && <AddDeliveryAddressForm handleNext={handleNext} />}
            {activeStep === 2 && <OrderSummary />}
            {activeStep === 3 && (
              <Typography sx={{ my: 6 }}>
                Payment Section (to be implemented)
              </Typography>
            )}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
