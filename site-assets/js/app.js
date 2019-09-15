var lists = {
	tags : [
		"Canadian",
		"CertClean",
		"Chemical Free",
		"Dairy Free",
		"EWG Verified",
		"EcoCert",
		"Fair Trade",
		"Gluten Free",
		"Hypoallergenic",
		"Natural",
		"No Talc",
		"Non-GMO",
		"Organic",
		"Peanut Free Product",
		"Sugar Free",
		"Organic",
		"Vegan",
		"alcohol free",
		"cruelty free",
		"oil free",
		"purpicks",
		"silicone free",
		"water free"
	],
	brands : [
		"almay",
		"alva",
		"anna sui",
		"annabelle",
		"benefit",
		"boosh",
		"burt's bees",
		"butter london",
		"c'est moi",
		"cargo cosmetics",
		"china glaze",
		"clinique",
		"coastal classic creation",
		"colourpop",
		"covergirl",
		"dalish",
		"deciem",
		"dior",
		"dr. hauschka",
		"e.l.f.",
		"essie",
		"fenty",
		"glossier",
		"green people",
		"iman",
		"l'oreal",
		"lotus cosmetics usa",
		"maia's mineral galaxy",
		"marcelle",
		"marienatie",
		"maybelline",
		"milani",
		"mineral fusion",
		"misa",
		"mistura",
		"moov",
		,"nudus",
		,"nyx",
		,"orly",
		,"pacifica",
		,"penny lane organics",
		,"physicians formula",
		,"piggy paint",
		,"pure anada",
		,"rejuva minerals",
		,"revlon",
		,"sally b's skin yummies",
		,"salon perfect",
		,"sante",
		,"sinful colours",
		,"smashbox",
		,"stila",
		,"suncoat",
		,"w3llpeople",
		,"wet n wild",
		,"zorah",
		,"zorah biocosmetiques"
	]
}
var database;

$(document).ready(function () {
	console.log("Ready!");
	$(document).trigger("preload");
});

// STATE PRELOAD
$(document).on("preload", function () {
	console.log("Preload Start");
	if (localStorage.getItem("database") == undefined) {
		// localStorage isn't defined, let's get info from server, slower process
		$.get("http://makeup-api.herokuapp.com/api/v1/products.json", function (d) {
			window.database = d.sort((a, b) => (a.rating > b.rating) ? 1 : -1);
			console.log("Remote Database Load");

			localStorage.database = JSON.stringify(window.database);

			$(document).trigger("run");
		}, "json");
	} else {
		// oh :O, find local data, nice! Let's do it
		console.log("Local Database Load");
		window.database = JSON.parse(localStorage.getItem("database"));
		$(document).trigger("run");
	}

});


// STATE RUN
$(document).on("run", function () {
	console.log("Run Start");

	// AUTO SET SWITCH TO THE PROPER VALUE SAVED IN LOCALSTORAGE
	$("#filter-list option").each(function (i, o) {
		if ($(o).val() == localStorage.filter) {
			$(o).attr("selected", "");
		}
	});

	// SHOW LIST WITH LAST FILTER
	showList ((localStorage.getItem("filter") != undefined && localStorage.getItem("filter") != "") ? localStorage.getItem("filter") : false);
});

$("body").on("click", ".aCard .img", function (e) {
	var index = parseInt($(this).parents(".aCard").data("index"));

	$.when($("#product-modal img").attr("src", window.database[index].image_link), $("#product-modal .modal-title").text(window.database[index].name)).done(function () {
		window.history.pushState("Opening " + window.database[index].name + " product.", "Title", "./" + window.database[index].name.replace(" ", "-").replace(/\s/g, ''));
		$('#product-modal').modal('show');
	});

});

$('#product-modal').on('hidden.bs.modal', function () {
	window.history.back();
});

$("body").on("click", "#filter-button", function () {
	if ($("#filter-list").val() != "") {
		window.localStorage.filter = $("#filter-list").val()
	} else {
		window.localStorage.Filter = "";
	}

	showList((localStorage.getItem("filter") != undefined && localStorage.getItem("filter") != "") ? localStorage.getItem("filter") : false);
});

function formatRating (rating) {
	return Number(rating) * 10;
}

function hasThisTag (filter, list) {
	var toReturn = false;

	$(list).each(function (i, o) {
		if (o == filter) {
			console.log(o, filter);
			toReturn = true;
		}
	})

	return toReturn;
}

function showList (filter = false) {
	$(".loading").fadeIn();
	$(".c").empty();

	$(window.database).each(function (i, o) {
		if (filter != false) {
			if (!hasThisTag(filter, o.tag_list)) {
				return true;
			}
		}

		var t = $(".templates .aCard").clone();

		// SET SOME ATTRIBUTES
		$(t).attr("data-index", i).attr("data-product-type", o.product_type);

		// SET TAGS
		o.tag_list.forEach(function (o_t) {
			// console.log(o_t);
		});

		$(t).find(".img").css("background-image", "url("+ o.image_link +")");
		$(t).find(".card-title").text(o.name);
		$(t).find(".rating").text("Rating "+(o.rating == null ? 0 : formatRating(o.rating)) + "/100");
		$(t).find(".price").text(Number(o.price)+" "+o.price_sign);

		// COLORS
		o.product_colors.forEach(function (c_o, c_i) {
			var color = document.createElement('span');
			$(color).addClass("color square").css("background-color", c_o.hex_value).attr("title", c_o.colour_name);
			$(t).find(".colors").append(color);
		});

		$(t).appendTo(".c");
	}).promise().done(function () {
		$(".loading").fadeOut();
	});
}
