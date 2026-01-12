import Image from "next/image";
import { Text } from "../ui/text";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full 2xl:p-container-md py-10 sm:pt-4 border-t border-t-[var(--primary)]">
      <div className="w-[70%] mx-auto space-y-4 md:mx-auto">
        <Link href="/">
          <Image
            src="/assets/nubian-logo.png"
            alt="logo"
            width={130}
            height={100}
          />
        </Link>

        <div className="w-full md:px-4 mx-auto flex flex-wrap items-center md:justify-between my-4 space-y-4 md:space-y-0">
          <section className="w-full md:w-auto">
            <ul className="space-y-2">
              <li>
                <Link href="/about-us">
                  <Text size={"sm"} weight={"medium"}>
                    About Us
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="/how-to-upload-a-paper">
                  <Text size={"sm"} weight={"medium"}>
                    How to Upload a Paper
                  </Text>
                </Link>
              </li>
              <li>
                <a href="mailto:info.descing@gmail.com">
                  <Text size="sm" weight={"medium"}>
                    Contact Us
                  </Text>
                </a>
              </li>
            </ul>
          </section>

          <section className="w-full md:w-auto">
            <ul className="space-y-2">
              <li>
                <a href="https://x.com/DeSci_NG">
                  <Text size="sm" weight={"medium"}>
                    X (Formerly Twitter)
                  </Text>
                </a>
              </li>
              <li>
                <Link href="https://www.linkedin.com/company/desci-ng">
                  <Text size="sm" weight={"medium"}>
                    LinkedIn
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="https://www.instagram.com/desci__ng">
                  <Text size="sm" weight={"medium"}>
                    Instagram
                  </Text>
                </Link>
              </li>
              <li>
                <a href="http://tiktok.com/@desci_ng">
                  <Text size="sm" weight={"medium"}>
                    TikTok
                  </Text>
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@DeSci_NG">
                  <Text size="sm" weight={"medium"}>
                    YouTube
                  </Text>
                </a>
              </li>
            </ul>
          </section>

          <section className="flex flex-col justify-end md:mt-14">
            <Text size="sm" weight={"medium"}>
              {" "}
              &copy; {new Date().getFullYear()} Desci NG/Paper Trail Society.
            </Text>
          </section>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
