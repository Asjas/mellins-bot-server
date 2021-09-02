import Layout from "../components/Layout";

export default function AccountPending() {
  return (
    <Layout>
      <h2>Account Status</h2>
      <div>
        <p>Your account has successfully been created.</p>
        <p>Your account is pending approval.</p>
      </div>
    </Layout>
  );
}

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
