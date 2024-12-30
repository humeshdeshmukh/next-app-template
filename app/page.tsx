import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { title, subtitle } from "@/components/primitives";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { FaCalculator, FaChartLine, FaBook, FaRobot } from "react-icons/fa";

export default function Home() {
  const features = [
    {
      title: "Tax Simulation",
      description: "Calculate and visualize your tax liability with our advanced tax simulation tool.",
      icon: <FaCalculator className="w-6 h-6" />,
      href: "/Tax-Simulation"
    },
    {
      title: "Advanced Calculator",
      description: "Complex financial calculations made simple with our comprehensive calculator.",
      icon: <FaChartLine className="w-6 h-6" />,
      href: "/Advanced-calculator"
    },
    {
      title: "Tax Rules",
      description: "Stay updated with the latest tax rules and regulations explained in simple terms.",
      icon: <FaBook className="w-6 h-6" />,
      href: "/Tax-Rules"
    },
    {
      title: "AI Suggestions",
      description: "Get personalized tax-saving suggestions powered by artificial intelligence.",
      icon: <FaRobot className="w-6 h-6" />,
      href: "/AI-Suggestions"
    }
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-4xl text-center justify-center">
        <h1 className={title({ color: "violet" })}>Smart Tax Planning&nbsp;</h1>
        <h1 className={title()}>
          Made Simple with&nbsp;
          <span className={title({ color: "violet" })}>AI</span>
        </h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          Optimize your tax planning with our intelligent tools and personalized suggestions
        </h2>
      </div>

      <div className="flex gap-3 mt-8">
        <Link
          href="/How-to-apply"
          className={buttonStyles({ color: "primary", radius: "full", variant: "shadow", size: "lg" })}
        >
          Get Started
        </Link>
        <Link
          href="/Tax-Rules"
          className={buttonStyles({ variant: "bordered", radius: "full", size: "lg" })}
        >
          Learn More
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 max-w-6xl px-4">
        {features.map((feature, index) => (
          <Link href={feature.href} key={index} className="w-full">
            <Card className="hover:scale-105 transition-transform duration-200">
              <CardHeader className="flex gap-3 items-center">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  {feature.icon}
                </div>
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">{feature.title}</p>
                </div>
              </CardHeader>
              <CardBody>
                <p className="text-default-500">{feature.description}</p>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className={title({ size: "sm" })}>Why Choose Our Platform?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-6xl px-4">
          <div className="p-6 rounded-lg bg-default-50">
            <h3 className="text-lg font-semibold mb-2">Accurate Calculations</h3>
            <p className="text-default-500">Our advanced algorithms ensure precise tax calculations every time.</p>
          </div>
          <div className="p-6 rounded-lg bg-default-50">
            <h3 className="text-lg font-semibold mb-2">AI-Powered Insights</h3>
            <p className="text-default-500">Get personalized suggestions to optimize your tax planning.</p>
          </div>
          <div className="p-6 rounded-lg bg-default-50">
            <h3 className="text-lg font-semibold mb-2">User-Friendly Interface</h3>
            <p className="text-default-500">Simple and intuitive design makes tax planning accessible to everyone.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
