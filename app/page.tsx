import { title } from "@/components/primitives";
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { subtitle } from "@/components/primitives";

import { siteConfig } from "@/config/site";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-12 md:py-16 bg-black text-white min-h-screen">
      <div className="inline-block max-w-4xl text-center justify-center">
        <span className={title({ color: "foreground" })}>Welcome to&nbsp;</span>
        <span className={title({ color: "violet" })}>TaxSim&nbsp;</span>
        <span className={title({ color: "foreground" })}>2425</span>
        <br />
        <span className={title({ color: "foreground" })}>
          Your tool for simulating and analyzing tax data.
        </span>
        <div className={subtitle({ class: "mt-4 text-lg text-gray-400" })}>
          Visualize and forecast tax scenarios for the future.
        </div>
      </div>

      <div className="flex gap-6 mt-8">
        <Link
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
            class: "px-8 py-3 text-lg",
          })}
          href="/Advanced-calculator"
        >
          Advanced Calculator
        </Link>
        <Link
          className={buttonStyles({
            color: "secondary",
            radius: "full",
            variant: "shadow",
            class: "px-8 py-3 text-lg",
          })}
          href="/Tax-Simulation"
        >
          Tax Simulation
        </Link>
        <Link
          className={buttonStyles({
            variant: "bordered",
            radius: "full",
            class: "px-8 py-3 text-lg border-white text-white",
          })}
          href="/Tax-Rules"
        >
          Learn More
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        <div className="p-6 bg-gray-800 shadow-lg rounded-lg">
          <h3 className={subtitle()}>
            Industrial Calculator
          </h3>
          <p>
            Advanced tax calculations for businesses across different
            industries. Features include:
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-400">
            <li>Industry-specific rates</li>
            <li>Employee deductions</li>
            <li>Revenue analysis</li>
          </ul>
        </div>

        <div className="p-6 bg-gray-800 shadow-lg rounded-lg">
          <h3 className={subtitle()}>Tax Simulation</h3>
          <p>
            Simulate and forecast your tax scenarios with our advanced tools:
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-400">
            <li>Future projections</li>
            <li>Rate comparisons</li>
            <li>Optimization suggestions</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
