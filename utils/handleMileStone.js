import React from "react";

const handleMileStone = (memorized_names, setMilestone) => {
  switch (true) {
    case memorized_names.length === 5:
      setMilestone("You've learnt 5, can you make it 10?...👀");
      break;
    case memorized_names.length === 10:
      setMilestone("Double digits, we're proud of you! 😀 ");
      break;
    case memorized_names.length === 20:
      setMilestone("Keep it up champ! 💪");
      break;
    case memorized_names.length === 50:
      setMilestone("More than halfway there. Let's go! 🏃");
      break;
    case memorized_names.length === 75:
      setMilestone("Woah... we're running out of names...😳");
      break;
    case memorized_names.length === 99:
      setMilestone(
        "Ma'sha'Allah, you've learnt all 99 Names of Allah (swa)! 🙏"
      );
      break;
    default:
      setMilestone(false);
  }
};

export default handleMileStone;
