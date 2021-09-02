import Layout from "../components/Layout";
import SignIn from "../components/SignIn";

function SignInPage() {
  return (
    <Layout>
      <SignIn />
    </Layout>
  );
}

export default SignInPage;

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
