import Layout from "../components/Layout";
import CreateAccount from "../components/CreateAccount";

function CreateAccountPage() {
  return (
    <Layout>
      <CreateAccount />
    </Layout>
  );
}

export default CreateAccountPage;

export function getServerSideProps(context) {
  const { mellinsDashboardJWT } = context.req?.cookies;

  // If the user is authenticated, then redirect to the dashboard page
  if (mellinsDashboardJWT) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      authenticated: false,
    },
  };
}
