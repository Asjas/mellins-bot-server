import Layout from "../components/Layout";
import Nav from "../components/Nav";
import { format } from "date-fns";
import { UserCircleIcon, IdentificationIcon, ChatAlt2Icon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";

function UsersPage({ users }) {
  return (
    <>
      <Nav />
      <Layout>
        <div className="px-4 py-6 sm:px-0">
          <section className="flex flex-wrap gap-4">
            {users
              ? users.map((user) => (
                  <div key={user.telegramId} className="max-w-lg border rounded-md shadow-md border-primary">
                    <div className="px-4 py-2 bg-primary">
                      <UserCircleIcon className="inline-block w-6 h-auto mr-2 text-white" />
                      <h2 className="inline-block text-lg font-semibold text-white align-middle ">
                        {user.firstName} {user.lastName}
                      </h2>
                    </div>
                    <div className="flex flex-col mt-2">
                      <div className="flex flex-col">
                        <p className="px-4 font-semibold text-secondary">
                          <IdentificationIcon className="inline-block w-6 h-auto mr-1 text-secondary" />
                          <span className="align-middle">{user.rsaId ?? "No RSA ID filled in."}</span>
                        </p>
                        <p className="px-4 font-semibold text-secondary">
                          <ChatAlt2Icon className="inline-block w-6 h-auto mr-1 text-secondary" />
                          <span className="align-middle">{user.telegramId}</span>
                        </p>
                      </div>
                      <hr className="w-11/12 mx-auto mt-2 bg-primary" />
                      <div className="flex px-4 mt-2 space-x-4">
                        {user.joinedMellinsChannel ? (
                          <div className="px-4 py-2 bg-green-500 rounded-md">
                            <span className="font-semibold text-white align-middle">Channel Status</span>
                            <CheckCircleIcon className="inline-block w-5 ml-2 text-white" />
                          </div>
                        ) : (
                          <div className="px-4 py-2 bg-red-500 rounded-md">
                            <span className="font-semibold text-white align-middle">Channel Status</span>
                            <XCircleIcon className="inline-block w-5 ml-2 text-white" />
                          </div>
                        )}
                        {user.kickedBot ? (
                          <div className="px-4 py-2 bg-red-500 rounded-md">
                            <span className="font-semibold text-white align-middle">Bot Status</span>
                            <XCircleIcon className="inline-block w-5 ml-2 text-white" />
                          </div>
                        ) : (
                          <div className="px-4 py-2 bg-green-500 rounded-md">
                            <span className="font-semibold text-white align-middle">Bot Status</span>
                            <CheckCircleIcon className="inline-block w-5 ml-2 text-white" />
                          </div>
                        )}
                      </div>
                      <hr className="w-11/12 mx-auto mt-2 bg-primary" />
                    </div>
                  </div>
                ))
              : null}
          </section>
        </div>
      </Layout>
    </>
  );
}

export default UsersPage;

export async function getServerSideProps(context) {
  const { mellinsDashboardJWT } = context.req?.cookies;

  //3. If there is no user, or the user is not authenticated, then redirect to homepage.
  if (!mellinsDashboardJWT) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  const response = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_PORT}/telegram/users`);

  const {
    response: {
      data: { users },
    },
  } = await response.json();

  console.log(users);

  return {
    props: {
      authenticated: true,
      users,
    },
  };
}
