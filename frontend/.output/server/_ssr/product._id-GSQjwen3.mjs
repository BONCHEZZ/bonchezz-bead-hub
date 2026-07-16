import { b as getProductById } from "./utils-AKH12ZYD.mjs";
import { M as notFound, f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._id-GSQjwen3.js
var $$splitComponentImporter = () => import("./product._id-JzXx3pRf.mjs");
var Route = createFileRoute("/product/$id")({
	loader: async ({ params }) => {
		try {
			return { product: await getProductById(params.id) };
		} catch {
			throw notFound();
		}
	},
	head: ({ loaderData }) => ({ meta: [
		{ title: loaderData ? `${loaderData.product.name} — Bonchezz` : "Product — Bonchezz" },
		{
			name: "description",
			content: loaderData?.product.description ?? ""
		},
		{
			property: "og:image",
			content: loaderData?.product.images?.[0]?.image ?? ""
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
