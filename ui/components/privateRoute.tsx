import { isAuthorized } from "@/utils/common";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "./spinner";

export const PrivateRoute = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    if (!isAuthorized()) router.push("/login");
    else setShowContent(true);
  }, [router]);
  return <>{showContent ? children : <Spinner />}</>;
};
