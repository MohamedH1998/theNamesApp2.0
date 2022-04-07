import { useState, useEffect } from "react";

const useMilestones = (names) => {
  const [milestone, setMilestone] = useState(false);

  const hasWindow = typeof window !== "undefined";

  hasWindow ? setMilestone(JSON.parse(localStorage.getItem("memorized_names"))) : null;


  return [milestone];
};
export default useMilestones;
