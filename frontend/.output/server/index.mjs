globalThis.__nitro_main__ = import.meta.url;
import { a as toEventHandler, c as serve, i as defineLazyEventHandler, n as HTTPError, r as defineHandler, s as NodeResponse, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/about-BpxN9tAf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"988-FvYtOpXDjNXIFz/yvz3IisSoqDo\"",
		"mtime": "2026-07-16T08:07:05.918Z",
		"size": 2440,
		"path": "../public/assets/about-BpxN9tAf.js"
	},
	"/assets/AdminSearchBar-recJ5_dt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f7-UuijRETDFqhGesbLG8iHEJzrh6o\"",
		"mtime": "2026-07-16T08:07:05.858Z",
		"size": 503,
		"path": "../public/assets/AdminSearchBar-recJ5_dt.js"
	},
	"/assets/AdminLoadingSpinner-yjKu1Eeq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"44b-0KWT1CfsAs7pWScVYwVhgEy/Hro\"",
		"mtime": "2026-07-16T08:07:05.845Z",
		"size": 1099,
		"path": "../public/assets/AdminLoadingSpinner-yjKu1Eeq.js"
	},
	"/assets/badge-BYDC5G9f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"32e-5BworHcOSqpGFFIgUY59+mtFkYY\"",
		"mtime": "2026-07-16T08:07:05.976Z",
		"size": 814,
		"path": "../public/assets/badge-BYDC5G9f.js"
	},
	"/assets/arrow-right-C9JP1Vz7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-ITZL+00LeNxlebhxJom6rZUDLCo\"",
		"mtime": "2026-07-16T08:07:05.959Z",
		"size": 165,
		"path": "../public/assets/arrow-right-C9JP1Vz7.js"
	},
	"/assets/button-BDe4JQrr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"55a-/Eqk0ba0QkNSGHVcYy6QOQCYAeM\"",
		"mtime": "2026-07-16T08:07:05.994Z",
		"size": 1370,
		"path": "../public/assets/button-BDe4JQrr.js"
	},
	"/assets/cart-DGstfqBv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1183-TidHo9wzfQ/l3SIRRBWpzRp63ig\"",
		"mtime": "2026-07-16T08:07:06.000Z",
		"size": 4483,
		"path": "../public/assets/cart-DGstfqBv.js"
	},
	"/assets/categories-GXoYEVIr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99d-kyHn8n9un4jeJJmb27h5lECwsKc\"",
		"mtime": "2026-07-16T08:07:06.034Z",
		"size": 2461,
		"path": "../public/assets/categories-GXoYEVIr.js"
	},
	"/assets/categories-B-fpLGWD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"123a-xWLVEoijkMGOrroXeBENAC5u5o4\"",
		"mtime": "2026-07-16T08:07:06.021Z",
		"size": 4666,
		"path": "../public/assets/categories-B-fpLGWD.js"
	},
	"/assets/checkout-PZyndE-9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f50-aarZCK5yKhyEuu+jjQYf776Mu14\"",
		"mtime": "2026-07-16T08:07:06.047Z",
		"size": 8016,
		"path": "../public/assets/checkout-PZyndE-9.js"
	},
	"/assets/circle-x-BTLFqvd9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cf-kjqVBr1Mrgzo0fGD1RnXnzIDvqc\"",
		"mtime": "2026-07-16T08:07:06.063Z",
		"size": 207,
		"path": "../public/assets/circle-x-BTLFqvd9.js"
	},
	"/assets/circle-check-xJXDWieF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b2-2U8FSlPzYebp/5muQqcP1lmxTL4\"",
		"mtime": "2026-07-16T08:07:06.047Z",
		"size": 178,
		"path": "../public/assets/circle-check-xJXDWieF.js"
	},
	"/assets/contact-Ed5CBjn0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1383-EhNBlRAfEGKK2MDEB9U4xQN02fs\"",
		"mtime": "2026-07-16T08:07:06.064Z",
		"size": 4995,
		"path": "../public/assets/contact-Ed5CBjn0.js"
	},
	"/assets/customers-C9j5zECw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"68b-dm8eSPnc0pSPFh4MqtIEl8p3zsg\"",
		"mtime": "2026-07-16T08:07:06.099Z",
		"size": 1675,
		"path": "../public/assets/customers-C9j5zECw.js"
	},
	"/assets/admin-Ejq_nVyv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5cb92-aVXVuZO0N2LQldGnVJueU5stUbk\"",
		"mtime": "2026-07-16T08:07:05.934Z",
		"size": 379794,
		"path": "../public/assets/admin-Ejq_nVyv.js"
	},
	"/assets/DeleteConfirmationModal-BFvw7nn8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b3-ec6XZzR3VfZGbFPd2aYT0TbWCB0\"",
		"mtime": "2026-07-16T08:07:05.866Z",
		"size": 691,
		"path": "../public/assets/DeleteConfirmationModal-BFvw7nn8.js"
	},
	"/assets/createLucideIcon-BVHV9nw4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e600-SoBOnMss02Kn9Bohw3c0L/P+XsI\"",
		"mtime": "2026-07-16T08:07:06.074Z",
		"size": 58880,
		"path": "../public/assets/createLucideIcon-BVHV9nw4.js"
	},
	"/assets/dialog-BDltjo9R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"183b-stFSGJ8LLMDQp0ViP3a7Onzmoic\"",
		"mtime": "2026-07-16T08:07:06.116Z",
		"size": 6203,
		"path": "../public/assets/dialog-BDltjo9R.js"
	},
	"/assets/dist-C1RJhgYD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"281-K2XQEy4dSuaU+NZeVCiNF1cCMKU\"",
		"mtime": "2026-07-16T08:07:06.121Z",
		"size": 641,
		"path": "../public/assets/dist-C1RJhgYD.js"
	},
	"/assets/dist-xe92yOhc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"98b-7DbFYDGetr7kIRxqOekn6QSXCCk\"",
		"mtime": "2026-07-16T08:07:06.153Z",
		"size": 2443,
		"path": "../public/assets/dist-xe92yOhc.js"
	},
	"/assets/heart-D7r4nF9W.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"102-urYeI9oktRh65b3WYajnllK/WSI\"",
		"mtime": "2026-07-16T08:07:06.186Z",
		"size": 258,
		"path": "../public/assets/heart-D7r4nF9W.js"
	},
	"/assets/dist-DNBfLkWW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6a93-C8RANjZZEQDGIP3vbXLRtAJIzuE\"",
		"mtime": "2026-07-16T08:07:06.139Z",
		"size": 27283,
		"path": "../public/assets/dist-DNBfLkWW.js"
	},
	"/images/hero-beads.jpg": {
		"type": "image/jpeg",
		"etag": "\"29b5a-vz6NHMiwKekiJK14j9cY/cALUFQ\"",
		"mtime": "2026-07-12T14:37:34.473Z",
		"size": 170842,
		"path": "../public/images/hero-beads.jpg"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4203e-yPT5tcrNDwTfvHNrXt2MuZyMeYs\"",
		"mtime": "2026-07-09T17:19:01.122Z",
		"size": 270398,
		"path": "../public/favicon.ico"
	},
	"/assets/es2015-dPlkmzM2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"68c5-xJpzPua9crUIsBqw7aSzQdK+Tys\"",
		"mtime": "2026-07-16T08:07:06.167Z",
		"size": 26821,
		"path": "../public/assets/es2015-dPlkmzM2.js"
	},
	"/assets/hero-beads-CgON6ZSO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37-YhTOX6f1AbWXe2TIS1LLUnmJWWc\"",
		"mtime": "2026-07-16T08:07:06.194Z",
		"size": 55,
		"path": "../public/assets/hero-beads-CgON6ZSO.js"
	},
	"/assets/hero-beads-CWqlINKl.jpg": {
		"type": "image/jpeg",
		"etag": "\"29b5a-vz6NHMiwKekiJK14j9cY/cALUFQ\"",
		"mtime": "2026-07-16T08:07:06.543Z",
		"size": 170842,
		"path": "../public/assets/hero-beads-CWqlINKl.jpg"
	},
	"/assets/input-Bte1wISZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"270-FppQDnxEH13XTnJmedcjl4KvY/o\"",
		"mtime": "2026-07-16T08:07:06.202Z",
		"size": 624,
		"path": "../public/assets/input-Bte1wISZ.js"
	},
	"/assets/Layout-diYaS2ED.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28d4-77xDlkDXNitIVSG/9h/VOgXCnj0\"",
		"mtime": "2026-07-16T08:07:05.870Z",
		"size": 10452,
		"path": "../public/assets/Layout-diYaS2ED.js"
	},
	"/assets/inventory-iZGXfoEr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fa7-0kAMXdVPd4gofY4mR6rycgrhJ68\"",
		"mtime": "2026-07-16T08:07:06.204Z",
		"size": 4007,
		"path": "../public/assets/inventory-iZGXfoEr.js"
	},
	"/assets/login-VW06GDrc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a0f-Mm0bMhJ6VSm+kKnFxShf1aGLNR4\"",
		"mtime": "2026-07-16T08:07:06.222Z",
		"size": 2575,
		"path": "../public/assets/login-VW06GDrc.js"
	},
	"/assets/mail-CsCxbKIG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-SkorIuguOhHl7z0jlRyMaapoS4M\"",
		"mtime": "2026-07-16T08:07:06.232Z",
		"size": 213,
		"path": "../public/assets/mail-CsCxbKIG.js"
	},
	"/assets/matchContext-DDxBhfvj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a1-lqANDfLLMqlYTUMLOfxpcWgstTI\"",
		"mtime": "2026-07-16T08:07:06.241Z",
		"size": 673,
		"path": "../public/assets/matchContext-DDxBhfvj.js"
	},
	"/assets/messages-DP7fUF0o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"922-4z+PolwqhUmH8v5A2puOogQxXiw\"",
		"mtime": "2026-07-16T08:07:06.274Z",
		"size": 2338,
		"path": "../public/assets/messages-DP7fUF0o.js"
	},
	"/assets/not-found-i5RsCZif.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-Trmr7GZIBZuvfg4uM18tBiRtOXg\"",
		"mtime": "2026-07-16T08:07:06.285Z",
		"size": 118,
		"path": "../public/assets/not-found-i5RsCZif.js"
	},
	"/assets/orders-DXE-CPbQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b85-Wx/xInoNjYYwVzXg3Q7yhcA7Fhc\"",
		"mtime": "2026-07-16T08:07:06.293Z",
		"size": 2949,
		"path": "../public/assets/orders-DXE-CPbQ.js"
	},
	"/assets/payments-COz6naFJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b02-ZWZFuBrPRD3yFIXNkx8m6YpePFM\"",
		"mtime": "2026-07-16T08:07:06.302Z",
		"size": 2818,
		"path": "../public/assets/payments-COz6naFJ.js"
	},
	"/assets/product._id-CAudHwAv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1455-RhSI+dnwxH+nOnmdxzFi6JZG7ic\"",
		"mtime": "2026-07-16T08:07:06.318Z",
		"size": 5205,
		"path": "../public/assets/product._id-CAudHwAv.js"
	},
	"/assets/ProductCard-BVZWiqQV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9fe-Q3hi2VJIfto0BEELgSPIQd8sEd4\"",
		"mtime": "2026-07-16T08:07:05.884Z",
		"size": 2558,
		"path": "../public/assets/ProductCard-BVZWiqQV.js"
	},
	"/assets/reviews-MDwsn54D.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11ef-Mk1qXai/2JPROWk5zai+WJvwzJo\"",
		"mtime": "2026-07-16T08:07:06.378Z",
		"size": 4591,
		"path": "../public/assets/reviews-MDwsn54D.js"
	},
	"/assets/register-Bovh5FXh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10e1-x7CIHwWOmBbIGaQcXtZygn/7xeY\"",
		"mtime": "2026-07-16T08:07:06.368Z",
		"size": 4321,
		"path": "../public/assets/register-Bovh5FXh.js"
	},
	"/assets/products-7lPgYJ1V.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"202c-P4WITbsDnmU4WD467g90ubCU5bs\"",
		"mtime": "2026-07-16T08:07:06.318Z",
		"size": 8236,
		"path": "../public/assets/products-7lPgYJ1V.js"
	},
	"/assets/search-0p648zU-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-MSx6yOWcWLULDlkamUB6H+K7WTM\"",
		"mtime": "2026-07-16T08:07:06.388Z",
		"size": 174,
		"path": "../public/assets/search-0p648zU-.js"
	},
	"/assets/routes-C3JA2bXe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"291c-OskWd9WTOWvglyiCulztCDvDAw8\"",
		"mtime": "2026-07-16T08:07:06.388Z",
		"size": 10524,
		"path": "../public/assets/routes-C3JA2bXe.js"
	},
	"/assets/select-BfMeuK1J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b1f-ZGfIC/1n3FCHwa416o2g0nfqD6U\"",
		"mtime": "2026-07-16T08:07:06.400Z",
		"size": 23327,
		"path": "../public/assets/select-BfMeuK1J.js"
	},
	"/assets/settings-DXSWzupk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b9c-fgpcv9efN2Jd9bxxEx5E7+uPyMQ\"",
		"mtime": "2026-07-16T08:07:06.405Z",
		"size": 2972,
		"path": "../public/assets/settings-DXSWzupk.js"
	},
	"/assets/react-dom-DJba3NYy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ddf-G1T40xnDIsuYucLjkXmOTdg0Q9k\"",
		"mtime": "2026-07-16T08:07:06.337Z",
		"size": 3551,
		"path": "../public/assets/react-dom-DJba3NYy.js"
	},
	"/assets/shopping-bag-EBlR_CdI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5c76-7kp1uuHaghUytEdHcqChSlvONmk\"",
		"mtime": "2026-07-16T08:07:06.421Z",
		"size": 23670,
		"path": "../public/assets/shopping-bag-EBlR_CdI.js"
	},
	"/assets/shop-OSlLtZgL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f35-bVBbH3zNehMxOeSi/dCA+Et4SRs\"",
		"mtime": "2026-07-16T08:07:06.412Z",
		"size": 3893,
		"path": "../public/assets/shop-OSlLtZgL.js"
	},
	"/assets/index-ePkZRfOz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"83f25-2xIM6mXNdsHQjlQDGdF6GKqZIWI\"",
		"mtime": "2026-07-16T08:07:05.732Z",
		"size": 540453,
		"path": "../public/assets/index-ePkZRfOz.js"
	},
	"/assets/users-DTEXLe6y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3d7-FSskPWLPIK2/sstdkrhzyedDYRY\"",
		"mtime": "2026-07-16T08:07:06.483Z",
		"size": 983,
		"path": "../public/assets/users-DTEXLe6y.js"
	},
	"/assets/textarea-CzKK2emt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20a-UVUXL8FUxfrls2u8KKnENmOSuZY\"",
		"mtime": "2026-07-16T08:07:06.474Z",
		"size": 522,
		"path": "../public/assets/textarea-CzKK2emt.js"
	},
	"/assets/sparkles-DJMEfcyB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-eU/erBOdo+zICZx+RN+vTy6Zc48\"",
		"mtime": "2026-07-16T08:07:06.452Z",
		"size": 494,
		"path": "../public/assets/sparkles-DJMEfcyB.js"
	},
	"/assets/styles-B347U3A5.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1651e-PtUROwhPpTAR2NPmXMpkTUG2XsM\"",
		"mtime": "2026-07-16T08:07:06.543Z",
		"size": 91422,
		"path": "../public/assets/styles-B347U3A5.css"
	},
	"/assets/table-CWRhFYiK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"66f-vgfHQXz0/2MIJXOqWiYK+uRsqB4\"",
		"mtime": "2026-07-16T08:07:06.466Z",
		"size": 1647,
		"path": "../public/assets/table-CWRhFYiK.js"
	},
	"/assets/utils-B6KiDbIe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6a7d-iNkBSvaSyIjvZOzWoTvEa49qwcI\"",
		"mtime": "2026-07-16T08:07:06.486Z",
		"size": 27261,
		"path": "../public/assets/utils-B6KiDbIe.js"
	},
	"/assets/wallet-InhaKGOu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11e-NMbXjhAqlD+e6S6A9V3sP9t6b6w\"",
		"mtime": "2026-07-16T08:07:06.519Z",
		"size": 286,
		"path": "../public/assets/wallet-InhaKGOu.js"
	},
	"/assets/star--gedNxXq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d8-GR0CTbuoi50ftq53+1yfFT/bZvs\"",
		"mtime": "2026-07-16T08:07:06.458Z",
		"size": 472,
		"path": "../public/assets/star--gedNxXq.js"
	},
	"/assets/zod-BPHzUMFk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7c89-uzhr+U7pF7FzqIU/an9n3JF6/mA\"",
		"mtime": "2026-07-16T08:07:06.526Z",
		"size": 31881,
		"path": "../public/assets/zod-BPHzUMFk.js"
	},
	"/assets/_layout-DRzk-sHj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8383-FOZDmI6lfLveuKiP9JktITs9cSY\"",
		"mtime": "2026-07-16T08:07:05.902Z",
		"size": 33667,
		"path": "../public/assets/_layout-DRzk-sHj.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_dWBRTb = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_dWBRTb
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		middleware.push(...h3App["~middleware"]);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region #nitro/virtual/tracing
var tracingSrvxPlugins = [];
//#endregion
//#region node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
var node_server_default = {};
//#endregion
export { node_server_default as default };
