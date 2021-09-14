import Layout from "../components/Layout";
import Nav from "../components/Nav";

function DashboardPage() {
  return (
    <>
      <Nav />
      <Layout>
        <div className="px-4 py-6 sm:px-0">
          <h2 className="mt-40 text-lg italic text-center text-primary">Nothing here to show yet...</h2>
        </div>
      </Layout>
    </>
  );
}

export default DashboardPage;

export function getServerSideProps(context) {
  const { mellinsDashboardJWT } = context.req?.cookies;

  // If there is no user, or the user is not authenticated, then redirect to the sign-in page
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
