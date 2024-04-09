import { TypographyH1, TypographyH2, TypographyH3 } from "../components/Text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function profileContainer(){
    return (
        <div className="my-40">
            <div className="border-2 border-gray-300 rounded-lg shadow-lg w-1/2 items-center mx-auto my-auto">
                <div className="flex justify-around items-center px-10 py-20">
                    <div>
                        <div className="text-center py-5">
                            <TypographyH1>Profile</TypographyH1>
                        </div>
                        <div className="py-3">
                            <TypographyH2>Username</TypographyH2>
                        </div>
                        <div className="py-1">
                            <TypographyH3>Codeforces Handle</TypographyH3>
                        </div>
                    </div>
                    <div>
                    <div className="text-center py-5">
                            <TypographyH1>Stats</TypographyH1>
                        </div>
                        <div className="py-3">
                            <TypographyH2>Amount of Problems</TypographyH2>
                        </div>
                        <div className="py-1">
                            <TypographyH3>Hardest Problem</TypographyH3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}