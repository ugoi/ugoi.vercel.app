import React from "react";
import Typewriter from "typewriter-effect";

const Type: React.FC = () => {
  return (
    <Typewriter
      options={{
        strings: [
          "Full-Stack Developer",
          "Integration Architect",
          "Data Engineer",
          "C++ Developer",
        ],
        autoStart: true,
        loop: true,
      }}
    />
  );
};

export default Type;
