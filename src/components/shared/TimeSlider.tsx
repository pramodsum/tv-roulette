import React from "react";
import { Slider } from "@material-ui/core";
import { TimeFrame } from "../../declarations/types";

const TIME_FRAMES: TimeFrame[] = ["Weekly", "Monthly", "Yearly", "All"];

const TimeSlider: React.FC<{
  toggleTimeFrame: React.Dispatch<TimeFrame>;
}> = ({ toggleTimeFrame }) => {
  const [timeFrameIndex, updateTimeFrameIndex] = React.useState<number>(3);
  return (
    <Slider
      style={{ maxWidth: "300px" }}
      max={TIME_FRAMES.length - 1}
      marks={TIME_FRAMES.map((frame, index) => ({
        label: frame,
        value: index
      }))}
      onChange={(_e: React.ChangeEvent<{}>, index: number | number[]) => {
        !Array.isArray(index) && updateTimeFrameIndex(index);
      }}
      onChangeCommitted={(
        _e: React.ChangeEvent<{}>,
        index: number | number[]
      ) => {
        !Array.isArray(index) && toggleTimeFrame(TIME_FRAMES[index]);
      }}
      value={timeFrameIndex}
    />
  );
};

export default TimeSlider;
