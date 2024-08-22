import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { ServerDropdown } from "@/components/ServerDropdown";
import { ProductCardGrid } from "@/components/ProductCardGrid";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("product_page", params.uid)
    .catch(() => notFound());

  const categories = await client.getAllByType("product_category");

  var selectedCategory = categories.find((c) => c.uid === params.uid);
  var products = selectedCategory?.data.category_products;

  return (
    <section className="container--lg">
      <h1 className="choose-category-heading">Selecciona categoria</h1>
      <section className="pp-layout">
        <ServerDropdown categories={categories} />
        <ProductCardGrid products={products} />
      </section>
      {page.data.slices && page.data.slices.length > 0 ? (
        <SliceZone slices={page.data.slices} components={components} />
      ) : (
        ""
        // <p>No content has been created for this product yet.</p>
      )}
    </section>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  return {
    title: `Product: ${params.uid}`,
    description: `This is the page for product ${params.uid}`,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("product_page");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
