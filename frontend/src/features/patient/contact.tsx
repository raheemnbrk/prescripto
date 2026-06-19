import { assets } from "../../assets/assets";

export default function Contact() {
  return (
    <div className="px-8 md:px-36 py-16">
      <h1 className="mb-12 text-center text-3xl font-semibold capitalize">
        <span className="text-gray-600">contact </span>
        <span>us</span>
      </h1>

      <div className="flex flex-col items-center gap-12 md:flex-row">
        <div className="w-full md:w-1/2">
          <img
            src={assets.contactImg}
            alt="Contact Us"
            className="w-full rounded-lg object-cover"
          />
        </div>

        <div className="flex flex-col gap-6 md:w-1/2">
          <h2 className="text-xl font-semibold text-gray-700">
            OUR OFFICE
          </h2>

          <p className="font-light text-gray-500">
            00000 Willms Station <br />
            Suite 000, Washington, USA
          </p>

          <p className="font-light text-gray-500">
            Tel: (000) 000-0000 <br />
            Email: email@gmail.com
          </p>

          <h2 className="text-xl font-semibold text-gray-700">
            CAREERS AT PRESCRIPTO
          </h2>

          <p className="font-light text-gray-500">
            Learn more about our teams and job openings.
          </p>

          <button className="w-fit border border-black px-6 py-4 capitalize transition-colors hover:bg-black hover:text-white">
            explore jobs
          </button>
        </div>
      </div>
    </div>
  );
}