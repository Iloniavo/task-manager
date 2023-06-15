import Head from "next/head";
import { useRouter } from "next/router";

/**
 Calculates the time difference between the server time and client time.
 @returns {string} The time difference in the format "{days} days, {hours} hours, {minutes} minutes, {seconds} seconds".
 */
const calculateTimeDifference = (server: Date, client: Date) => {
  const diff = Math.abs(client.getTime() - server);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};


export default function Home({serverTime}) {
  const router = useRouter();
  const moveToTaskManager = () => {
    router.push("/tasks");
  }

  const serverTimeToString = new Date(serverTime)

  const {days, hours, minutes, seconds} = calculateTimeDifference(serverTime, new Date())
  console.log("Server   ", serverTimeToString)

  return (
    <>
      <Head>
        <title>Web 2 - Exam TD</title>
        <meta name="description" content="Just an exam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>The easiest exam you will ever find</h1>
        <div>
          {/* Display here the server time (DD-MM-AAAA HH:mm)*/}
          <p>
            Server time:{" "}
            <span className="serverTime">{serverTimeToString.toLocaleTimeString()}</span>
          </p>

          {/* Display here the time difference between the server side and the client side */}
          <p>
            Time diff:{" "}
            <span className="serverTime">{`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`}</span>
          </p>
        </div>

        <div>
          <button onClick={moveToTaskManager}>Go to task manager</button>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(){
  const serverTime = Date.now()

  return {
    props: {
        serverTime
    }
  }


}