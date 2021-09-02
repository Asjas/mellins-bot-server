import Layout from "../components/Layout";
import Nav from "../components/Nav";

function UsersPage() {
  return (
    <>
      <Nav />
      <Layout>
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-gray-200 border-dashed rounded-lg h-96" />
        </div>
      </Layout>
    </>
  );
}

export default UsersPage;

export function getServerSideProps(context) {
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

  return {
    props: {
      authenticated: true,
    },
  };
}
