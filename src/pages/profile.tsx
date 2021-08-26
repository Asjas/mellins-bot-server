import Layout from "../components/Layout";
import Nav from "../components/Nav";

function ProfilePage() {
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

export default ProfilePage;
