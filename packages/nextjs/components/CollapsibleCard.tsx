import { ChevronDown, ChevronUp, MapPin, Users } from "lucide-react"
import { useState } from "react"

const jobs = [
  {
    title: "Full Stack Developer",
    department: "Software Development",
    location: "Singapore",
    description:
      "As a Full Stack Developer, you will be responsible for developing and maintaining web applications, collaborating with cross-functional teams, and ensuring the scalability and performance of our platforms. You should be proficient in both frontend and backend technologies, including React, Node.js, and database management.",
  },
  {
    title: "DevOps Engineer",
    department: "IT Infrastructure",
    location: "Singapore",
    description:
      "We are seeking a DevOps Engineer to manage our infrastructure, automate our deployment processes, and improve our CI/CD pipeline. You will work closely with developers to ensure smooth deployments and monitor systems for performance and security. Experience with AWS, Docker, and Kubernetes is required.",
  },
  {
    title: "Cybersecurity Analyst",
    department: "Security",
    location: "Singapore",
    description:
      "The Cybersecurity Analyst will be responsible for monitoring our systems for security breaches, analyzing potential threats, and developing strategies to protect sensitive data. You will work closely with IT teams to implement security measures and maintain compliance with industry regulations. Experience with firewalls, encryption, and security protocols is essential.",
  },
]

const CollapsibleCard = () => {
  const [isOpen, setIsOpen] = useState(null)

  const toggleCard = (index: any) => {
    setIsOpen(isOpen === index ? null : index)
  }

  return (
    <div className="space-y-10">
      {jobs.map(({ title, department, location, description }, index) => (
        <div key={index} className="w-[1000px] space-y-10 rounded-lg border border-gray-300 bg-white px-6 pt-10 shadow-md">
          <div className="flex cursor-pointer items-center justify-between" onClick={() => toggleCard(index)}>
            <div className="flex flex-col space-y-4">
              <h3 className="text-2xl font-semibold leading-none tracking-tight text-primary">{title}</h3>
              <div className="flex flex-row space-x-10">
                <div className="flex flex-row items-center">
                  <Users strokeWidth={1.5} className="mr-2 h-5 w-5 text-primary" />
                  <p className="text-lg text-gray-600">{department}</p>
                </div>
                <div className="flex flex-row items-center">
                  <MapPin strokeWidth={1.5} className="mr-2 h-5 w-5 text-primary" />
                  <p className="text-lg text-gray-600">{location}</p>
                </div>
              </div>
            </div>
            <div>{isOpen === index ? <ChevronUp className="h-8 w-8 text-gray-600" /> : <ChevronDown className="h-8 w-8 text-gray-600" />}</div>
          </div>

          <div
            className={`duration-800 overflow-hidden transition-all ease-in-out ${isOpen === index ? "max-h-96 pb-10 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="mt-4 space-y-10 bg-white">
              <p className="text-gray-700">{description}</p>
              <button className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white transition duration-150 hover:bg-blue-700">Apply Now</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CollapsibleCard
