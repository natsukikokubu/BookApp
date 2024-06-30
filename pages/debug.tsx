import { GetServerSideProps } from "next";

type ServerProps = {
  name: string;
};

export const getServerSideProps: GetServerSideProps<ServerProps> = async ({
  req,
}) => {
  const host = req.headers.host || "localhost:3000";
  const protocol = /^localhost/.test(host) ? "http" : "https";
  console.log(req.headers);
  const data = await fetch(`${protocol}://${host}/api/hello`).then((data) =>
    data.json()
  );

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
