import portfolio from "../../assets/ugoi_page.png";
import swifty_companion from "../../assets/swifty_companion.png";
import transcendence_dark from "../../assets/ft_transcendence_dark.png";
import contacts from "../../assets/ft_hangouts.png";
import irc_dark from "../../assets/irc-dark.png";

const projects = [
  {
    title: "Matcha",
    description: "Dating website",
    imageUrl: "https://uploads-ssl.webflow.com/5f3c19f18169b62a0d0bf387/616ecc1efc5e8c7002d0715b_tP5kp9pBEl-KMFSoCQQ1VzJ6bH8d_IPWb6B2YAQaiJERteHS7AVeIlxnfbzF8fCQkoY5vW-tfL8DfbR4qG8WSyYXdmQUYcWdG82ifmS6THJHwzqvCKHGGa6ZsBILSgPVaq1ys8OU%3Ds1600.png",
    githubLink: "https://github.com/ugoi/Matcha",
  },
  {
    title: "Camagru",
    description: "Instagram-like website",
    githubLink: "https://github.com/ugoi/Camagru",
    imageUrl: "https://raw.githubusercontent.com/thenesern/Instagram-Clone/master/images/1280x800/1.png",
  },
  {
    title: "Ft_Hangouts",
    description: "IOS app to manage contacts",
    imageUrl: contacts,
    githubLink: "https://github.com/ugoi/ft_hangouts",
  },
  {
    title: "Swifty Companion",
    description: "Flutter app to search 42 students",
    imageUrl: swifty_companion,
    githubLink: "https://github.com/ugoi/Swifty-Companion",
  },
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
