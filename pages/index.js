import Layout from "../components/layout/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center h-screen justify-start">
        <div className="w-full flex justify-center py-4">
          <h1 className="text-6xl text-purple-500">
            Welcome to Start Budgeting!
          </h1>
        </div>
        <div className="flex w-full justify-between">
          <div className="flex justify-center px-4 pt-5 text-2xl flex-1">
            About this platform
          </div>
        </div>
      </div>
    </Layout>
  );
}
