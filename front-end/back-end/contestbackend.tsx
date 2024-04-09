interface Contest {
  name: string;
  date: Date;
  id: number;
  difficulty: string;
}

const apiUrl = "https://codeforces.com/api/contest.list?gym=false";

async function getUpcomingContests(): Promise<Contest[]> {
  const response = await fetch(apiUrl);
  const data = await response.json();

  const contests = filterContests(data.result);
  return contests;
}

function filterContests(contests: any[]): Contest[] {
  return contests
    .filter((c: any) => c.phase === "BEFORE")
    .map((c: any) => {
      return {
        name: c.name,
        date: new Date(c.startTimeSeconds * 1000),
        id: c.id,
        difficulty: getDifficulty(c.name),
      };
    });
}

function getDifficulty(name: string): string {
  const parts = name.split("Div. ");
  if (parts.length === 1) {
    return "Not Rated";
  }

  const match = parts[1].match(/\d+/);
  if (!match) {
    return "Not Rated";
  }

  const difficulty = parseInt(match[0]);
  return difficulty < 6 ? difficulty.toString() : "Not Rated";
}



export default getUpcomingContests;
