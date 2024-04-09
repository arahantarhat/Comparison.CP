import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState } from 'react';

type MemberActions = {
  [memberName: string]: boolean;
};

type NormalTableProps = {
  memberNames: string[];
};

export const NormalTable: React.FC<NormalTableProps> = ({ memberNames }) => {
  const [memberActions, setMemberActions] = useState<MemberActions>({});

  const handleKick = (memberName: string) => {
    console.log(`Kicking ${memberName}`);
  };

  const handleMakeAdmin = (memberName: string) => {
    console.log(`Making ${memberName} admin`);
  };

  return (
    <div>
      <Table>
        <TableCaption>Manage your group's actions</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Members</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {memberNames.map((memberName) => (
            <TableRow key={memberName}>
              <TableCell className="font-medium">{memberName}</TableCell>
              <Button variant="destructive" onClick={() => handleKick(memberName)}>Kick</Button>
              <Button variant="default" onClick={() => handleMakeAdmin(memberName)}>Make Admin</Button>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};


