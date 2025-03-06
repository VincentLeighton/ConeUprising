// src/Automator.js
import { FC } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

export type AutomatorProps = {
  name: string;
  cost: number;
  output: number;
  count: number;
  onBuy: () => void;
  points: number;
};

const Automator: FC<AutomatorProps> = ({
  name,
  cost,
  output,
  count,
  onBuy,
  points,
}) => {
  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2">Cost: {cost}</Typography>
        <Typography variant="body2">Output: {output} points/sec</Typography>
        <Typography variant="body2">Owned: {count}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={onBuy}
          disabled={cost > points}
        >
          Buy Automator
        </Button>
      </CardContent>
    </Card>
  );
};

export default Automator;
