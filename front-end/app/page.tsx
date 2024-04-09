
import { TypographyH1 } from "./components/Text";
import getUpcomingContests from "@/back-end/contestbackend";
import { DataTable } from "./components/Table";
import { contestsColumns } from "./components/table_components/TableColumns";
import Link from "next/link";

type Contests = {
  name: string;
  link: string; // Adjusted type to string
  date: string;
  difficulty: string;
};

async function getData(): Promise<Contests[]> {
  const res = await getUpcomingContests(); // Ensure to await if getUpcomingContests() returns a promise
  let data: Contests[] = [];

  const formatDate = (inputDate: Date): string => {
    const day = ("0" + inputDate.getDate()).slice(-2);
    const month = ("0" + (inputDate.getMonth() + 1)).slice(-2);
    const year = inputDate.getFullYear();
    const hours = ("0" + inputDate.getHours()).slice(-2);
    const minutes = ("0" + inputDate.getMinutes()).slice(-2);
    const seconds = ("0" + inputDate.getSeconds()).slice(-2);
    const timeZone =
      inputDate.toString().match(/\(([A-Za-z\s].*)\)/)?.[1] || "GMT";

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${timeZone}`;
  };

  for (const contest of res) {
    const link = `https://codeforces.com/contest/${contest.id}`; // Define link as a string
    data.push({
      name: contest.name,
      link: link, // Assign the string URL to the link property
      date: formatDate(contest.date),
      difficulty: contest.difficulty,
    });
  }

  return data;
}


export default async function Home() {
  const data = await getData();
  return (
    <div className="py-10 my-10">
      <div className="p-10 head_text text-center">
        <TypographyH1>Contests</TypographyH1>
      </div>
      <div className="flex justify-center items-center p-10">
        <div className="w-5/6 margin-auto border-black rounded-xl ">
          <DataTable columns={contestsColumns} data={data} />
        </div>
      </div>
    </div>
  );
}
