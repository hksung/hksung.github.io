(function () {
	var storageKey = "hksung-theme";
	var mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

	function getStoredMode() {
		var stored = localStorage.getItem(storageKey);
		return stored === "light" || stored === "dark" ? stored : "system";
	}

	function resolveTheme(mode) {
		if (mode === "system") {
			return mediaQuery.matches ? "dark" : "light";
		}
		return mode;
	}

	function applyTheme(mode) {
		var resolvedTheme = resolveTheme(mode);
		document.documentElement.setAttribute("data-theme", resolvedTheme);
		document.documentElement.setAttribute("data-theme-mode", mode);

		var themeColor = resolvedTheme === "dark" ? "#181a1f" : "#ffffff";
		var metaThemeColor = document.querySelector('meta[name="theme-color"]');
		if (metaThemeColor) {
			metaThemeColor.setAttribute("content", themeColor);
		}

		document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
			button.setAttribute("aria-pressed", resolvedTheme === "dark" ? "true" : "false");
			button.setAttribute("title", mode === "system" ? "Using system color mode" : "Color mode: " + mode);
		});
	}

	function setTheme(mode) {
		localStorage.setItem(storageKey, mode);
		applyTheme(mode);
	}

	applyTheme(getStoredMode());

	mediaQuery.addEventListener("change", function () {
		if (getStoredMode() === "system") {
			applyTheme("system");
		}
	});

	document.addEventListener("DOMContentLoaded", function () {
		document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
			button.addEventListener("click", function () {
				var nextMode = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
				setTheme(nextMode);
			});
		});
		applyTheme(getStoredMode());
	});
})();
