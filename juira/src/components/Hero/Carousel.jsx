import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay();

const width = 600;
const heigth = 150;

const images = [
  /* {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bird',
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  }, */
  {
    label: "",
    imgPath:
      "https://res.cloudinary.com/dhxlepnd3/image/upload/v1666307465/juira/categories/01_lmk0yl.jpg",
  },
  {
    label: "",
    imgPath:
      "https://res.cloudinary.com/dhxlepnd3/image/upload/v1666307465/juira/categories/02_eaknvw.jpg",
  },
  {
    label: "",
    imgPath:
      "https://res.cloudinary.com/dhxlepnd3/image/upload/v1666307465/juira/categories/03_e99lu1.jpg",
  },
  {
    label: "",
    imgPath:
      "https://res.cloudinary.com/dhxlepnd3/image/upload/v1666307465/juira/categories/04_h83qnh.webp",
  },
  {
    label: "",
    imgPath:
      "https://res.cloudinary.com/dhxlepnd3/image/upload/v1666307465/juira/categories/05_odkiph.jpg",
  },
  {
    label: "",
    imgPath:
      "https://res.cloudinary.com/dhxlepnd3/image/upload/v1666307465/juira/categories/06_ko5qf8.jpg",
  },
  {
    label: "",
    imgPath:
      "https://res.cloudinary.com/dhxlepnd3/image/upload/v1666307466/juira/categories/07_dd77jy.jpg",
  },
];

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: width, maxHeight: heigth, flexGrow: 1 }}>
      {/* <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography>{images[activeStep].label}</Typography>
      </Paper> */}

      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 255,
                  display: "block",
                  maxWidth: width,
                  maxHeight: heigth,
                  objectFit: "cover",
                  overflow: "hidden",
                  width: "100%",
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      {/* MuiMobileStepper-dot   backgroundColor */}
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        style={{ color: "var(--primaryColor", backgroundColor: "#ffffff77" }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
            style={{ color: "var(--primaryColor" }}
          >
            Siguiente
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={handleBack}
            disabled={activeStep === 0}
            style={{ color: "var(--primaryColor" }}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Anterior
          </Button>
        }
      />
    </Box>
  );
}

export default SwipeableTextMobileStepper;
