import Breadcrumb from "@/components/shared/breadcrumb";
import { Text } from "@/components/ui/text";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Nubian | About Us",
};

const featuredItems = [
  {
    publication: "Moveee Media",
    quote:
      "“Imagine a world where scientific progress is unhindered by bureaucracy, endless hurdles, excruciating paperwork and absurd restrictions. A community where innovation flows freely, and collaboration knows no borders. This is the future that Mosadoluwa Fasasi envisions through Decentralized Science (DeSci), a revolutionary approach leveraging blockchain technology to democratize access to knowledge, enhance transparency, and foster global collaboration.”",
    link: "https://moveee.co/mosadoluwa-fasasi-envisions-a-revolutionary-future-for-scientific-research-through-decentralized-science/",
  },

  {
    publication: "DeSci World",
    quote:
      "“Research shouldn’t end in a drawer. DeSci NG is funding students, publishing their work openly, and growing a grassroots research network across the country.”",
    link: "https://x.com/desciworld/status/1919378505139093839",
  },
  {
    publication: "Harri Obi (Co-lead, Superteam NG)",
    quote:
      "Solana DeSci: DeSci is growing exponentially right now. Who should we be following? Tag your favorite Solana DeSci project. <br><br> Harri Obi: DeSci NG are doing an amazing job.",
    link: "https://x.com/Harri_obi/status/1954172815101345943",
  },
];

const coreTeam = [
  {
    name: "Mosadoluwa Fasasi",
    role: "Executive Director",
    website: "http://mosadoluwafasasi.com",
    image: "/assets/core-team/mosadoluwa-fasasi.jpg",
  },
  {
    name: "Teniola Fatunmbi",
    role: "Engineering",
    website: "https://teniolafatunmbi.com",
    image: "/assets/core-team/teniola-fatunmbi.jpg",
  },
  {
    name: "Adeleye Oyunniyi (Ph.D)",
    role: "Advisory Board",
    website: null,
    image: "/assets/core-team/adeleye-oyunniyi.jpg",
  },
  {
    name: "Michel Bauwens",
    role: "Advisory Board",
    website: "https://en.wikipedia.org/wiki/Michel_Bauwens",
    image: "/assets/core-team/michel-bauwens.jpg",
  },
  {
    name: "Ireti Akinrinade",
    role: "Advisory Board",
    website: "https://datasociety.net/people/akinrinade-iretiolu",
    image: "/assets/core-team/ireti-akinrinade.jpg",
  },
  {
    name: "Uche Ezejiofor",
    role: "Advisory Board",
    website: "http://ucheezejiofor.com",
    image: "/assets/core-team/uche-ezejiofor.jpg",
  },
];

const Page = () => {
  return (
    <div>
      <div className="items-center justify-items-center pb-20 w-full">
        <section className="flex flex-col gap-8 md:gap-14 items-center pt-10 pb-20 w-full">
          <Text
            as="h2"
            className="w-full pl-4 md:pl-0 text-left lg:text-center text-xl md:text-3xl leading-7"
          >
            About <b>Nubian</b>
          </Text>

          <div className="md:w-2/3 w-full text-left md:text-center flex flex-col gap-2 md:gap-4 px-4">
            <Text className="text-base md:text-lg">
              Formerly known as "Decentralized Science Nigeria", Nubian is Africa&apos;s first decentralized research infrastructure,
              making African research open, secure, and globally accessible,
              forever.
            </Text>
            <Text className="text-base md:text-lg">
              For far too long, African scholarship remains siloed in
              institutions across the continent, limiting shared knowledge and
              the speed of innovation. We are reimagining this challenge by
              providing a collective where anyone can publish, share, and build
              on contextual African and related studies.
            </Text>
            <Text className="text-base md:text-lg">
              Today, our collective spans across West Africa and India, with the
              highest number of studies from Nigeria across 12 higher
              institutions. Some of the current fields include; Arts &
              Humanities, Clinical Sciences, Computing, Communication &
              Information, Pure & Applied Sciences, and Social Sciences; with
              the highest number of studies from Social Sciences.
            </Text>
            <Text className="text-base md:text-lg">
              Leveraging blockchain technology, our infrastructure is
              purpose-built against loss, tampering, and being kept out of reach
              for the very people who need it most. This creates a multiplier
              effect for scholars within and outside the continent to consult
              contextual African studies, innovate to build custom solutions for
              Africa, and join forces with the rest of the world to address
              concerns that cannot wait.
            </Text>
            <Text className="text-base md:text-lg">
              Our vision is an Africa where discoveries endure and move the
              world forward.
            </Text>
          </div>

          <div className="w-full mt-10 md:mt-10">
            <Text
              weight={"bold"}
              className={"text-center text-2xl md:text-3xl mb-6"}
            >
              Features & Testimonials
            </Text>
            <div className="flex justify-center px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {featuredItems.map((item, index) => (
                  <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={`card-${index}`}
                    className="p-6 border rounded-xl bg-white shadow-lg hover:shadow-xl hover:border-red-500 transition-all duration-300 flex flex-col items-center justify-center text-center"
                  >
                    <div className="flex flex-col justify-center items-center h-full">
                      <p className="text-base font-semibold text-red-700 mb-3">
                        {item.publication.toUpperCase()}
                      </p>
                      <p
                        className="text-sm text-gray-700 mt-1"
                        dangerouslySetInnerHTML={{ __html: item.quote }}
                      ></p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Core Team Section */}
          <div className="w-full mt-16">
            <Text
              weight={"bold"}
              className={"text-center text-2xl md:text-3xl mb-6"}
            >
              Meet the Team
            </Text>
            <div className="flex justify-center px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {coreTeam.map((member, idx) => (
                  <Card
                    key={`member-${idx}`}
                    className="group overflow-hidden border-0 shadow-none bg-white/10 dark:bg-black/20 backdrop-blur-sm transition duration-200"
                  >
                    <div className="w-full overflow-hidden">
                      <Image
                        width={1200}
                        height={800}
                        src={member.image}
                        alt={member.name}
                        className="w-full max-h-60 object-cover mb-0 rounded-none transition-transform duration-300 transform  opacity-95"
                        loading="lazy"
                      />
                    </div>
                    <CardContent className="p-0">
                      <div className="p-6 flex flex-col items-center text-center">
                        {member.website ? (
                          <Link
                            href={member.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-base font-semibold text-gray-900 hover:text-red-600 hover:underline"
                          >
                            {member.name}
                          </Link>
                        ) : (
                          <Text className="text-base font-semibold text-gray-900">
                            {member.name}
                          </Text>
                        )}
                        <Text className="text-sm text-gray-600 mt-2">
                          {member.role}
                        </Text>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
