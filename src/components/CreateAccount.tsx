import { useRef, SyntheticEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { MailIcon, KeyIcon, UserIcon } from "@heroicons/react/solid";

import mellinsLogo from "../static/public/Mellins_Logo.png";

export default function CreateAccount() {
  const router = useRouter();
  const formRef = useRef(null);

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(formRef.current);
    const bodyParams = new URLSearchParams();

    for await (const [name, value] of formData.entries()) {
      bodyParams.set(name, value.toString());
    }

    const response = await fetch("/dashboard/create-account", {
      method: "POST",
      body: bodyParams,
    });

    const data = await response.json();

    console.log(data);

    router.push("/account-pending");
  }

  return (
    <div className="flex flex-col justify-center min-h-full py-16 bg-gray-50 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex-shrink-0 h-auto m-auto w-72">
          <Image src={mellinsLogo} alt="Mellins i-Style" />
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-center text-primary">Create your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" ref={formRef} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First name
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <UserIcon className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="first_name"
                  placeholder="Name"
                  required
                  className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last name
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <UserIcon className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="lastName"
                  placeholder="Surname"
                  required
                  className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MailIcon className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="email@pienaarpartners.co.za"
                  required
                  className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <KeyIcon className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder="****************"
                  className="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:primary"
              >
                Create account
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link href="/sign-in">
                  <a className="font-medium text-primary hover:text-black">Sign in</a>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
