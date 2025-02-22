import { getApiBaseUrl } from "@/utils/getApiBaseUrl";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Book } from "@/types/book";
import { Button } from "@/components/button";
import { useRouter } from "next/router";
import { useState } from "react";

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
  const router = useRouter();
  const [deleted, setDeleted] = useState<boolean>(false);
  const handleClickNewButton = () => {
    router.push("/new");
  };

  //何のデータを削除するのかがわからないといけないためにidを引数にとる
  const handleClickDeleteButton = async (id: number) => {
    await fetch(`/api/books/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then(() => {
      setDeleted(true);
      router.replace(router.asPath);
    });
  };

  return (
    <main className="py-4 px-8">
      <h1 className="text-4xl font-bold">Book App</h1>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">本の一覧</h2>
        <Button size="lg" onClick={handleClickNewButton}>
          本の追加
        </Button>
      </div>
      <div className="p-8 flex flex-wrap gap-4">
        {deleted && (
          <div className="w-full bg-green-200 p-4 rounded-lg mb-4">
            削除しました
          </div>
        )}
      </div>
      <div className="p-8 flex flex-wrap gap-4">
        {props.books.map((book) => (
          <div
            key={book.id}
            className="lg:w-[30%] w-full  border border-gray-600 rounded-lg p-4"
          >
            <h3 className="text-lg font-bold mb-2">{book.title}</h3>
            <p className="mb-2">{book.summary}</p>
            <p>{book.created_at}</p>
            <div className="flex gap-4 justify-end">
              <a
                href={`/${book.id}/edit`}
                className="text-gray-700 underline hover:text-blue-700 cursor-pointer"
              >
                編集
              </a>
              <button
                onClick={() => handleClickDeleteButton(book.id)}
                className="text-gray-700 hover:text-red-700 underline"
              >
                削除
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
