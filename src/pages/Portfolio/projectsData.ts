import portfolio from "../../assets/ugoi_page.png";
import transcendence_dark from "../../assets/ft_transcendence_dark.png";
import irc_dark from "../../assets/irc-dark.png";

const projects = [
  {
    title: "Portfolio Page",
    description: "My portfolio page",
    imageUrl: portfolio,
    githubLink: "https://github.com/ugoi/ugoi.github.io",
    deployedLink: "https://ugoi.vercel.app/",
  },
  {
    title: "Ft_Transcendence",
    description: "Website with multiplayer game and chat.",
    imageUrl: transcendence_dark,
    githubLink: "https://github.com/FVNRLS/ft_transcendence",
  },
  {
    title: "Ft_Irc",
    description: "Irc Server written in C++",
    imageUrl: irc_dark,
    githubLink: "https://github.com/Qfinel/42School_ft_irc",
  },
];

export default projects;
