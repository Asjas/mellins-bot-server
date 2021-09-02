import Layout from "../components/Layout";
import ForgotPassword from "../components/ForgotPassword";

function ForgotPasswordPage() {
  return (
    <Layout>
      <ForgotPassword />
    </Layout>
  );
}

export default ForgotPasswordPage;

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
