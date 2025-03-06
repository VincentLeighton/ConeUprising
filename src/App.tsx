// src/App.js
import { useState, useEffect, useCallback } from "react";
import {
  Container,
  Typography,
  Box,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import Automator from "./Automator";
import Upgrade from "./Upgrade";
import Cone from "./assets/Cone.png";

const App = () => {
  const [points, setPoints] = useState(0);
  const [goal] = useState(1000);
  const [progress, setProgresss] = useState(0);
  const [automators, setAutomators] = useState({
    count: 0,
    cost: 10,
    baseOutput: 1,
    totalOutput: 1,
  });
  const [upgrade, setUpgrade] = useState({
    count: 0,
    cost: 50,
    bonus: 1,
  });

  // Clicking the screen adds points
  const handleClick = () => {
    setPoints((prev) => prev + 1);
  };

  // Buying an automator
  const handleBuyAutomator = () => {
    if (points >= automators.cost) {
      setPoints((prev) => prev - automators.cost);
      setAutomators((prev) => ({
        ...prev,
        count: prev.count + 1,
        totalOutput: prev.count * prev.baseOutput,
      }));
    }
  };

  // Buying an upgrade
  const handleBuyUpgrade = () => {
    if (points >= upgrade.cost) {
      setPoints((prev) => prev - upgrade.cost);
      setUpgrade((prev) => ({
        ...prev,
        count: prev.count + 1,
      }));

      // Apply upgrade boost to automators
      setAutomators((prev) => ({
        ...prev,
        baseOutput: prev.baseOutput + upgrade.bonus,
        totalOutput: prev.count * (prev.baseOutput + upgrade.bonus),
      }));
    }
  };

  // Calculate progress
  const calculateProgress = useCallback(() => {
    setProgresss((points / goal) * 100);
    if (points > goal) {
      setProgresss(100);
    }
  }, [goal, points]);

  // Automator generates points per second
  useEffect(() => {
    const interval = setInterval(() => {
      setPoints((prev) => prev + automators.count * automators.baseOutput);
      calculateProgress();
    }, 1000);

    return () => clearInterval(interval);
  }, [automators, calculateProgress]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          textAlign: "center",
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100vw",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
        <Typography variant="h4">Idle Game</Typography>
        <Typography variant="h5" sx={{ marginBottom: 3 }}>
          Points: {points}
        </Typography>

        {/* Clicking Area */}
        <Tooltip title="Click to earn points!">
          <Box
            component="img"
            sx={{
              height: 150,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backgroundColor: "#ffeb3b",
            }}
            src={Cone}
            onClick={handleClick}
          />
        </Tooltip>

        {/* Automator Component */}
        <Automator
          name="Point Generator"
          cost={automators.cost}
          output={automators.baseOutput}
          count={automators.count}
          onBuy={handleBuyAutomator}
          points={points}
        />

        {/* Upgrade Component */}
        <Upgrade
          name="Boost Automator"
          cost={upgrade.cost}
          bonus={upgrade.bonus}
          count={upgrade.count}
          onBuy={handleBuyUpgrade}
          points={points}
        />
      </Box>
    </Container>
  );
};

export default App;
