import Image from "next/image";
import { Text } from "./components/ui/text";
import { Button } from "./components/ui/button";

export default function Home() {
  return (
    <div className="font-sans items-center justify-items-center min-h-screen ">
      <main className="flex flex-col items-center p-8 2xl:p-14 pb-20 w-full">
        <nav className="w-full">
          <ul className="w-full flex justify-between items-center gap-[24px]">
            <li>
              <a href="#">
                <Image src="/assets/desci-ng-logo.png" alt="logo" width={100} height={100} />
              </a>
            </li>
            <li>
              <a href="#">
                <Button variant={"destructive"}>
                  LOGIN
                </Button>
              </a>
            </li>
          </ul>
        </nav>

        <section className="w-1/4 mx-auto">
          <Text size={"2xl"} weight={"bold"} className="text-center text-">EXPLORE ACADEMIC PAPERS ACROSS DISCIPLINES</Text>
        </section>
        DESCI NG
      </main>
      <footer className="flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
