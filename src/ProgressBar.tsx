import { FC, useCallback, useEffect, useState } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import { motion } from "framer-motion";

export type ProgressBarProps = {
  points: number;
};
const ProressBar: FC<ProgressBarProps> = ({ points }) => {
  const [goal, setGoal] = useState(100);
  const [progress, setProgresss] = useState(0);
  const [rectangles, setRectangles] = useState<number[]>([]);

  // Calculate progress
  const calculateProgress = useCallback(() => {
    setProgresss((points / goal) * 100);
    if (points > goal) {
      setProgresss(0);
      setGoal((prev) => prev * 5);
      //add rectangle to progress bar
      addRectangle();
    }
  }, [goal, points, setProgresss]);

  const addRectangle = () => {
    setRectangles((prev) => [...prev, 1]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      calculateProgress();
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateProgress]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          height: 110,
          backgroundColor: "lightgray",
        }}
      >
        {rectangles.map((_e, index: number) => {
          return (
            <motion.div
              initial={{ x: "110vw" }} // Start off-screen to the left
              animate={{ x: 0 }} // End on the left side of the progress bar
              transition={{ duration: 0.5, ease: "easeInOut" }} // Animation properties
              onAnimationComplete={(a) => {
                console.log(a);
                
              }}
              key={index}
              style={{
                // blocks 10% width of the progress bar
                width: "10%",
                height: 100,
                backgroundColor: "green",
                margin: 3,
              }}
            />
          );
        })}
      </Box>
      <LinearProgress variant="determinate" value={progress} />
      <Typography variant="h6">{progress.toFixed(2)}% to goal</Typography>
    </Box>
  );
};

export default ProressBar;
