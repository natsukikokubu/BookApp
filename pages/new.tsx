import { Button } from "@/components";
import { redirect } from "next/dist/server/api-utils";
import { format } from "path";
import { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function New() {
  const router = useRouter();
  const [hasError, setHasError] = useState<boolean>(false);
  console.log(hasError);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const title = form.get("title");
    const summary = form.get("summary");
    const comment = form.get("comment");

    if (!title || !summary || !comment) {
      setHasError(true);
      return;
    }
    setHasError(false);

    await fetch("/api/books", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        title,
        summary,
        comment,
      }),
    }).then(() => {
      router.push("/");
    });
  };
  return (
    <main className="py-4 px-8">
      <h1 className="text-4xl font-bold">BookApp</h1>
      <h2 className="text-2xl font-bold">本の追加</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center ">
        <div className="py-4 lg:w-1/2 w-full">
          <label htmlFor="title">タイトル</label>
          <input
            name="title"
            className="block border border-gray-600 rounded-md w-full p-2"
          />
        </div>
        <div className="py-4 lg:w-1/2 w-full">
          <label htmlFor="summary">あらすじ</label>
          <textarea
            name="summary"
            className="block border border-gray-600 rounded-md w-full h-60 p-2"
          />
        </div>
        <div className="py-4 lg:w-1/2 w-full">
          <label htmlFor="comment">感想</label>
          <textarea
            name="comment"
            className="block border border-gray-600 rounded-md w-full h-60 p-2"
          />
        </div>
        <Button size="md" type="submit">
          保存
        </Button>
        {hasError && (
          <p className="text-red-600 pt-2">全ての項目を入力してください</p>
        )}
      </form>
    </main>
  );
}
