type Name = "role" | "experience" | "goal";

type Step = {
  title: string;
  input: { name: Name; type: string; options?: string[] };
};

const steps = new Map<number, Step>([
  [
    1,
    {
      title: "What best describe your current role (or the one you want to get)?",
      input: {
        name: "role",
        type: "select",
        options: [
          "Frontend Developer",
          "Backend Developer",
          "Full-Stack Developer",
          "Mobile Developer (iOS/Android)",
          "DevOps Engineer",
          "Site Reliability Engineer (SRE)",
          "Data Engineer",
          "AI/ML Engineer",
          "Embedded Systems Developer",
          "Game Developer",
          "Security Engineer",
          "Other",
        ],
      },
    },
  ],
  [
    2,
    {
      title: "How many years of experience do you have?",
      input: { name: "experience", type: "number" },
    },
  ],
  [
    3,
    {
      title: "What is your main professional goal?",
      input: {
        name: "goal",
        type: "select",
        options: ["Get a first job", "Get a new job", "Get a promotion", "Grow technical skills"],
      },
    },
  ],
]);

export default steps;
