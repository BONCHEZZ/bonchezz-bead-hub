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
	"/assets/about-DQx7UeQ8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"988-2+hk+BX3Z0hCQ0gUpijfMIJdDLU\"",
		"mtime": "2026-07-16T08:40:39.969Z",
		"size": 2440,
		"path": "../public/assets/about-DQx7UeQ8.js"
	},
	"/assets/AdminLoadingSpinner-BQcmkaft.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"44b-XVTHKjr9Q25bf/Wm2Ym+SmSHl0o\"",
		"mtime": "2026-07-16T08:40:39.853Z",
		"size": 1099,
		"path": "../public/assets/AdminLoadingSpinner-BQcmkaft.js"
	},
	"/assets/admin-BJey8aeT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5cb92-1SAxAEgJqc1HDTDGvD7EvyQnN/s\"",
		"mtime": "2026-07-16T08:40:39.981Z",
		"size": 379794,
		"path": "../public/assets/admin-BJey8aeT.js"
	},
	"/assets/arrow-right-B2EET6eb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-Qzk4nHBlsK2azjAf1t9htHCohvY\"",
		"mtime": "2026-07-16T08:40:40.013Z",
		"size": 165,
		"path": "../public/assets/arrow-right-B2EET6eb.js"
	},
	"/assets/AdminSearchBar-DPanV6TL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f7-yr1MOu4ggjWEB+cJvMONCbECLlo\"",
		"mtime": "2026-07-16T08:40:39.858Z",
		"size": 503,
		"path": "../public/assets/AdminSearchBar-DPanV6TL.js"
	},
	"/assets/badge-D-I7OlTJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"32e-LrWYUYJzUC62BqcOq0ys/a49k18\"",
		"mtime": "2026-07-16T08:40:40.024Z",
		"size": 814,
		"path": "../public/assets/badge-D-I7OlTJ.js"
	},
	"/assets/button-CqoYEz2h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"55a-pyK/RGJNzozEP8HTnuCMBB0JV/E\"",
		"mtime": "2026-07-16T08:40:40.037Z",
		"size": 1370,
		"path": "../public/assets/button-CqoYEz2h.js"
	},
	"/assets/checkout-DvZSGu0W.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f50-9zNOqq1Dt+uIAA3X2qSVb3iiCSU\"",
		"mtime": "2026-07-16T08:40:40.084Z",
		"size": 8016,
		"path": "../public/assets/checkout-DvZSGu0W.js"
	},
	"/assets/categories-C9twhd_1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"123a-+BxLxR2LmNO16snoeusZQdTYV1U\"",
		"mtime": "2026-07-16T08:40:40.060Z",
		"size": 4666,
		"path": "../public/assets/categories-C9twhd_1.js"
	},
	"/assets/cart-C_p8AtfQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1183-NS8Edopu3IdYcLGTq38MYm9wbhM\"",
		"mtime": "2026-07-16T08:40:40.037Z",
		"size": 4483,
		"path": "../public/assets/cart-C_p8AtfQ.js"
	},
	"/assets/circle-check-R_7umpxG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b2-Boog0WoahDgyyGLPR+V1Zzw4tAU\"",
		"mtime": "2026-07-16T08:40:40.101Z",
		"size": 178,
		"path": "../public/assets/circle-check-R_7umpxG.js"
	},
	"/assets/categories-GbPWHYfC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99d-SoLeGt1gCsBR/PxQ+LA4uKB6Jxc\"",
		"mtime": "2026-07-16T08:40:40.070Z",
		"size": 2461,
		"path": "../public/assets/categories-GbPWHYfC.js"
	},
	"/assets/circle-x-D9jCuXwx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cf-Th9M9yzPHaEatWu+5rq7ABizjkI\"",
		"mtime": "2026-07-16T08:40:40.115Z",
		"size": 207,
		"path": "../public/assets/circle-x-D9jCuXwx.js"
	},
	"/assets/contact-DgMs8Sbh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1383-q0flZcskrhBbuL370LJL+UE9vuU\"",
		"mtime": "2026-07-16T08:40:40.126Z",
		"size": 4995,
		"path": "../public/assets/contact-DgMs8Sbh.js"
	},
	"/assets/DeleteConfirmationModal-C-R-JmV0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b3-9jC9XYP/aeItSWG0s0/H6w6PuyI\"",
		"mtime": "2026-07-16T08:40:39.875Z",
		"size": 691,
		"path": "../public/assets/DeleteConfirmationModal-C-R-JmV0.js"
	},
	"/assets/customers-Cw1K6JVC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"68b-CiuseWOgxoHJB1EqH5m58P3/t54\"",
		"mtime": "2026-07-16T08:40:40.176Z",
		"size": 1675,
		"path": "../public/assets/customers-Cw1K6JVC.js"
	},
	"/assets/createLucideIcon-BJXuFjDp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e610-i9s8pUDwpe9HRO06nbK/xB9Epc8\"",
		"mtime": "2026-07-16T08:40:40.134Z",
		"size": 58896,
		"path": "../public/assets/createLucideIcon-BJXuFjDp.js"
	},
	"/assets/dialog-CCAinQLs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"183b-freY51pv6ufbxfNnlGJcg+7zWGA\"",
		"mtime": "2026-07-16T08:40:40.187Z",
		"size": 6203,
		"path": "../public/assets/dialog-CCAinQLs.js"
	},
	"/assets/dist-C1RJhgYD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"281-K2XQEy4dSuaU+NZeVCiNF1cCMKU\"",
		"mtime": "2026-07-16T08:40:40.223Z",
		"size": 641,
		"path": "../public/assets/dist-C1RJhgYD.js"
	},
	"/assets/dist-Bk19LnHn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6a93-vnfTicE1DhVXxCo1lHOg8Rrya/M\"",
		"mtime": "2026-07-16T08:40:40.201Z",
		"size": 27283,
		"path": "../public/assets/dist-Bk19LnHn.js"
	},
	"/assets/dist-Ch0S1LG3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"98b-5EoZrRghr1YxhY25RkMJXhj5PiQ\"",
		"mtime": "2026-07-16T08:40:40.250Z",
		"size": 2443,
		"path": "../public/assets/dist-Ch0S1LG3.js"
	},
	"/assets/es2015-oj87Q0ie.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"68c5-CNJrG2hM2VDS0+id1ACu8xS2PtQ\"",
		"mtime": "2026-07-16T08:40:40.283Z",
		"size": 26821,
		"path": "../public/assets/es2015-oj87Q0ie.js"
	},
	"/assets/hero-beads-CgON6ZSO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37-YhTOX6f1AbWXe2TIS1LLUnmJWWc\"",
		"mtime": "2026-07-16T08:40:40.330Z",
		"size": 55,
		"path": "../public/assets/hero-beads-CgON6ZSO.js"
	},
	"/assets/heart-B3HvJ12p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"102-1XTxKC5pFluTTx2EgZoqdJqxBvA\"",
		"mtime": "2026-07-16T08:40:40.320Z",
		"size": 258,
		"path": "../public/assets/heart-B3HvJ12p.js"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4203e-yPT5tcrNDwTfvHNrXt2MuZyMeYs\"",
		"mtime": "2026-07-09T17:19:01.122Z",
		"size": 270398,
		"path": "../public/favicon.ico"
	},
	"/assets/hero-beads-CWqlINKl.jpg": {
		"type": "image/jpeg",
		"etag": "\"29b5a-vz6NHMiwKekiJK14j9cY/cALUFQ\"",
		"mtime": "2026-07-16T08:40:40.746Z",
		"size": 170842,
		"path": "../public/assets/hero-beads-CWqlINKl.jpg"
	},
	"/assets/input-ancFD76X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"270-UAiHQul7Or2AjQBFaAx4SSRqE8M\"",
		"mtime": "2026-07-16T08:40:40.336Z",
		"size": 624,
		"path": "../public/assets/input-ancFD76X.js"
	},
	"/assets/inventory-Cpuevbw_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fa7-F/5gZsNYEs2aHbonk8r2ZfV0ee8\"",
		"mtime": "2026-07-16T08:40:40.352Z",
		"size": 4007,
		"path": "../public/assets/inventory-Cpuevbw_.js"
	},
	"/assets/mail-DCCuGs-X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-Sgr8oTRIhEd8WQ5WOvbl/CycSpw\"",
		"mtime": "2026-07-16T08:40:40.368Z",
		"size": 213,
		"path": "../public/assets/mail-DCCuGs-X.js"
	},
	"/assets/Layout-Dz6pxZ-1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28d4-E2f+n1CsVc3V9eOZm7jLjSJkLfA\"",
		"mtime": "2026-07-16T08:40:39.891Z",
		"size": 10452,
		"path": "../public/assets/Layout-Dz6pxZ-1.js"
	},
	"/assets/login-D7OMYZ5f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a0f-wvtluHTF76P8dpRDdRGUwK1wY3A\"",
		"mtime": "2026-07-16T08:40:40.352Z",
		"size": 2575,
		"path": "../public/assets/login-D7OMYZ5f.js"
	},
	"/assets/matchContext-ItqiG8Pc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a1-c/6KnD7vxO6rw1Dd4k+2pRjf+5s\"",
		"mtime": "2026-07-16T08:40:40.386Z",
		"size": 673,
		"path": "../public/assets/matchContext-ItqiG8Pc.js"
	},
	"/assets/messages-njhweIAa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"922-0KdbyJ6fj70PbHqBp7ly+tcVQkk\"",
		"mtime": "2026-07-16T08:40:40.402Z",
		"size": 2338,
		"path": "../public/assets/messages-njhweIAa.js"
	},
	"/assets/orders-ez9yi96Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b85-o41JERRCnXxr/VPugo6oqaqcIvQ\"",
		"mtime": "2026-07-16T08:40:40.440Z",
		"size": 2949,
		"path": "../public/assets/orders-ez9yi96Y.js"
	},
	"/assets/not-found-i5RsCZif.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-Trmr7GZIBZuvfg4uM18tBiRtOXg\"",
		"mtime": "2026-07-16T08:40:40.422Z",
		"size": 118,
		"path": "../public/assets/not-found-i5RsCZif.js"
	},
	"/assets/product._id-BOlJ2Ywa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1455-qQnvlV2rmn3utDBdxovaC2Y4o/A\"",
		"mtime": "2026-07-16T08:40:40.451Z",
		"size": 5205,
		"path": "../public/assets/product._id-BOlJ2Ywa.js"
	},
	"/assets/products-rldW0jFX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"202c-AAq6Bg07QF1PGjNaScWFNpvfDPo\"",
		"mtime": "2026-07-16T08:40:40.467Z",
		"size": 8236,
		"path": "../public/assets/products-rldW0jFX.js"
	},
	"/assets/payments-CxVGV7_N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b02-SStAPLsHcfAip3j1RYyXYsiYNKE\"",
		"mtime": "2026-07-16T08:40:40.451Z",
		"size": 2818,
		"path": "../public/assets/payments-CxVGV7_N.js"
	},
	"/assets/ProductCard-xjdruoKH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9fe-cjjlk+iDr+6Kk9mCZagDtw/R/Q8\"",
		"mtime": "2026-07-16T08:40:39.908Z",
		"size": 2558,
		"path": "../public/assets/ProductCard-xjdruoKH.js"
	},
	"/assets/react-dom-CxH3rOft.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ddf-aak8oCq+CqDCzFfa+Ri5QgVl3Hg\"",
		"mtime": "2026-07-16T08:40:40.468Z",
		"size": 3551,
		"path": "../public/assets/react-dom-CxH3rOft.js"
	},
	"/assets/register-ByFZueEf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10e1-7zin4TOFDJy9FqWi7rRfa0bNaNU\"",
		"mtime": "2026-07-16T08:40:40.521Z",
		"size": 4321,
		"path": "../public/assets/register-ByFZueEf.js"
	},
	"/assets/reviews-AwlF-lhA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11ef-h41/a0V2C7et3OwLcfVAdq9zTbg\"",
		"mtime": "2026-07-16T08:40:40.538Z",
		"size": 4591,
		"path": "../public/assets/reviews-AwlF-lhA.js"
	},
	"/assets/select-BA99V3RF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b1f-1y/snHF86rc/1kK8pBHbPZsT+NU\"",
		"mtime": "2026-07-16T08:40:40.558Z",
		"size": 23327,
		"path": "../public/assets/select-BA99V3RF.js"
	},
	"/assets/routes-DSAkEUm9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"291c-WkEhhvfbdr9Dv6BKIFFrMRddBrE\"",
		"mtime": "2026-07-16T08:40:40.543Z",
		"size": 10524,
		"path": "../public/assets/routes-DSAkEUm9.js"
	},
	"/assets/settings-hb4d_YUc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b9c-8TUHW0ySuEAJVzATsV08CGDigoY\"",
		"mtime": "2026-07-16T08:40:40.583Z",
		"size": 2972,
		"path": "../public/assets/settings-hb4d_YUc.js"
	},
	"/assets/search-BV3Ilj9d.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-ZLCSV3hAQQhq/rI9pK+xvBrJyEU\"",
		"mtime": "2026-07-16T08:40:40.555Z",
		"size": 174,
		"path": "../public/assets/search-BV3Ilj9d.js"
	},
	"/assets/shop-DyKUmPl-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f35-iAXNg8UcZOf3cGyTRfVe8D5VMFc\"",
		"mtime": "2026-07-16T08:40:40.585Z",
		"size": 3893,
		"path": "../public/assets/shop-DyKUmPl-.js"
	},
	"/assets/shopping-bag-BsgOm32I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5c76-I7RUtTFsAeWmJMYVHbT1GFiirvI\"",
		"mtime": "2026-07-16T08:40:40.603Z",
		"size": 23670,
		"path": "../public/assets/shopping-bag-BsgOm32I.js"
	},
	"/assets/sparkles-CXtTQCrO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-VcyjhztOMwkrU4ElBC+5vXfVHpA\"",
		"mtime": "2026-07-16T08:40:40.640Z",
		"size": 494,
		"path": "../public/assets/sparkles-CXtTQCrO.js"
	},
	"/assets/index-BG7zvDUM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"83f25-m9q/WKwgw8GFTAxxaO61xlt0Jfg\"",
		"mtime": "2026-07-16T08:40:39.602Z",
		"size": 540453,
		"path": "../public/assets/index-BG7zvDUM.js"
	},
	"/assets/star-BVPnNWgl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d8-23SFaWGiwEitRt97a6CH2l1D/ko\"",
		"mtime": "2026-07-16T08:40:40.653Z",
		"size": 472,
		"path": "../public/assets/star-BVPnNWgl.js"
	},
	"/assets/users-Sm1dT0rc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3d7-6CndOdBbsIEPRYvRr+CaIyIn1tc\"",
		"mtime": "2026-07-16T08:40:40.680Z",
		"size": 983,
		"path": "../public/assets/users-Sm1dT0rc.js"
	},
	"/assets/table-BcfK3iEh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"66f-tVjhiN0j0r+do9qWMLTtsjh1saQ\"",
		"mtime": "2026-07-16T08:40:40.663Z",
		"size": 1647,
		"path": "../public/assets/table-BcfK3iEh.js"
	},
	"/assets/styles-B347U3A5.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1651e-PtUROwhPpTAR2NPmXMpkTUG2XsM\"",
		"mtime": "2026-07-16T08:40:40.751Z",
		"size": 91422,
		"path": "../public/assets/styles-B347U3A5.css"
	},
	"/assets/utils-B6KiDbIe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6a7d-iNkBSvaSyIjvZOzWoTvEa49qwcI\"",
		"mtime": "2026-07-16T08:40:40.687Z",
		"size": 27261,
		"path": "../public/assets/utils-B6KiDbIe.js"
	},
	"/assets/textarea-DCwNLjnV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20a-X5ox6snKceQKvVXd5SzCQz+vfqw\"",
		"mtime": "2026-07-16T08:40:40.674Z",
		"size": 522,
		"path": "../public/assets/textarea-DCwNLjnV.js"
	},
	"/assets/wallet-CKG4X3XL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11e-kVveke6yNKk4QjT0u7soqzJyGa8\"",
		"mtime": "2026-07-16T08:40:40.720Z",
		"size": 286,
		"path": "../public/assets/wallet-CKG4X3XL.js"
	},
	"/assets/zod-CZ9rz6kI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7c89-JUZfp08bWq6EpgIakCiQjU1iD8k\"",
		"mtime": "2026-07-16T08:40:40.726Z",
		"size": 31881,
		"path": "../public/assets/zod-CZ9rz6kI.js"
	},
	"/assets/_layout-BUjwN8jR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8383-PfzTNbhtmKrAVUF1dT49trF0d8g\"",
		"mtime": "2026-07-16T08:40:39.927Z",
		"size": 33667,
		"path": "../public/assets/_layout-BUjwN8jR.js"
	},
	"/images/hero-beads.jpg": {
		"type": "image/jpeg",
		"etag": "\"29b5a-vz6NHMiwKekiJK14j9cY/cALUFQ\"",
		"mtime": "2026-07-12T14:37:34.473Z",
		"size": 170842,
		"path": "../public/images/hero-beads.jpg"
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
