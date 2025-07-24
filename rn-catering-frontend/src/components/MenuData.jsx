import React from "react";

const menuData = {
    North: {
        "Starters & Appetizers": {
            "Chaats & Street-Style": [
                "Aloo Tikki Chaat", "Dahi Puri", "Papdi Chaat", "Pani Puri", "Raj Kachori",
                "Chole Kulche Chaat", "Palak Patta Chaat", "Dahi Bhalla", "Corn & Cheese Chaat", "Khasta Kachori Chaat",
                "Sev Puri", "Bhel Puri"
            ],
            "Finger Foods": [
                "Paneer Tikka", "Hara Bhara Kebab", "Tandoori Mushroom", "Malai Broccoli", "Amritsari Aloo",
                "Veg Seekh Kebab", "Corn Tikki", "Stuffed Paneer Pakoda", "Spinach & Cheese Rolls", "Stuffed Mushroom Caps",
                "Crispy Baby Corn", "Paneer Shashlik"
            ],
            "Soups & Hot Starters": [
                "Tomato Dhaniya Shorba", "Sweet Corn Soup", "Dal Shorba", "Cream of Mushroom", "Palak Soup",
                "Vegetable Hot Pot Soup", "Lentil Soup", "Carrot-Ginger Soup", "Hot & Sour Veg Soup", "Mushroom Clear Soup"
            ]
        },
        "Main Course": {
            "Curries & Gravies": [
                "Paneer Butter Masala", "Dal Makhani", "Shahi Kofta", "Chole Masala", "Rajma",
                "Dum Aloo Kashmiri", "Palak Paneer", "Bhindi Masala", "Kadhi Pakora", "Aloo Methi",
                "Navratan Korma", "Baingan Bharta"
            ],
            "Rice & Pulao": [
                "Jeera Rice", "Veg Biryani", "Kashmiri Pulao", "Matar Pulao", "Zafrani Pulao",
                "Tahri", "Subz Yakhni Pulao", "Veg Fried Rice", "Ghee Rice", "Dry Fruit Pulao"
            ],
            "Breads & Rotis": [
                "Garlic Naan", "Tandoori Roti", "Bhature", "Stuffed Kulcha", "Missi Roti",
                "Lachha Paratha", "Puri", "Roomali Roti", "Besan Roti", "Bajra Roti"
            ]
        },
        "Sides & Accompaniments": {
            Raitas: [
                "Boondi Raita", "Cucumber Mint Raita", "Beetroot Raita", "Pineapple Raita", "Mixed Vegetable Raita",
                "Tomato-Onion Raita", "Lauki Raita", "Spinach Raita"
            ],
            "Pickles & Chutneys": [
                "Mango Pickle", "Mint Chutney", "Garlic Chutney", "Sweet Chutney", "Tamarind Chutney",
                "Green Chilli Pickle", "Carrot Pickle", "Lemon Pickle"
            ],
            Salads: [
                "Kachumber Salad", "Sprout Salad", "Corn & Pomegranate Salad", "Fruit Chaat",
                "Beetroot Salad", "Carrot-Cabbage Salad", "Paneer Tikka Salad"
            ]
        },
        "Desserts & Sweets": {
            "Traditional Sweets": [
                "Gulab Jamun", "Rasmalai", "Jalebi with Rabri", "Gajar Ka Halwa", "Motichoor Ladoo",
                "Kesar Peda", "Dry Fruit Ladoo", "Besan Barfi"
            ],
            "Fusion / Modern": [
                "Chocolate Rasgulla", "Rabri Mousse", "Rasmalai Cheesecake", "Dry Fruit Brownie", "Gulab Jamun Cheesecake"
            ]
        },
        Beverages: {
            "Welcome Drinks": ["Aam Panna", "Jaljeera", "Rose Sherbet", "Kesar Thandai", "Bel Sharbat"],
            "Cold Drinks": ["Sweet Lassi", "Masala Buttermilk", "Mango Lassi", "Kokum Fizz", "Rose Lassi"],
            "Hot Drinks": ["Masala Chai", "Filter Coffee", "Badam Milk", "Tulsi Tea", "Cardamom Chai"]
        }
    },

    South: {
        "Starters & Appetizers": {
            "Chaats & Street-Style": [
                "Kara Boondi Chaat", "Mini Idli Chaat", "Rasam Shots", "Andhra Punugulu", "Medu Vada Chaat",
                "Sundal", "Banana Bonda Chaat", "Masala Paniyaram", "Pesarattu Chaat", "Rava Dosa Rolls"
            ],
            "Finger Foods": [
                "Masala Vada", "Mysore Bonda", "Baby Corn 65", "Medu Vada", "Pepper Paneer Fry",
                "Banana Fry", "Jackfruit Cutlets", "Vegetable Uppu Kozhukattai", "Sweet Potato Bonda", "Mini Dosa Rolls"
            ],
            "Soups & Hot Starters": [
                "Rasam Shots", "Pepper Rasam Soup", "Coconut Milk Veg Soup", "Tomato Rasam", "Vegetable Mulligatawny",
                "Lemon Rasam", "Tamarind Soup", "Drumstick Soup", "Spicy Curry Leaf Soup", "Sundal Soup"
            ]
        },
        "Main Course": {
            "Curries & Gravies": [
                "Avial", "Veg Kurma", "Sambar", "Tomato Rasam", "Kara Kuzhambu", "Beans Poriyal", "Drumstick Curry",
                "Chettinad Veg Curry", "Cabbage Thoran", "Mor Kuzhambu", "Vegetable Stew", "Pumpkin Erissery"
            ],
            "Rice & Pulao": [
                "Lemon Rice", "Tamarind Rice", "Bisi Bele Bath", "Coconut Rice", "Veg Biryani (Hyderabadi)",
                "Curd Rice", "Tomato Rice", "Curry Leaf Rice", "Pepper Rice", "Ghee Pongal"
            ],
            "Breads & Rotis": [
                "Malabar Parotta", "Appam", "Neer Dosa", "Ragi Roti", "Kerala Chapati", "Set Dosa", "Adai", "Uttapam", "Pesarattu", "Akki Roti"
            ]
        },
        "Sides & Accompaniments": {
            Raitas: ["Coconut Raita", "Curd Pachadi", "Beetroot Raita", "Tomato Pachadi", "Cucumber Pachadi"],
            "Pickles & Chutneys": ["Coconut Chutney", "Ginger Chutney", "Curry Leaf Chutney", "Tamarind Chutney", "Tomato Thokku"],
            Salads: ["Kosambari", "Sprouted Moong Salad", "Raw Mango Salad", "Cabbage Kosambari", "Beetroot Kosambari"]
        },
        "Desserts & Sweets": {
            "Traditional Sweets": [
                "Mysore Pak", "Coconut Laddu", "Kesari Bath", "Payasam (Ada/Semiya/Chana Dal)", "Elaneer Payasam",
                "Kozhukattai", "Pineapple Kesari", "Rava Kesari", "Paal Paniyaram", "Badam Halwa"
            ],
            "Fusion / Modern": ["Filter Coffee Panna Cotta", "Coconut Jaggery Tart", "Pineapple Kesari Tarts", "Banana Halwa Cups"]
        },
        Beverages: {
            "Welcome Drinks": ["Panakam", "Buttermilk", "Rose Sherbet", "Nannari Sherbet", "Tender Coconut Water"],
            "Cold Drinks": ["Butter Milk", "Lemon Iced Tea", "Solkadhi", "Mango Buttermilk"],
            "Hot Drinks": ["Filter Coffee", "Masala Chai", "Ginger Lemon Tea", "Rasam Shots"]
        }
    },
    East: {
        "Starters & Appetizers": {
            "Chaats & Street-Style": [
                "Ghugni Chaat", "Jhalmuri", "Aloor Chop Chaat", "Puchka", "Chanar Cutlet Chaat",
                "Mochar Chop", "Pakoda Chaat", "Beguni Chaat", "Niramish Dimer Devil", "Piyaji"
            ],
            "Finger Foods": [
                "Veg Momos", "Mochar Chop", "Patal Kachaudi", "Chhena Cutlets", "Shukto Pakora",
                "Niramish Pakoda", "Chanar Bora", "Dhoka Cutlets", "Moong Dal Bora", "Kumro Bora"
            ],
            "Soups & Hot Starters": [
                "Veg Clear Soup", "Tomato Dhania Soup", "Bengali Mustard Veg Soup", "Moong Dal Soup", "Lau Shorba",
                "Cabbage Soup", "Mixed Veg Hot Soup", "Ginger Lemon Soup"
            ]
        },
        "Main Course": {
            "Curries & Gravies": [
                "Shukto", "Dalma", "Bengali Chanar Dalna", "Pui Shak", "Begun Bhaja",
                "Aloo Posto", "Chanar Kalia", "Chanar Jhal", "Mocha Ghonto", "Labra"
            ],
            "Rice & Pulao": [
                "Mishti Pulao", "Steamed Rice", "Pakhala Rice", "Bengali Ghee Rice", "Bhuni Khichuri",
                "Aloo Peas Pulao", "Chhanar Pulao", "Niramish Khichuri", "Gobindo Bhog Rice", "Green Peas Khichuri"
            ],
            "Breads & Rotis": [
                "Luchi", "Kochuri", "Radhaballavi", "Bengali Paratha", "Phulko Luchi", "Vegetable Stuffed Paratha"
            ]
        },
        "Sides & Accompaniments": {
            Raitas: ["Kasundi Yogurt", "Beetroot Raita", "Cucumber Raita", "Mint Raita"],
            "Pickles & Chutneys": ["Kasundi Mustard Dip", "Sweet Tomato Chutney", "Mango Chutney", "Green Chilli Pickle"],
            Salads: ["Bengali Beet Salad", "Cabbage Slaw", "Paneer Salad", "Cucumber-Onion Salad"]
        },
        "Desserts & Sweets": {
            "Traditional Sweets": [
                "Roshogolla", "Mishti Doi", "Sandesh", "Chhena Poda", "Pantua",
                "Patishapta", "Cham Cham", "Kheer Kadam", "Malai Chhena Toast", "Chhena Gaja"
            ],
            "Fusion / Modern": ["Mango Mishti Doi Parfait", "Sandesh Truffles", "Chhena Cheesecake", "Dry Fruit Mishti Cups"]
        },
        Beverages: {
            "Welcome Drinks": ["Aam Pora Sherbet", "Sweet Lassi", "Green Mango Sherbet"],
            "Cold Drinks": ["Buttermilk", "Sugarcane Juice", "Lemon Iced Tea"],
            "Hot Drinks": ["Masala Chai", "Ginger Lemon Tea", "Green Tea"]
        }
    },

    West: {
        "Starters & Appetizers": {
            "Chaats & Street-Style": [
                "Sev Puri", "Ragda Pattice", "Dhokla Chaat", "Bhel Puri", "Khaman Chaat",
                "Fafda-Jalebi Combo", "Patra Chaat", "Muthiya Chaat", "Kachumber Sev Chaat", "Khichu with Sev"
            ],
            "Finger Foods": [
                "Batata Vada", "Khandvi Rolls", "Patra", "Cheese Corn Balls", "Dabeli Bites",
                "Mini Pav Bhaji Sliders", "Farsan Platter", "Bharela Marcha", "Muthia", "Handvo Bites"
            ],
            "Soups & Hot Starters": [
                "Gujarati Kadhi Shots", "Kokum Soup", "Lemon Coriander Soup", "Dal Dhokli Soup", "Mixed Veg Kadhi Soup",
                "Drumstick Soup", "Hot Kokum Rasam"
            ]
        },
        "Main Course": {
            "Curries & Gravies": [
                "Undhiyu", "Goan Veg Xacuti", "Gujarati Kadhi", "Bharwa Bhindi", "Sev Tamatar",
                "Paneer Amti", "Tondli Masala", "Dudhi Chana Dal", "Patra Nu Shaak", "Panchkutiyu Shaak"
            ],
            "Rice & Pulao": [
                "Masala Khichdi", "Dal Dhokli Rice", "Veg Pulao", "Handvo Rice", "Vaghareli Khichdi",
                "Kathiyawadi Khichdi", "Surti Vagharela Bhaat", "Coconut Rice", "Sweet Dal Khichdi", "Dahi Chawal"
            ],
            "Breads & Rotis": [
                "Thepla", "Bhakri", "Pav", "Rotla", "Methi Thepla", "Bajri Na Rotla", "Jowar Bhakri", "Mini Pav Bhaji Pav"
            ]
        },
        "Sides & Accompaniments": {
            Raitas: ["Beetroot Raita", "Tomato-Onion Raita", "Lauki Raita", "Mint Raita"],
            "Pickles & Chutneys": ["Garlic Chutney", "Green Chilli Pickle", "Lemon Pickle", "Gunda Pickle", "Raw Mango Chutney"],
            Salads: ["Cabbage Slaw", "Sprout Salad", "Kachumber Salad", "Corn Salad"]
        },
        "Desserts & Sweets": {
            "Traditional Sweets": [
                "Shrikhand", "Basundi", "Mohanthal", "Malpua", "Ghari",
                "Puran Poli", "Doodh Pak", "Sukhdi", "Lapsi", "Sutar Feni"
            ],
            "Fusion / Modern": ["Shrikhand Cheesecake", "Dry Fruit Malpua", "Chocolate Basundi", "Basundi Mousse"]
        },
        Beverages: {
            "Welcome Drinks": ["Solkadhi", "Chaas Shots", "Rose Sherbet", "Aamras Shots"],
            "Cold Drinks": ["Sweet Lassi", "Masala Chaas", "Kokum Sherbet"],
            "Hot Drinks": ["Masala Chai", "Cardamom Milk", "Kesar Milk"]
        }
    }
};

export default menuData;