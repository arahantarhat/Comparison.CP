"use client";
import { useEffect, useState } from "react";
import { rankingColumns } from "@/app/components/table_components/TableColumns";
import { getRanking } from "@/back-end/rankingsbackend";
import { DataTable } from "@/app/components/Table";
import { getGroupData, getMembers, getUserData, isUserLoggedIn } from "@/app/actions";
import { TypographyH1 } from "@/app/components/Text";

type Rankings = {
  username: string;
  hardest_problem_name: string;
  hardest_problem: number;
  total_problems: number;
};

export default function Home({ params }: { params: { id: string } }) {
  const [data, setData] = useState<Rankings[]>([]);
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    async function fetchGroupData() {
      const groupData = await getGroupData(params.id);
      setGroupName(groupData.name);
    }
    fetchGroupData();
  });

  useEffect(() => {
    async function fetchAndProcessMembers(id: string) {
      const result = await getMembers(id);
      return result.items.map((m) => m.codeforcesID);
    }

    async function populateMembersArray(id: any) {
      return await fetchAndProcessMembers(id);
    }

    async function fetchData(id: string) {
      const members = await populateMembersArray(id);

      let newData = [];
      for (let member of members) {
        const ranking = await getRanking(member, id);
        if (ranking) {
          newData.push(ranking);
        }
      }
      setData(newData);
    }

    fetchData(params.id);
  }, [params.id]);

  if(isUserLoggedIn()){
    return (
      <div className="py-10 my-10">
        <div className="p-10 head_text text-center">
          <TypographyH1>{groupName}</TypographyH1>
        </div>
        <div className="flex justify-center items-center p-10">
          <div className="w-5/6 margin-auto border-black rounded-xl">
            <DataTable columns={rankingColumns} data={data} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="py-10 my-10">
        <div className="p-10 head_text text-center">
          <TypographyH1>Login to see your ranking</TypographyH1>
        </div>
      </div>
    );
  }
}
