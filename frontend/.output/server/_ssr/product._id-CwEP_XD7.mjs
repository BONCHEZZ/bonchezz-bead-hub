import { b as getProductById } from "./utils-CN24kyyZ.mjs";
import { M as notFound, f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._id-CwEP_XD7.js
var $$splitComponentImporter = () => import("./product._id-CJ0asu7Y.mjs");
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
