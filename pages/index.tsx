import { getApiBaseUrl } from "@/utils/getApiBaseUrl";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Book } from "@/types/book";
import { Button } from "@/components/button";

type ServerProps = {
  books: Book[];
};

export const getServerSideProps: GetServerSideProps<ServerProps> = async ({
  req,
}) => {
  const res = await fetch(`${getApiBaseUrl(req)}/books`).then((res) =>
    res.json()
  );
  return {
    props: { books: res.data },
  };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Home(props: Props) {
  console.log(props.books);
  return (
    <main className="py-4 px-8">
      <h1 className="text-4xl font-bold">Book App</h1>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">本の一覧</h2>
        <Button size="lg" onClick={() => console.log("clicked")}>
          本の追加
        </Button>
      </div>
      <div className="p-8 flex flex-wrap gap-4">
        {props.books.map((book) => (
          <div
            key={book.id}
            className="w-[30%] border border-gray-600 rounded-lg p-4"
          >
            <h3 className="text-lg font-bold mb-2">{book.title}</h3>
            <p className="mb-2">{book.summary}</p>
            <p>{book.created_at}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
