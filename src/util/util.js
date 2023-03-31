import { validatenull } from "./validate";
import SparkMD5 from "spark-md5";

// 表单序列化
export const serialize = data => {
	const list = [];
	Object.keys(data).forEach(ele => {
		list.push(`${ele}=${data[ele]}`);
	});
	return list.join("&");
};
export const getObjType = obj => {
	var toString = Object.prototype.toString;
	var map = {
		"[object Boolean]": "boolean",
		"[object Number]": "number",
		"[object String]": "string",
		"[object Function]": "function",
		"[object Array]": "array",
		"[object Date]": "date",
		"[object RegExp]": "regExp",
		"[object Undefined]": "undefined",
		"[object Null]": "null",
		"[object Object]": "object",
	};
	if (obj instanceof Element) {
		return "element";
	}
	return map[toString.call(obj)];
};
/**
 * 对象深拷贝
 */
export const deepClone = data => {
	var type = getObjType(data);
	var obj;
	if (type === "array") {
		obj = [];
	} else if (type === "object") {
		obj = {};
	} else {
		// 不再具有下一层次
		return data;
	}
	if (type === "array") {
		for (var i = 0, len = data.length; i < len; i++) {
			obj.push(deepClone(data[i]));
		}
	} else if (type === "object") {
		for (var key in data) {
			obj[key] = deepClone(data[key]);
		}
	}
	return obj;
};
/**
 * 判断路由是否相等
 */
export const diff = (obj1, obj2) => {
	delete obj1.close;
	var o1 = obj1 instanceof Object;
	var o2 = obj2 instanceof Object;
	if (!o1 || !o2) {
		/*  判断不是对象  */
		return obj1 === obj2;
	}

	if (Object.keys(obj1).length !== Object.keys(obj2).length) {
		return false;
		// Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
	}

	for (var attr in obj1) {
		var t1 = obj1[attr] instanceof Object;
		var t2 = obj2[attr] instanceof Object;
		if (t1 && t2) {
			return diff(obj1[attr], obj2[attr]);
		} else if (obj1[attr] !== obj2[attr]) {
			return false;
		}
	}
	return true;
};
/**
 * 设置灰度模式
 */
export const toggleGrayMode = status => {
	if (status) {
		document.body.className = document.body.className + " grayMode";
	} else {
		document.body.className = document.body.className.replace(" grayMode", "");
	}
};

/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
	if (fullscreenEnable()) {
		exitFullScreen();
	} else {
		reqFullScreen();
	}
};
/**
 * esc监听全屏
 */
export const listenfullscreen = callback => {
	function listen() {
		callback();
	}

	document.addEventListener("fullscreenchange", function () {
		listen();
	});
	document.addEventListener("mozfullscreenchange", function () {
		listen();
	});
	document.addEventListener("webkitfullscreenchange", function () {
		listen();
	});
	document.addEventListener("msfullscreenchange", function () {
		listen();
	});
};

/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
	return document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen;
};

/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
	if (document.documentElement.requestFullScreen) {
		document.documentElement.requestFullScreen();
	} else if (document.documentElement.webkitRequestFullScreen) {
		document.documentElement.webkitRequestFullScreen();
	} else if (document.documentElement.mozRequestFullScreen) {
		document.documentElement.mozRequestFullScreen();
	}
};

/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
	if (document.documentElement.requestFullScreen) {
		document.exitFullScreen();
	} else if (document.documentElement.webkitRequestFullScreen) {
		document.webkitCancelFullScreen();
	} else if (document.documentElement.mozRequestFullScreen) {
		document.mozCancelFullScreen();
	}
};

/**
 * 递归寻找子类的父类
 */
export const findParent = (menu, id) => {
	for (let i = 0; i < menu.length; i++) {
		if (menu[i].children.length !== 0) {
			for (let j = 0; j < menu[i].children.length; j++) {
				if (menu[i].children[j].id === id) {
					return menu[i];
				} else {
					if (menu[i].children[j].children.length !== 0) {
						return findParent(menu[i].children[j].children, id);
					}
				}
			}
		}
	}
};

/**
 * 动态插入css
 */
export const loadStyle = url => {
	const link = document.createElement("link");
	link.type = "text/css";
	link.rel = "stylesheet";
	link.href = url;
	const head = document.getElementsByTagName("head")[0];
	head.appendChild(link);
};

/**
 * 判断路由是否相等
 */
