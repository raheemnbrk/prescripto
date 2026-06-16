import { assets } from "../../assets/assets";

interface AboutCard {
  title: string;
  text: string;
}

export default function About() {
  const data: AboutCard[] = [
    {
      title: "efficiency",
      text: "Streamlined appointment scheduling that fits into your busy lifestyle.",
    },
    {
      title: "convenience",
      text: "Access to a network of trusted healthcare professionals in your area.",
    },
    {
      title: "personalization",
      text: "Tailored recommendations and reminders to help you stay on top of your health.",
    },
  ];

  return (
    <div className="flex flex-col space-y-6 pt-16">
      <h1 className="text-3xl mx-auto font-semibold capitalize flex gap-2">
        <span className="text-gray-600">about</span>
        <span>us</span>
      </h1>

      <div className="flex flex-col md:flex-row gap-12 items-center px-12">
        <div className="w-full md:w-[30%]">
          <img className="w-full h-80" src={assets.aboutImg} alt="About Us" />
        </div>

        <div className="flex flex-col space-y-6 w-[70%]">
          <p className="text-gray-600 text-sm">
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>

          <p className="text-gray-600 text-sm">
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>

          <p className="font-medium capitalize">our vision</p>

          <p className="text-gray-600 text-sm">
            Our vision at Prescripto is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it.
          </p>
        </div>
      </div>

      <h1 className="text-2xl capitalize gap-2 flex items-center justify-center">
        <span>why</span>
        <span className="text-gray-600">choose us</span>
      </h1>

      <div className="flex flex-col md:flex-row justify-center items-center">
        {data.map((item) => (
          <div
            key={item.title}
            className="flex flex-col space-y-6 border border-gray-200 px-12 py-16 hover:bg-main transition-all duration-200 group cursor-pointer"
          >
            <h1 className="text-xl font-semibold uppercase text-gray-700 group-hover:text-white">
              {item.title}
            </h1>

            <p className="text-gray-500 font-light group-hover:text-white">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
