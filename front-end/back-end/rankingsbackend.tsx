import { getUserData } from "@/app/actions";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

type Rankings = {
  username: string;
  hardest_problem: number;
  hardest_problem_name: string; // Added this field to match the Rankings type
  total_problems: number;
};

class UserStatus {
  constructor(
    public username: string,
    public hardestProblemName: string,
    public hardestProblemRating: number,
    public totalProblems: number,
    public group: string
  ) {}
}

const groupPromise = getUserData().then((d) => {
  if(d){
    return d.group;
  }
});

async function getUserStatus(username: string, group: string): Promise<UserStatus | null> {
  const apiUrl = `https://codeforces.com/api/user.status?handle=${username}`;
//
  try {
    const statusResponse = await fetch(apiUrl);
    const userStatus = await statusResponse.json();

    if (userStatus.status !== "OK") {
      throw new Error("Failed to fetch user status");
    }

    const infoResponse = await fetch(
      `https://codeforces.com/api/user.info?handles=${username}`
    );
    const userInfo = await infoResponse.json();

    if (userInfo.status !== "OK" || !userInfo.result.length) {
      throw new Error("Failed to fetch user info");
    }

    const hardestRating = getHardestRating(userStatus);
    const hardestProblemName = getHardestProblemName(userStatus, hardestRating);
    const totalProblems = getTotalProblems(userStatus);

    return new UserStatus(
      username,
      hardestProblemName,
      hardestRating,
      totalProblems,
      group
    );
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

function getHardestRating(userStatus: any): number {
  let hardest = 0;
  if (userStatus.status === "OK") {
    for (const submission of userStatus.result) {
      if (submission.verdict === "OK" && submission.problem.rating > hardest) {
        hardest = submission.problem.rating;
      }
    }
  }
  return hardest;
}

function getHardestProblemName(userStatus: any, hardestRating: number): string {
  let hardestName = "";
  if (userStatus.status === "OK") {
    for (const submission of userStatus.result) {
      if (
        submission.verdict === "OK" &&
        submission.problem.rating === hardestRating
      ) {
        hardestName = submission.problem.name;
        break;
      }
    }
  }
  return hardestName;
}

function getTotalProblems(userStatus: any): number {
  let totalProblems = 0;
  if (userStatus.status === "OK") {
    totalProblems = userStatus.result.filter(
      (submission: any) => submission.verdict === "OK"
    ).length;
  }
  return totalProblems;
}

async function getRanking(name: string, group: string): Promise<Rankings | null> {
  // console.log(name, group);

  if (!name || !group) {
    return null;
  }

  const userStatus = await getUserStatus(name, group);
  if (!userStatus) {
    return null;
  }

  return {
    username: name,
    hardest_problem_name: userStatus.hardestProblemName,
    hardest_problem: userStatus.hardestProblemRating,
    total_problems: userStatus.totalProblems,
  };
}

export { getRanking };
