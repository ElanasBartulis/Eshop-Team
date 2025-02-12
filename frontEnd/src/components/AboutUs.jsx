import { Card, CardBody, Avatar, Typography } from "@material-tailwind/react";
import femaleIcon from "../assets/Public/femaleIcon.png";

function TeamCard({ img, name, title, portfolio, linkedin, github }) {
  return (
    <Card className="rounded-lg py-5 bg-[#FAFAFA]" shadow={false}>
      <CardBody className="text-center">
        <Avatar
          src={img}
          alt={name}
          variant="circular"
          size="xxl"
          className="mx-auto mb-6 object-top"
        />
        <Typography
          variant="h5"
          color="blue-gray"
          className="!font-medium text-xl py-1"
        >
          {name}
        </Typography>
        <Typography
          color="blue-gray"
          className="mb-2 !text-base !font-semibold text-gray-600 py-2"
        >
          {title}
        </Typography>
        <div className="flex items-center justify-center gap-1.5">
          {portfolio && (
            <a
              className="text-gray-900 transition hover:text-customRed hover:text-red-800"
              href={portfolio}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Portfolio</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                className="size-10"
                viewBox="0 2 25 25"
                fill="currentColor"
              >
                <path d="M 9.21875 3 C 8 3 7 4 7 5.21875 L 7 7 L 0.84375 7 C 0.382813 7 0 7.382813 0 7.84375 L 0 15.15625 C 0 15.617188 0.382813 16 0.84375 16 L 23.15625 16 C 23.617188 16 24 15.617188 24 15.15625 L 24 7.84375 C 24 7.382813 23.617188 7 23.15625 7 L 17 7 L 17 5.21875 C 17 4 16 3 14.78125 3 Z M 9.21875 5 L 14.78125 5 C 14.917969 5 15 5.082031 15 5.21875 L 15 7 L 9 7 L 9 5.21875 C 9 5.082031 9.082031 5 9.21875 5 Z M 12 12 C 12.550781 12 13 12.449219 13 13 C 13 13.550781 12.550781 14 12 14 C 11.449219 14 11 13.550781 11 13 C 11 12.449219 11.449219 12 12 12 Z M 0 16.15625 L 0 23.15625 C 0 23.617188 0.382813 24 0.84375 24 L 23.15625 24 C 23.617188 24 24 23.617188 24 23.15625 L 24 16.15625 C 24 16.617188 23.617188 17 23.15625 17 L 0.84375 17 C 0.382813 17 0 16.617188 0 16.15625 Z"></path>
              </svg>
            </a>
          )}
          {linkedin && (
            <a
              className="text-gray-900 transition hover:text-customRed hover:text-red-800"
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Linkedin</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                className="size-10"
                viewBox="0 0 50 50"
                fill="currentColor"
              >
                <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
              </svg>
            </a>
          )}
          {github && (
            <a
              className="text-gray-900 transition hover:text-customRed hover:text-red-800"
              href={github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">GitHub</span>
              <svg
                className="size-10"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          )}
        </div>
      </CardBody>
    </Card>
  );
}

const members = [
  {
    img: `https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
    name: "Elanas Bartulis",
    title: "Full-stack Web Developer",
    // portfolio: "https://github.com",
    linkedin: "www.linkedin.com/in/elanas-bartulis",
    github: "https://github.com/ElanasBartulis",
  },
  {
    img: `https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
    name: "Žilvinas Stanius",
    title: "Full-stack Web Developer",
    // portfolio: "https://github.com",
    linkedin: "https://www.linkedin.com/in/zilvinas-stanius/",
    github: "https://github.com/ZilvinasStanius",
  },
  {
    img: femaleIcon,
    name: "Erika Susekė",
    title: "Full-stack Web Developer",
    // portfolio: "https://github.com",
    linkedin: "https://www.linkedin.com/in/erikasuseke/",
    github: "https://github.com/erikasuseke",
  },
];

export default function AboutUs() {
  return (
    <section className="h-auto pt-2 pb-28 px-8">
      <div className="container mx-auto">
        <div className="mb-16 text-center lg:mb-10">
          <Typography variant="h6" color="blue-gray" className="text-lg">
            Meet the Team
          </Typography>
          <Typography
            variant="h1"
            color="blue-gray"
            className="my-2 !text-2xl lg:!text-4xl"
          >
            Behind the Success: Our Dedicated Team
          </Typography>
          <Typography
            variant="lead"
            className="mx-auto w-full !text-gray-500 max-w-4xl"
          >
            Our goal is to ensure that every product we create is unique and
            optimized. If you're interested in our work please contact us:
          </Typography>
        </div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {members.map((props, key) => (
            <TeamCard key={key} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
