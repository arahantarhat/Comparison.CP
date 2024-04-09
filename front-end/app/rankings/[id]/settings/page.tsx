"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addToGroup, isGroupCreator, getMembers, removeFromGroup } from "@/app/actions";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "postcss";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

const invitePpl = (params: { id: string }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addToGroup(values.username, params.id);
    console.log(values);
  }

  return (
    <div className="py-10 w-screen">
      <div className="w-1/3 mx-auto">
        <div className="py-2 mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <input
                        className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        placeholder="仮想夢プラザ"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

// get group members, then for each member you'd have a button to make them admin or kick them
// if you're admin you can add members & kick them but not make them admin
export default function SettingsPage({ params }: { params: { id: string } }) {
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    async function fetchMembersData(id: string) {
      try {
        const result = await getMembers(id);
        console.log("result is: ", result);
        if (result) {
          const membersData = result.items.map((m: any) => m.codeforcesID);
          setMembers(membersData);
        }
      } catch (error) {
        console.error("Error fetching members data:", error);
      }
    }

    fetchMembersData(params.id);
  }, [params.id]);
  console.log(members);

  if (isGroupCreator(params.id)) {
    return (
      <div className="py-10">
        {invitePpl({ id: `${params.id}` })}
        <NormalTable
          memberNames={members}
          groupId={params.id}
          creator={false}
          admin={true}
        ></NormalTable>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Settings Page</h1>
        {/* Render members data here */}
        {members.map((member, index) => (
          <div key={index}>{member}</div>
        ))}
      </div>
    );
  }
}

type MemberActions = {
  [memberName: string]: boolean;
};

type NormalTableProps = {
  memberNames: string[];
  groupId: string;
  creator: boolean;
  admin: boolean;
};

const NormalTable: React.FC<NormalTableProps> = ({
  memberNames,
  groupId,
  creator,
  admin,
}) => {
  // Function to handle kicking a member
  const handleKick = (memberName: string) => {
    removeFromGroup(memberName, groupId);
    console.log(`Kicking ${memberName}`);
  };

  // Function to handle making a member admin
  const handleMakeAdmin = (memberName: string) => {
    // Implement logic to make the member admin
    console.log(`Making ${memberName} admin`);
  };

  if (creator) {
    return (
      <div>
        <div className="py-5">
          <div className="flex justify-center items-center p-10">
            <div className="w-1/3 margin-auto border-black rounded-xl">
              <Table>
                <TableCaption>Manage your group's actions</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Members</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-right">
                  {memberNames.map((memberName) => (
                    <TableRow key={memberName}>
                      <TableCell className="font-medium">{memberName}</TableCell>
                      <Button
                        className="px-2"
                        variant="ghost"
                        onClick={() => handleKick(memberName)}
                      >
                        Kick
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => handleMakeAdmin(memberName)}
                      >
                        Make Admin
                      </Button>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (admin) {
    return (
      <div>
        <div className="py-5">
          <div className="flex justify-center items-center p-10">
            <div className="w-1/3 margin-auto border-black rounded-xl">
              <Table>
                <TableCaption>Manage your group's actions</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Members</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-right">
                  {memberNames.map((memberName) => (
                    <TableRow key={memberName}>
                      <TableCell className="font-medium">{memberName}</TableCell>
                      <Button
                        className="px-2"
                        variant="ghost"
                        onClick={() => handleKick(memberName)}
                      >
                        Kick
                      </Button>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="py-5">
          <div className="flex justify-center items-center p-10">
            <div className="w-1/3 margin-auto border-black rounded-xl">
              <Table>
                <TableCaption>Manage your group's actions</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Members</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-right">
                  {memberNames.map((memberName) => (
                    <TableRow key={memberName}>
                      <TableCell className="font-medium">{memberName}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
