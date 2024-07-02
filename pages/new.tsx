import { Button } from "@/components";
import { format } from "path";
import { FormEvent } from "react";

export default function New() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const title = form.get("title");
    const summary = form.get("summary");
    const comment = form.get("comment");

    console.log({ title, summary, comment });
  };
  return (
    <main className="py-4 px-8">
      <h1 className="text-4xl font-bold">BookApp</h1>
      <h2 className="text-2xl font-bold">本の追加</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center ">
        <div className="py-4 w-1/2">
          <label htmlFor="title">タイトル</label>
          <input
            name="title"
            className="block border border-gray-600 rounded-md w-full p-2"
          />
        </div>
        <div className="py-4 w-1/2">
          <label htmlFor="summary">あらすじ</label>
          <textarea
            name="summary"
            className="block border border-gray-600 rounded-md w-full h-40 p-2"
          />
        </div>
        <div className="py-4 w-1/2">
          <label htmlFor="comment">感想</label>
          <textarea
            name="comment"
            className="block border border-gray-600 rounded-md w-full h-40 p-2"
          />
        </div>
        <Button size="md" type="submit">
          保存
        </Button>
      </form>
    </main>
  );
}
