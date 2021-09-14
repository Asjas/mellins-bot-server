import { useState, useRef, SyntheticEvent } from "react";
import { DocumentIcon } from "@heroicons/react/outline";
import useForm from "../hooks/useForm";

export default function ChannelMessageForm() {
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { inputs, handleChange, clearForm } = useForm({ message: "" });

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData();

    // console.log(inputs);

    Object.entries(inputs).forEach(([name, value]) => {
      formData.set(name, value);
    });

    const response = await fetch("/telegram/channel/message", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    console.log(data);
  }

  return (
    <div className="flex flex-col justify-center min-h-full py-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-3xl font-extrabold text-center text-primary">Post a message</h2>
        <p className="mt-4 text-lg text-center text-primary">
          A message can be posted to the channel with (or without) an attachment. Telegram has a 1 attachment limit per
          message.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md border-primary">
        <div className="px-4 py-8 bg-white shadow-xl sm:rounded-lg sm:px-10">
          <form ref={formRef} onSubmit={handleSubmit}>
            <fieldset className="space-y-6" disabled={isSubmitting} aria-busy={isSubmitting}>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <div className="relative mt-1">
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Type your message here"
                    value={inputs.message}
                    onChange={handleChange}
                    required
                    className="block w-full p-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none h-28 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="attachment" className="block text-sm font-medium text-gray-700">
                  Attachment (img, video)
                </label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <DocumentIcon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <input
                    id="attachment"
                    name="attachment"
                    type="file"
                    onChange={handleChange}
                    className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:primary"
                >
                  Post Message
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}
