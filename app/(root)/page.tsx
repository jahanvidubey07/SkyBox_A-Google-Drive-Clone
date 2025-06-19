import Image from "next/image";
import Link from "next/link";
import { Models } from "node-appwrite";

import { FormattedDateTime } from "@/components/FormattedDateTime";
import { Thumbnail } from "@/components/Thumbnail";
import { Separator } from "@/components/ui/separator";

import { convertFileSize, getUsageSummary } from "@/lib/utils";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.action";

import { Chart } from "@/components/Chart";
import ActionDropdown from "@/components/ActionDropdown ";

const Dashboard = async () => {
  const [files, totalSpace] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    getTotalSpaceUsed(),
  ]);

  const usageSummary = getUsageSummary(totalSpace);

  return (
    <div className="min-h-screen w-full px-6 py-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
        style={{
          backgroundImage: "url('/assets/patterns/grid-pattern.svg')",
        }}
      />

      {/* Top Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 relative z-10">
        {/* Storage Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6 transition-all duration-500 hover:shadow-2xl hover:scale-[1.01]">
          <h2 className="text-2xl font-bold text-indigo-900 mb-4 animate-slide-down">
            Storage Overview
          </h2>
          <div className="relative">
            <Chart used={totalSpace.used} />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-100/20 to-transparent rounded-2xl pointer-events-none animate-pulse-slow"></div>
          </div>
        </div>

        {/* File Type Summary */}
        <div className="bg-white rounded-2xl shadow-xl p-6 transition-all duration-500 hover:shadow-2xl hover:scale-[1.01]">
          <h2 className="text-2xl font-bold text-indigo-900 mb-4 animate-slide-down">
            File Type Summary
          </h2>
          <ul className="space-y-4">
            {usageSummary.map((summary) => (
              <li key={summary.title}>
                <Link
                  href={summary.url}
                  className="flex items-center justify-between rounded-lg p-3 hover:bg-indigo-50 hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={summary.icon}
                      width={36}
                      height={36}
                      alt={summary.title}
                      className="transform hover:rotate-12 hover:scale-110 transition-all duration-300"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{summary.title}</p>
                      <p className="text-sm text-gray-600">
                        <FormattedDateTime date={summary.latestDate} />
                      </p>
                    </div>
                  </div>
                  <span className="text-indigo-600 font-semibold text-sm whitespace-nowrap">
                    {convertFileSize(summary.size)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent Files Section */}
      <div className="bg-white rounded-2xl shadow-xl p-6 transition-all duration-500 hover:shadow-2xl hover:scale-[1.01] relative z-10">
        <h2 className="text-2xl font-bold text-indigo-900 mb-4 animate-slide-down">
          Recent Files
        </h2>

        {files.documents.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {files.documents.map((file: Models.Document) => (
              <li key={file.$id} className="py-4 flex items-center justify-between group">
                <Link
                  href={file.url}
                  target="_blank"
                  className="flex items-center gap-4 w-full hover:bg-indigo-50 rounded-lg px-2 py-2 transition-all duration-300 hover:scale-[1.02]"
                >
                  <Thumbnail
                    type={file.type}
                    extension={file.extension}
                    url={file.url}
                    className="transform hover:scale-110 hover:rotate-3 transition-all duration-300"
                  />
                  <div className="flex flex-col flex-1 overflow-hidden">
                    <p className="text-gray-900 font-medium truncate">
                      {file.name}
                    </p>
                    <FormattedDateTime
                      date={file.$createdAt}
                      className="text-sm text-gray-600"
                    />
                  </div>
                </Link>
                <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ActionDropdown file={file} />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-10 animate-fade-in">
            <p className="text-gray-600 text-lg flex items-center justify-center gap-2">
              <span className="text-2xl animate-bounce">📂</span> No files uploaded yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;