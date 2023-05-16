import React, {useEffect, useState} from "react";

// import FilterPopup from "../filter/FilterPopup";
// import InputRange from "react-input-range";
import {useRouter} from "next/router";
import {
    categoryConfig,
    districtsConfig,
    provincesConfig,
} from "configs/configs";
import {addressAPI} from "apis/address";
import dynamic from "next/dynamic";
import RadioWithoutValidate from "../input/RadioWithoutValidate";
import FilterButton from "../filter/FilterButton";
import {formatPrice} from "utils/common";
import ModalSearch from "@/components/modal/ModalSearch";

const Select = dynamic(() => import("react-select"), {ssr: false});

export default function FeatureSection({isSmall = false}) {
    const router = useRouter();
    const [filterUrl, setFilterUrl] = useState("");
    const [priceRange, setPriceRange] = useState({
        min: 500000,
        max: 50000000,
    });
    const [areaRange, setAreaRange] = useState({
        min: 10,
        max: 100,
    });

    const [category, setCategory] = useState(categoryConfig);

    const [provinceOption, setProvinceOption] = useState([]);
    const [districtOption, setDistrictOption] = useState([]);
    const [wardOption, setWardOption] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);
    const [tradingForm, setTradingForm] = useState(null);
    const [furniture, setFurniture] = useState(null);
    const [hasVideo, setHasVideo] = useState(null);

    const [priceRangeUrl, setPriceRangeUrl] = useState("");
    const [areaRangeUrl, setAreaRangeUrl] = useState("");
    const [addressUrl, setAddressUrl] = useState("");
    const [categoryUrl, setCategoryUrl] = useState("");
    const [tradingFormUrl, setTradingFormUrl] = useState("");
    const [furnitureUrl, setFurnitureUrl] = useState("");
    const [hasVideoUrl, setHasVideoUrl] = useState("");
    const [keyword, setKeyword] = useState("");

    const onChanegInputSearch = (e) => {
        setKeyword(e.target.value);
    };

    const handleApplySearch = (e) => {
        e.preventDefault();
        if ("keyword" in router.query) {
            delete router.query.keyword;
        }

        if (!Object.keys(router.query).length && keyword) {
            router.push(`/filter?keyword=${keyword}`);
        } else if (keyword) {
            handleGetFilterUrl(`keyword=${keyword}`);
        } else {
            handleGetFilterUrl();
        }
    };
    const selectCategory = (id) => {
        const temp = category.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    isChecked: !item.isChecked,
                };
            }
            return item;
        });
        setCategory([...temp]);
    };

    const handleChangePriceRange = (value) => {
        setPriceRange(value);
    };

    const handleChangeAreaRange = (value) => {
        setAreaRange(value);
    };

    const handleSelectTradingForm = (e) => {
        setTradingForm(e.target.value);
    };

    const handleSelectFurniture = (e) => {
        setFurniture(e.target.value);
    };

    const handleSelectHasVideo = (e) => {
        setHasVideo(e.target.value);
    };

    const handleApplyTradingForm = () => {
        if ("tradingForm" in router.query) {
            delete router.query.tradingForm;
        }
        setTradingFormUrl(`tradingForm=${tradingForm}`);
        if (!filterUrl) {
            setFilterUrl(`tradingForm=${tradingForm}`);
        }
    };

    const handleApplyFurniture = () => {
        if ("isFurniture" in router.query) {
            delete router.query.isFurniture;
        }
        setFurnitureUrl(`isFurniture=${furniture}`);
        if (!filterUrl) {
            setFilterUrl(`isFurniture=${furniture}`);
        }
    };

    const handleApplyHasVideo = () => {
        if ("hasVideo" in router.query) {
            delete router.query.hasVideo;
        }
        setHasVideoUrl(`hasVideo=${hasVideo}`);
        if (!filterUrl) {
            setFilterUrl(`hasVideo=${hasVideo}`);
        }
    };

    const handleApply = () => {
        if ("category" in router.query) {
            delete router.query.category;
        }

        setCategoryUrl(
            `category=${category
                .filter((item) => item.isChecked)
                .map((i) => i.id)
                .join(",")}`
        );
        if (!filterUrl) {
            setFilterUrl(
                `category=${category
                    .filter((item) => item.isChecked)
                    .map((i) => i.id)
                    .join(",")}`
            );
        }
    };

    const handleApplyPriceRange = () => {
        if ("priceRange" in router.query) {
            delete router.query.priceRange;
        }
        setPriceRangeUrl(`priceRange=${priceRange.min},${priceRange.max}`);
        if (!filterUrl) {
            setFilterUrl(`priceRange=${priceRange.min},${priceRange.max}`);
        }
    };

    const handleApplyAreaRange = () => {
        if ("areaRange" in router.query) {
            delete router.query.areaRange;
        }
        setAreaRangeUrl(`areaRange=${areaRange.min},${areaRange.max}`);
        if (!filterUrl) {
            setFilterUrl(`areaRange=${areaRange.min},${areaRange.max}`);
        }
    };

    const handleApplyAddress = () => {
        if ("address" in router.query) {
            delete router.query.address;
        }
        setAddressUrl(
            `address=${selectedProvince.value}${
                selectedDistrict?.value ? "," + selectedDistrict.value : ""
            }${selectedWard?.value ? "," + selectedWard.value : ""}`
        );
        if (!filterUrl) {
            setFilterUrl(
                `address=${selectedProvince.value}${
                    selectedDistrict?.value ? "," + selectedDistrict.value : ""
                }${selectedWard?.value ? "," + selectedWard.value : ""}`
            );
        }
    };

    const handleGetFilterUrl = (value) => {
        if (Object.keys(router.query).length) {
            let queryTemp = [];
            for (const key in router.query) {
                queryTemp.push(`${key}=${router.query[key]}`);
            }
            if (value) {
                router.push(`/filter?${queryTemp.join("&")}&${value}`);
            } else {
                router.push(`/filter?${queryTemp.join("&")}`);
            }
        } else {
            router.push(`/filter?${filterUrl}`);
        }
    };

    const handleSelectProvince = (option) => {
        setSelectedProvince(option);
        setSelectedDistrict(null);
        setSelectedWard(null);
    };

    const handleSelectDistrict = (option) => {
        setSelectedDistrict(option);
        setSelectedWard(null);
    };

    const handleSelectWard = (option) => {
        setSelectedWard(option);
    };

    useEffect(() => {
        if (priceRangeUrl || filterUrl) {
            handleGetFilterUrl(priceRangeUrl);
        }
    }, [priceRangeUrl, filterUrl]);

    useEffect(() => {
        if (areaRangeUrl) {
            handleGetFilterUrl(areaRangeUrl);
        }
    }, [areaRangeUrl]);

    useEffect(() => {
        if (categoryUrl) {
            handleGetFilterUrl(categoryUrl);
        }
    }, [categoryUrl]);

    useEffect(() => {
        if (addressUrl) {
            handleGetFilterUrl(addressUrl);
        }
    }, [addressUrl]);

    useEffect(() => {
        if (tradingFormUrl) {
            handleGetFilterUrl(tradingFormUrl);
        }
    }, [tradingFormUrl]);

    useEffect(() => {
        if (furnitureUrl) {
            handleGetFilterUrl(furnitureUrl);
        }
    }, [furnitureUrl]);

    useEffect(() => {
        if (hasVideoUrl) {
            handleGetFilterUrl(hasVideoUrl);
        }
    }, [hasVideoUrl]);

    useEffect(() => {
        if (Object.keys(router.query).length) {
            const {
                category: cate,
                priceRange: priceRangeUrl,
                areaRange: areaRangeUrl,
                address,
                tradingForm: tradingFormUrl,
                keyword,
            } = router.query;
            if (keyword) {
                setKeyword(keyword);
            }
            if (cate) {
                let categoryArray = category.map((item) => {
                    if (cate.split(",").includes(item.id.toString())) {
                        return {
                            ...item,
                            isChecked: true,
                        };
                    }
                    return item;
                });
                setCategory([...categoryArray]);
            }
            if (priceRangeUrl) {
                const priceTemp = priceRangeUrl.split(",");
                setPriceRange({min: priceTemp[0], max: priceTemp[1]});
            }
            if (areaRangeUrl) {
                const areaTemp = areaRangeUrl.split(",");
                setAreaRange({min: areaTemp[0], max: areaTemp[1]});
            }
            if (address) {
                const addressTemp = address.split(",");
                if (addressTemp[0]) {
                    setSelectedProvince({
                        value: addressTemp[0],
                        label: provincesConfig[addressTemp[0]],
                    });
                }
                if (addressTemp[1]) {
                    setSelectedDistrict({
                        value: addressTemp[1],
                        label: districtsConfig[addressTemp[1]],
                    });
                }
                // if (addressTemp[2]) {
                //     setSelectedWard({
                //         value: addressTemp[2],
                //         label: wardsConfig[addressTemp[2]],
                //     });
                // }
            }
            if (tradingFormUrl) {
                setTradingForm(tradingFormUrl);
            }
        }
    }, [router.query]);

    useEffect(() => {
        (async () => {
            // const res = await addressAPI.getProvinces();
            // if (res) {
            //     const temp = res.map((item) => ({
            //         value: item.id,
            //         label: item.fullName,
            //     }));
            //     setProvinceOption([...temp]);
            // }
        })();
    }, []);
    useEffect(() => {
        (async () => {
            if (selectedProvince?.label) {
                // const res = await addressAPI.getDistricts(selectedProvince.value);
                // if (res) {
                //     const temp = res.map((item) => ({
                //         value: item.id,
                //         label: item.fullName,
                //     }));
                //     setDistrictOption([...temp]);
                // }
            }
        })();
    }, [selectedProvince]);

    useEffect(() => {
        (async () => {
            if (selectedDistrict?.label) {
                const res = await addressAPI.getWards(selectedDistrict.value);
                if (res) {
                    const temp = res.map((item) => ({
                        value: item.id,
                        label: item.fullName,
                    }));
                    setWardOption([...temp]);
                }
            }
        })();
    }, [selectedDistrict]);
    return (
        <div className={`${isSmall ? "" : "bg-base-100 md:py-8 pt-8 pb-4"}`}>
            <div className="container mx-auto padding-mobile">
                <form onSubmit={(e) => handleApplySearch(e)}>
                    <div className="mb-4 relative">
                        <i className="fa-regular fa-magnifying-glass absolute top-1/2 -translate-y-2/4 left-3 z-10 text-gray-400 text-sm"></i>
                        <input
                            placeholder="Đề thi bạn đang tìm kiếm?"
                            onChange={(e) => onChanegInputSearch(e)}
                            value={keyword}
                            className="text-primary w-full py-3 pl-[36px] rounded-lg outline-none focus:border-2 focus:border-primary border border-gray-300 bg-base-100"
                        />
                    </div>
                </form>
                <FilterButton/>
                {/*<div className="hidden lg:flex items-center space-x-5 justify-center py-4">*/}

                {/* <div className="px-4 py-2 border border-gray rounded-lg font-semibold text-primary">
            ... Thêm tiêu chí
          </div> */}
                {/*</div>*/}
            </div>
        </div>
    );
}
