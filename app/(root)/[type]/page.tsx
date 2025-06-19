import React from "react";
import Sort from "@/components/Sort";

import { getFileTypesParams } from "@/lib/utils";
import { getFiles } from "@/lib/actions/file.action";
import { Models } from "node-appwrite";
import Card from "@/components/Card";

const Page = async ({ searchParams, params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
  const searchText = ((await searchParams)?.query as string) || "";
  const sort = ((await searchParams)?.sort as string) || "";

  const types = getFileTypesParams(type) as FileType[];

  const files = await getFiles({ types, searchText, sort });

  // 🔍 Debug - log first file (check your terminal/server console)
  if (files.total > 0) {
    console.log("Sample file:", files.documents[0]);
  }

  // ✅ Replace `file.size` with correct property from your console if needed
  const totalSizeInBytes = files.documents.reduce(
    (acc: number, file: Models.Document) => acc + (file.size || 0),
    0
  );
  const totalSizeInMB = (totalSizeInBytes / (1024 * 1024)).toFixed(2);

  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">{type}</h1>

        <div className="total-size-section">
          {files.total > 0 && (
            <p className="body-1">
              Total: <span className="h5">{totalSizeInMB} MB</span>
            </p>
          )}

          <div className="sort-container">
            <p className="body-1 hidden text-light-200 sm:block">Sort by:</p>
            <Sort />
          </div>
        </div>
      </section>

      {files.total > 0 ? (
        <section className="file-list">
          {files.documents.map((file: Models.Document) => (
            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="empty-list">No files uploaded</p>
      )}
    </div>
  );
};

export default Page;
