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
    </section>
  );
}
