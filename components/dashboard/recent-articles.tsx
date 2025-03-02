"use client";
import React, { useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { deleteArticle } from "@/actions/delete-article";



type RecentArticlesProps = {
  articles: Prisma.ArticlesGetPayload<{
    include: {
      comments: true;
      author: {
        select: {
          name: true;
          email: true;
          imageUrl: true;
        };
      };
    };
  }>[];
};

const RecentArticles: React.FC<RecentArticlesProps> = ({ articles }) => {
  return (
    <Card className=" my-5">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Articles</CardTitle>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            View All →
          </Button>
        </div>
      </CardHeader>
      {
        !articles.length ? (<CardContent>No Articles Found!</CardContent>) : (
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Comments</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="">
               {
                articles.map((article)=>(
                  <TableRow key={article.id}>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Published
                    </span>
                  </TableCell>
                  <TableCell className="pl-9">{article.comments.length}</TableCell>
                  <TableCell className="">{article.createdAt.toDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link href={`/dashboard/articles/${article.id}/edit`}>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </Link>
                      <DeleteButton articleId={article.id}  />
                    </div>
                  </TableCell>
                </TableRow>
                )
               )}
              </TableBody>
            </Table>
          </CardContent>
        )
      }


    </Card>
  );
};

export default RecentArticles;

type DeleteButtonProps = {
  articleId: string;
};

const DeleteButton:React.FC<DeleteButtonProps> = ({articleId}) => {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={() =>
        startTransition(async () => {
            await deleteArticle(articleId);
        })
      }
    >
      <Button disabled={isPending} variant="ghost" size="sm" type="submit">
        {isPending ? "Deleting..." : "Delete"}
      </Button>
    </form>
  );
};