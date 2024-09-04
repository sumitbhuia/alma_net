// import EventCard from "../../components/event-display";

// export default function Home() {
//   return (
//     <main className="flex justify-between h-screen px-8">
//       <div className="w-1/2">
//         <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page</h1>
//         <p className="text-lg">
//           This is where you can add more sections or content to your home page.
//         </p>
//       </div>
//       <div className="w-1/2 flex flex-col items-end overflow-y-auto space-y-4 h-[calc(100vh-100px)]">
//         {/* Adding multiple EventCards */}
//         <h1>Events</h1>
//         <EventCard />
//         <EventCard />
//         <EventCard />
//         <EventCard />
//         <EventCard />
//         <EventCard />
//         <EventCard />
//         {/* Add more EventCards as needed */}
//       </div>
//     </main>
//   );
// }


import EventCard from "../../components/event-display";

export default function Home() {
  return (
    <main className="flex justify-between h-screen px-8">
      <div className="w-1/2">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page</h1>
        <p className="text-lg">
          This is where you can add more sections or content to your home page.
        </p>
      </div>
      <div className="w-1/2 flex flex-col items-end overflow-y-auto space-y-4 h-[calc(100vh-100px)] pr-4">
        {/* Adding multiple EventCards */}
        <h1 className="text-2xl font-semibold mb-4">Events</h1>
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        {/* Add more EventCards as needed */}
      </div>
    </main>
  );
}
