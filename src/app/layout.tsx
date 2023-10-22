import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../lib/components/header/header";
import Background from "../lib/components/background/background";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Colorful Sudoku Puzzle Solver and Generator",
  description: "This application uses the dancing links algorithm to solve sudoku puzzles. It can also generate sudoku puzzles. It has a colorful theme.",
  keywords: ["sudoku", "sudoku solvers", "play sudoku puzzles", "sudoku solutions solver", "exact cover", "sudoku puzzles", "sudoku game", "generate sudoku"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html style={{ height: "100%" }} lang="en">
        <body className={inter.className} style={{ height: "100%" }}>
          <Background />
          <Header />
          <div style={{ width: "70%", margin: "auto" }}>{children}</div>
          <Analytics />
        </body>
      </html>
    </>
  );
}
