import { FC, useMemo } from "react";
import { Column } from "react-table";
import Table from "../../components/table";
import { usePostsContext } from "../../lib/posts";
import { PostProps } from "../../interfaces/post";

type Post = {
  title: string;
  body: string;
};

interface TableProps {
  data: PostProps[];
}

const Posts: FC<TableProps> = () => {
  const { posts, isFetching } = usePostsContext();

  const memorizedData = useMemo(
    () => posts.map(({ title, body }) => ({ title, body })),
    [posts]
  );

  const columns: Array<Column<Post>> = useMemo(
    () => [
      {
        Header: "Titulo",
        accessor: "title",
      },
      {
        Header: "Mensaje",
        accessor: "body",
      },
    ],
    []
  );

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return <Table<Post> data={memorizedData} columns={columns} name="posts" />;
};

export default Posts;
