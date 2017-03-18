var TOPIC = {
	TOP_STORIES: { value: null, name: "Top Stories" },
	WORLD: { value: "w", name: "World" },
	US: { value: "n", name: "U.S." },
	BUSINESS: { value: "b", name: "Business" },
	TECHNOLOGY: { value: "tc", name: "Technology" },
	ENTERTAINMENT: { value: "e", name: "Entertainment" },
	SPORTS: { value: "s", name: "Sports" },
	SCIENCE: { value: "snc", name: "Science" },
	HEALTH: { value: "m", name: "Health" }
};

var REGION = {
	ARAB_WORLD: { value: "ar_me", name: "Arab world" },
	ARGENTINA: { value: "es_ar", name: "Argentina" },
	AUSTRALIA: { value: "au", name: "Australia" },
	AUSTRIA: { value: "de_at", name: "Austria" },
	BANGLADESH: { value: "bn_bd", name: "Bangladesh" },
	BELGIUM_DUTCH: { value: "nl_be", name: "Belgium (Dutch)" },
	BELGIUM_FRENCH: { value: "fr_be", name: "Belgium (French)" },
	BOTSWANA: { value: "en_bw", name: "Botswana" },
	BRAZIL: { value: "pt-BR_br", name: "Brazil" },
	BULGARIA: { value: "bg_bg", name: "Bulgaria" },
	CANADA_ENGLISH: { value: "ca", name: "Canada (English)" },
	CANADA_FRENCH: { value: "fr_ca", name: "Canada (French)" },
	CHILE: { value: "es_cl", name: "Chile" },
	CHINA: { value: "cn", name: "China" },
	COLOMBIA: { value: "es_co", name: "Colombia" },
	CUBA: { value: "es_cu", name: "Cuba" },
	CZECH_REPUBLIC: { value: "cs_cz", name: "Czech Republic" },
	EGYPT: { value: "ar_eg", name: "Egypt" },
	ETHIOPIA: { value: "en_et", name: "Ethiopia" },
	FRANCE: { value: "fr", name: "France" },
	GERMANY: { value: "de", name: "Germany" },
	GHANA: { value: "en_gh", name: "Ghana" },
	GREECE: { value: "el_gr", name: "Greece" },
	HONG_KONG: { value: "hk", name: "Hong Kong"},
	HUNGARY: { value: "hu_hu", name: "Hungary" },
	INDIA_ENGLISH: { value: "in", name: "India (English)"},
	INDIA_HINDI: { value: "hi_in", name: "India (Hindi)"},
	INDIA_MALAYALAM: { value: "ml_in", name: "India (Malayalam)"},
	INDIA_TAMIL: { value: "ta_in", name: "India (Tamil)"},
	INDIA_TELUGU: { value: "te_in", name: "India (Telugu)"},
	INDONESIA: { value: "id_id", name: "Indonesia"},
	IRELAND: { value: "en_ie", name: "Ireland" },
	ISRAEL_ENGLISH: { value: "en_il", name: "Israel (English)"},
	ISRAEL_HEBREW: { value: "iw_il", name: "Israel (Hebrew)"},
	ITALY: { value: "it", name: "Italy" },
	JAPAN: { value: "jp", name: "Japan"},
	KENYA: { value: "en_ke", name: "Kenya" },
	LATVIA: { value: "lv_lv", name: "Latvia" },
	LEBANON: { value: "ar_lb", name: "Lebanon"},
	LITHUANIA: { value: "lt_lt", name: "Lithuania" },
	MALAYSIA: { value: "en_my", name: "Malaysia"},
	MEXICO: { value: "es_mx", name: "Mexico" },
	MOROCCO: { value: "fr_ma", name: "Morocco" },
	NAMIBIA: { value: "en_na", name: "Namibia" },
	NETHERLANDS: { value: "nl_nl", name: "Netherlands" },
	NEW_ZEALAND: { value: "nz", name: "New Zealand"},
	NIGERIA: { value: "en_ng", name: "Nigeria" },
	NORWAY: { value: "no_no", name: "Norway" },
	PAKISTAN: { value: "en_pk", name: "Pakistan"},
	PERU: { value: "es_pe", name: "Peru" },
	PHILIPPINES: { value: "en_ph", name: "Philippines"},
	POLAND: { value: "pl_pl", name: "Poland" },
	PORTUGAL: { value: "pt-PT_pt", name: "Portugal" },
	ROMANIA: { value: "ro_ro", name: "Romania" },
	RUSSIA: { value: "ru_ru", name: "Russia" },
	SAUDI_ARABIA: { value: "ar_sa", name: "Saudi Arabia"},
	SENEGAL: { value: "fr_sn", name: "Senegal" },
	SERBIA: { value: "sr_rs", name: "Serbia" },
	SINGAPORE: { value: "en_sg", name: "Singapore"},
	SLOVAKIA: { value: "sk_sk", name: "Slovakia" },
	SLOVENIA: { value: "sl_si", name: "Slovenia" },
	SOUTH_AFRICA: { value: "en_za", name: "South Africa" },
	SWEDEN: { value: "sv_se", name: "Sweden" },
	SWITZERLAND: { value: "fr_ch", name: "Switzerland" },
	TAIWAN: { value: "tw", name: "Taiwan"},
	TANZANIA: { value: "en_tz", name: "Tanzania" },
	THAILAND: { value: "th_th", name: "Thailand"},
	TURKEY: { value: "tr_tr", name: "Turkey" },
	UGANDA: { value: "en_ug", name: "Uganda" },
	UKRAINE_RUSSIAN: { value: "ru_ua", name: "Ukraine (Russian)" },
	UKRAINE_UKRANIAN: { value: "uk_ua", name: "Ukraine (Ukranian)" },
	UNITED_ARAB_EMIRATES: { value: "ar_ae", name: "United Arab Emirates" },
	UNITED_KINGDOM: { value: "uk", name: "United Kingdom" },
	UNITED_STATES_ENGLISH: { value: "us", name: "United States (English)" },
	UNITED_STATES_SPANISH: { value: "es_us", name: "United States (Spanish)" },
	VENEZUELA: { value: "es_ve", name: "Venezuela" },
	VIETNAM: { value: "vi_vn", name: "Vietnam" },
	ZIMBABWE: { value: "en_zw", name: "Zimbabwe" }
};

function getFeedURL(topic, region) {
	var url = FEED_URL;
	var topicString  = TOPIC[topic].value;
	var regionString = REGION[region].value;

	if (topicString != null) {
		url += "&topic=" + topicString;
	}

	if (regionString != null) {
		url += "&ned=" + regionString;
	}
	return url;
}