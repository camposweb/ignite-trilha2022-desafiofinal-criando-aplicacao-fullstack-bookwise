/*
  Warnings:

  - You are about to drop the `CategoriesOnBooks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategoriesOnBooks" DROP CONSTRAINT "CategoriesOnBooks_bookId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnBooks" DROP CONSTRAINT "CategoriesOnBooks_categoryId_fkey";

-- DropTable
DROP TABLE "CategoriesOnBooks";

-- CreateTable
CREATE TABLE "categories_on_books" (
    "bookId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "categories_on_books_pkey" PRIMARY KEY ("bookId","categoryId")
);

-- AddForeignKey
ALTER TABLE "categories_on_books" ADD CONSTRAINT "categories_on_books_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories_on_books" ADD CONSTRAINT "categories_on_books_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
