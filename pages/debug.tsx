import { GetServerSideProps } from "next";
import { getApiBaseUrl } from "@/utils/getApiBaseUrl";

type ServerProps = {
  name: string;
};

export const getServerSideProps: GetServerSideProps<ServerProps> = async ({
  req,
}) => {
  const apiBaseUrl = getApiBaseUrl(req);
  const data = await fetch(`${apiBaseUrl}/hello`).then((data) => data.json());

  return {
    props: data,
  };
};

type Props = ServerProps;

export default function Debug(props: Props) {
  return (
    <div>
      <h1>This is debug page</h1>
      <span>My name is {props.name}</span>
    </div>
  );
}
