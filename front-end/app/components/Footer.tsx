import { Separator } from "@/components/ui/separator";
import { TypographyP } from "./Text";


// import { useWindowScroll } from "@react-hook/window-scroll";

const Footer: React.FC = () => {
  // const { y: scrollY } = useWindowScroll();

  return (
    <div>
      <footer className="fixed bottom-0 w-full">
        <div className="px-5">
          <div className="py-7 px-20">
            <div className="flex flex-col justify-start">
              <TypographyP>
                ©Copyright 2077
              </TypographyP>
              <a href="https://codeforces.com/" target="_blank">
                <img src="Codeforces_logo.svg.png" alt="Codeforces Logo" className="h-4 w-32"></img>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