export const isObjectValueEqual = (a, b) => {
	let result = true;
	Object.keys(a).forEach(ele => {
		const type = typeof a[ele];
		if (type === "string" && a[ele] !== b[ele]) result = false;
		else if (type === "object" && JSON.stringify(a[ele]) !== JSON.stringify(b[ele])) result = false;
	});
	return result;
};

/**
 * 根据字典的value显示label
 */
export const findByvalue = (dic, value) => {
	let result = "";
	if (validatenull(dic)) return value;
	if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
		let index = 0;
		index = findArray(dic, value);
		if (index !== -1) {
			result = dic[index].label;
		} else {
			result = value;
		}
	} else if (value instanceof Array) {
		result = [];
		let index = 0;
		value.forEach(ele => {
			index = findArray(dic, ele);
			if (index !== -1) {
				result.push(dic[index].label);
			} else {
				result.push(value);
			}
		});
		result = result.toString();
	}
	return result;
};

/**
 * 根据字典的value查找对应的index
 */
export const findArray = (dic, value) => {
	for (let i = 0; i < dic.length; i++) {
		if (dic[i].value === value) {
			return i;
		}
	}
	return -1;
};
/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
	let random = "";
	random = Math.ceil(Math.random() * 100000000000000)
		.toString()
		.substr(0, len || 4);
	if (date) random = random + Date.now();
	return random;
};

/**
 * 打开小窗口
 */
export const openWindow = (url, title, w, h) => {
	// Fixes dual-screen position                            Most browsers       Firefox
	const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
	const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

	const width = window.innerWidth
		? window.innerWidth
		: document.documentElement.clientWidth
		? document.documentElement.clientWidth
		: screen.width;
	const height = window.innerHeight
		? window.innerHeight
		: document.documentElement.clientHeight
		? document.documentElement.clientHeight
		: screen.height;

	const left = width / 2 - w / 2 + dualScreenLeft;
	const top = height / 2 - h / 2 + dualScreenTop;
	const newWindow = window.open(
		url,
		title,
		"toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=" +
			w +
			", height=" +
			h +
			", top=" +
			top +
			", left=" +
			left
	);

	// Puts focus on the newWindow
	if (window.focus) {
		newWindow.focus();
	}
};

/**
 *  <img> <a> src 处理
 * @returns {PromiseLike<T | never> | Promise<T | never>}
 */

export function getQueryString(url, paraName) {
	const arrObj = url.split("?");
	if (arrObj.length > 1) {
		const arrPara = arrObj[1].split("&");
		let arr;
		for (let i = 0; i < arrPara.length; i++) {
			arr = arrPara[i].split("=");
			// eslint-disable-next-line eqeqeq
			if (arr != null && arr[0] == paraName) {
				return arr[1];
			}
		}
		return "";
	} else {
		return "";
	}
}

/*
参数：传入一个文件对象，返回其md5值
*/
export function getMd5(file) {
	return new Promise(function (resolve, reject) {
		const BlobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
		const ChunkSize = 2097152; // Read in chunks of 2MB
		const Chunks = Math.ceil(file.size / ChunkSize);
		let currentChunk = 0;
		const Spark = new SparkMD5.ArrayBuffer();
		// eslint-disable-next-line @typescript-eslint/no-use-before-define
		const FileProtoReader = new FileReader();
		const LoadNext = () => {
			const start = currentChunk * ChunkSize;
			const end = start + ChunkSize >= file.size ? file.size : start + ChunkSize;
			FileProtoReader.readAsArrayBuffer(BlobSlice.call(file, start, end));
		};
		FileProtoReader.onload = e => {
			Spark.append(e.target.result); // Append array buffer
			currentChunk++;
			if (currentChunk < Chunks) {
				LoadNext();
			} else {
				// Compute hash
				resolve(Spark.end());
			}
		};
		FileProtoReader.onerror = () => {
			reject(null);
		};
		LoadNext();
	});
}

/**
 * 滚动到指定dom节点
 * @param {*} domId
 */
export function scrollIntoView(domId) {
	if (domId) {
		const targetId = domId;
		console.log("in scrollIntoView = # " + targetId);
		let wait = 3;
		if (window.scrollTimer) {
			clearInterval(window.scrollTimer);
		}
		window.scrollTimer = setInterval(() => {
			wait = wait - 0.2;
			const element = document.getElementById(targetId);
			if (element) {
				console.log("scrollIntoView  found");
				element.scrollIntoView({
					behavior: "smooth",
					block: "center",
					inline: "center",
				});
				clearInterval(window.scrollTimer);
			} else if (wait <= 0) {
				console.log("not found element = # " + domId + " and wait too long");
				clearInterval(window.scrollTimer);
			}
		}, 200);
	}
}
