// src/Upgrade.js
import { FC } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

export type UpgradeProps = {
  name: string;
  cost: number;
  bonus: number;
  count: number;
  onBuy: () => void;
  points: number;
};

const Upgrade: FC<UpgradeProps> = ({ name, cost, bonus, count, onBuy, points }) => {
  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2">Cost: {cost}</Typography>
        <Typography variant="body2">Bonus: +{bonus} per automator</Typography>
        <Typography variant="body2">Owned: {count}</Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={onBuy}
          disabled={cost > points}
        >
          Buy Upgrade
        </Button>
      </CardContent>
    </Card>
  );
};

export default Upgrade;
