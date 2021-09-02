import Layout from "../components/Layout";
import Nav from "../components/Nav";
import ChannelMessageForm from "../components/ChannelMessageForm";

function ChannelPage() {
  return (
    <>
      <Nav />
      <Layout>
        <div className="px-4 py-6 sm:px-0">
          <ChannelMessageForm />
        </div>
      </Layout>
    </>
  );
}

export default ChannelPage;

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
