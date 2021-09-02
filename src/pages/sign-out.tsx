import { useEffect } from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

function SignOutPage() {
  const router = useRouter();

  useEffect(() => {
    async function signOut() {
      const response = await fetch("http://localhost:3000/dashboard/sign-out", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (data) router.push("/sign-in");
    }

    signOut();
  }, []);

  return (
    <Layout>
      <div className="flex justify-center">
        <h2 className="pt-20 text-2xl text-primary">Signing you out</h2>
      </div>
    </Layout>
  );
}

export default SignOutPage;

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
