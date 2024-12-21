import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { Card } from "@nextui-org/card";
import { CardHeader, CardBody } from "@nextui-org/card";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Welcome to&nbsp;</span>
        <span className={title({ color: "violet" })}>TaxSim&nbsp;</span>
        <span className={title()}>2425</span>
        <br />
        <span className={title()}>
          Your tool for simulating and analyzing tax data.
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Visualize and forecast tax scenarios for the future.
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href="/calculator"
        >
          Advanced Calculator
        </Link>
        <Link
          className={buttonStyles({
            color: "secondary",
            radius: "full",
            variant: "shadow",
          })}
          href="/Tax-Simulation"
        >
          Tax Simulation
        </Link>
        <Link
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href="/Tax-Rules"
        >
          Learn More
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
        <Card className="p-4">
          <CardHeader>
            <h3 className={subtitle()}>Industrial Calculator</h3>
          </CardHeader>
          <CardBody>
            <p>Advanced tax calculations for businesses across different industries. Features include:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Industry-specific rates</li>
              <li>Employee deductions</li>
              <li>Revenue analysis</li>
            </ul>
          </CardBody>
        </Card>
        
        <Card className="p-4">
          <CardHeader>
            <h3 className={subtitle()}>Tax Simulation</h3>
          </CardHeader>
          <CardBody>
            <p>Simulate and forecast your tax scenarios with our advanced tools:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Future projections</li>
              <li>Rate comparisons</li>
              <li>Optimization suggestions</li>
            </ul>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
