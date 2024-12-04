/* eslint-disable prettier/prettier */
export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Tax-Simulation",
      href: "/Tax-Simulation",
    },
    {
      label: "Tax-Rules",
      href: "/Tax-Rules",
    },
    {
      label: "Tax-Graphs",
      href: "/Tax-Graphs",
    },
    {
      label: " AI-Suggestions",
      href: "/AI-Suggestions",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com",
    twitter: "https://twitter.com",
    docs: "https://nextui.org",
    discord: "https://discord.gg",
    sponsor: "https://patreon.com",
  },
};
