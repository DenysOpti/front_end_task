import { isAuthorized } from "@/utils/common";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "./spinner";

export const UnAuthRoute = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    if (isAuthorized()) router.push("/");
    else setShowContent(true);
  }, [router]);
  return <>{showContent ? children : <Spinner />}</>;
};
