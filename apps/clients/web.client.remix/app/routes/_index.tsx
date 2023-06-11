import type { V2_MetaFunction } from "@remix-run/node";
import { AppName } from "global.constants";

export const meta: V2_MetaFunction = () => {
  return [
    { title: `Dashboard | ${AppName}` },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div>
      <h1>Welcome to Remix {AppName}</h1>
    </div>
  );
}